import { c_Calculator } from "./calculator";

export default function () {
  const l_calculator = new c_Calculator();
  const l_results = l_calculator.f_sum(2, 3);
  console.log(l_results);
}
