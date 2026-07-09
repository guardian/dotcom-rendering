/* eslint-disable import/order -- TODO fixme */

/**
 * ES module equivalent of webpack/browser-targets.js
 *
 * Derives browser targets from @guardian/browserslist-config and upgrades
 * iOS < 11 to iOS 11 (required for dynamic import support).
 */
import { createRequire } from 'node:module';
import browserslist from 'browserslist';

const require = createRequire(import.meta.url);
const targetsModule = require('@babel/helper-compilation-targets');

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- TODO weird CJS issue
const getTargets = targetsModule.default;

const browsers = browserslist('extends @guardian/browserslist-config');
const rawTargets: Record<string, string> = getTargets({
	browsers,
});

const upgradeTargets = (
	targets: Record<string, string>,
): Record<string, string> => {
	return Object.fromEntries(
		Object.entries(targets).map(([browser, version]) => {
			const major = Number(version.split('.')[0]) || 0;
			if (browser === 'ios' && major < 11) {
				return ['ios', '11'];
			}
			return [browser, version];
		}),
	);
};

export const getBrowserTargets = (): Record<string, string> =>
	upgradeTargets(rawTargets);
