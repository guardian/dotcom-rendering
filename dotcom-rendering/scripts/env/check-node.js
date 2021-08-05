const { promisify } = require('util');
const { join } = require('path');
const readFile = promisify(require('fs').readFile);

const ensure = require('./ensure');

(async () => {
	try {
		const [semver] = await ensure('semver');

		const nodeVersion = process.version.match(/^v(\d+\.\d+\.\d+)/)[1];
		const nvmrcVersion = (
			await readFile(join(__dirname, '..', '..', '.nvmrc'), 'utf8')
		).trim();

		if (!semver.satisfies(nodeVersion, nvmrcVersion)) {
			const { warn, prompt, log } = require('./log');
			warn(
				`dotcom-rendering requires Node v${nvmrcVersion}`,
				`You are using v${nodeVersion}`,
			);
			if (process.env.NVM_DIR) {
				prompt('Run `nvm install` and try again.');
				log('See also: https://git.io/vKTnK');
			} else {
				prompt(
					`NVM can make managing Node versions a lot easier:`,
					'https://github.com/creationix/nvm',
				);
			}
			process.exit(1);
		}
	} catch (e) {
		// eslint-disable-next-line no-console
		console.log(e);
		process.exit(1);
	}
})();
