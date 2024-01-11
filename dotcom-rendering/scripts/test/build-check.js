/* eslint-disable @typescript-eslint/no-floating-promises */
// This file contains some checks that the building and bundling
// is working correctly between modern and legacy scripts.
// It checks the following:
// 1. That the manifest files are output
// 2. That the manifest files contain at least the entry points under the expected property

const find = require('find');
const loadJsonFile = require('load-json-file');
const { BUILD_VARIANT } = require('../../webpack/bundles');

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
	await fileExists('manifest.client.web.json');
	await fileExists('manifest.client.web.legacy.json');
	if (BUILD_VARIANT) await fileExists('manifest.client.web.variant.json');

	// Check that the manifest files return values for all the chunks
	const manifests = [
		await loadJsonFile('./dist/manifest.client.web.json'),
		await loadJsonFile('./dist/manifest.client.web.legacy.json'),
	];
	if (BUILD_VARIANT) {
		manifests.push(
			await loadJsonFile('./dist/manifest.client.web.variant.json'),
		);
	}

	for (const manifest of manifests) {
		if (manifest['index.js']) {
			console.log(`A manifest has an index file`);
		} else {
			errorAndThrow(`A manifest did not have an index file`);
		}
	}
})();
