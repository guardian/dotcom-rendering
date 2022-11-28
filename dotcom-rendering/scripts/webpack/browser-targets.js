const path = require('path');
const browserslist = require('browserslist');
const getTargetsFromBrowsersList =
	require('@babel/helper-compilation-targets').default;

/**
 * We use the Browserslists extends syntax e.g.:
 *
 * `extends @guardian/browserslist-config`
 *
 * Browserslist tries to resolve the stats file relative to the working directory.
 *
 * https://github.com/browserslist/browserslist/blob/74dbf959874e3c05adec93adab98832db35cb66b/node.js#L197-L200
 *
 * However when run from Storybook this working directory will be the root storybooks/ folder.
 *
 * @guardian/browserslist-config is not hoisted so Browserslist cannot resolve the stats file
 *
 * So we temporarily force the working directory to be the local workspace:
 * 'dotcom-rendering/dotcom-rendering'
 * and then restore the old working directory once Browserslist has loaded
 */
const prevWorkingDirectory = process.cwd();
process.chdir(path.resolve(__dirname, '../..'));
const browsers = browserslist('extends @guardian/browserslist-config');
process.chdir(prevWorkingDirectory);

/**
 * Transform a list of browsers to targets
 */
const rawTargets = getTargetsFromBrowsersList({ browsers });

/**
 * The current browserslist query via @guardian/browserslist-config is:
 *
 * "supports es6-module and >= 0.01% in @guardian/browserslist-config stats"
 *
 * from:
 *
 * https://github.com/guardian/csnx/tree/main/libs/%40guardian/browserslist-config
 *
 * This currently returns:
 *
 * {
 *	chrome: '67.0.0',
 *	edge: '91.0.0',
 *	firefox: '78.0.0',
 *	ios: '10.3.0',
 *	opera: '64.0.0',
 *	safari: '10.1.0',
 *	samsung: '11.1.0'
 * }
 *
 * SWC however will not transpile dynamic imports when there are browser targets
 * that do not support them.
 *
 * ios 10.3.0 and safari 10.1.0 do not support dynamic imports:
 *
 * https://caniuse.com/es6-module-dynamic-import
 *
 * So we upgrade to the next versions that do support dynamic imports:
 *
 * ios 11 and safari 11.1.0
 *
 * This is safe as browsers without dynamic import support should be
 * covered by the dynamic import polyfill.
 *
 * This logic can be removed once ios 10.3 and safari 10.1 no longer
 * appear in browserslist.
 *
 * @typedef {Object.<string, string>} Targets
 * @param {Targets} targets
 * @returns {Targets}
 */
const upgradeTargets = (targets) => {
	const upgradedTargets = Object.entries(targets).map(
		([browser, version]) => {
			const versions = version.split('.').map(Number);
			const major = versions[0] ?? 0;
			const minor = versions[1] ?? 0;
			if (browser === 'ios' && major < 11) {
				return ['ios', '11'];
			} else if (
				browser === 'safari' &&
				(major < 11 || (major === 11 && minor === 0))
			) {
				return ['safari', '11.1.0'];
			}
			return [browser, version];
		},
	);
	return Object.fromEntries(upgradedTargets);
};

const getBrowserTargets = () => upgradeTargets(rawTargets);

module.exports = {
	getBrowserTargets,
	rawTargets,
	upgradeTargets,
};
