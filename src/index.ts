import { OptionsBuilder } from "./options/builder";
import { buildRuntimeOptions, obfuscate, stats } from "codefend";
import { IObfuscationOptions } from "codefend/build/src/core/options";

export const codefend = (options: IObfuscationOptions) => {
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
