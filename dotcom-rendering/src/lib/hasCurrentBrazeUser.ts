const KEY = 'gu.brazeUserSet';

const hasCurrentBrazeUser = (): boolean => {
	// eslint-disable-next-line no-restricted-syntax -- FIXME-libs-storage
	return localStorage.getItem(KEY) === 'true';
};

const setHasCurrentBrazeUser = (): void => {
	// eslint-disable-next-line no-restricted-syntax -- FIXME-libs-storage
	localStorage.setItem(KEY, 'true');
};

const clearHasCurrentBrazeUser = (): void => {
	// eslint-disable-next-line no-restricted-syntax -- FIXME-libs-storage
	localStorage.removeItem(KEY);
};

export {
	hasCurrentBrazeUser,
	setHasCurrentBrazeUser,
	clearHasCurrentBrazeUser,
};
