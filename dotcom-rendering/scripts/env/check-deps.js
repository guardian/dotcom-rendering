import { readFileSync } from 'node:fs';
import lockfile from '@yarnpkg/lockfile';
import { log, warn } from './log.js';

/** @type {Record<string, Record<string, string>>} */
const { devDependencies, dependencies } = JSON.parse(
	readFileSync('./package.json', 'utf8'),
);

if (devDependencies) {
	warn('Don’t use devDependencies');
	log('See https://github.com/guardian/dotcom-rendering/pull/4001');
	process.exit(1);
}

const { object: json } = lockfile.parse(readFileSync('../yarn.lock', 'utf8'));

const knownNonSemver = /** @type {const} */ ([
	'https://github.com/guardian/babel-plugin-px-to-rem#v0.1.0',
	'npm:ophan-tracker-js@2.0.0-beta-5',
]);

const mismatches = Object.entries(dependencies)
	.filter(([name, version]) => {
		const pinned = json[name + '@' + version]?.version;
		return version !== pinned;
	})
	.filter(([, version]) => !knownNonSemver.includes(version));

if (mismatches.length) warn('All dependencies should be pinned');
for (const [name, version] of mismatches) {
	warn(`You must fix: ${name}@${String(version)}`);
}

process.exit(mismatches.length === 0 ? 0 : 1);
