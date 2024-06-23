import { OptionsBuilder } from "./options/OptionsBuilder";
import { buildRuntimeOptions, obfuscate, stats } from "codefend";
import { IRollupCodefendOptions } from "./models/Types";

export const codefend = (options: IRollupCodefendOptions) => {
  const name = "rollup-plugin-codefend";
  const runtimeOptions = buildRuntimeOptions();
  const _options = new OptionsBuilder(name).setOptions(options).build();

  return {
    name: name,
    transform(code: string) {
      return obfuscate(code, _options, runtimeOptions);
    },
    generateBundle: function write() {
      stats({ stats: _options.stats }, runtimeOptions);
    },
  };
};
