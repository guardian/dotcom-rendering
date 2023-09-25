import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { isObject, isString } from '@guardian/libs';
import {
	adaptive,
	BUILD_VARIANT,
	dcrJavascriptBundle,
	ophanEsm,
} from '../../scripts/webpack/bundles';
import type { ServerSideTests, Switches } from '../types/config';
import { makeMemoizedFunction } from './memoize';

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

const getManifest = makeMemoizedFunction((build: Build): AssetHash => {
	try {
		// `cwd()` gets the current working directory,
		// which should be the parent of the `dist` folder.
		// this is inherently brittle, but so was the use of __dirname
		// a purely functional approach would pass the manifest as arguments to starting the server
		const path = join(cwd(), 'dist', `manifest.${build}.json`);
		const assetHash: unknown = JSON.parse(
			readFileSync(path, { encoding: 'utf-8' }),
		);
		if (!isAssetHash(assetHash)) {
			throw new Error('Not a valid AssetHash type');
		}

		return assetHash;
	} catch (e) {
		console.error('Could not load manifest for', build);
		console.error('Some filename lookups will fail');
		throw e;
	}
});

export type Build =
	| 'apps'
	| 'web'
	| 'web.variant'
	| 'web.ophan-esm'
	| 'web.scheduled'
	| 'web.legacy';

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

	const manifest = getManifest(build);
	const filenameFromManifest = manifest[filename];

	if (!filenameFromManifest) {
		throw new Error(`Missing manifest for ${filename}`);
	}

	return `${ASSET_ORIGIN}assets/${filenameFromManifest}`;
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

export const WEB = getScriptRegex('web');
export const WEB_VARIANT_SCRIPT = getScriptRegex('web.variant');
export const WEB_LEGACY_SCRIPT = getScriptRegex('web.legacy');
export const WEB_SCHEDULED_SCRIPT = getScriptRegex('web.scheduled');
export const APPS_SCRIPT = getScriptRegex('apps');

export const generateScriptTags = (scripts: string[]): string[] =>
	scripts.filter(isString).map((script) => {
		if (script.match(WEB_LEGACY_SCRIPT)) {
			return `<script defer nomodule src="${script}"></script>`;
		}
		if (
			script.match(WEB) ||
			script.match(WEB_VARIANT_SCRIPT) ||
			script.match(APPS_SCRIPT)
		) {
			return `<script type="module" src="${script}"></script>`;
		}

		return [
			'<!-- The following script does not vary between browsers that support modules and those that do not -->',
			`<script defer src="${script}"></script>`,
		].join('\n');
	});

export const getModulesBuild = ({
	tests,
	switches,
}: {
	tests: ServerSideTests;
	switches: Switches;
}): Exclude<Extract<Build, `web${string}`>, 'web.legacy'> => {
	if (BUILD_VARIANT && tests[dcrJavascriptBundle('Variant')] === 'variant') {
		return 'web.variant';
	}
	if (tests[ophanEsm('Variant')] === 'variant') {
		return 'web.ophan-esm';
	}
	if (switches.scheduler || tests[adaptive('Variant')] === 'variant') {
		return 'web.scheduled';
	}
	return 'web';
};
