import type {
  ICodefendDebugOptions,
  ICodefendTransformationOptions,
  ICodefendParserOptions,
  ICodefendInternalDebugOptions,
  ICodefendInternalParserOptions,
  ICodefendInternalTransformationOptions,
} from "codefend";

export type IRollupCodefend = {
  name: string;
  transform(code: string): string;
  generateBundle: () => void;
  ___options: IRollupCodefendInternalOptions;
};
export type IRollupCodefendOptions = {
  transformation?: ICodefendTransformationOptions;
  debug?: ICodefendDebugOptions;
  parser?: ICodefendParserOptions;
};

export type IRollupCodefendInternalOptions = {
  transformation: ICodefendInternalTransformationOptions;
  debug: ICodefendInternalDebugOptions;
  parser: ICodefendInternalParserOptions;
};
