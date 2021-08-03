const KEY = 'gu.brazeUserSet';

const hasCurrentBrazeUser = (): boolean => {
	return localStorage.getItem(KEY) === 'true';
};

const setHasCurrentBrazeUser = (): void => {
	localStorage.setItem(KEY, 'true');
};

const clearHasCurrentBrazeUser = (): void => {
	localStorage.removeItem(KEY);
};

export {
	hasCurrentBrazeUser,
	setHasCurrentBrazeUser,
	clearHasCurrentBrazeUser,
};
