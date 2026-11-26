import type { FEFrontCard } from '../frontend/feFront';
import type { EditionId } from '../lib/edition';
import type { Switches } from '../types/config';
import type { DCRContainerType, DCRGroupedTrails } from '../types/front';
import { enhanceCards } from './enhanceCards';

/**
 * Groups cards based on their group specified in fronts tool
 *
 * For the 'flexible/general' container type in fronts tool, cards can be grouped by sizes:
 *  - Splash
 *  - Standard
 *
 * This can be consumed by the rendering layer to tell us how we should present each card.
 *
 * Backfilled cards are always considered 'standard'.
 *
 * @returns Card arrays grouped into 'splash' and 'standard'
 */
export const groupCards = (
	container: DCRContainerType,
	curated: FEFrontCard[],
	backfill: FEFrontCard[],
	editionId: EditionId,
	discussionApiUrl: string,
	stripBranding: boolean = false,
	serverSideABTests: Record<string, string>,
	pageId: string,
	featureSwitches: Switches,
): DCRGroupedTrails => {
	switch (container) {
		case 'flexible/general': {
			const splash = [
				...curated.filter(({ card }) => card.group === '3'),
				...backfill.filter(({ card }) => card.group === '3'),
			];

			// Backfilled cards have been allocated to groups based on the max items in each group
			const standard = [
				...curated.filter(({ card }) => card.group !== '3'),
				...backfill.filter(({ card }) => card.group !== '3'),
			];

			const enhanceOptions = (offset = 0) => ({
				cardInTagPage: false,
				editionId,
				pageId,
				discussionApiUrl,
				offset,
				stripBranding,
				serverSideABTests,
				featureSwitches,
			});

			return {
				splash: enhanceCards(splash, enhanceOptions()),
				standard: enhanceCards(standard, enhanceOptions(splash.length)),
			};
		}
		default:
			// All other container types do not support grouping
			return {
				splash: [],
				standard: [],
			};
	}
};
