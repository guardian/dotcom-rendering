import assert from 'node:assert';
import current from '../../webpack/webpack.config.js';
import newWeb from './client.web.mjs';
import newWebLegacy from './client.web.legacy.mjs';
import newApps from './client.apps.mjs';
import newServer from './server.mjs';

const [server, web, webLegacy, apps] = current;

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

// compareConfigs(web, newWeb);
// compareConfigs(webLegacy, newWebLegacy);
// compareConfigs(apps, newApps);
compareConfigs(server, newServer);
