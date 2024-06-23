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
