interface AssetHash {
	[key: string]: string;
}

let manifest: AssetHash = {};

try {
	// path is relative to the server bundle
	// eslint-disable-next-line import/no-unresolved
	manifest = require('./manifest.json');
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

export const getScriptNameFromFilename = (
	filename: string,
): string | undefined => {
	const path = `./dist/${filename}.js`;
	// const name = manifest[path]
	return manifest[path];
	// if (name)
};

export const getScriptArrayFromChunkName = (
	chunkName: string,
): { src: string; legacy?: boolean }[] => {
	const filename = getScriptNameFromFilename(chunkName);
	const legacyFilename = getScriptNameFromFilename(`${chunkName}.legacy`);

	const scripts = [];

	if (filename)
		scripts.push({
			src: `${ASSET_ORIGIN}assets/${filename}`,
			legacy: false,
		});
	if (legacyFilename)
		scripts.push({
			src: `${ASSET_ORIGIN}assets/${legacyFilename}`,
			legacy: true,
		});

	return scripts;
};
