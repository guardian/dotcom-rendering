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

/** This is served in browser that do not support ES Modules
 *
 * Known issue: [Safari 10.1-10.3](https://caniuse.com/es6-module) will execute this script twice.
 * We opted against a [polyfill](https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc),
 * as Ophan will dedupe identical page views if they have the same browserId + pageViewId.
 *
 * This endpoint is identical to `import 'ophan-tracker-js'` in ophan/init.ts
 */
const ophanNomoduleScript = `

 <!-- Ophan fallback for nomodules script -->
 <script src="https://j.ophan.co.uk/ophan.ng.js" defer nomodule></script>`;

module.exports = {
	BUILD_VARIANT,
	dcrJavascriptBundle,
	ophanNomoduleScript,
};
