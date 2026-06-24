/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (): string => {
	const useLocalAssets = process.env.USE_LOCAL_ASSETS === 'true';

	return useLocalAssets
		? '/assets/'
		: `${window.guardian.config.frontendAssetsFullURL}assets/`;
};
