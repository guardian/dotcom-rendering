/**
 * ES module equivalent of webpack/browser-targets.js
 *
 * Derives browser targets from @guardian/browserslist-config and upgrades
 * iOS < 11 to iOS 11 (required for dynamic import support).
 */
import getTargetsFromBrowsersList from '@babel/helper-compilation-targets';
import browserslist from 'browserslist';

type GetTargetsFromBrowsersList = (opts: {
	browsers: string[];
}) => Record<string, string>;

const getTargetsFromBrowsersListTyped =
	getTargetsFromBrowsersList as unknown as GetTargetsFromBrowsersList;

const browsers = browserslist('extends @guardian/browserslist-config');
const rawTargets: Record<string, string> = getTargetsFromBrowsersListTyped({
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
