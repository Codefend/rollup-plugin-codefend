const { obfuscate, codefendDefaultOptions } = require("codefend");
export default function (options) {
    const map = {};
    const _options = getOptions(options);
    return {
        name: "rollup-plugin-codefend",
        transform(code) {
            return obfuscate(code, map, _options);
        },
    };
}
function getOptions(options) {
    options = options ?? {};
    const ret = {
        debug: options.debug ?? codefendDefaultOptions.debug,
        obfuscationOptions: { ...codefendDefaultOptions.obfuscationOptions, ...options },
    };
    delete ret["obfuscationOptions"]["debug"];
    return ret;
}
