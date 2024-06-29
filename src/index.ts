import { OptionsBuilder } from "./options/OptionsBuilder";
import { buildRuntimeOptions, obfuscate, stats } from "codefend";
import { IRollupCodefend, IRollupCodefendOptions } from "./models/Types";

export const codefend = (options?: IRollupCodefendOptions): IRollupCodefend => {
  const name = "rollup-plugin-codefend";
  const runtimeOptions = buildRuntimeOptions();
  const _options = new OptionsBuilder(name).setOptions(options ?? {}).build();
  return {
    name,
    transform(code: string): string {
      return obfuscate(code, _options, runtimeOptions);
    },
    generateBundle: function write(): void {
      stats({ stats: _options.stats }, runtimeOptions);
    },
    options: _options,
  };
};
