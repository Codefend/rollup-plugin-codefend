import { buildDebugOptions, buildParserOptions, buildTransformationOptions } from "codefend";
import { IRollupCodefendInternalOptions, IRollupCodefendOptions } from "../data/Types";
import { DEFAULT_PARSER_NAME } from "../data/Constants";

class OptionsAdapter {
  transform(pluginOptions: IRollupCodefendOptions): IRollupCodefendInternalOptions {
    return {
      parser: buildParserOptions({ name: DEFAULT_PARSER_NAME }).data!,
      transformation: buildTransformationOptions(pluginOptions.transformation),
      debug: buildDebugOptions(pluginOptions.debug),
    };
  }
}
export default new OptionsAdapter();
