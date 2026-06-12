/*
This is a patch found at: https://github.com/jsdom/jsdom/issues/3951

When jsdom upgraded to v27.0.0 they stopped inlining a default-stylesheet.css file
and instead started loading it from another directory. We do not have access to 
that directory on the server so this patch replaces the "loading" code with the
contents of the css file.
*/

const fs = require('fs');
const path = require('path');

module.exports = function (src) {
	const defaultCSSPath = path.join(
		path.dirname(this.resourcePath),
		'../../browser/default-stylesheet.css',
	);

	const defaultCSS = fs.readFileSync(defaultCSSPath, 'utf-8');

	// inline the contents of the css file into the bundled file
	return src.replace(
		/const defaultStyleSheet[^;]*/,
		`const defaultStyleSheet = ${JSON.stringify(defaultCSS)}`,
	);
};
