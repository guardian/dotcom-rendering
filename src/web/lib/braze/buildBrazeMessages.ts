import {
	hasCurrentBrazeUser,
	setHasCurrentBrazeUser,
	clearHasCurrentBrazeUser,
} from '@root/src/web/lib/hasCurrentBrazeUser';
import { initPerf } from '@root/src/web/browser/initPerf';
import { record } from '@root/src/web/browser/ophan/ophan';
import {
	BrazeMessages,
	BrazeMessagesInterface,
	LocalMessageCache,
	NullBrazeMessages,
} from '@guardian/braze-components/logic';
import { storage } from '@guardian/libs';
import { checkBrazeDependencies } from './checkBrazeDependencies';
import { getInitialisedAppboy, SDK_OPTIONS } from './initialiseAppboy';

const maybeWipeUserData = async (
	apiKey?: string,
	brazeUuid?: null | string,
	consent?: boolean,
): Promise<void> => {
	const userHasLoggedOut = !brazeUuid && hasCurrentBrazeUser();
	const userHasRemovedConsent = !consent && hasCurrentBrazeUser();

	if (userHasLoggedOut || userHasRemovedConsent) {
		try {
			if (apiKey) {
				const appboy = await getInitialisedAppboy(apiKey);
				appboy.wipeData();
			}
			LocalMessageCache.clear();
			clearHasCurrentBrazeUser();
		} catch (error) {
			window.guardian.modules.sentry.reportError(
				error,
				'braze-maybeWipeUserData',
			);
		}
	}
};

export const buildBrazeMessages = async (
	isSignedIn: boolean,
	idApiUrl: string,
): Promise<BrazeMessagesInterface> => {
	if (!storage.local.isAvailable()) {
		return new NullBrazeMessages();
	}

	const dependenciesResult = await checkBrazeDependencies(
		isSignedIn,
		idApiUrl,
	);

	if (!dependenciesResult.isSuccessful) {
		const { failure, data } = dependenciesResult;

		if (SDK_OPTIONS.enableLogging) {
			console.log(
				`Not attempting to show Braze messages. Dependency ${failure.field} failed with ${failure.data}.`,
			);
		}

		await maybeWipeUserData(
			data.apiKey as string | undefined,
			data.brazeUuid as string | null | undefined,
			data.consent as boolean | undefined,
		);

		return new NullBrazeMessages();
	}

	try {
		const sdkLoadTiming = initPerf('braze-sdk-load');
		sdkLoadTiming.start();

		const appboy = await getInitialisedAppboy(
			dependenciesResult.data.apiKey as string,
		);

		const sdkLoadTimeTaken = sdkLoadTiming.end();
		record({
			component: 'braze-sdk-load-timing',
			value: sdkLoadTimeTaken,
		});

		const errorHandler = (error: Error, desc: string) => {
			window.guardian.modules.sentry.reportError(error, desc);
		};
		const brazeMessages = new BrazeMessages(
			appboy,
			LocalMessageCache,
			errorHandler,
		);

		setHasCurrentBrazeUser();
		appboy.changeUser(dependenciesResult.data.brazeUuid as string);
		appboy.openSession();

		return brazeMessages;
	} catch {
		return new NullBrazeMessages();
	}
};
