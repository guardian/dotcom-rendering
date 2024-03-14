const semver = require('semver');
const { warn, log } = require('../../../scripts/log');
const pkg = require('../../package.json');

if (pkg.devDependencies) {
	warn('Don’t use devDependencies');
	log('See https://github.com/guardian/dotcom-rendering/pull/4001');
	process.exit(1);
}

const mismatches = Object.entries(pkg.dependencies).filter(
	([, version]) => !semver.valid(version),
);

if (mismatches.length !== 0) {
	warn('dotcom-rendering dependencies should be pinned.');

	for (const [name, version] of mismatches) {
		warn(`Please fix: ${name}@${String(version)}`);
	}

	process.exit(1);
}
