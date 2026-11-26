<p align="center">
 <img src="./public/img/logo.png">
</p>

# rollup-plugin-codefend

[![Latest CI workflow status](https://img.shields.io/github/actions/workflow/status/Codefend/rollup-plugin-codefend/ci.yaml)](https://github.com/Codefend/rollup-plugin-codefend/actions/workflows/ci.yaml)
![NPM](https://img.shields.io/npm/dt/rollup-plugin-codefend)
[![npm unpacked size](https://img.shields.io/npm/unpacked-size/rollup-plugin-codefend)](https://www.npmjs.com/package/rollup-plugin-codefend)
![NPM](https://img.shields.io/node/v/rollup-plugin-codefend)
![NPM](https://img.shields.io/npm/l/rollup-plugin-codefend)

Rollup plugin for code obfuscation based on [Codefend](https://www.npmjs.com/package/codefend)

Supports Rollup 3 and 4 on Node.js 18 or newer.

## Installation

```bash
npm install -D rollup-plugin-codefend
```

## Usage

### `Step 1`: Configuration

Add to your `rollup.config.js`:

#### Default options

```js
import { codefend } from "rollup-plugin-codefend";

export default {
  input:...,
  output: ...,
  plugins: [codefend()],
};
```

#### Custom options

```js
import { codefend } from "rollup-plugin-codefend";

export default {
  input: ...,
  output: ...,
  plugins: [
    codefend({
      transformation:{
            // the prefix to use for each obfuscated variable
            prefix: "Ox",

            // control how a specific variable should be obfuscated
            static: [
              {
                from: "predefined_secret",
                to: "123456",
              },
            ],

            //will skip obfuscation for the following words
            ignore: ["node_modules"],

            /* By using everyday words such as books or lorem ipsum in the pool,
            you can subtly obfuscate your code,
            concealing its true nature without making it apparent that obfuscation is occurring.*/
            pool: ["QueenOfHeart"],
      },
      debug: {
            // to display detailed stats about the words that have been obfuscated
            stats: true,
      },
    }),
  ],
};
```

For a more detailed explanation, refer to the [configuration](https://codefend.github.io/docs/references/configuration) section of the `codefend` docs.

### `Step 2`: Naming convention

In your code, `add prefixes to the words that you want Codefend to obfuscate.`

Codefend transforms identifiers that match its naming conventions.

```js
//node js example
//as a starting point:  prefix the words that should be obfuscated with l_

class l_Calculator {
  l_sum(l_a, l_b) {
    const l_results = l_a + l_b;
    console.log("node_modules");
    console.log("predefined_secret");
    return l_results;
  }
}

//>>>>>>==== Will Become ======<<<<<<

class QueenOfHeart /* 'QueenOfHeart' defined in pool*/ {
  /* Ox1, Ox2... prefix transformation*/
  Ox1(Ox2, Ox3) {
    const Ox4 = Ox2 + Ox3;
    console.log("node_modules"); // has not been obfuscated
    console.log("123456"); // has transformed from "predefined_secret" to "123456"
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

## Examples

1. ### [`Node js`](./examples/nodejs/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE.md)
