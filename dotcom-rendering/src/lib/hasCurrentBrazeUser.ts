import { storage } from '@guardian/libs';

const KEY = 'gu.brazeUserSet';

const hasCurrentBrazeUser = (): boolean => {
	return storage.local.get(KEY) === 'true';
};

const setHasCurrentBrazeUser = (): void => {
	storage.local.set(KEY, 'true');
};

const clearHasCurrentBrazeUser = (): void => {
	storage.local.remove(KEY);
};

export {
	hasCurrentBrazeUser,
	setHasCurrentBrazeUser,
	clearHasCurrentBrazeUser,
};
