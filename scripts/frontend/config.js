const { resolve } = require('path');

const root = resolve(__dirname, '..', '..');
const dist = resolve(root, 'dist');
const target = resolve(root, 'target');
const statik = resolve(root, 'src', 'static');

const siteName = 'frontend';

// Override the default port using the PORT environment variable, for local
// development and integration testing.
// Don't override this if you intend to deploy the resulting build to PROD!
const port = process.env.PORT || 9000;

module.exports = {
	dist,
	root,
	target,
	siteName,
	statik,
	port,
};
