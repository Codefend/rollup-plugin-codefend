# Contributing Guidelines

_Pull requests, bug reports, and all other forms of contribution are welcomed and highly encouraged!_ :octocat:

### Contents

- [Code of Conduct](#book-code-of-conduct)
- [Asking Questions](#bulb-asking-questions)
- [How can I Contribute?](#inbox_tray-how-can-i-contribute)

> **This guide serves to set clear expectations for everyone involved with the project so that we can improve it together while also creating a welcoming space for everyone to participate. Following these guidelines will help ensure a positive experience for contributors and maintainers.**

## :book: Code of Conduct

Please review our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## :bulb: Asking Questions

If you have any question that does not relate to a bug or a feature request, please use [GitHub Discussions](https://github.com/Codefend/rollup-plugin-codefend/discussions) instead of GitHub issues.

## :inbox_tray: How can I Contribute?

**GitHub issues**

If you encounter a problem with this library or if you have a new feature you'd like to see in this project, please create [a new issue](https://github.com/Codefend/rollup-plugin-codefend/issues/new/choose).

**GitHub Pull requests**

Use Node.js 24 LTS (24.11 or newer) and npm 11 for development. The published plugin still supports Node.js 18 or newer; the test and build tools have newer requirements.

From the repository root:

```sh
npm ci --include=dev --include=optional --bin-links
npm run format:check
npm run test:coverage
npm pack --dry-run
```

`prepack` runs formatting, lint, spelling, type checks, tests, the build, and package checks. Package checks load the CommonJS and ESM files, verify declarations and source maps, then build and execute a bundle. To run those checks on an older supported Node.js version, build on Node.js 24 first, switch Node.js, and run `npm run test:package`.

The source TypeScript compiler remains on the compatible 5.x line. A TypeScript 7 migration is separate from this maintenance update. The build uses [tsdown](https://tsdown.dev/guide/migrate-from-tsup) while preserving the existing `dist/index.js`, `dist/index.mjs`, and declaration paths.

For the example, build the root package first, then run `npm ci` and `npm run build` from `examples/nodejs`. The example uses the local checkout.

Use a descriptive conventional commit, such as `fix: ...` or `chore(deps): ...`. Releases are manual: review the version and changelog, pass the checks, and publish only with maintainer approval. The repository has no automatic publishing workflow.
