const { obfuscate, codefendDefaultOptions } = require("codefend");

export default function (options: ICodefendRollupPluginOptions) {
  const map: Record<string, string> = {};
  const _options = getOptions(options);

  return {
    name: "rollup-plugin-codefend",
    transform(code: string) {
      return obfuscate(code, map, _options);
    },
  };
}

function getOptions(options: ICodefendRollupPluginOptions) {
  options = options ?? {};
  const ret = {
    debug: options.debug ?? codefendDefaultOptions.debug,
    obfuscationOptions: { ...codefendDefaultOptions.obfuscationOptions, ...options },
  };
  delete ret["obfuscationOptions"]["debug"];
  return ret;
}

interface ICodefendRollupPluginOptions {
  debug: boolean;
  prefix: string;
}
