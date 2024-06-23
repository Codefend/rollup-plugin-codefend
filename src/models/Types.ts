import { IObfuscationOptions } from "codefend/build/src/core/options";

export type IRollupCodefend = {
  name: string;
  transform(code: string): string;
  generateBundle: () => void;
  options: IObfuscationOptions;
};
export type IRollupCodefendOptions = {
  transformation?: {
    prefix?: string;
    static?: ICodefendTransformationStatic[];
    ignore?: string[];
  };
  debug?: {
    stats?: boolean;
  };
  parser?: {
    regexList?: ICodefendParserRegexListItem[];
  };
};

export type ICodefendParserRegexListItem = {
  name: string;
  value: string;
};

export type ICodefendTransformationStatic = {
  from: string;
  to: string;
};
