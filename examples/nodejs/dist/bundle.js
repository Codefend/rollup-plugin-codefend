'use strict';

class Ox0 {
  Ox3(Ox4, Ox5) {
    const Ox2 = Ox4 + Ox5;
    return Ox2;
  }
}

const secret = "123456";
const node_modules = "node_modules";

function main () {
  const Ox1 = new Ox0();
  const Ox2 = Ox1.Ox3(2, 3);

  /* 123456 -> 123456 : defined in predefinedWords inside rollup.config.js */
  console.log("secret: ", secret);

  /* node_modules -> node_modules : defined in ignoredWords inside rollup.config.js */
  console.log("node_modules:", node_modules);

  /* Ox2 -> Ox4: with prefix l_ will be obfuscated */
  console.log("results: ", Ox2);
}

module.exports = main;
