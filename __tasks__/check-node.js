// @flow
const { promisify } = require('util');
const { join } = require('path');
const readFile = promisify(require('fs').readFile);

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
            await require('./lib/log').warn(`You need node@${nvmrcVersion}`);
            process.exit(1);
        }
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
