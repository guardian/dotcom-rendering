/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (
	hostname: string = window.location.hostname,
): string => {
	const isDev = process.env.NODE_ENV === 'development';
	const isLocalHost = hostname === 'localhost';
	// Use relative path if running locally or in CI
	return isDev || isLocalHost
		? '/assets/'
		: `${window.guardian.config.frontendAssetsFullURL}assets/`;
};
