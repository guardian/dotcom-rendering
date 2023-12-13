import { onConsent } from '@guardian/consent-management-platform';

/**
 * This local storage item is used to target ads if a user has the correct consents
 */
const AlreadyVisitedKey = 'gu.alreadyVisited';

const getAlreadyVisitedCount = (): number => {
	const alreadyVisited = parseInt(
		localStorage.getItem(AlreadyVisitedKey) ?? '',
		10,
	);
	return !Number.isNaN(alreadyVisited) ? alreadyVisited : 0;
};

const setAlreadyVisited = (count: number): void => {
	localStorage.setItem(AlreadyVisitedKey, count.toString());
};

export const incrementAlreadyVisited = (): Promise<void> =>
	onConsent().then((consentState) => {
		if (consentState.canTarget) {
			const alreadyVisited = getAlreadyVisitedCount();
			setAlreadyVisited(alreadyVisited + 1);
		} else {
			localStorage.removeItem(AlreadyVisitedKey);
		}
	});
