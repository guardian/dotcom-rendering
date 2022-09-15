import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { ensure } from './ensure.js';
import { warn, prompt, log } from './log.js';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
	try {
		const [{ default: semver }] = await ensure('semver');

		const nodeVersion = /^v(\d+\.\d+\.\d+)/.exec(process.version)[1];
		const nvmrcVersion = (
			await readFile(
				join(
					fileURLToPath(import.meta.url),
					'..',
					'..',
					'..',
					'..',
					'.nvmrc',
				),
				'utf8',
			)
		).trim();

		if (!semver.satisfies(nodeVersion, nvmrcVersion)) {
			warn(
				`dotcom-rendering requires Node v${nvmrcVersion}`,
				`You are using v${nodeVersion}`,
			);
			if (process.env.NVM_DIR) {
				prompt('Run `nvm install` and try again.');
				log(
					'See also: https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb',
				);
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
