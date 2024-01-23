import { bundles } from '../generated/assets.manifest.mjs';

/**
 * Controls whether we should build the variant bundle.
 *
 * Set this to `true` if you want to serve a server-side experiment against
 * the a variant bundle A/B test.
 *
 * Ensure Sentry sampling in sentry/sentryLoader.ts is adjusted for the sample
 * size of the test
 *
 * @type {boolean} prevent TS from narrowing this to its current value
 */
const BUILD_VARIANT = bundles.map(String).includes('client.web.variant');

/**
 * Server-side test names for running variant test.
 *
 * The name is transformed from kebab-case to camelCase,
 * so we have the relevant prefix captured here.
 *
 * @see https://github.com/guardian/frontend/blob/main/common/app/experiments/Experiments.scala
 *
 * @type {(variant: 'Variant' | 'Control') => import("../types/config").ServerSideTestNames}
 */
const dcrJavascriptBundle = (variant) => `dcrJavascriptBundle${variant}`;

export { dcrJavascriptBundle, BUILD_VARIANT };
