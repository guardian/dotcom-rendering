import type {
	BrazeCardsInterface,
	BrazeMessagesInterface,
} from '@guardian/braze-components/logic';
import {
	BrazeCards,
	BrazeMessages,
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
import { getInitialisedAppboy } from './initialiseAppboy';

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
				const appboy = await getInitialisedAppboy(apiKey);
				appboy.wipeData();
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

export const buildBrazeMessaging = async (
	idApiUrl: string,
	isSignedIn: boolean,
	renderingTarget: RenderingTarget,
): Promise<{
	brazeMessages: BrazeMessagesInterface;
	brazeCards: BrazeCardsInterface;
}> => {
	if (!storage.local.isAvailable()) {
		// we require local storage for using any message channel so that we know
		// when to clear up user data from the device on logout
		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
		};
	}

	const dependenciesResult = await checkBrazeDependencies(
		isSignedIn,
		idApiUrl,
	);

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
		};
	}

	try {
		const { endPerformanceMeasure } = startPerformanceMeasure(
			'tx',
			'braze-sdk-load',
		);

		const appboy = await getInitialisedAppboy(
			dependenciesResult.data.apiKey as string,
		);

		const sdkLoadTimeTaken = endPerformanceMeasure();
		const ophan = await getOphan(renderingTarget);
		ophan.record({
			component: 'braze-sdk-load-timing',
			value: sdkLoadTimeTaken,
		});

		const errorHandler = (error: Error, desc: string) => {
			window.guardian.modules.sentry.reportError(error, desc);
		};

		setHasCurrentBrazeUser();
		appboy.changeUser(dependenciesResult.data.brazeUuid as string);
		appboy.openSession();

		const brazeCards = window.guardian.config.switches.brazeContentCards
			? new BrazeCards(appboy, errorHandler)
			: new NullBrazeCards();
		const brazeMessages = new BrazeMessages(
			appboy,
			LocalMessageCache,
			errorHandler,
		);
		return { brazeMessages, brazeCards };
	} catch {
		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
		};
	}
};
