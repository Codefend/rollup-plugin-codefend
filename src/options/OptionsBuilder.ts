import { IRollupCodefendInternalOptions, IRollupCodefendOptions } from "../models/Types";
import OptionsAdapter from "./OptionsAdapter";
import OptionsValidator from "./OptionsValidator";

export class OptionsBuilder {
  name: string;
  libraryOptions!: IRollupCodefendInternalOptions;
  pluginOptions!: IRollupCodefendOptions;
  additionalIgnoredWords: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setOptions(pluginOptions: IRollupCodefendOptions): this {
    this.pluginOptions = pluginOptions;
    this.libraryOptions = OptionsAdapter.transform(pluginOptions);
    return this;
  }

  setAdditionalIgnoredWords(additionalIgnoredWords: string[]): this {
    this.additionalIgnoredWords = additionalIgnoredWords;
    return this;
  }

  build(): IRollupCodefendInternalOptions {
    OptionsValidator.validateOptions(this.name, this.pluginOptions);

    this.additionalIgnoredWords.forEach((word) => {
      this.libraryOptions.transformation?.ignore!.push(word);
    });
    return this.libraryOptions;
  }
}
