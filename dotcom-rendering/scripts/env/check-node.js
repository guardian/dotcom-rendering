import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensure } from './ensure.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
	try {
		/** @type {[typeof import('semver')]} */
		const [semver] = await ensure('semver');

		const nodeVersion = /^v(\d+\.\d+\.\d+)/.exec(process.version)[1];
		const nvmrcVersion = (
			await readFile(join(__dirname, '..', '..', '..', '.nvmrc'), 'utf8')
		).trim();

		if (!semver.satisfies(nodeVersion, nvmrcVersion)) {
			const { warn, prompt, log } = await import('./log.js');
			warn(
				`dotcom-rendering requires Node v${nvmrcVersion}`,
				`You are using v${nodeVersion ?? '(unknown)'}`,
			);
			if (process.env.NVM_DIR) {
				prompt('Run `nvm install` from the repo root and try again.');
				log(
					'See also: https://gist.github.com/sndrs/5940e9e8a3f506b287233ed65365befb',
				);
			} else if (process.env.FNM_DIR) {
				prompt(
					'It looks like you have fnm installed',
					'Run `fnm use` from the repo root and try again.',
				);
			} else {
				prompt(
					`Using a Node version manager can make things easier.`,
					`Our recommendation is fnm: https://github.com/Schniz/fnm`,
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
