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
import { checkBrazeDependencies } from './checkBrazeDependencies';
import { BrazeInstance, getInitialisedBraze } from './initialiseBraze';

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
				// @ts-expect-error
				error,
				'braze-maybeWipeUserData',
			);
		}
	}
};

/**
 * Braze Banners System Placement IDs used in DCR
 */
export enum BrazeBannersSystemPlacementId {
	EndOfArticle = 'dotcom-rendering_end-of-article',
}

/**
 * Trigger a refresh of Braze Banners System banners
 * @param braze The Braze instance
 * @returns A promise that resolves when the refresh is complete
 */
function refreshBanners(braze: BrazeInstance): Promise<void> {
	return new Promise<void>((resolve) => {
		braze.requestBannersRefresh(
			[BrazeBannersSystemPlacementId.EndOfArticle],
			() => {
				resolve();
			},
			() => {
				resolve();
			},
		);
	});
}

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

		// DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY
		// Subscribe to Braze Banners System updates
		// (This callback runs every time Braze has new data (initially empty, then populated))
		const subscriptionId = braze.subscribeToBannersUpdates((banners) => {
			console.log('📢 Banners updated:', banners);
		});
		console.log(
			'🆔 Subscribed to Braze banner updates. Subscription ID:',
			subscriptionId,
		);
		// DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY

		// Trigger the Braze Banners System refresh (Ask Braze to fetch data)
		// (Requests banners by a list of placement IDs from the Braze backend.)
		// (Note that this method can only be called once per session.)
		// Since we want to suppress In-App Messages if a banner exists, we must
		// call requestBannersRefresh before openSession.
		await refreshBanners(braze);

		braze.openSession();

		// DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY
		// Force the trigger immediately
		braze.logCustomEvent('afs_trigger_braze');
		// DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY // DEV ONLY

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
