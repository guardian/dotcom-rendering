/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
const getAssetOriginFromPage = (): string | undefined => {
	const rawConfig = document.getElementById('config')?.textContent;
	if (rawConfig === undefined || rawConfig === null) return undefined;

	try {
		const config: unknown = JSON.parse(rawConfig);
		if (
			typeof config === 'object' &&
			config !== null &&
			'assetOrigin' in config &&
			typeof config.assetOrigin === 'string'
		) {
			return config.assetOrigin.endsWith('/')
				? config.assetOrigin
				: `${config.assetOrigin}/`;
		}
	} catch {
		return undefined;
	}

	return undefined;
};

/**
 * Determine the path that webpack should use as base for dynamic imports
 *
 * @returns The webpack public path to use
 */
export const decidePublicPath = (): string => {
	const assetOrigin = getAssetOriginFromPage();
	if (assetOrigin !== undefined) return `${assetOrigin}assets/`;

	const isDev = process.env.NODE_ENV === 'development';
	const isLocalHost = window.location.hostname === 'localhost';
	// Use relative path if running locally or in CI
	return isDev || isLocalHost
		? '/assets/'
		: `${window.guardian.config.frontendAssetsFullURL}assets/`;
};
