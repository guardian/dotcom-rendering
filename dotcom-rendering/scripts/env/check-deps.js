const semver = require('semver');
const { warn, log } = require('../../../scripts/log');
const pkg = require('../../package.json');

if (pkg.devDependencies) {
	warn('Don’t use devDependencies');
	log('See https://github.com/guardian/dotcom-rendering/pull/4001');
	process.exit(1);
}

/**
 * We don't check packages that are not semver-compatible
 */
const exceptions = /** @type {const} */ ([
	'https://github.com/guardian/babel-plugin-px-to-rem#v0.1.0',
]);

const mismatches = Object.entries(pkg.dependencies)
	.filter(([, version]) => !exceptions.includes(version))
	.filter(([, version]) => !semver.valid(version));

if (mismatches.length !== 0) {
	warn('dotcom-rendering dependencies should be pinned.');

	for (const [name, version] of mismatches) {
		warn(`Please fix: ${name}@${String(version)}`);
	}

	process.exit(1);
}
