import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface AssetHash {
	[key: string]: string;
}

/**
 * Decides the url to use for fetching assets
 *
 * @param {'PROD' | 'CODE' | undefined} stage the environment code is executing in
 * @returns {string}
 */
export const decideAssetOrigin = (
	stage: string | undefined,
	isDev: boolean,
): string => {
	switch (stage?.toUpperCase()) {
		case 'PROD':
			return 'https://assets.guim.co.uk/';
		case 'CODE':
			return 'https://assets-code.guim.co.uk/';
		default: {
			if (isDev) {
				// Use absolute asset paths in development mode
				// This is so paths are correct when treated as relative to Frontend
				return 'http://localhost:3030/';
			} else {
				return '/';
			}
		}
	}
};

const isDev = process.env.NODE_ENV === 'development';

export const ASSET_ORIGIN = decideAssetOrigin(process.env.GU_STAGE, isDev);

const getManifest = (path: string): AssetHash => {
	try {
		const assetHash: unknown = JSON.parse(
			readFileSync(resolve(__dirname, path), { encoding: 'utf-8' }),
		);
		if (typeof assetHash != 'object' || assetHash === null)
			throw new Error('Not a valid AssetHash type');

		/** @TODO validate the object */
		return assetHash as AssetHash;
	} catch (e) {
		console.error('Could not load manifest in: ', path);
		console.error('Some filename lookups will fail');
		return {};
	}
};

export const getScriptArrayFromFile = (
	file: `${string}.js`,
	manifestPath: `./manifest${string}.json`,
): { src: string; legacy?: boolean }[] => {
	if (!file.endsWith('.js'))
		throw new Error('Invalid filename: extension must be .js');

	const [manifest, legacyManifest] = [
		manifestPath,
		'./manifest.legacy.json',
	].map(getManifest);

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
