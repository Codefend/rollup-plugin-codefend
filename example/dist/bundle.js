'use strict';

class Ox0 {
  Ox5(Ox6, Ox7) {
    const Ox4 = Ox6 + Ox7;
    return Ox4;
  }
}

const secret = 123456;
const node_modules = "node_modules";

function main () {
  const Ox3 = new Ox0();
  const Ox4 = Ox3.Ox5(2, 3);
  console.log("secret: ", secret);
  console.log("results: ", Ox4);
  console.log("node_modules:", node_modules, "(should stay the same) (added to ignoredWords)");
}

module.exports = main;
