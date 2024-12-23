/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (): string => {
	const isDev = process.env.NODE_ENV === 'development';
	const isLocalHost = window.location.hostname === 'localhost';

	if (isLocalHost) {
		return 'http://localhost:3030/assets/';
	}

	if (isDev) {
		return '/assets/';
	}

	return `${window.guardian.config.frontendAssetsFullURL}assets/`;
};
