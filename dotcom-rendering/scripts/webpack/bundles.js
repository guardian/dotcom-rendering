/**
 * Controls whether we should build the variant bundle.
 * Set this to true if you want to serve a server-side experiment against
 * the `dcrJsBundleVariant` A/B test.
 *
 * @see https://github.com/guardian/frontend/blob/a602273a/common/app/experiments/Experiments.scala#L20-L27
 *
 * @type {boolean} prevent TS from narrowing this to its current value
 */
const BUILD_VARIANT = true;

module.exports = {
	BUILD_VARIANT,
};
