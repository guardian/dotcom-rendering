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
 * SWC however will not transpile dynamic imports when there are browser targets
 * that do not support them.
 *
 * iOS 10.3.0 does not support dynamic imports:
 *
 * https://caniuse.com/es6-module-dynamic-import
 *
 * So if an unsupported version is encountered we upgrade to the next version
 * that does support dynamic imports i.e.:
 *
 * iOS 11
 *
 * This is safe as browsers without dynamic import support should be
 * covered by the dynamic import polyfill.
 *
 * This logic can be removed once iOS 10.3 no longer appears in browserslist.
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
			if (browser === 'ios' && major < 11) {
				return ['ios', '11'];
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
