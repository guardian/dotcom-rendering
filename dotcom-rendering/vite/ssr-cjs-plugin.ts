/**
 * Vite plugin that wraps CJS packages for SSR compatibility.
 *
 * Vite 6's SSR module runner evaluates all modules as ESM,
 * which breaks CJS packages that use `require()` or `module.exports`.
 * This plugin wraps specified CJS packages with ESM wrappers
 * using createRequire().
 *
 * Only works for packages in ssr.noExternal (Vite skips plugin
 * hooks for external packages).
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import type { Plugin } from 'vite';

const nodeRequire = createRequire(pathToFileURL(__filename).href);

/**
 * Creates a Vite plugin that wraps specified CJS packages
 * for Vite 6's ESM-based SSR module runner.
 *
 * @param packages - Package names or prefixes to wrap (e.g. '@guardian/bridget')
 */
export function ssrCjsPlugin(packages: string[]): Plugin {
	const PREFIX = '\0cjs-compat:';

	function shouldWrap(id: string): boolean {
		if (
			id.startsWith('.') ||
			id.startsWith('/') ||
			id.startsWith('node:')
		) {
			return false;
		}
		return packages.some((p) => id === p || id.startsWith(p + '/'));
	}

	return {
		name: 'ssr-cjs-compat',
		enforce: 'pre',
		resolveId(id) {
			if (shouldWrap(id)) {
				return PREFIX + id;
			}
			return undefined;
		},
		load(id) {
			if (!id.startsWith(PREFIX)) return;
			const pkg = id.slice(PREFIX.length);

			// Introspect the CJS package's exports
			let exportNames: string[] = [];
			try {
				const mod = nodeRequire(pkg) as Record<string, unknown>;
				exportNames = Object.keys(mod).filter(
					(k) =>
						k !== 'default' &&
						k !== '__esModule' &&
						/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k),
				);
			} catch {
				// If require fails, just provide a default export
			}

			// Generate an ESM module that re-exports CJS members
			const lines = [
				`import { createRequire } from 'node:module';`,
				`const __require = createRequire(import.meta.url);`,
				`const mod = __require('${pkg}');`,
				`export default mod;`,
				...exportNames.map(
					(name) => `export const ${name} = mod['${name}'];`,
				),
			];

			return lines.join('\n');
		},
	};
}
