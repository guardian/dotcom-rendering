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
