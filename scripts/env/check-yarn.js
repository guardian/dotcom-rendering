const { promisify } = require('util');
const exec = promisify(require('child_process').execFile);

const ensure = require('./ensure');

// 1.13.0 was the first version of yarn to support policies
// https://classic.yarnpkg.com/en/docs/cli/policies/
const YARN_VERSION = '>=1.13.0';

(async () => {
    try {
        const { stdout: version } = await exec('yarn', ['-v']);

        if (!version) {
            require('./log').log(`Installing yarn@${YARN_VERSION}`);
            await exec('npm', ['i', '-g', `yarn@${YARN_VERSION}`]);
        } else {
            const [semver] = await ensure('semver');

            if (!semver.satisfies(version, YARN_VERSION)) {
                const { warn, prompt, log } = require('./log');
                warn(
                    `dotcom-rendering requires Yarn ${YARN_VERSION}`,
                    `You are using v${version}`,
                );
                prompt('Please upgrade yarn');
                log('https://classic.yarnpkg.com/en/docs/install');

                process.exit(1);
            }
        }
    } catch (e) {
        console.log(e);
    }
})();
