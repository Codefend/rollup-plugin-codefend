<p align="center">
 <img src="./public/img/logo.png">
</p>

# rollup-plugin-codefend

Rollup plugin for code obfuscation based on [Codefend](https://www.npmjs.com/package/codefend)

## Installation

```bash
npm install -D rollup-plugin-codefend
```

## Usage

Add to your `rollup.config.js`:

### Default options

```js
import Codefend from "rollup-plugin-codefend";

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [Codefend()],
};
```

### Custom options

Add to your `rollup.config.js`:

```js
import Codefend from "rollup-plugin-codefend";

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [
    Codefend({
      /** debug: boolean
       * For additional logs
       */
      debug: true,

      /** prefix: string
       * the prefix of each variable generated,
       * make sure its a valid character to start with a variable
       * ( e.g do not start with "-"" or a number)
       */
      prefix: "Ox",

      /** predefinedWords: Array<{originalWord:string, targetWord:string}>
       *words that you want to obfuscate them in a static way (determined output)
       ** {"originalWord":"l_secretVar" , "targetWord": "123456"}
       * note that the original word should have a prefix 'l_' to be detected and replaced
       */
      predefinedWords: [
        {
          originalWord: "predefined_secretword",
          targetWord: "123456",
        },
      ],

      /** ignoredWords: Array<string>
       * Words that matches the pattern to be obfuscated but should be kept as is.
       * useful for words that are being obfuscated and causing errors in build
       */
      ignoredWords: ["node_modules"],

      /** regexList: Array<{name:string,value:string,flag:string}>
       * Regex for detecting the words to be obfuscated
       */
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
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE.md)
