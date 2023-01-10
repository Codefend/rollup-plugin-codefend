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

### `Step 1`: Configuration

Add to your `rollup.config.js`:

#### Default options

```js
import Codefend from "rollup-plugin-codefend";// <-----

export default {
  input:...,
  output: ...,
  plugins: [Codefend()],// <----
};
```

#### Custom options

```js
import Codefend from "rollup-plugin-codefend";  // <-----

export default {
  input: ...,
  output: ...,
  plugins: [
    Codefend({// <-----
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

### `Step 2`: Naming convention

In your code, `add prefixes to the words that you want Codefend to encrypt.`

`Make sure to read the `[`Philosophy`](https://github.com/Codefend/core#philosophy)` behind Codefend obfuscation First to understand why Codefend can work with any code written in any language.`

```js
//node js example
//as a starting point:  prefix the words that should be encrypted with l_

class l_Calculator {
  l_sum(l_a, l_b) {
    const l_results = l_a + l_b;
    return l_results;
  }
}

//>>>>>>==== Will Become ======<<<<<<

class Ox0 {
  Ox1(Ox2, Ox3) {
    const Ox4 = Ox2 + Ox3;
    return Ox4;
  }
}
```

```html
<!-- Html example, can work also with Angular,React,Vue,Svelte... in the same way -->

<html>
  <head>
    <style>
      .l_red {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="l_red">l_secret</div>
    <div class="l_red">Hello World</div>
  </body>
</html>

<!-- Will Become -->

<html>
  <head>
    <style>
      .Ox1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="Ox1">Ox0</div>
    <div class="Ox1">Hello World</div>
  </body>
</html>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE.md)
