/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (): string => {
	const isDev = process.env.NODE_ENV === 'development';
	return isDev
		? '/assets/'
		: `${window.guardian.config.frontendAssetsFullURL}assets/`;
};
