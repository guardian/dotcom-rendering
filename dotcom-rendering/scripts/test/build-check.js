/* eslint-disable @typescript-eslint/no-floating-promises */
// This file contains some checks that the building and bundling
// is working correctly between modern and legacy scripts.
// It checks the following:
// 1. That the manifest files are output
// 2. That the manifest files contain at least the entry points under the expected property

const find = require('find');
const loadJsonFile = require('load-json-file');
const { BUILD_VARIANT } = require('../webpack/bundles');

const errorAndThrow = (error) => {
	console.error(error);
	throw new Error(error);
};

/** @type {(glob: string) => Promise<void>} */
const fileExists = async (glob) => {
	await find.file(glob, `./dist/`, (files) => {
		if (files.length === 1) {
			console.log(`${glob} exists`);
		} else {
			errorAndThrow(`${glob} does not exist`);
		}
	});
};

(async () => {
	// Check that the manifest files exist
	await fileExists('manifest.modern.json');
	await fileExists('manifest.legacy.json');
	if (BUILD_VARIANT) await fileExists('manifest.variant.json');

	// Check that the manifest files return values for all the chunks
	const manifests = [
		await loadJsonFile('./dist/manifest.modern.json'),
		await loadJsonFile('./dist/manifest.legacy.json'),
	];
	if (BUILD_VARIANT) {
		manifests.push(await loadJsonFile('./dist/manifest.variant.json'));
	}

	[
		'sentryLoader.js',
		'bootCmp.js',
		'ga.js',
		'ophan.js',
		'islands.js',
		'dynamicImport.js',
		'atomIframe.js',
		'embedIframe.js',
		'newsletterEmbedIframe.js',
		'relativeTime.js',
		'initDiscussion.js',
	].forEach((name) => {
		for (const manifest of manifests) {
			if (manifest[name]) {
				console.log(`A manifest returned value ${name}`);
			} else {
				errorAndThrow(`A manifest did not return a value for ${name}`);
			}
		}
	});
})();
