import type {
	BrazeCardsInterface,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import {
	BrazeCards,
	BrazeMessages,
	canRenderBrazeMsg,
	LocalMessageCache,
	NullBrazeCards,
	NullBrazeMessages,
} from '@guardian/braze-components/logic';
import { log, startPerformanceMeasure, storage } from '@guardian/libs';
import { getOphan } from '../../client/ophan/ophan';
import type { RenderingTarget } from '../../types/renderingTarget';
import {
	clearHasCurrentBrazeUser,
	hasCurrentBrazeUser,
	setHasCurrentBrazeUser,
} from '../hasCurrentBrazeUser';
import {
	brazeBannersSystemLogger,
	isDevelopmentDomain,
	refreshBanners,
} from './BrazeBannersSystem';
import { checkBrazeDependencies } from './checkBrazeDependencies';
import type { BrazeInstance } from './initialiseBraze';
import { getInitialisedBraze } from './initialiseBraze';

const maybeWipeUserData = async (
	apiKey?: string,
	brazeUuid?: null | string,
	consent?: boolean,
	brazeSwitch?: boolean,
): Promise<void> => {
	const hasCurrentBrazeUserValue = hasCurrentBrazeUser();
	const userHasLoggedOut = !brazeUuid && hasCurrentBrazeUserValue;
	const userHasRemovedConsent = !consent && hasCurrentBrazeUserValue;
	const brazeHasBeenDisabled = !brazeSwitch && hasCurrentBrazeUserValue;

	if (userHasLoggedOut || userHasRemovedConsent || brazeHasBeenDisabled) {
		try {
			if (apiKey) {
				const braze = await getInitialisedBraze(apiKey);
				braze.wipeData();
			}
			LocalMessageCache.clear();
			clearHasCurrentBrazeUser();
		} catch (error) {
			window.guardian.modules.sentry.reportError(
				// @ts-expect-error -- todo type this properly
				error,
				'braze-maybeWipeUserData',
			);
		}
	}
};

export const buildBrazeMessaging = async (
	idApiUrl: string,
	isSignedIn: boolean,
	renderingTarget: RenderingTarget,
): Promise<{
	brazeMessages: BrazeMessagesInterface;
	brazeCards: BrazeCardsInterface;
	braze: BrazeInstance | null;
}> => {
	if (!storage.local.isAvailable()) {
		// we require local storage for using any message channel so that we know
		// when to clear up user data from the device on logout
		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
			braze: null,
		};
	}

	const dependenciesResult = await checkBrazeDependencies(isSignedIn);

	if (!dependenciesResult.isSuccessful) {
		const { failure, data } = dependenciesResult;

		log(
			'tx',
			`Not attempting to show Braze messages. Dependency ${
				failure.field
			} failed with ${String(failure.data)}.`,
		);

		await maybeWipeUserData(
			data.apiKey as string | undefined,
			data.brazeUuid as string | null | undefined,
			data.consent as boolean | undefined,
			data.brazeSwitch as boolean | undefined,
		);

		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
			braze: null,
		};
	}

	try {
		const { endPerformanceMeasure } = startPerformanceMeasure(
			'tx',
			'braze-sdk-load',
		);

		const braze = await getInitialisedBraze(
			dependenciesResult.data.apiKey as string,
		);

		const sdkLoadTimeTaken = endPerformanceMeasure();
		const ophan = await getOphan(renderingTarget);
		ophan.record({
			// @ts-expect-error -- the relevant team should remove this call as it is dropped by Ophan
			// see https://github.com/guardian/dotcom-rendering/pull/11438 further context
			component: 'braze-sdk-load-timing',
			value: sdkLoadTimeTaken,
		});

		const errorHandler = (error: Error, desc: string) => {
			window.guardian.modules.sentry.reportError(error, desc);
		};

		setHasCurrentBrazeUser();
		braze.changeUser(dependenciesResult.data.brazeUuid as string);

		// Subscribe to Braze Banners System updates
		if (isDevelopmentDomain()) {
			// This callback runs every time Braze has new data (initially empty, then populated)
			const subscriptionId = braze.subscribeToBannersUpdates(
				(banners) => {
					brazeBannersSystemLogger.log('📢 Check:', banners);
				},
			);
			brazeBannersSystemLogger.info(
				'🆔 Subscribed to Updates. Subscription ID:',
				subscriptionId,
			);
		}

		// braze.openSession();

		// Trigger the Braze Banners System refresh (fetch banner content for all placement IDs).
		await refreshBanners(braze);

		/**
		 * Re-request banner eligibility whenever the user returns to this tab.
		 *
		 * After the initial requestBannersRefresh above, the Braze SDK manages
		 * subsequent session starts silently: once the user has been inactive for
		 * sessionTimeoutInSeconds (1800s / 30 minutes), the SDK internally starts a
		 * new session and fires a "Start Session" event to the Braze backend. This
		 * can trigger Canvas re-entry and make a banner available again, but the SDK
		 * does not expose a session lifecycle hook (there is no subscribeToSessionUpdates
		 * in SDK v6.5.0). This means even if the Canvas has re-entered the user and a
		 * new banner is ready, the SDK keeps serving its locally cached null because it
		 * was never instructed to fetch new data.
		 *
		 * We use the document visibilitychange event as a proxy for "user has returned
		 * after a potentially session-creating absence". This is the same signal the
		 * SDK itself uses internally to detect inactivity and start new sessions, so it
		 * is the correct moment to ask Braze for updated eligibility.
		 *
		 * The Braze SDK's built-in token bucket rate limiting (5 tokens per session,
		 * 1 refill every 3 minutes) ensures that rapid or accidental tab switches
		 * do not trigger unnecessary network requests. If no tokens are available, the
		 * SDK fires the error callback in refreshBanners, which resolves gracefully
		 * without blocking the page or throwing.
		 *
		 * We also keep a local timestamp of the last refresh. The initial page-load
		 * requestBannersRefresh above counts as the first refresh, so lastRefreshAt
		 * starts at Date.now(). Inside the listener we skip the call if fewer than
		 * 5 seconds have elapsed — this prevents burning two tokens on a trivial
		 * background tab open (e.g. the user Command+clicks a link and instantly
		 * switches back), while still refreshing on any meaningful return to the tab.
		 *
		 * This fix was validated with Braze support, who confirmed that
		 * requestBannersRefresh must be called at the start of each new session for
		 * Canvas re-eligibility to work as expected.
		 */
		let lastRefreshAt = Date.now();
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'visible') {
				if (Date.now() - lastRefreshAt < 5000) return;
				lastRefreshAt = Date.now();
				// void refreshBanners(braze);
			}
		});

		const brazeCards = window.guardian.config.switches.brazeContentCards
			? new BrazeCards(braze, errorHandler)
			: new NullBrazeCards();
		const brazeMessages = new BrazeMessages(
			braze,
			LocalMessageCache,
			errorHandler,
			canRenderBrazeMsg,
		);
		return { brazeMessages, brazeCards, braze };
	} catch {
		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
			braze: null,
		};
	}
};
