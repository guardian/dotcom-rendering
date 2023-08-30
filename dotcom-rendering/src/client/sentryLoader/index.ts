import {
	BUILD_VARIANT,
	isInWebVariantBuild,
} from '../../../scripts/webpack/bundles';
import { loadSentryOnError, stubSentry } from './loadSentry';

type IsSentryEnabled = {
	enableSentryReporting: boolean;
	isDev: boolean;
	isInBuildTest: boolean;
	random: number;
};

const isSentryEnabled = ({
	enableSentryReporting,
	isDev,
	isInBuildTest,
	random,
}: IsSentryEnabled): boolean => {
	// We don't send errors on the dev server, or if the enableSentryReporting switch is off
	if (isDev || !enableSentryReporting) return false;
	// We want to log all errors for users in the bundle variant AB test.
	// Please ensure that the test sample rate is low.
	// If the sample size of the variant test is > 1% adjust the sample rates for _both_
	// the variant and control so they each represent 1% of the overall traffic.
	// This will allow a like for like comparison in Sentry.
	if (isInBuildTest) return true;
	// Sentry lets you configure sampleRate to reduce the volume of events sent
	// but this filter only happens _after_ the library is loaded. The Guardian
	// measures page views in the billions so we only want to log 1% of errors that
	// happen but if we used sampleRate to do this we'd be needlessly downloading
	// Sentry 99% of the time. So instead we just do some math here and use that
	// to prevent the Sentry script from ever loading.
	if (random <= 99 / 100) return false;
	return true;
};

export const sentryLoader = (): Promise<void> => {
	const { switches, isDev, tests } = window.guardian.config;
	const enableSentryReporting = !!switches.enableSentryReporting;
	const isInBuildTest = BUILD_VARIANT && isInWebVariantBuild(tests);

	const canLoadSentry = isSentryEnabled({
		enableSentryReporting,
		isDev,
		isInBuildTest,
		random: Math.random(),
	});
	canLoadSentry ? loadSentryOnError() : stubSentry();
	return Promise.resolve();
};

export { isSentryEnabled };
