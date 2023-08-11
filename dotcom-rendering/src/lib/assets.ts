import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
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
		console.error('Could not load manifest in: ', __dirname, path);
		console.error('Some filename lookups will fail');
		return {};
	}
};

type Build = 'apps' | 'modern' | 'variant' | 'legacy';

type ManifestPath = `../${Build}/manifest.${Build}.json`;

const getManifestPath = (build: Build): ManifestPath =>
	`../${build}/manifest.${build}.json`;

export const getPathFromManifest = (
	build: Build,
	filename: `${string}.js`,
): string => {
	if (!filename.endsWith('.js'))
		throw new Error('Invalid filename: extension must be .js');

	if (isDev) {
		return `${ASSET_ORIGIN}assets/${filename.replace(
			'.js',
			`.${build}.js`,
		)}`;
	}

	const manifest = getManifest(getManifestPath(build));
	const filenameFromManifest = manifest[filename];

	if (!filenameFromManifest) {
		throw new Error(`Missing manifest for ${filename}`);
	}

	return `${ASSET_ORIGIN}assets/${build}/${filenameFromManifest}`;
};

/**
 * To ensure this only applies to guardian scripts,
 * we check that it is served from an asset/ directory
 * and that it ends with the bundle type and extension,
 * with an optional hash for local development
 * and stripped query parameters.
 */
const getScriptRegex = (build: Build) =>
	new RegExp(`assets\\/\\w+\\.${build}\\.(\\w{20}\\.)?js(\\?.*)?$`);

export const LEGACY_SCRIPT = getScriptRegex('legacy');
export const MODERN_SCRIPT = getScriptRegex('modern');
export const VARIANT_SCRIPT = getScriptRegex('variant');
export const APPS_SCRIPT = getScriptRegex('apps');

export const generateScriptTags = (
	scripts: Array<string | undefined>,
): string[] =>
	scripts.filter(isString).map((script) => {
		if (script.match(LEGACY_SCRIPT)) {
			return `<script defer nomodule src="${script}"></script>`;
		}
		if (
			script.match(MODERN_SCRIPT) ||
			script.match(VARIANT_SCRIPT) ||
			script.match(APPS_SCRIPT)
		) {
			return `<script type="module" src="${script}"></script>`;
		}

		return [
			'<!-- The following script does not vary between modern & legacy browsers -->',
			`<script defer src="${script}"></script>`,
		].join('\n');
	});
