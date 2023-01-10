"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codefend = void 0;
const codefend_1 = require("codefend");
const codefend = (options) => {
    const map = {};
    const _options = getOptions(options);
    return {
        name: "rollup-plugin-codefend",
        transform(code) {
            return (0, codefend_1.obfuscate)(code, map, _options);
        },
    };
};
exports.codefend = codefend;
function getOptions(options) {
    var _a;
    options = options !== null && options !== void 0 ? options : {};
    const debug = (_a = options.debug) !== null && _a !== void 0 ? _a : codefend_1.codefendDefaultOptions.debug;
    const obfuscationOptions = Object.assign(Object.assign({}, codefend_1.codefendDefaultOptions.obfuscationOptions), options);
    delete obfuscationOptions["debug"];
    return {
        debug,
        obfuscationOptions,
    };
}
