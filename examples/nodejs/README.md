# rollup-plugin-codefend-example

## Usage

```bash
npm install
npm run build
```

```js
/* calculator.js */

export class c_Calculator {
  f_sum(p_a, p_b) {
    const l_results = p_a + p_b;
    return l_results;
  }
}
```

```js
/* main.js */

import { c_Calculator } from "./calculator";

const secret = "predefined_secret";
const node_modules = "node_modules";

export default function () {
  const l_calculator = new c_Calculator();
  const l_results = l_calculator.f_sum(2, 3);

  /* predefined_secret -> 123456 : defined in static inside rollup.config.js */
  console.log("secret: ", secret);

  /* node_modules -> node_modules : defined in ignore inside rollup.config.js */
  console.log("node_modules:", node_modules);

  /* l_results -> Ox4: with prefix l_ will be obfuscated */
  console.log("results: ", l_results);
}
```

```js
/* dist/bundle.js */

//>>>>>>==== Will Become ======<<<<<<

"use strict";

class Ox0 {
  Ox5(Ox6, Ox7) {
    const Ox4 = Ox6 + Ox7;
    return Ox4;
  }
}

const secret = "123456";
const node_modules = "node_modules";

function main() {
  const Ox3 = new Ox0();
  const Ox4 = Ox3.Ox5(2, 3);

  /* 123456 -> 123456 : defined in static inside rollup.config.js */
  console.log("secret: ", secret);

  /* node_modules -> node_modules : defined in ignore inside rollup.config.js */
  console.log("node_modules:", node_modules);

  /* Ox4 -> Ox4: with prefix l_ will be obfuscated */
  console.log("results: ", Ox4);
}

module.exports = main;
```

### Output

The code generated can be viewed inside [`dist`](./dist) folder
