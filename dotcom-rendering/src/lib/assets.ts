import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isObject, isString } from '@guardian/libs';
import { BUILD_VARIANT } from '../../webpack/bundles';
import { makeMemoizedFunction } from './memoize';

/**
 * A single entry in a Vite manifest.
 */
interface ViteManifestEntry {
	file: string;
	name?: string;
	src?: string;
	isEntry?: boolean;
	isDynamicEntry?: boolean;
	imports?: string[];
	dynamicImports?: string[];
}

/**
 * The full Vite manifest: keys are source paths or internal chunk IDs.
 */
interface ViteManifest {
	[key: string]: ViteManifestEntry;
}

export const BASE_URL_DEV = 'http://localhost:3030/';

export type AssetOrigin =
	| 'https://assets.guim.co.uk/'
	| 'https://assets-code.guim.co.uk/'
	| typeof BASE_URL_DEV
	| '/';

/**
 * Decides the url to use for fetching assets
 *
 * @param {'PROD' | 'CODE' | undefined} stage the environment code is executing in
 * @param {boolean} isDev whether the environment is development
 * @returns {AssetOrigin}
 */
export const decideAssetOrigin = (
	stage: string | undefined,
	isDev?: boolean,
): AssetOrigin => {
	if (isDev) {
		return BASE_URL_DEV;
	}
	switch (stage?.toUpperCase()) {
		case 'PROD':
			return 'https://assets.guim.co.uk/';
		case 'CODE':
			return 'https://assets-code.guim.co.uk/';
		default:
			return '/';
	}
};

const isDev = process.env.NODE_ENV === 'development';

export const ASSET_ORIGIN = decideAssetOrigin(process.env.GU_STAGE, isDev);

const isViteManifest = (manifest: unknown): manifest is ViteManifest =>
	isObject(manifest) &&
	Object.values(manifest).every(
		(entry) =>
			isObject(entry) && isString((entry as ViteManifestEntry).file),
	);

const getManifest = makeMemoizedFunction((path: string): ViteManifest => {
	try {
		const parsed: unknown = JSON.parse(
			readFileSync(resolve(__dirname, path), { encoding: 'utf-8' }),
		);
		if (!isViteManifest(parsed)) {
			throw new Error('Not a valid Vite manifest');
		}

		return parsed;
	} catch (e) {
		console.error('Could not load manifest in: ', path);
		console.error('Some filename lookups will fail');
		return {};
	}
});

export type Build =
	| 'client.apps'
	| 'client.web'
	| 'client.web.variant'
	| 'client.editionsCrossword';

type ManifestPath = `./manifest.${Build}.json`;

const getManifestPath = (build: Build): ManifestPath =>
	`./manifest.${build}.json`;

/**
 * Maps each build to its entry point source path in the Vite manifest.
 */
const entrySourcePaths: Record<Build, string> = {
	'client.web': 'src/client/main.web.ts',
	'client.web.variant': 'src/client/main.web.ts',
	'client.apps': 'src/client/main.apps.ts',
	'client.editionsCrossword': 'src/client/main.editionsCrossword.tsx',
};

/**
 * Finds a manifest entry by its `name` field.
 * Used for chunks like "frameworks" that aren't keyed by source path.
 */
const findEntryByName = (
	manifest: ViteManifest,
	name: string,
): ViteManifestEntry | undefined =>
	Object.values(manifest).find((entry) => entry.name === name);

export const getPathFromManifest = (
	build: Build,
	filename: `${string}.js`,
): string => {
	if (!filename.endsWith('.js')) {
		throw new Error('Invalid filename: extension must be .js');
	}

	if (isDev) {
		return `${ASSET_ORIGIN}assets/${filename.replace(
			'.js',
			`.${build}.js`,
		)}`;
	}

	const manifest = getManifest(getManifestPath(build));

	// Strip .js extension to get the logical name (e.g. "index", "frameworks")
	const logicalName = filename.replace(/\.js$/, '');

	let entry: ViteManifestEntry | undefined;

	if (logicalName === 'index') {
		// Look up the entry point by its source path
		const sourcePath = entrySourcePaths[build];
		entry = manifest[sourcePath];
	} else {
		// For non-entry chunks (e.g. "frameworks"), find by name
		entry = findEntryByName(manifest, logicalName);
	}

	if (!entry) {
		throw new Error(`Missing manifest for ${filename}`);
	}

	return `${ASSET_ORIGIN}assets/${entry.file}`;
};

/**
 * To ensure this only applies to guardian scripts,
 * we check that it is served from an asset/ directory
 * and that it ends with the bundle type and extension,
 * with an optional hash for local development
 * and stripped query parameters.
 */
const getScriptRegex = (build: Build) =>
	new RegExp(`assets\\/\\w+\\.${build}\\.(\\w{8}\\.)?js(\\?.*)?$`);

export const WEB = getScriptRegex('client.web');
export const WEB_VARIANT_SCRIPT = getScriptRegex('client.web.variant');
export const APPS_SCRIPT = getScriptRegex('client.apps');
export const EDITIONS_CROSSWORD_SCRIPT = getScriptRegex(
	'client.editionsCrossword',
);

export const generateScriptTags = (scripts: string[]): string[] =>
	scripts.filter(isString).map((script) => {
		if (
			script.match(WEB) ??
			script.match(WEB_VARIANT_SCRIPT) ??
			script.match(APPS_SCRIPT) ??
			script.match(EDITIONS_CROSSWORD_SCRIPT)
		) {
			return `<script type="module" src="${script}"></script>`;
		}

		return [
			'<!-- The following script does not vary between browsers that support modules and those that do not -->',
			`<script defer src="${script}"></script>`,
		].join('\n');
	});

export const getModulesBuild = (): Extract<Build, `client.web${string}`> => {
	if (BUILD_VARIANT) {
		return 'client.web.variant';
	}
	return 'client.web';
};
