import assert from 'node:assert';
import current from '../../scripts/webpack/webpack.config.js';
import newWeb from './bundle.web.mjs';
import newWebScheduled from './bundle.web.scheduled.mjs';
import newWebVariant from './bundle.web.variant.mjs';
import newWebLegacy from './bundle.web.legacy.mjs';
import newApps from './bundle.apps.mjs';
import newServer from './bundle.server.mjs';

const [server, web, webScheduled, webVariant, webLegacy, apps] = current;

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
compareConfigs(webScheduled, newWebScheduled);
compareConfigs(webVariant, newWebVariant);
compareConfigs(webLegacy, newWebLegacy);
compareConfigs(apps, newApps);
compareConfigs(server, newServer);
