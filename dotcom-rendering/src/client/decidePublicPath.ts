/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (): string => {
	const isDev = process.env.NODE_ENV === 'development';
	const isCI = process.env.CI === 'true';
	// Use relative path if running locally or in CI
	return isDev || isCI
		? '/assets/'
		: `${window.guardian.config.frontendAssetsFullURL}assets/`;
};
