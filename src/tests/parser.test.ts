import { describe, expect, it } from "vitest";
import { buildRuntimeOptions, obfuscate } from "codefend";
import { codefend } from "..";
import type { IRollupCodefendOptions } from "../data/Types";
import { OptionsBuilder } from "../options/OptionsBuilder";
import { rollup } from "rollup";
import vm from "node:vm";

type ParserName = "codeOnly" | "startWithMAndUnderscore";
const source = "m_total m_Total m_value2 m_2total M_total l_total m_total_amount am_total";

describe("Parser selection", () => {
  it.each([
    { label: "omitted", options: {} },
    { label: "empty", options: { parser: {} } },
    { label: "explicit codeOnly", options: { parser: { name: "codeOnly" as const } } },
  ])("preserves legacy selection when $label", ({ options }) => {
    const configuration = new OptionsBuilder("rollup-plugin-codefend").setOptions(options).build();
    expect(obfuscate(source, configuration.transformation, configuration.parser, buildRuntimeOptions())).toBe(
      "Ox0 Ox1 Ox2 Ox3 Ox4 Ox5 Ox6 Ox7",
    );
  });

  it("selects only names matching the narrower m_ rule", () => {
    const configuration = new OptionsBuilder("rollup-plugin-codefend")
      .setOptions({ parser: { name: "startWithMAndUnderscore" } })
      .build();
    expect(obfuscate(source, configuration.transformation, configuration.parser, buildRuntimeOptions())).toBe(
      "Ox0 Ox1 Ox2 m_2total M_total l_total m_total_amount am_total",
    );
  });

  it.each([
    null,
    [],
    "codeOnly",
    { name: "default" },
    { name: "custom" },
    { name: "fileOnly" },
    { name: "unknown" },
    { name: "" },
    { name: 42 },
    { name: true },
    { name: null },
    { name: "codeOnly", regexList: [] },
  ])("rejects unsupported parser configuration: %j", (parser) => {
    const options = { parser } as unknown as IRollupCodefendOptions;
    const create = () => codefend(options);
    expect(create).toThrowError(expect.objectContaining({ name: "ValidationError" }));
    expect(create).toThrowError(/parser/);
  });
});

const files: Record<string, string> = {
  "entry.js":
    'import { m_add } from "./math.js"; export default function run(input) { const l_external = input; const M_total = input + 1; const m_2total = input + 2; const m_total_amount = input + 3; const am_total = input + 4; const m_Total = input + 5; return m_add(l_external, M_total) + m_2total + m_total_amount + am_total + m_Total; }',
  "math.js": "export function m_add(m_left, m_right) { return m_left + m_right; }",
};

async function compile(name: ParserName): Promise<{ code: string; run: (input: number) => number }> {
  const bundle = await rollup({
    input: "entry.js",
    plugins: [
      { name: "fixture", resolveId: (id) => id.replace(/^\.\//, ""), load: (id) => files[id] },
      codefend({ parser: { name }, debug: { stats: false } }),
    ],
  });
  try {
    const result = await bundle.generate({ format: "cjs" });
    const chunk = result.output.find((item) => item.type === "chunk");
    if (!chunk || chunk.type !== "chunk") throw new Error("Missing JavaScript output");
    const module = { exports: {} };
    vm.runInNewContext(chunk.code, { module, exports: module.exports });
    return { code: chunk.code, run: module.exports as (input: number) => number };
  } finally {
    await bundle.close();
  }
}

describe("Parser selection in a real build", () => {
  it.each<ParserName>(["codeOnly", "startWithMAndUnderscore"])(
    "executes a multi-module build with %s",
    async (name) => {
      const output = await compile(name);
      expect(output.run(2)).toBe(27);
      expect(output.code).not.toMatch(/\bm_(?:add|left|right|Total)\b/);
      for (const word of ["l_external", "M_total", "m_2total", "m_total_amount", "am_total"]) {
        if (name === "startWithMAndUnderscore") expect(output.code).toMatch(new RegExp("\\b" + word + "\\b"));
        else expect(output.code).not.toMatch(new RegExp("\\b" + word + "\\b"));
      }
    },
  );
});
