'use strict';

class Ox0 {
  Ox5(Ox6, Ox7) {
    const Ox4 = Ox6 + Ox7;
    return Ox4;
  }
}

const secret = "123456";
const node_modules = "node_modules";

function main () {
  const Ox3 = new Ox0();
  const Ox4 = Ox3.Ox5(2, 3);

  /* 123456 -> 123456 : defined in predefinedWords inside rollup.config.js */
  console.log("secret: ", secret);

  /* node_modules -> node_modules : defined in ignoredWords inside rollup.config.js */
  console.log("node_modules:", node_modules);

  /* Ox4 -> Ox4: with prefix l_ will be obfuscated */
  console.log("results: ", Ox4);
}

module.exports = main;
