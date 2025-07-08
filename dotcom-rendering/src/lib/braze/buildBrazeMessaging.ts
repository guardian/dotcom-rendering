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
		braze.openSession();

		const brazeCards = window.guardian.config.switches.brazeContentCards
			? new BrazeCards(braze, errorHandler)
			: new NullBrazeCards();
		const brazeMessages = new BrazeMessages(
			braze,
			LocalMessageCache,
			errorHandler,
			canRenderBrazeMsg,
		);
		return { brazeMessages, brazeCards };
	} catch {
		return {
			brazeMessages: new NullBrazeMessages(),
			brazeCards: new NullBrazeCards(),
		};
	}
};
