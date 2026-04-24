import type { ServerSideTestNames } from '../src/types/config';

/**
 * Controls whether we should build the variant bundle.
 *
 * Set this to `true` if you want to serve a server-side experiment against
 * the a variant bundle A/B test.
 *
 * Ensure Sentry sampling in sentry/sentryLoader.ts is adjusted for the sample
 * size of the test
 *
 */
export const BUILD_VARIANT: boolean = false;

/**
 * Server-side test names for running variant test.
 *
 * The name is transformed from kebab-case to camelCase,
 * so we have the relevant prefix captured here.
 *
 * @see https://github.com/guardian/frontend/blob/main/common/app/experiments/Experiments.scala
 *
 */
export const dcrJavascriptBundle = (
	variant: 'Variant' | 'Control',
): ServerSideTestNames => `dcrJavascriptBundle${variant}`;
