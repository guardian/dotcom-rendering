const browserslist = require('browserslist');
const getTargetsFromBrowsersList = require('@babel/helper-compilation-targets').default;

const browsers = browserslist('extends @guardian/browserslist-config');
const rawTargets = getTargetsFromBrowsersList({ browsers });

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
