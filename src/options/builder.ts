import { codefendDefaultOptions } from "codefend";
import { validate } from "schema-utils";
import schema from "./schema.json";
import { JSONSchema7 } from "schema-utils/declarations/validate";
import { ICodefendOptions } from "./models";

export class OptionsBuilder {
  name: string;
  options: any;
  additionalIgnoredWords: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setOptions(options: any) {
    options = options ?? {};
    this.options = { debug: codefendDefaultOptions.debug, ...codefendDefaultOptions.obfuscationOptions, ...options };
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

  build(): ICodefendOptions {
    this.#validateOptions();

    this.additionalIgnoredWords.forEach((word) => {
      this.options.ignoredWords.push(word);
    });

    const debug = this.options.debug;

    const obfuscationOptions = { ...this.options };
    delete obfuscationOptions["debug"];

    return {
      debug: debug,
      obfuscationOptions: obfuscationOptions,
    };
  }
}
