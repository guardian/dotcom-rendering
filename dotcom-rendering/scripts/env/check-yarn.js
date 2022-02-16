import { promisify } from 'util';
import { execFile } from 'child_process';
import { satisfies } from 'semver';

const exec = promisify(execFile);

// Yarn v1.x support .yarnrc, so we can use a local (check-in) copy of yarn
const YARN_MIN_VERSION = '1.x';

(async () => {
	try {
		// This will fail if yarn isn't installed, and force into the catch,
		// where we install yarn with NPM (mainly for CI)
		const { stdout: version } = await exec('yarn', ['--version']);

		if (!satisfies(version, YARN_MIN_VERSION)) {
			const { warn, prompt, log } = require('./log').default;
			warn(
				`dotcom-rendering requires Yarn >=${YARN_MIN_VERSION}`,
				`You are using v${version}`,
			);
			prompt('Please upgrade yarn');
			log('https://classic.yarnpkg.com/en/docs/install');

			process.exit(1);
		}
	} catch (e) {
		require('./log').default.log(`Installing yarn`);
		await exec('npm', ['i', '-g', `yarn@${YARN_MIN_VERSION}`]);
	}
})();
