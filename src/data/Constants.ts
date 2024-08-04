export const DEFAULT_TRANSFORMATION_PREFIX = "Ox";
export const DEFAULT_PARSER_REGEX_LIST = [
  {
    name: "main",
    regex: new RegExp("([a-zA-Z]+(_[a-zA-Z0-9]+)+)", "g"),
  },
];
export const DEFAULT_PARSER_NAME = "codeOnly";
