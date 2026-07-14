// This file contains some checks that the building and bundling
// is working correctly
// It checks the following:
// 1. That the manifest files are output
// 2. That the manifest files contain at least the entry points under the expected property

const { access, readFile } = require('node:fs').promises;
const { BUILD_VARIANT } = require('../../webpack/bundles.ts');

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

/** @type {(filePath: string) => Promise<void>} */
const fileExists = async (filePath) => {
	try {
		await access(filePath);
		console.log(`${filePath} exists`);
	} catch {
		errorAndThrow(`${filePath} does not exist`);
	}
};

(async () => {
	// Check that the manifest files return values for all the chunks
	const manifestFiles = [
		'./dist/manifest.client.web.json',
		'./dist/manifest.client.apps.json',
		'./dist/manifest.client.editionsCrossword.json',
	];
	if (BUILD_VARIANT) {
		manifestFiles.push('./dist/manifest.client.web.variant.json');
	}

	// Check that the manifest files exist
	for (const file of manifestFiles) {
		await fileExists(file);
	}

	// Check that the manifest files contain an entry for the index chunk
	const manifests = await Promise.all(
		manifestFiles.map(async (file) => ({
			file,
			data: await loadJsonFile(file),
		})),
	);

	for (const { file, data } of manifests) {
		if (Object.values(data).some((entry) => entry.name === 'index')) {
			console.log(`${file} has an index entry`);
		} else {
			errorAndThrow(`${file} did not have an index entry`);
		}
	}
})();
