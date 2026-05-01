/**
 * CJS dependencies that need to be pulled through Vite's SSR pipeline
 * and wrapped as ESM by `ssr-cjs-plugin.ts`.
 *
 * Vite 6's SSR module runner evaluates modules as strict ESM, which means
 * `import { X } from 'pkg'` fails for CJS packages unless we synthesise real
 * ESM named exports for them. Listing a package here:
 *   1. Adds it to `ssr.noExternal` so Vite processes it (instead of leaving
 *      it for Node's loader).
 *   2. Causes `ssrCjsPlugin` to load it via `createRequire()` and emit a
 *      shim with proper ESM named exports.
 *
 * If a new dependency breaks at runtime with
 *   "SyntaxError: Named export 'X' not found. The requested module is a CommonJS module..."
 * add it here. Contributors should never need to switch to default-import +
 * destructure patterns in source code.
 */
export const cjsPackages = [
	'@guardian/bridget',
	'jsdom',
	'log4js',
	'sanitize-html',
	'compare-versions',
	'@creditkarma/thrift-server-core',
] as const;
