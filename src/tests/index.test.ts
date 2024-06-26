import { describe, it, expect } from "vitest";
import { codefend } from "..";
import {
  DEFAULT_TRANSFORMATION_PREFIX,
  DEFAULT_PARSER_REGEX_LIST,
} from "../data/Constants";

describe("Plugin: General Behavior", () => {
  it("has correct name", () => {
    expect(codefend().name).toBe("rollup-plugin-codefend");
  });

  it("default configuration", () => {
    const plugin = codefend();

    expect(plugin.___options.prefix).toBe(DEFAULT_TRANSFORMATION_PREFIX);
    expect(plugin.___options.ignoredWords).toStrictEqual([]);
    expect(plugin.___options.predefinedWords).toStrictEqual([]);
    expect(plugin.___options.stats).toBe(true);
    expect(plugin.___options.regexList).toStrictEqual(
      DEFAULT_PARSER_REGEX_LIST
    );
  });
});
