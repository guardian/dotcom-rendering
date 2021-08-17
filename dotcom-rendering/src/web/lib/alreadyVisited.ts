const AlreadyVisitedKey = 'gu.alreadyVisited';

export const getAlreadyVisitedCount = (): number => {
	const alreadyVisited = parseInt(
		localStorage.getItem(AlreadyVisitedKey) || '',
		10,
	);
	return !Number.isNaN(alreadyVisited) ? alreadyVisited : 0;
};

export const setAlreadyVisited = (count: number): void => {
	localStorage.setItem(AlreadyVisitedKey, count.toString());
};

export const incrementAlreadyVisited = () => {
	const alreadyVisited = getAlreadyVisitedCount();
	setAlreadyVisited(alreadyVisited + 1);
};
