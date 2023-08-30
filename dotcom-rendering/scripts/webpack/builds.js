/** @typedef {import("../../src/types/config").ServerSideTests} ServerSideTests */

/**
 * Controls whether we should build the variant bundle.
 *
 * Set this to `true` if you want to serve a server-side experiment against
 * the a variant bundle A/B test.
 *
 * Ensure Sentry sampling in sentry/index.ts is adjusted for the sample
 * size of the test
 *
 * @type {boolean} prevent TS from narrowing this to its current value
 */
const BUILD_VARIANT = true;

/**
 * Server-side test names for running variant test.
 *
 * The name is transformed from kebab-case to camelCase,
 * so we have the relevant prefix captured here.
 *
 * @see https://github.com/guardian/frontend/blob/main/common/app/experiments/Experiments.scala
 *
 * @type {(tests: ServerSideTests) => boolean}
 */
const isInWebVariantBuild = (tests) =>
	tests.dcrJavascriptBundleVariant === 'variant';

/**
 * Get the appropriate web build for the current page
 *
 * @param {object} options
 * @param {ServerSideTests} options.tests
 * @param {import("../../src/types/config").Switches} options.switches
 */
const getWebBuild = ({ tests, switches }) => {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it may be true or false
	if (BUILD_VARIANT && isInWebVariantBuild(tests)) {
		return 'web.variant';
	}
	if (switches.scheduler) {
		return 'web.scheduled';
	}
	return 'web';
};

module.exports = {
	BUILD_VARIANT,
	isInWebVariantBuild,
	getWebBuild,
};
