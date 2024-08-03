import { buildDebugOptions, buildParserOptions, buildTransformationOptions } from "codefend";

import { IRollupCodefendInternalOptions, IRollupCodefendOptions } from "../models/Types";

class OptionsAdapter {
  transform(pluginOptions: IRollupCodefendOptions): IRollupCodefendInternalOptions {
    return {
      parser: buildParserOptions({ name: "codeOnly" }).data!,
      transformation: buildTransformationOptions(pluginOptions.transformation),
      debug: buildDebugOptions(pluginOptions.debug),
    };
  }
}
export default new OptionsAdapter();
