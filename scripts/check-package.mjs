import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";
import { rollup } from "rollup";
import { rollup as rollup3 } from "rollup-3";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const commonjs = require(resolve(root, manifest.main));
const esm = await import(pathToFileURL(resolve(root, manifest.module)).href);

assert.deepEqual(Object.keys(commonjs), ["codefend"]);
assert.deepEqual(Object.keys(esm), ["codefend"]);
for (const entry of [manifest.main, manifest.module, manifest.types, "dist/index.d.mts"]) {
  assert.ok(readFileSync(resolve(root, entry)).length, "Missing package entry: " + entry);
}
for (const entry of [manifest.main, manifest.module]) {
  assert.ok(readFileSync(resolve(root, entry), "utf8").includes("sourceMappingURL="));
  const map = JSON.parse(readFileSync(resolve(root, entry + ".map"), "utf8"));
  assert.ok(map.sources.length > 0 && map.sourcesContent.length > 0);
}

for (const api of [commonjs, esm]) {
  for (const parserName of ["codeOnly", "startWithMAndUnderscore"]) {
    assert.equal(api.codefend({ debug: { stats: false } }).transform("const l_value = 1;"), "const Ox0 = 1;");
    for (const build of [rollup3, rollup]) {
      const bundle = await build({
        input: "entry",
        plugins: [
          {
            name: "fixture",
            resolveId(id) {
              return id === "entry" ? id : null;
            },
            load(id) {
              return id === "entry"
                ? "const m_value = 3; const l_external = 2; export default m_value + l_external;"
                : null;
            },
          },
          api.codefend({ parser: { name: parserName }, debug: { stats: false } }),
        ],
      });
      try {
        const result = await bundle.generate({ format: "cjs" });
        const chunk = result.output.find((output) => output.type === "chunk");
        assert.ok(chunk);
        assert.doesNotMatch(chunk.code, /\bm_value\b/);
        if (parserName === "startWithMAndUnderscore") assert.match(chunk.code, /\bl_external\b/);
        else assert.doesNotMatch(chunk.code, /\bl_external\b/);
        const module = { exports: {} };
        vm.runInNewContext(chunk.code, { module, exports: module.exports });
        assert.equal(module.exports, 5);
      } finally {
        await bundle.close();
      }
    }
  }
}

const core = JSON.parse(readFileSync(resolve(dirname(require.resolve("codefend")), "../package.json"), "utf8"));
console.log(
  JSON.stringify({
    node: process.version,
    plugin: manifest.version,
    codefend: core.version,
    parsers: ["codeOnly", "startWithMAndUnderscore"],
    checks: ["CommonJS", "ESM", "declarations", "source maps", "Rollup 3/4 compilation/execution"],
  }),
);
