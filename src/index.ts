import { ICodefendRollupPluginOptions } from "./models";
import { obfuscate, codefendDefaultOptions } from "codefend";

export const codefend = (options: ICodefendRollupPluginOptions) => {
  const map: Record<string, string> = {};
  const _options = getOptions(options);

  return {
    name: "rollup-plugin-codefend",
    transform(code: string) {
      return obfuscate(code, map, _options);
    },
  };
};

function getOptions(options: ICodefendRollupPluginOptions) {
  options = options ?? {};
  const debug = options.debug ?? codefendDefaultOptions.debug;

  const obfuscationOptions = { ...codefendDefaultOptions.obfuscationOptions, ...(options as ICodefendRollupPluginOptions) };
  delete obfuscationOptions["debug"];

  return {
    debug,
    obfuscationOptions,
  };
}
