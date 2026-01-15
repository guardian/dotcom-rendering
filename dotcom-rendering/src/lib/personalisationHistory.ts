import { storage } from '@guardian/libs';

type CardEvent = 'VIEW' | 'CLICK';

export const DemotedCardsHistoryKey = 'gu.history.demotedCards';
export const ViewedCardsHistoryKey = 'gu.history.viewedCards';

const MAX_VIEW_COUNT = 2;

type DemotedCardsState = string[];
const isValidDemotedState = (history: unknown): history is DemotedCardsState =>
	Array.isArray(history) && history.every((card) => typeof card === 'string');

/* Retrieve the user's demoted card state from local storage */
export const getDemotedState = (): DemotedCardsState | undefined => {
	try {
		const demotedCardHistory = storage.local.get(DemotedCardsHistoryKey);

		if (!isValidDemotedState(demotedCardHistory)) {
			throw new Error(`Invalid ${DemotedCardsHistoryKey} value`);
		}

		return demotedCardHistory;
	} catch (e) {
		/* error parsing the string, so remove the key */
		storage.local.remove(DemotedCardsHistoryKey);
		return undefined;
	}
};
