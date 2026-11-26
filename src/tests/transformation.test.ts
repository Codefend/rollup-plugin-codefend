import { afterEach, describe, it, expect, vi } from "vitest";
import { codefend } from "..";

const TEST_BASIC_LINE = "const l_variable = 1;";

describe("Transformation", () => {
  afterEach(() => vi.restoreAllMocks());
  it("transform with no argument", () => {
    const plugin = codefend();
    expect(plugin.transform(TEST_BASIC_LINE)).toBe("const Ox0 = 1;");
  });

  it("transform with prefix", () => {
    const options = {
      transformation: {
        prefix: "Ax",
      },
    };

    const plugin = codefend(options);
    expect(plugin.transform(TEST_BASIC_LINE)).toBe("const Ax0 = 1;");
  });

  it("transform with ignore", () => {
    const options = {
      transformation: {
        ignore: ["l_variable"],
      },
    };
    const plugin = codefend(options);
    expect(plugin.transform(TEST_BASIC_LINE)).toBe("const l_variable = 1;");
  });

  it("transform with static", () => {
    const options = {
      transformation: {
        static: [
          {
            from: "l_variable",
            to: "l_variable_replaced",
          },
        ],
      },
    };
    const plugin = codefend(options);
    expect(plugin.transform(TEST_BASIC_LINE)).toBe("const l_variable_replaced = 1;");
  });

  it("reports every repeated match with Codefend 3.2.1", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const plugin = codefend();

    expect(plugin.transform("l_value l_value l_value")).toBe("Ox0 Ox0 Ox0");
    plugin.generateBundle();

    expect(log).toHaveBeenCalledWith(expect.stringMatching(/l_value.*Ox0.*3/));
  });

  it("preserves the generated Rolldown runtime helpers", () => {
    const plugin = codefend();
    const runtime = "var __share_factories = {}; function __share_require() {}";

    expect(plugin.transform(runtime, "\0rolldown/runtime.js")).toBe(runtime);
  });

  it("still transforms user code in other virtual modules", () => {
    const plugin = codefend();

    expect(plugin.transform(TEST_BASIC_LINE, "\0virtual-user-module")).toBe("const Ox0 = 1;");
  });
});
