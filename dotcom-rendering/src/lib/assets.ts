interface AssetHash {
	[key: string]: string;
}

let manifest: AssetHash = {};

try {
	// path is relative to the server bundle

	// eslint-disable-next-line global-require -- this may fail
	manifest = require('./manifest.json');
} catch (e) {
	// do nothing
}

/**
 * Decides the url to use for fetching assets
 *
 * @param {'PROD' | 'CODE' | undefined} stage the environment code is executing in
 * @returns {string}
 */
const decideAssetOrigin = (stage: string | undefined): string => {
	switch (stage?.toUpperCase()) {
		case 'PROD':
			return 'https://assets.guim.co.uk/';
		case 'CODE':
			return 'https://assets-code.guim.co.uk/';
		default:
			return '/';
	}
};
export const ASSET_ORIGIN = decideAssetOrigin(process.env.GU_STAGE);

export const getScriptFromFile = (file: `${string}.js`): string => {
	if (!file.endsWith('.js'))
		throw new Error('Invalid filename: extension must be .js');

	const isDev = process.env.NODE_ENV === 'development';

	const filename = isDev ? file : manifest[file];

	if (!filename) throw new Error(`Could not find filename: ${file}`);

	return `${ASSET_ORIGIN}assets/${filename}`;
};
