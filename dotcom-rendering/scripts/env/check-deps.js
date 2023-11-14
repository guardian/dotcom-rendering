const fs = require('node:fs');
const lockfile = require('@yarnpkg/lockfile');
const { warn, log } = require('../../../scripts/log');
const pkg = require('../../package.json');

if (pkg.devDependencies) {
	warn('Don’t use devDependencies');
	log('See https://github.com/guardian/dotcom-rendering/pull/4001');
	process.exit(1);
}

const { object: json } = lockfile.parse(
	fs.readFileSync('../yarn.lock', 'utf8'),
);

const knownNonSemver = /** @type {const} */ ([
	'https://github.com/guardian/babel-plugin-px-to-rem#v0.1.0',
]);

const mismatches = Object.entries(pkg.dependencies)
	.filter(([name, version]) => {
		const pinned = json[name + '@' + version]?.version;
		return version !== pinned;
	})
	.filter(([, version]) => !knownNonSemver.includes(version))
	.filter(([, version]) => !version.startsWith('file:.yalc'));

if (mismatches.length) warn('All dependencies should be pinned');
for (const [name, version] of mismatches) {
	warn(`You must fix: ${name}@${String(version)}`);
}

process.exit(mismatches.length === 0 ? 0 : 1);
