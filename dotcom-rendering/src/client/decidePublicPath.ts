/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (): string => {
	const isDev = process.env.NODE_ENV === 'development';
	const isLocalHost = window.location.hostname === 'localhost';
	if (isDev || isLocalHost) {
		return 'http://localhost:3030/assets/';
	} else if (
		window.location.hostname === (process.env.HOSTNAME ?? 'localhost')
	) {
		return '/assets/';
	} else {
		return `${window.guardian.config.frontendAssetsFullURL}assets/`;
	}
};
