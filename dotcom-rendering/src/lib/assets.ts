import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isObject, isString } from '@guardian/libs';

interface AssetHash {
	[key: string]: { file: string; src: string };
}

const __dirname = fileURLToPath(import.meta.url);

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

export const ASSET_ORIGIN = decideAssetOrigin(
	process.env.GU_STAGE,
	process.env.NODE_ENV !== 'production',
);

const isAssetHash = (manifest: unknown): manifest is AssetHash =>
	isObject(manifest) &&
	Object.entries(manifest).every(
		([key, value]) =>
			isString(key) && isObject(value) && isString(value.file),
	);

const getManifest = (path: string): AssetHash => {
	try {
		const filepath = resolve(__dirname, path);

		const assetHash: unknown = JSON.parse(
			readFileSync(filepath, { encoding: 'utf-8' }),
		);

		if (!isAssetHash(assetHash)) {
			console.error('Not a valid AssetHash type for file:', path);
			return {};
		}

		return assetHash;
	} catch (e) {
		console.log(__dirname);
		console.error('Could not load manifest in: ', path);
		console.error('Some filename lookups will fail');
		return {};
	}
};

const getManifestPaths = (manifest: 'control' | 'variant') =>
	manifest === 'control'
		? '../../client/manifest.json'
		: '../../client/manifest.variant.json';

type ManifestPath = ReturnType<typeof getManifestPaths>;

const getScripts = (
	manifestPath: ManifestPath,
	file: `${string}.js`,
	isDev: boolean,
) => {
	if (!file.endsWith('.js'))
		throw new Error('Invalid filename: extension must be .js');

	const filepath = `src/web/browser/${file.replace('.js', '/init.ts')}`;

	if (isDev) {
		return `/${filepath}`;
	}

	const manifest = getManifest(manifestPath);

	return `${ASSET_ORIGIN}assets/${manifest[filepath].file}`;
};

/**
 * A curried function that takes an array of manifests.
 *
 * The returned function takes a script name and returns
 * an array of scripts found in the manifests.
 */
export const getScriptsFromManifest =
	(shouldServeVariantBundle: boolean, isDev: boolean) =>
	(file: `${string}.js`): ReturnType<typeof getScripts> =>
		getScripts(
			getManifestPaths(shouldServeVariantBundle ? 'variant' : 'control'),
			file,
			isDev,
		);

/** To ensure this only applies to guardian scripts,
 * we check that it is served from a asset/ directory
 * and that it ends with the bundle type and extension,
 * with an optional hash for local development
 * and stripped query parameters.
 */
const getScriptRegex = (bundle: 'modern' | 'legacy' | 'variant') =>
	new RegExp(`assets\\/\\w+\\.${bundle}\\.(\\w{20}\\.)?js(\\?.*)?$`);

export const LEGACY_SCRIPT = /-legacy\.ts$/;
export const MODERN_SCRIPT = /(\/assets\/assets\/|\.ts$)/;
export const VARIANT_SCRIPT = getScriptRegex('variant');

export const generateScriptTags = (scripts: Array<string | false>): string[] =>
	scripts.filter(isString).map((script) => {
		if (script.match(LEGACY_SCRIPT)) {
			// console.log('found legacy script', script);
			return `<script defer nomodule src="${script}"></script>`;
		}
		if (script.match(MODERN_SCRIPT)) {
			// console.log('found modern script', script);
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
