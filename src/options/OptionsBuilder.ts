import { IObfuscationOptions } from "codefend/build/src/core/options";
import { buildObfuscationOptions } from "codefend";
import { IRollupCodefendOptions } from "../models/Types";
import OptionsAdapter from "./OptionsAdapter";
import OptionsValidator from "./OptionsValidator";

export class OptionsBuilder {
  name: string;
  libraryOptions!: IObfuscationOptions;
  pluginOptions!: IRollupCodefendOptions;
  additionalIgnoredWords: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setOptions(pluginOptions: IRollupCodefendOptions): this {
    this.pluginOptions = pluginOptions;
    this.libraryOptions = buildObfuscationOptions(
      OptionsAdapter.transform(pluginOptions),
    );
    return this;
  }

  setAdditionalIgnoredWords(additionalIgnoredWords: string[]): this {
    this.additionalIgnoredWords = additionalIgnoredWords;
    return this;
  }

  build(): IObfuscationOptions {
    OptionsValidator.validateOptions(this.name, this.pluginOptions);

    this.additionalIgnoredWords.forEach((word) => {
      this.libraryOptions.ignoredWords.push(word);
    });
    return this.libraryOptions;
  }
}
