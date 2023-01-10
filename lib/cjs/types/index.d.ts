export default function (options: ICodefendRollupPluginOptions): {
    name: string;
    transform(code: string): any;
};
interface ICodefendRollupPluginOptions {
    debug: boolean;
    prefix: string;
}
export {};
//# sourceMappingURL=index.d.ts.map