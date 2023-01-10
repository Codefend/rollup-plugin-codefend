export interface ICodefendRollupPluginOptions {
  debug?: boolean;
  prefix: string;
  predefinedWords: Array<ICodefendRollupPluginPredefinedWordOption>;
  ignoredWords: string[];
  regexList: Array<ICodefendRollupPluginRegexListOption>;
}

export interface ICodefendRollupPluginPredefinedWordOption {
  originalWord: string;
  targetWord: string;
}

export interface ICodefendRollupPluginRegexListOption {
  value: string;
  name: string;
  flag: string;
}
