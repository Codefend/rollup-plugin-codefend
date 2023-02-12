const { codefend } = require("../../lib/cjs/index");
module.exports = {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [
    codefend({
      stats: true,
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
