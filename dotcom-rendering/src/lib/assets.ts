import { readFileSync } from 'fs';
import { resolve } from 'path';
import { isObject, isString } from '@guardian/libs';

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

const isAssetHash = (manifest: unknown): manifest is AssetHash =>
	isObject(manifest) &&
	Object.entries(manifest).every(
		([key, value]) => isString(key) && isString(value),
	);

const getManifest = (path: string): AssetHash => {
	try {
		const assetHash: unknown = JSON.parse(
			readFileSync(resolve(__dirname, path), { encoding: 'utf-8' }),
		);
		if (!isAssetHash(assetHash))
			throw new Error('Not a valid AssetHash type');

		return assetHash;
	} catch (e) {
		console.error('Could not load manifest in: ', path);
		console.error('Some filename lookups will fail');
		return {};
	}
};

const getManifestPaths = (
	manifests: 'control' | 'variant',
): [ManifestPath, ManifestPath] =>
	manifests === 'variant'
		? ['./manifest.variant.json', './manifest.legacy.json']
		: ['./manifest.modern.json', './manifest.legacy.json'];

type ManifestPath = `./manifest.${string}.json`;

const getScripts = (
	manifestPaths: Array<ManifestPath>,
	file: `${string}.js`,
): string[] => {
	if (!file.endsWith('.js'))
		throw new Error('Invalid filename: extension must be .js');

	if (isDev) {
		return [
			`${ASSET_ORIGIN}assets/${file.replace('.js', '.modern.js')}`,
			`${ASSET_ORIGIN}assets/${file.replace('.js', '.legacy.js')}`,
		];
	}

	return manifestPaths.map((manifestPath) => {
		const manifest = getManifest(manifestPath);
		const filename = manifest[file];

		if (!filename) {
			throw new Error(`Missing manifest for ${file}`);
		}

		return `${ASSET_ORIGIN}assets/${filename}`;
	});
};

/**
 * A curried function that takes an array of manifests.
 *
 * The returned function takes a script name and returns
 * an array of scripts found in the manifests.
 */
export const getScriptsFromManifest =
	(shouldServeVariantBundle: boolean) =>
	(file: `${string}.js`): ReturnType<typeof getScripts> =>
		getScripts(
			getManifestPaths(shouldServeVariantBundle ? 'variant' : 'control'),
			file,
		);

/** To ensure this only applies to guardian scripts,
 * we check that it is served from a asset/ directory
 * and that it ends with the bundle type and extension,
 * with an optional hash for local development
 * and stripped query parameters.
 */
const getScriptRegex = (bundle: 'modern' | 'legacy' | 'variant') =>
	new RegExp(`assets\\/\\w+\\.${bundle}\\.(\\w{20}\\.)?js(\\?.*)?$`);

export const LEGACY_SCRIPT = getScriptRegex('legacy');
export const MODERN_SCRIPT = getScriptRegex('modern');
export const VARIANT_SCRIPT = getScriptRegex('variant');

export const generateScriptTags = (scripts: Array<string | false>): string[] =>
	scripts.filter(isString).map((script) => {
		if (script.match(LEGACY_SCRIPT)) {
			return `<script defer nomodule src="${script}"></script>`;
		}
		if (script.match(MODERN_SCRIPT)) {
			return `<script type="module" src="${script}"></script>`;
		}
		if (script.match(VARIANT_SCRIPT)) {
			return `<script type="module" src="${script}"></script>`;
		}

		return [
			'<!-- The following script does not vary between modern & legacy browsers -->',
			`<script defer src="${script}"></script>`,
		].join('\n');
	});
