interface AssetHash {
	[key: string]: string;
}

let assetHash: AssetHash = {};
let assetHashLegacy: AssetHash = {};
let loadableManifest: AssetHash = {};

try {
	// path is relative to the server bundle
	// eslint-disable-next-line import/no-unresolved
	assetHash = require('./manifest.json');
	// eslint-disable-next-line import/no-unresolved
	assetHashLegacy = require('./manifest.legacy.json');
	console.log('Getting loadable manifest');
	// eslint-disable-next-line import/no-unresolved
	loadableManifest = require('./loadable-manifest-browser.json');
	console.log(loadableManifest);
} catch (e) {
	// do nothing
}

// TODO: this should be removed in favor of `frontendAssetsFullURL` defined in CAPI
// GU_STAGE is set in cloudformation.yml, so will be undefined locally
const stage =
	typeof process.env.GU_STAGE === 'string'
		? process.env.GU_STAGE.toUpperCase()
		: process.env.GU_STAGE;

export const CDN = stage
	? `//assets${stage === 'CODE' ? '-code' : ''}.guim.co.uk/`
	: '/';
export const loadableManifestJson = loadableManifest;
export const getDist = ({
	path,
	legacy,
}: {
	path: string;
	legacy: boolean;
}): string => {
	const selectedAssetHash = legacy ? assetHashLegacy : assetHash;
	return `${CDN}assets/${selectedAssetHash[path] || path}`;
};
