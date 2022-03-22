interface AssetHash {
	[key: string]: string;
}

let manifest: AssetHash = {};
let legacyManifest: AssetHash = {};

try {
	// path is relative to the server bundle
	// eslint-disable-next-line import/no-unresolved
	manifest = require('./manifest.json');
	legacyManifest = require('./manifest.legacy.json');
} catch (e) {
	// do nothing
}

/**
 * Decides the url to use for fetching assets
 *
 * @param stage {'PROD' | 'CODE' | undefined} the environment code is executing in
 * @returns
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

export const getScriptArrayFromFile = (
	file: string,
): { src: string; legacy?: boolean }[] => {
	const isDev = process.env.NODE_ENV === 'development';

	const filename = isDev ? file : manifest[file];
	const legacyFilename = isDev
		? file.replace('.js', '.legacy.js')
		: legacyManifest[file];

	const scripts = [];

	if (filename) {
		scripts.push({
			src: `${ASSET_ORIGIN}assets/${filename}`,
			legacy: false,
		});
	}
	if (legacyFilename) {
		scripts.push({
			src: `${ASSET_ORIGIN}assets/${legacyFilename}`,
			legacy: true,
		});
	}

	return scripts;
};
