import * as braze from '@braze/web-sdk';
import { isUndefined, log } from '@guardian/libs';

const SDK_OPTIONS: braze.InitializationOptions = {
	enableLogging: true,
	noCookies: true,
	baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
	sessionTimeoutInSeconds: 1,
	minimumIntervalBetweenTriggerActionsInSeconds: 0,
	devicePropertyAllowlist: [],
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
