// @flow
const { promisify } = require('util');
const { join } = require('path');
const readFile = promisify(require('fs').readFile);

const exec = promisify(require('child_process').execFile);

const ensure = require('./lib/ensure');

(async () => {
    try {
        const [semver] = await ensure('semver');

        const nodeVersion = process.version.match(/^v(\d+\.\d+\.\d+)/)[1];
        const nvmrcVersion = (await readFile(
            join(__dirname, '../', '.nvmrc'),
            'utf8',
        )).trim();

        if (!semver.satisfies(nodeVersion, nvmrcVersion)) {
            const { warn, log } = require('./log');
            warn(
                `GUUI requires Node v${nvmrcVersion}`,
                `You are using v${nodeVersion}`,
            );
            if (process.env.NVM_DIR) {
                log('Run `nvm install` and try again.');
                try {
                    await exec(`${process.env.NVM_DIR}/nvm-exec`, ['use']);
                } catch (e) {
                    console.log(e);
                }
            } else {
                log(
                    `NVM can make managing Node versions a lot easier:`,
                    'https://github.com/creationix/nvm',
                );
            }
            process.exit(1);
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
