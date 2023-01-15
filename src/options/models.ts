export interface ICodefendPluginOptions {
  debug: boolean;
  prefix: string;
  predefinedWords: Array<ICodefendPluginPredefinedWordOption>;
  ignoredWords: string[];
  regexList: Array<ICodefendPluginRegexListOption>;
}

export interface ICodefendPluginPredefinedWordOption {
  originalWord: string;
  targetWord: string;
}

export interface ICodefendPluginRegexListOption {
  value: string;
  name: string;
  flag: string;
}

export interface ICodefendOptions {
  debug: boolean;
  obfuscationOptions: {
    prefix: string;
    predefinedWords: Array<ICodefendPluginPredefinedWordOption>;
    ignoredWords: string[];
    regexList: Array<ICodefendPluginRegexListOption>;
  };
}
