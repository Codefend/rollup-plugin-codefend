"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { obfuscate, codefendDefaultOptions } = require("codefend");
function default_1(options) {
    const map = {};
    const _options = getOptions(options);
    return {
        name: "rollup-plugin-codefend",
        transform(code) {
            return obfuscate(code, map, _options);
        },
    };
}
exports.default = default_1;
function getOptions(options) {
    var _a;
    options = options !== null && options !== void 0 ? options : {};
    const ret = {
        debug: (_a = options.debug) !== null && _a !== void 0 ? _a : codefendDefaultOptions.debug,
        obfuscationOptions: Object.assign(Object.assign({}, codefendDefaultOptions.obfuscationOptions), options),
    };
    delete ret["obfuscationOptions"]["debug"];
    return ret;
}
