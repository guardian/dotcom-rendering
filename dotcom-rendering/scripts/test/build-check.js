/* eslint-disable @typescript-eslint/no-floating-promises */
// This file contains some checks that the building and bundling
// is working correctly
// It checks the following:
// 1. That the manifest files are output
// 2. That the manifest files contain at least the entry points under the expected property

const { readFile } = require('node:fs').promises;
const find = require('find');
const { BUILD_VARIANT } = require('../../webpack/bundles');

/**
 * Loads a JSON file.
 * Inspired by https://github.com/sindresorhus/load-json-file/blob/de8256b9010db73c75a1e2036ff96025e94c0b6e/index.js#L6
 * @param {string} filePath The path to the JSON file.
 * @returns {Promise<Object>} The parsed JSON object.
 */
async function loadJsonFile(filePath) {
	const buffer = await readFile(filePath);
	// Unlike `buffer.toString()` and `fs.readFile(path, 'utf8')`, `TextDecoder` will remove BOM.
	return JSON.parse(new TextDecoder().decode(buffer));
}

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
	if (BUILD_VARIANT) await fileExists('manifest.client.web.variant.json');

	// Check that the manifest files return values for all the chunks
	const manifests = [await loadJsonFile('./dist/manifest.client.web.json')];
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
