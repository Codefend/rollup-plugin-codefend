import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { rollup } from "rollup";
import { rollup as rollup3 } from "rollup-3";
import { build as viteBuild } from "vite";
import { describe, expect, it } from "vitest";

import { codefend } from "..";

function execute(code: string): number[] {
  const module = { exports: {} };
  vm.runInNewContext(code, { module, exports: module.exports });
  return Object.values(module.exports);
}

describe("Bundler compatibility", () => {
  it.each([
    { name: "Rollup 3", build: rollup3 },
    { name: "Rollup 4", build: rollup },
  ])("executes a multi-module bundle with $name", async ({ build }) => {
    const modules: Record<string, string> = {
      entry: 'import { l_add } from "math"; export const l_result = l_add(2, 3);',
      math: "export function l_add(l_left, l_right) { return l_left + l_right; }",
    };
    const bundle = await build({
      input: "entry",
      plugins: [
        {
          name: "fixture",
          resolveId(id: string) {
            return id in modules ? id : null;
          },
          load(id: string) {
            return modules[id] ?? null;
          },
        },
        codefend({ debug: { stats: false } }),
      ],
    });
    try {
      const result = await bundle.generate({ format: "cjs" });
      const chunk = result.output.find((output) => output.type === "chunk");
      if (!chunk || chunk.type !== "chunk") throw new Error("Missing JavaScript chunk");

      expect(chunk.code).not.toMatch(/\bl_(?:add|left|right|result)\b/);
      expect(execute(chunk.code)).toEqual([5]);
    } finally {
      await bundle.close();
    }
  });

  it("builds and executes a Vite library", async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "codefend-vite-test-"));
    fs.writeFileSync(path.join(root, "entry.js"), "export const l_value = 42;");
    try {
      const result = await viteBuild({
        root,
        configFile: false,
        logLevel: "silent",
        plugins: [codefend({ debug: { stats: false } })],
        build: {
          write: false,
          minify: false,
          lib: { entry: path.join(root, "entry.js"), formats: ["cjs"], fileName: () => "bundle.cjs" },
        },
      });
      const output = Array.isArray(result) ? result[0] : result;
      if (!output || !("output" in output)) throw new Error("Expected a library output");
      const chunk = output.output.find((output) => output.type === "chunk");
      if (!chunk || chunk.type !== "chunk") throw new Error("Missing JavaScript chunk");

      expect(chunk.code).not.toMatch(/\bl_value\b/);
      expect(execute(chunk.code)).toEqual([42]);
    } finally {
      if (
        path.dirname(path.resolve(root)) !== path.resolve(os.tmpdir()) ||
        !path.basename(root).startsWith("codefend-vite-test-")
      ) {
        throw new Error("Refusing to remove a directory outside the test fixtures.");
      }
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
