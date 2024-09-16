import { isAdBlockInUse } from '@guardian/commercial';
import { log, startPerformanceMeasure } from '@guardian/libs';
import '../webpackPublicPath';

type ReportError = typeof window.guardian.modules.sentry.reportError;
type ReportErrorError = Parameters<ReportError>[0];
type ReportErrorFeature = Parameters<ReportError>[1];
type ReportErrorTags = Parameters<ReportError>[2];

type ErrorQueue = Array<{
	error: ReportErrorError;
	feature: ReportErrorFeature;
	tags?: ReportErrorTags;
}>;

const loadSentryCreator = () => {
	/**
	 * Downloading and initialising Sentry is asynchronous so we need a way
	 * to ensure initialisation only happens once and to queue and report any
	 * error that might happen while this script is loading
	 */
	let initialised = false;
	const errorQueue: ErrorQueue = [];

	/**
	 * Function that gets called when an error happens before Sentry is ready
	 */
	const loadSentry = async (
		error: ReportErrorError | undefined,
		feature: ReportErrorFeature = 'unknown',
		tags?: ReportErrorTags,
	) => {
		const { endPerformanceMeasure } = startPerformanceMeasure(
			'dotcom',
			'sentryLoader',
			'initialise',
		);
		/**
		 * Queue this error for later
		 */
		if (error) errorQueue.push({ error, feature, tags });

		/**
		 * Only initialise once
		 */
		if (initialised) {
			return;
		}
		initialised = true;

		/**
		 * Make this call blocking. We are queing errors while we wait for this code to run
		 * so we won't miss any and by waiting here we ensure we will never make calls we
		 * expect to be blocked
		 * Ad blocker detection can be expensive so it is checked here rather than in init
		 * to avoid blocking of the init flow
		 */
		const adBlockInUse: boolean = await isAdBlockInUse();
		if (adBlockInUse) {
			/**
			 * Ad Blockers prevent calls to Sentry from working so don't try to load the lib
			 */
			return;
		}

		/**
		 * Dynamically load sentry.ts
		 */
		const { reportError } = await import(
			/* webpackChunkName: "lazy" */
			/* webpackChunkName: "sentry" */ './sentry'
		);

		/**
		 * Replace the lazy loader stub with our custom error reporting function
		 */
		window.guardian.modules.sentry.reportError = reportError;

		/**
		 * Now that we have the real reportError function available,
		 * report any queued errors
		 */
		while (errorQueue.length) {
			const queuedError = errorQueue.shift();
			if (queuedError) {
				reportError(
					queuedError.error,
					queuedError.feature,
					queuedError.tags,
				);
			}
		}
		log('dotcom', `Initialise Sentry in ${endPerformanceMeasure()}ms`);
	};
	return loadSentry;
};

/**
 * Set up error handlers to initialise and call Sentry when an error occurs.
 * If no error happens, Sentry is not loaded.
 */
const loadSentryOnError = (): void => {
	try {
		const loadSentry = loadSentryCreator();

		/**
		 * This is how we lazy load Sentry. We setup custom functions and
		 * listeners to initialise Sentry when an error happens
		 *
		 * Sentry will replace onerror and onunhandledrejection listeners
		 * with its own handlers once initialised
		 *
		 * reportError is replaced by loadSentry
		 */
		window.onerror = (message, url, line, column, error) =>
			loadSentry(error);
		window.onunhandledrejection = (
			event: undefined | { reason?: unknown },
		) => event?.reason instanceof Error && loadSentry(event.reason);
		window.guardian.modules.sentry.reportError = (error, feature, tags) => {
			loadSentry(error, feature, tags).catch((e) =>
				// eslint-disable-next-line no-console -- fallback to console.error
				console.error(`loadSentryOnError error: ${String(e)}`),
			);
		};
	} catch (e) {
		// eslint-disable-next-line no-console -- fallback to console.error
		console.error(`loadSentryOnError error: ${String(e)}`);
	}
};

export { loadSentryOnError };
