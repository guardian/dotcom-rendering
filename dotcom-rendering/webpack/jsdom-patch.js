/*
This is a patch found at: https://github.com/jsdom/jsdom/issues/3951

When jsdom upgraded to v27.0.0 they removed a default-stylesheet.css file from
the bundle and instead started loading it from another directory. That directory
is not bundled so we do not have access to that directory on the server so this 
patch replaces the "loading" code with the contents of the css file.

Currently the loading of default-stylesheet.css happens in:

node_modules/jsdom/lib/jsdom/living/css/helpers/computed-style.js

and the default-stylesheet.css file is found in:

node_modules/jsdom/lib/jsdom/browser/default-stylesheet.css
*/

const fs = require('fs');

module.exports = function (src) {
	// when jsdom is updated this might be in a different relative directory
	const defaultCSSPath =
		'node_modules/jsdom/lib/jsdom/browser/default-stylesheet.css';

	const defaultCSS = fs.readFileSync(defaultCSSPath, 'utf-8');

	const regexToFindCodeToReplace = /const defaultStyleSheet[^;]*/;

	if (!regexToFindCodeToReplace.test(src)) {
		throw new Error(
			"jsdom patch failed: couldn't find a reference to defaultStyleSheet",
		);
	}

	return src.replace(
		regexToFindCodeToReplace,
		`const defaultStyleSheet = ${JSON.stringify(defaultCSS)}`,
	);
};
