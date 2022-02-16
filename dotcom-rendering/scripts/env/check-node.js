import { promisify } from 'util';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { satisfies } from 'semver';

import { warn, prompt, log } from './log.js';

const __dirname = fileURLToPath(import.meta.url);

(async () => {
	try {
		const nodeVersion = /^v(\d+\.\d+\.\d+)/.exec(process.version)[1];
		const nvmrcVersion = (
			await readFile(
				join(__dirname, '..', '..', '..', '..', '.nvmrc'),
				'utf8',
			)
		).trim();

		if (!satisfies(nodeVersion, nvmrcVersion)) {
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
		log(e);
		process.exit(1);
	}
})();
