import { isServer } from './isServer';

/** To ensure an error is reported to Sentry */
export const reportErrorToSentry = (error: Error, feature: string): void => {
	if (isServer) {
		console.error(error);
		return;
	}

	window.guardian.modules.sentry.reportError(error, feature);
};
