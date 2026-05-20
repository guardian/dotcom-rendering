import type * as braze from '@braze/web-sdk';
import { isUndefined, log } from '@guardian/libs';

// Define the type alias
export type BrazeInstance = typeof braze;

/**
 * Braze SDK initialisation options.
 *
 * IMPORTANT: sessionTimeoutInSeconds is set to 1800 (30 minutes, the SDK default).
 *
 * We previously had this set to 1 second, which caused two critical problems with
 * the Braze Banners System when used with a Braze Canvas:
 *
 * 1. Canvas entry chaos:
 *    Braze Canvas campaigns that use "Start Session" as their entry trigger rely on
 *    a meaningful definition of a session. With a 1-second timeout, the SDK was
 *    firing hundreds of "Start Session" events per user per day (one per second of
 *    inactivity). A Canvas configured with "re-entry after 10 seconds" was never
 *    designed to cycle every 10-11 seconds, so Canvas step advancement became
 *    chaotic and banner availability was unpredictable.
 *    Any Canvas using session-based delay steps (e.g., "wait 2 sessions") would
 *    also behave incorrectly, since "2 sessions" was effectively "2 seconds".
 *
 * 2. Silent requestBannersRefresh drops:
 *    The Braze SDK enforces a "once per session" constraint on requestBannersRefresh.
 *    With a 1-second timeout, a fast page reload (under 1 second since the previous
 *    page unload) was seen by the SDK as still within the previous session, causing
 *    the requestBannersRefresh call at init to be silently dropped. getBanner() would
 *    then return the stale cached null from the previous session, and the banner would
 *    not appear. This produced the intermittent "sometimes I see it, sometimes I do not"
 *    behaviour observed in production.
 *
 * Setting this to 1800 aligns with the SDK default and ensures that "Start Session"
 * events map to genuine user visits rather than sub-second inactivity timeouts.
 *
 * NOTE ON ANALYTICS IMPACT: Changing from 1 to 1800 will dramatically reduce the
 * session count reported in Braze. The previous count was heavily inflated (every
 * 1 second of inactivity = new session). Any dashboards or audience segments built
 * on session counts will need to be reviewed by CRM after this change.
 */
const SDK_OPTIONS: braze.InitializationOptions = {
	enableLogging: true,
	noCookies: true,
	baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
	sessionTimeoutInSeconds: 1800, // 30 minutes, the Braze SDK default. See JSDoc above for rationale.
	minimumIntervalBetweenTriggerActionsInSeconds: 0,
	devicePropertyAllowlist: [],
	allowUserSuppliedJavascript: true, // Supplied javascript is required for Braze Banners System integration
};

const initialiseBraze = async (apiKey: string): Promise<typeof braze> => {
	const importedBraze = (await import(
		/* webpackChunkName: "braze-web-sdk-core" */ '@braze/web-sdk'
	)) as unknown as typeof braze;

	importedBraze.setLogger((message) => log('tx', message));
	importedBraze.initialize(apiKey, SDK_OPTIONS);

	return importedBraze;
};

const getInitialisedBraze = (() => {
	let cache: Promise<typeof braze>;

	return (apiKey: string): Promise<typeof braze> => {
		if (isUndefined(cache)) {
			cache = initialiseBraze(apiKey);
		}

		return cache;
	};
})();

export { getInitialisedBraze };
