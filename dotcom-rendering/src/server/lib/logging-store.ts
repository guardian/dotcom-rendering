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

import { AsyncLocalStorage } from 'node:async_hooks';

type DCRLoggingStore = {
	request: {
		pageId: string;
		path: string;
		method: string;
		type?: string;
		platform?: string;
	};
	timing: { [key: string]: number };
	error?: {
		message?: string;
		stack?: string;
	};
};

export const loggingStore = new AsyncLocalStorage<DCRLoggingStore>();

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

export const recordPageId = (pageId: string): void => {
	const { request } = loggingStore.getStore() ?? {};

	if (request) {
		request.pageId = pageId;
	}
};

type RecordablePeriod = 'total' | 'json' | 'enhance' | 'render';

export const recordTimeStart = (metric: RecordablePeriod): void => {
	const { timing } = loggingStore.getStore() ?? {};

	if (timing) {
		timing[metric] = Date.now();
	}
};

export const recordTimeStop = (metric: RecordablePeriod): void => {
	const { timing } = loggingStore.getStore() ?? {};

	if (timing) {
		timing[metric] = timing[metric] ?? 0 - Date.now();
	}
};

export const recordError = (error: unknown): void => {
	const store = loggingStore.getStore();

	if (store && typeof error === 'string') {
		store.error = {
			message: error,
		};
		return;
	}

	if (store && error && typeof error === 'object') {
		store.error = {
			message:
				'message' in error && typeof error.message === 'string'
					? error.message
					: 'Unknown Message',
			stack:
				'stack' in error && typeof error.stack === 'string'
					? error.stack
					: 'Unknown Message',
		};
	}
};
