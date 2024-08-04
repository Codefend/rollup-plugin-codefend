import { OptionsBuilder } from "./options/OptionsBuilder";
import { IRollupCodefend, IRollupCodefendOptions } from "./data/Types";
import { buildRuntimeOptions, obfuscate, stats } from "codefend";

export const codefend = (options?: IRollupCodefendOptions): IRollupCodefend => {
  const name = "rollup-plugin-codefend";
  const runtimeOptions = buildRuntimeOptions();
  const ___options = new OptionsBuilder(name).setOptions(options ?? {}).build();
  return {
    name,
    transform(code: string): string {
      return obfuscate(code, ___options.transformation, ___options.parser, runtimeOptions);
    },
    generateBundle: function write(): void {
      stats({ stats: ___options.debug.stats }, runtimeOptions);
    },
    ___options,
  };
};
