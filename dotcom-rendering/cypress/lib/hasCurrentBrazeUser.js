const KEY = 'gu.brazeUserSet';

const hasCurrentBrazeUser = () => {
	return localStorage.getItem(KEY) === 'true';
};

const setHasCurrentBrazeUser = () => {
	localStorage.setItem(KEY, 'true');
};

const clearHasCurrentBrazeUser = () => {
	localStorage.removeItem(KEY);
};

export {
	hasCurrentBrazeUser,
	setHasCurrentBrazeUser,
	clearHasCurrentBrazeUser,
};
