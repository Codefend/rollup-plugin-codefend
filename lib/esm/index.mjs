import { obfuscate, codefendDefaultOptions } from "codefend";
export const codefend = (options) => {
    const map = {};
    const _options = getOptions(options);
    return {
        name: "rollup-plugin-codefend",
        transform(code) {
            return obfuscate(code, map, _options);
        },
    };
};
function getOptions(options) {
    options = options ?? {};
    const debug = options.debug ?? codefendDefaultOptions.debug;
    const obfuscationOptions = { ...codefendDefaultOptions.obfuscationOptions, ...options };
    delete obfuscationOptions["debug"];
    return {
        debug,
        obfuscationOptions,
    };
}
