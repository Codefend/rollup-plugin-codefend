import { OptionsBuilder } from "./options/OptionsBuilder";
import { buildRuntimeOptions, obfuscate, stats } from "codefend";
import { IRollupCodefend, IRollupCodefendOptions } from "./models/Types";

export const codefend = (options?: IRollupCodefendOptions): IRollupCodefend => {
  const name = "rollup-plugin-codefend";
  const runtimeOptions = buildRuntimeOptions();
  const ___options = new OptionsBuilder(name).setOptions(options ?? {}).build();
  return {
    name,
    transform(code: string): string {
      return obfuscate(code, ___options, runtimeOptions);
    },
    generateBundle: function write(): void {
      stats({ stats: ___options.stats }, runtimeOptions);
    },
    ___options,
  };
};
