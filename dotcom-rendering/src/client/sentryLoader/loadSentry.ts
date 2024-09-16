import { isAdBlockInUse } from '@guardian/commercial';
import { log, startPerformanceMeasure } from '@guardian/libs';
import '../webpackPublicPath';
import type { ReportError } from './sentry';

type ReportErrorError = Parameters<ReportError>[0];
type ReportErrorFeature = Parameters<ReportError>[1];
type ReportErrorTags = Parameters<ReportError>[2];
type ErrorQueue = Array<{
	error: ReportErrorError;
	feature: ReportErrorFeature;
	tags?: ReportErrorTags;
}>;

/**
 * Set up error handlers to inject and call Sentry.
 * If no error happen, Sentry is not loaded.
 */
const loadSentryOnError = (): void => {
	try {
		// Downloading and initialising Sentry is asynchronous so we need a way
		// to ensure injection only happens once and to capture any other errors that
		// might happen while this script is loading
		let injected = false;
		const errorQueue: ErrorQueue = [];

		// Function that gets called when an error happens before Sentry is ready
		const injectSentry = async (
			error: Error | undefined,
			feature: string = 'unknown',
			tags?: { [key: string]: string },
		) => {
			const { endPerformanceMeasure } = startPerformanceMeasure(
				'dotcom',
				'sentryLoader',
				'inject',
			);
			// Remember this error for later
			if (error) errorQueue.push({ error, feature, tags });

			// Only inject once
			if (injected) {
				return;
			}
			injected = true;

			// Make this call blocking. We are queing errors while we wait for this code to run
			// so we won't miss any and by waiting here we ensure we will never make calls we
			// expect to be blocked
			// Ad blocker detection can be expensive so it is checked here rather than in init
			// to avoid blocking of the init flow
			const adBlockInUse: boolean = await isAdBlockInUse();
			if (adBlockInUse) {
				// Ad Blockers prevent calls to Sentry from working so don't try to load the lib
				return;
			}

			// Load sentry.ts
			const { reportError } = await import(
				/* webpackChunkName: "lazy" */
				/* webpackChunkName: "sentry" */ './sentry'
			);

			// Sentry takes over control of the window.onerror and
			// window.onunhandledrejection listeners but we need to
			// manually redefine our own custom error reporting function
			window.guardian.modules.sentry.reportError = reportError;

			// Now that we have the real reportError function available,
			// send any queued errors
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
			log('dotcom', `Injected Sentry in ${endPerformanceMeasure()}ms`);
		};

		// This is how we lazy load Sentry. We setup custom functions and
		// listeners to inject Sentry when an error happens
		window.onerror = (message, url, line, column, error) =>
			injectSentry(error);
		window.onunhandledrejection = (
			event: undefined | { reason?: unknown },
		) => event?.reason instanceof Error && injectSentry(event.reason);
		window.guardian.modules.sentry.reportError = (error, feature, tags) => {
			injectSentry(error, feature, tags).catch((e) =>
				// eslint-disable-next-line no-console -- report error in loading Sentry
				console.error(`injectSentry error: ${String(e)}`),
			);
		};
	} catch {
		// We failed to setup Sentry :(
	}
};

export { loadSentryOnError };
