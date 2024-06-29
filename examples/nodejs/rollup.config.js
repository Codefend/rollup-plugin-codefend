const { codefend } = require("../../lib/cjs/index");
module.exports = {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [
    codefend({
      transformation: {
        prefix: "Ox",
        static: [
          {
            from: "predefined_secretword",
            to: "123456",
          },
        ],
        ignore: ["node_modules"],
      },

      debug: {
        stats: true,
      },
    }),
  ],
};
