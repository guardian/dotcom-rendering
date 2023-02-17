/**
 * This module allows data about requests to be passed down to our logger without having to rely on prop drilling.
 *
 * This makes it easy for us to log info in a component deep in our component tree and have data such as the pageId and platform
 * without the hassle of trying to get that data to it.
 *
 * We also take care of recording timings for data enhancement, and render time from this module and logging per request.
 *
 * For simplicity we're using Node 16's AsyncLocalStorage to handle state instead of any 3rd party dependency like Redux or React Context.
 */

import { AsyncLocalStorage } from 'async_hooks';

type DCRLoggingStore = {
	request: {
		pageId: string;
		path: string;
		method: string;
		type?: string;
		platform?: string;
	};
	timing: {
		enhance?: number;
		render?: number;
		total?: number;
	};
};

export const loggingStore = new AsyncLocalStorage<DCRLoggingStore>();

export const recordEnhanceTime = <T>(parse: () => T): T => {
	const { timing } = loggingStore.getStore() ?? {};
	const start = Date.now();

	const result = parse();

	if (timing) {
		timing.enhance = Date.now() - start;
	}

	return result;
};

export const recordRenderTime = <T>(parse: () => T): T => {
	const { timing } = loggingStore.getStore() ?? {};
	const start = Date.now();

	const result = parse();

	if (timing) {
		timing.render = Date.now() - start;
	}

	return result;
};

export const recordTotalTime = (time: number): void => {
	const { timing } = loggingStore.getStore() ?? {};

	if (timing) {
		timing.total = time;
	}
};

export const recordTypeAndPlatform = (
	type: string,
	platform?: string,
): void => {
	const { request } = loggingStore.getStore() ?? {};

	if (request) {
		request.type = type;
		request.platform = platform;
	}
};
