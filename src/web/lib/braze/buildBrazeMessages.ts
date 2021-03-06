import {
	hasCurrentBrazeUser,
	setHasCurrentBrazeUser,
	clearHasCurrentBrazeUser,
} from '@root/src/web/lib/hasCurrentBrazeUser';
import { initPerf } from '@root/src/web/browser/initPerf';
import { record } from '@root/src/web/browser/ophan/ophan';
import { BrazeMessages, BrazeMessagesInterface } from './BrazeMessages';
import { checkBrazeDependencies } from './checkBrazeDependencies';
import { getInitialisedAppboy, SDK_OPTIONS } from './initialiseAppboy';
import { NullBrazeMessages } from './NullBrazeMessages';

const maybeWipeUserData = async (
	apiKey?: string,
	brazeUuid?: null | string,
): Promise<void> => {
	if (apiKey && !brazeUuid && hasCurrentBrazeUser()) {
		const appboy = await getInitialisedAppboy(apiKey);

		try {
			appboy.wipeData();
			clearHasCurrentBrazeUser();
		} catch (error) {
			window.guardian.modules.sentry.reportError(error, 'braze-banner');
		}
	}
};

export const buildBrazeMessages = async (
	isSignedIn: boolean,
	idApiUrl: string,
): Promise<BrazeMessagesInterface> => {
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

		const brazeMessages = new BrazeMessages(appboy);

		appboy.changeUser(dependenciesResult.data.brazeUuid as string);
		appboy.openSession();
		setHasCurrentBrazeUser();

		return brazeMessages;
	} catch {
		return new NullBrazeMessages();
	}
};
