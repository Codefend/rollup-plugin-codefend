import { OptionsBuilder } from "./options/builder";
import { ICodefendPluginOptions } from "./options/models";
import { obfuscate } from "codefend";

export const codefend = (options: ICodefendPluginOptions) => {
  const name = "rollup-plugin-codefend";
  const map: Record<string, string> = {};
  const _options = new OptionsBuilder(name).setOptions(options).build();

  return {
    name: name,
    transform(code: string) {
      return obfuscate(code, map, _options);
    },
  };
};
