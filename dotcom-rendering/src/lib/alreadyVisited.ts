import { onConsent } from '@guardian/consent-management-platform';
import { storage } from '@guardian/libs';

/**
 * This local storage item is used to target ads if a user has the correct consents
 */
const AlreadyVisitedKey = 'gu.alreadyVisited';

const getAlreadyVisitedCount = (): number => {
	const alreadyVisited = parseInt(
		storage.local.getRaw(AlreadyVisitedKey) ?? '',
		10,
	);
	return !Number.isNaN(alreadyVisited) ? alreadyVisited : 0;
};

export const incrementAlreadyVisited = async (): Promise<void> => {
	const { canTarget } = await onConsent();
	if (canTarget) {
		const alreadyVisited = getAlreadyVisitedCount() + 1;
		storage.local.setRaw(AlreadyVisitedKey, alreadyVisited.toString());
	} else {
		storage.local.remove(AlreadyVisitedKey);
	}
};
