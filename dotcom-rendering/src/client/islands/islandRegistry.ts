/**
 * Static registry of all island components, built at compile time
 * via Vite's import.meta.glob.
 *
 * Each matched file becomes a lazy chunk (eager: false), so each
 * island is a separate dynamically-loaded chunk.
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
