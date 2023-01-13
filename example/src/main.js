import { c_Calculator } from "./calculator";

const secret = predefined_secretword;
const node_modules = "node_modules";

export default function () {
  const l_calculator = new c_Calculator();
  const l_results = l_calculator.f_sum(2, 3);
  console.log("secret: ", secret);
  console.log("results: ", l_results);
  console.log("node_modules:", node_modules, "(should stay the same) (added to ignoredWords)");
}
