// This file contains some checks that the building and bundling
// is working correctly between modern and legacy scripts.
// It checks the following:
// 1. That there is a react and react.legacy file output in dist
// 2. That the manifest files are output
// 3. That the manifest files contain at least the entry points under the expected property
// 4. That the javascript bundles are transpiling to the correct levels

const fs = require('fs');
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
	// Check that there is a `react` and `react.legacy` in dist folder.
	await fileExists(/react\.(?!legacy).*\.js$/);
	await fileExists(/react\.legacy.*\.js$/);

	// Check that the manifest files exist
	await fileExists('manifest.json');
	await fileExists('manifest.legacy.json');

	// Check that the manifest files return values for all the chunks
	const manifest = await loadJsonFile('./dist/manifest.json');
	const legacyManifest = await loadJsonFile('./dist/manifest.legacy.json');

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

		if (legacyManifest[name]) {
			console.log(`Legacy manifest returned value ${name}`);
		} else {
			errorAndThrow(
				`Legacy Loadabl manifest did not return a value for ${name}`,
			);
		}
	});

	// Check that the react bundles are transpiling
	// Simply check that each of the react bundles have or do not have
	// an async e (as in async await) code as modern bundle doesn't transpile this
	// Brittle, but it works...

	const readReact = new Promise((resolve, reject) => {
		find.file(/react\.(?!legacy).*\.js$/, `./dist/`, (files) => {
			resolve(files[0]);
		});
	});

	const readReactLegacy = new Promise((resolve, reject) => {
		find.file(/react\.legacy.*\.js$/, `./dist/`, (files) => {
			resolve(files[0]);
		});
	});

	await readReact
		.then((path) => fs.promises.readFile(path, 'utf8'))
		.then((fileContents) => {
			if (fileContents.includes('async e')) {
				console.log('Modern bundle contains async e string');
			} else {
				errorAndThrow(`Modern bundle does not contain async e string`);
			}
		});

	await readReactLegacy
		.then((path) => fs.promises.readFile(path, 'utf8'))
		.then((fileContents) => {
			if (!fileContents.includes('async e')) {
				console.log('Legacy bundle does not contain async e string');
			} else {
				errorAndThrow(`Legacy bundle contains async e string`);
			}
		});
})();
