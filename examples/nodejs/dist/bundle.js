'use strict';

class Xx0 {
  Xx5(Xx6, Xx7) {
    const Xx4 = Xx6 + Xx7;
    return Xx4;
  }
}

const secret = "123456";
const node_modules = "node_modules";

function main () {
  const Xx3 = new Xx0();
  const Xx4 = Xx3.Xx5(2, 3);

  /* 123456 -> 123456 : defined in predefinedWords inside rollup.config.js */
  console.log("secret: ", secret);

  /* node_modules -> node_modules : defined in ignoredWords inside rollup.config.js */
  console.log("node_modules:", node_modules);

  /* Xx4 -> Ox4: with prefix l_ will be obfuscated */
  console.log("results: ", Xx4);
}

module.exports = main;
