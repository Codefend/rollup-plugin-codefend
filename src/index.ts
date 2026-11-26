import { OptionsBuilder } from "./options/OptionsBuilder";
import { IRollupCodefend, IRollupCodefendOptions } from "./data/Types";
import { buildRuntimeOptions, obfuscate, stats } from "codefend";
import { ROLLDOWN_RUNTIME_MODULE_ID } from "./data/Constants";

export const codefend = (options?: IRollupCodefendOptions): IRollupCodefend => {
  const name = "rollup-plugin-codefend";
  const runtimeOptions = buildRuntimeOptions();
  const ___options = new OptionsBuilder(name).setOptions(options ?? {}).build();
  return {
    name,
    transform(code: string, id?: string): string {
      if (id === ROLLDOWN_RUNTIME_MODULE_ID) return code;
      return obfuscate(code, ___options.transformation, ___options.parser, runtimeOptions);
    },
    generateBundle: function write(): void {
      stats({ stats: ___options.debug.stats }, runtimeOptions);
    },
    ___options,
  };
};
