import { join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import semver from 'semver';

// eslint-disable-next-line import/extensions
import { warn, prompt, log } from './log.js';

try {
	const dirname = fileURLToPath(import.meta.url);

	const nodeVersion = /^v(\d+\.\d+\.\d+)/.exec(process.version)[1];
	const nvmrcVersion = readFileSync(
		join(dirname, '..', '..', '..', '..', '.nvmrc'),
		'utf8',
	).trim();

	if (!semver.satisfies(nodeVersion, nvmrcVersion)) {
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
