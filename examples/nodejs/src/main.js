import { c_Calculator } from "./calculator";

const secret = "predefined_secret";
const node_modules = "node_modules";

export default function () {
  const l_calculator = new c_Calculator();
  const l_results = l_calculator.f_sum(2, 3);

  /* predefined_secret -> 123456 : defined in predefinedWords inside rollup.config.js */
  console.log("secret: ", secret);

  /* node_modules -> node_modules : defined in ignoredWords inside rollup.config.js */
  console.log("node_modules:", node_modules);

  /* l_results -> Ox4: with prefix l_ will be obfuscated */
  console.log("results: ", l_results);
}
