import type {
  ICodefendDebugOptions,
  ICodefendTransformationOptions,
  ICodefendInternalDebugOptions,
  ICodefendInternalParserOptions,
  ICodefendInternalTransformationOptions,
} from "codefend";

export type IRollupCodefend = {
  name: string;
  transform(code: string, id?: string): string;
  generateBundle: () => void;
  ___options: IRollupCodefendInternalOptions;
};
export type IRollupCodefendOptions = {
  parser?: { name?: "codeOnly" | "startWithMAndUnderscore" };
  transformation?: ICodefendTransformationOptions;
  debug?: IRollupCodefendDebugOptions;
};

export type IRollupCodefendInternalOptions = {
  transformation: ICodefendInternalTransformationOptions;
  debug: ICodefendInternalDebugOptions;
  parser: ICodefendInternalParserOptions;
};

type IRollupCodefendDebugOptions = Omit<ICodefendDebugOptions, "ignoredWarnings">;
