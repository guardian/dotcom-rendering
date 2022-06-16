/* eslint-disable @typescript-eslint/no-floating-promises */
// This file contains some checks that the building and bundling
// is working correctly. It checks the following:
// 1. That the manifest files are output
// 2. That the manifest files contain at least the entry points under the expected property

const find = require('find');
const loadJsonFile = require('load-json-file');

const errorAndThrow = (error) => {
	console.error(error);
	throw new Error(error);
};

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
	await fileExists('manifest.json');

	// Check that the manifest files return values for all the chunks
	const manifest = await loadJsonFile('./dist/manifest.json');

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
	].map((name) => {
		if (manifest[name]) {
			console.log(`Manifest returned value ${name}`);
		} else {
			errorAndThrow(`Manifest did not return a value for ${name}`);
		}
	});
})();
