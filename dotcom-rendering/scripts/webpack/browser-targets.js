/**
 * This is a helper file for SWC to
 * 1) derive browser targets from @guardian/browserslist-config
 * 2) upgrade any unsupported browsers as described below.
 */
const getTargetsFromBrowsersList =
	require('@babel/helper-compilation-targets').default;
const browserslist = require('browserslist');

/**
 * Browserslist tries to resolve the stats file relative to the working directory.
 * https://github.com/browserslist/browserslist/blob/74dbf959874e3c05adec93adab98832db35cb66b/node.js#L197-L200
 * @guardian/browserslist-config is not hoisted so when webpack runs the working directory must be the local workspace
 */
const browsers = browserslist('extends @guardian/browserslist-config');

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
 *	edge: '99.0.0',
 *	firefox: '78.0.0',
 *	ios: '10.3.0',
 *	opera: '91.0.0',
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
 * So if unsuported versions are encountered we upgrade to the next versions that
 * do support dynamic imports i.e.:
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
