import {
	BUILD_VARIANT,
	dcrJavascriptBundle,
} from '../../../../scripts/webpack/bundles';
import { startup } from '../startup';
import { loadSentry } from './loadSentry';

type IsSentryEnabled = {
	enableSentryReporting: boolean;
	isDev: boolean;
	isInBrowserVariantTest: boolean;
	randomCentile: number;
};

const isSentryEnabled = ({
	enableSentryReporting,
	isDev,
	isInBrowserVariantTest,
	randomCentile,
}: IsSentryEnabled): boolean => {
	// We don't send errors on the dev server, or if the enableSentryReporting switch is off
	if (isDev || !enableSentryReporting) return false;
	// We want to log all errors for users in the bundle variant AB test regardless of
	// the sample rate. Please ensure that the test sample rate is low.
	if (isInBrowserVariantTest) return true;
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

const init = (): Promise<void> => {
	const config = window.guardian.config;
	const enableSentryReporting = config.switches.enableSentryReporting ?? false;
	const isDev = config.isDev;
	const isInBrowserVariantTest =
		BUILD_VARIANT &&
		config.tests[dcrJavascriptBundle('Variant')] === 'variant';
	// Generate a number between 1 - 100
	const randomCentile = Math.floor(Math.random() * 100) + 1;
	const canLoadSentry = isSentryEnabled({
		enableSentryReporting,
		isDev,
		isInBrowserVariantTest,
		randomCentile,
	});
	canLoadSentry ? loadSentry() : stubSentry();
	return Promise.resolve();
};

startup('sentryLoader', null, init);

export { isSentryEnabled };
