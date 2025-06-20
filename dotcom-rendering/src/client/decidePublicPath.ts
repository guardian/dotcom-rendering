/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (): string => {
	const isDev = process.env.NODE_ENV === 'development';
	const isDevHost = ['localhost', 'r.thegulocal.com'].includes(
		window.location.hostname,
	);
	// Use relative path if running locally or in CI
	return isDev || isDevHost
		? '/assets/'
		: `${window.guardian.config.frontendAssetsFullURL}assets/`;
};
