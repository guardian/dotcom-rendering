import {
	BUILD_VARIANT,
	dcrJavascriptBundle,
} from '../../../scripts/webpack/bundles.js';
import { loadSentry } from './loadSentry';

type IsSentryEnabled = {
	enableSentryReporting: boolean;
	isDev: boolean;
	isInBrowserVariantTest: boolean;
	isInOktaVariantTest: boolean;
	randomCentile: number;
};

const isSentryEnabled = ({
	enableSentryReporting,
	isDev,
	isInBrowserVariantTest,
	isInOktaVariantTest,
	randomCentile,
}: IsSentryEnabled): boolean => {
	// We don't send errors on the dev server, or if the enableSentryReporting switch is off
	if (isDev || !enableSentryReporting) return false;
	// We want to log all errors for users in the bundle variant AB test.
	// Please ensure that the test sample rate is low.
	// If the sample size of the variant test is > 1% adjust the sample rates for _both_
	// the variant and control so they each represent 1% of the overall traffic.
	// This will allow a like for like comparison in Sentry.
	if (isInBrowserVariantTest) return true;
	// We want to log all errors for users in the Okta variant test.
	if (isInOktaVariantTest) return true;
	// Sentry lets you configure sampleRate to reduce the volume of events sent
	// but this filter only happens _after_ the library is loaded. The Guardian
	// measures page views in the billions so we only want to log 1% of errors that
	// happen but if we used sampleRate to do this we'd be needlessly downloading
	// Sentry 99% of the time. So instead we just do some math here and use that
	// to prevent the Sentry script from ever loading.
	if (randomCentile <= 99) return false;
	return true;
};

const stubSentry = () => {
	window.guardian.modules.sentry.reportError = (error) => {
		console.error(error);
	};
};

export const sentryLoader = (): Promise<void> => {
	const { switches, isDev, tests } = window.guardian.config;
	const enableSentryReporting = !!switches.enableSentryReporting;
	const isInBrowserVariantTest =
		BUILD_VARIANT && tests[dcrJavascriptBundle('Variant')] === 'variant';

	const isInOktaVariantTest =
		!!switches.okta && tests.oktaVariant === 'variant';

	// Generate a number between 1 - 100
	const randomCentile = Math.floor(Math.random() * 100) + 1;
	const canLoadSentry = isSentryEnabled({
		enableSentryReporting,
		isDev,
		isInBrowserVariantTest,
		isInOktaVariantTest,
		randomCentile,
	});
	canLoadSentry ? loadSentry() : stubSentry();
	return Promise.resolve();
};

export { isSentryEnabled };
