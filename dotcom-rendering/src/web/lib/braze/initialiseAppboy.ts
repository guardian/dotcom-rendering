import type appboy from '@braze/web-sdk-core';
import { log } from '@guardian/libs';

const SDK_OPTIONS: appboy.InitializationOptions = {
	baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
	devicePropertyAllowlist: [],
	enableLogging: true,
	minimumIntervalBetweenTriggerActionsInSeconds: 0,
	noCookies: true,
	sessionTimeoutInSeconds: 1,
};

const initialiseAppboy = async (apiKey: string): Promise<typeof appboy> => {
	const importedAppboy = (await import(
		/* webpackChunkName: "braze-web-sdk-core" */ '@braze/web-sdk-core'
	)) as unknown as typeof appboy;

	importedAppboy.setLogger((message) => log('tx', message));
	importedAppboy.initialize(apiKey, SDK_OPTIONS);

	return importedAppboy;
};

const getInitialisedAppboy = (() => {
	let cache: Promise<typeof appboy>;

	return (apiKey: string): Promise<typeof appboy> => {
		if (cache === undefined) {
			cache = initialiseAppboy(apiKey);
		}

		return cache;
	};
})();

export { getInitialisedAppboy, SDK_OPTIONS };
