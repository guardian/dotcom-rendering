// @flow
const { promisify } = require('util');
const exec = promisify(require('child_process').execFile);

const ensure = require('./lib/ensure');

const YARN_VERSION = '1.3.2';

(async () => {
    try {
        const { stdout: version } = await exec('yarn', ['-v']);
        const [semver] = await ensure('semver');

        if (!semver.satisfies(version, YARN_VERSION)) {
            const { warn, log } = require('./log');
            warn(
                `GUUI requires Yarn v${YARN_VERSION}`,
                `You are using v${version}`,
            );
            log(`https://yarnpkg.com/lang/en/docs/install`);
            process.exit(1);
        }
    } catch (e) {
        const { warn, log } = require('./log');
        warn(`GUUI requires Yarn v${YARN_VERSION}`);
        log(`https://yarnpkg.com/lang/en/docs/install`);
        process.exit(1);
    }
})();
