/**
 * Static registry of all island components, built at compile time
 * via Vite's import.meta.glob.
 *
 * Each matched file becomes a lazy chunk (eager: false), exactly
 * matching the previous webpack behaviour where each island was
 * a separate dynamically-loaded chunk.
 *
 * Replaces the webpack magic comments in doHydration.tsx:
 *   import(
 *     /* webpackInclude: /\.island\.tsx$/ *​/
 *     /* webpackChunkName: "[request]" *​/
 *     `../../components/${name}.island`
 *   )
 */
const islandModules = import.meta.glob<Record<string, unknown>>(
	'../../components/*.island.tsx',
);

/**
 * Look up the lazy loader for an island component by name.
 *
 * @param name The component name (e.g. "ShareButton" for ShareButton.island.tsx)
 * @returns A function that returns a Promise of the module, or undefined if not found
 */
export const getIslandModule = (
	name: string,
): (() => Promise<Record<string, unknown>>) | undefined => {
	const key = `../../components/${name}.island.tsx`;
	return islandModules[key];
};
