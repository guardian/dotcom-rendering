/**
 * Controls whether we should build the variant bundle.
 *
 * Set this to `true` if you want to serve a server-side experiment against
 * the `dcrJavascriptBundle` A/B test.
 *
 * @type {boolean} prevent TS from narrowing this to its current value
 */
const BUILD_VARIANT = true;

/**
 * Server-side test names for `dcr-javascript-bundle`.
 *
 * The name is transformed from kebab-case to camelCase,
 * so we have the `dcrJavascriptBundle` prefix.
 *
 * @see https://github.com/guardian/frontend/blob/a602273a/common/app/experiments/Experiments.scala#L20-L27
 *
 * @type {(variant: 'Variant' | 'Control') => import("../../src/types/config").ServerSideTestNames}
 */
const dcrJavascriptBundle = (variant) => `dcrJavascriptBundle${variant}`;

module.exports = {
	BUILD_VARIANT,
	dcrJavascriptBundle,
};
