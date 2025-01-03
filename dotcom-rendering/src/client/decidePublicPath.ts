/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (): string => {
	const isDev = process.env.NODE_ENV === 'development';
	const isLocalHost = window.location.hostname === 'localhost';
	const isPlaywright = process.env.PLAYWRIGHT === 'true';

	if (isPlaywright && isDev) {
		return `/assets/`;
	}

	if (isDev || isLocalHost) {
		return `http://localhost:3030/assets/`;
	}

	return `${window.guardian.config.frontendAssetsFullURL}assets/`;
};
