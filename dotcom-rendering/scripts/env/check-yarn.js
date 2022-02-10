import { promisify } from 'util';
import { execFile } from 'child_process';
import semver from 'semver';

// eslint-disable-next-line import/extensions
import { warn, prompt, log } from './log.js';

const exec = promisify(execFile);

// Yarn v1.x support .yarnrc, so we can use a local (check-in) copy of yarn
const YARN_MIN_VERSION = '1.x';

try {
	// This will fail if yarn isn't installed, and force into the catch,
	// where we install yarn with NPM (mainly for CI)
	const { stdout: version } = await exec('yarn', ['--version']);

	if (!semver.satisfies(version, YARN_MIN_VERSION)) {
		warn(
			`dotcom-rendering requires Yarn >=${YARN_MIN_VERSION}`,
			`You are using v${version}`,
		);
		prompt('Please upgrade yarn');
		log('https://classic.yarnpkg.com/en/docs/install');

		process.exit(1);
	}
} catch (e) {
	log(`Installing yarn`);
	await exec('npm', ['i', '-g', `yarn@${YARN_MIN_VERSION}`]);
}
