import { describe, it, expect } from "vitest";
import { codefend } from "..";

const TEST_BASIC_LINE = "const l_variable = 1;";

describe("Transformation", () => {
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
    expect(plugin.transform(TEST_BASIC_LINE)).toBe(
      "const l_variable_replaced = 1;"
    );
  });
});
