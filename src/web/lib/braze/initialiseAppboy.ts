import type appboy from '@braze/web-sdk-core';

const SDK_OPTIONS: appboy.InitializationOptions = {
	enableLogging: false,
	noCookies: true,
	baseUrl: 'https://sdk.fra-01.braze.eu/api/v3',
	sessionTimeoutInSeconds: 1,
	minimumIntervalBetweenTriggerActionsInSeconds: 0,
	devicePropertyAllowlist: [],
};

const initialiseAppboy = async (apiKey: string): Promise<typeof appboy> => {
	const importedAppboy = ((await import(
		/* webpackChunkName: "braze-web-sdk-core" */ '@braze/web-sdk-core'
	)) as unknown) as typeof appboy;

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
