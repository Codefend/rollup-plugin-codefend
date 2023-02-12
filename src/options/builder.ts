import { IObfuscationOptions } from 'codefend/build/src/core/options';
import { buildObfuscationOptions } from "codefend";
import { validate } from "schema-utils";
import schema from "./schema.json";
import { JSONSchema7 } from "schema-utils/declarations/validate";

export class OptionsBuilder {
  name: string;
  options: any;
  additionalIgnoredWords: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setOptions(options: any) {
    this.options = buildObfuscationOptions(options);
    return this;
  }

  setAdditionalIgnoredWords(additionalIgnoredWords: string[]) {
    this.additionalIgnoredWords = additionalIgnoredWords;
    return this;
  }

  #validateOptions() {
    validate(schema as JSONSchema7, this.options, {
      name: this.name,
    });
    return this;
  }

  build(): IObfuscationOptions {
    this.#validateOptions();

    this.additionalIgnoredWords.forEach((word) => {
      this.options.ignoredWords.push(word);
    });
    return this.options;
  }
}
