import assert from 'node:assert';
import current from '../../webpack/webpack.config.js';
import newWeb from './client.web.mjs';
import newApps from './client.apps.mjs';
import newServer from './server.mjs';
import newDevServer from './server.dev.mjs';
import { isProd } from './utils/env.mjs';

const [server, web, apps] = current;

/**
 *
 * @param {import('webpack').Configuration} actual
 * @param {import('webpack').Configuration} expected
 */
const compareConfigs = (current, proposed) => {
	for (const key of Object.keys(current)) {
		try {
			assert.deepStrictEqual(current[key], proposed[key]);
			console.info(
				`${current.name}#${key} matches ${proposed.name}#${key}`,
			);
		} catch (error) {
			console.info(
				`${current.name}#${key} does not match ${proposed.name}#${key}`,
			);
			if (error instanceof Error) {
				console.error(
					'│ ' +
						error.message.replaceAll(/\n/g, '\n│ ') +
						'\n└───────────',
				);
			}
		}
	}

	for (const key of Object.keys(proposed)) {
		try {
			assert(key in current);
		} catch (error) {
			console.info(
				`${current.name}#${key} does not exist, but proposed in ${proposed.name}`,
			);
		}
	}
};

compareConfigs(web, newWeb);
compareConfigs(apps, newApps);
compareConfigs(server, isProd ? newServer : newDevServer);
