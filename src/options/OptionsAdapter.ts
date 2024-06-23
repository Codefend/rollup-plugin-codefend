import {
  IObfuscationOptions,
  IPredefinedWordOption,
  IRegexListOption,
} from "codefend/build/src/core/options";
import { IRollupCodefendOptions } from "../models/Types";

class OptionsAdapter {
  transform(optionsV3: IRollupCodefendOptions): IObfuscationOptions {
    return {
      stats: this.stats(optionsV3),
      prefix: this.prefix(optionsV3),
      ignoredWords: this.ignoredWords(optionsV3),
      predefinedWords: this.predefinedWords(optionsV3),
      regexList: this.regexList(optionsV3),
    };
  }

  private stats(optionsV3: IRollupCodefendOptions): boolean {
    return optionsV3?.debug?.stats ?? true;
  }

  private prefix(optionsV3: IRollupCodefendOptions): string {
    return optionsV3?.transformation?.prefix ?? "Ox";
  }

  private ignoredWords(optionsV3: IRollupCodefendOptions): string[] {
    return optionsV3?.transformation?.ignore ?? [];
  }
  private predefinedWords(
    optionsV3: IRollupCodefendOptions
  ): IPredefinedWordOption[] {
    return (
      optionsV3?.transformation?.static?.map(({ from, to }) => {
        return {
          originalWord: from,
          targetWord: to,
        };
      }) ?? []
    );
  }
  private regexList(optionsV3: IRollupCodefendOptions): IRegexListOption[] {
    return (
      optionsV3?.parser?.regexList?.map((e) => {
        return {
          flag: "g",
          name: e.name,
          value: e.value,
        };
      }) ?? []
    );
  }
}
export default new OptionsAdapter();
