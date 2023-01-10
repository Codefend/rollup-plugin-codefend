const Codefend = require("../dist/rollup-plugin-codefend.cjs");
module.exports = {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [
    Codefend({
      debug: true,
      prefix: "Ox",
      predefinedWords: [
        {
          originalWord: "predefined_secretword",
          targetWord: "123456",
        },
      ],
      ignoredWords: ["node_modules"],
      regexList: [
        {
          name: "main",
          value: "([a-zA-Z]+(_[a-zA-Z0-9]+)+)",
          flag: "g",
        },
      ],
    }),
  ],
};
