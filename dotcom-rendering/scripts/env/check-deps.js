const pkg = require('../../package.json');

if (pkg.devDependencies) {
	const { warn, log } = require('./log');

	warn('Don’t use devDependencies');
	log('See https://github.com/guardian/dotcom-rendering/pull/4001');
	process.exit(1);
}
