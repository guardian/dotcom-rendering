import type { FEFrontCard } from '../frontend/feFront';
import type { EditionId } from '../lib/edition';
import type { DCRContainerType, DCRGroupedTrails } from '../types/front';
import { enhanceCards } from './enhanceCards';

/**
 * Groups cards based on their group specified in fronts tool
 *
 * NB: Dynamic containers are now deprecated
 * For 'dynamic' container types in fronts tool, cards can be grouped by sizes:
 *  - Snap (dynamic/package only)
 *  - Huge
 *  - Very big
 *  - Big
 *  - Standard
 *
 * * For newer 'flexible' container types in fronts tool, cards can be grouped by sizes:
 *  - Snap (flexible/special only)
 *  - Splash (flexible/general only)
 *  - Standard
 *
 * This can be consumed by the rendering layer to tell us how we should size each card, which
 * can vary by container type.
 *
 * Backfilled cards are always considered 'standard'.
 *
 * @returns Card arrays grouped into 'snap', 'huge', 'veryBig', 'big' and 'standard'
 */
export const groupCards = (
	container: DCRContainerType,
	curated: FEFrontCard[],
	backfill: FEFrontCard[],
	editionId: EditionId,
	discussionApiUrl: string,
	isLoopingVideoTest: boolean,
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
				discussionApiUrl,
				offset,
				isLoopingVideoTest,
			});

			return {
				snap: [],
				huge: [],
				veryBig: [],
				big: [],
				splash: enhanceCards(splash, enhanceOptions()),
				standard: enhanceCards(standard, enhanceOptions(splash.length)),
			};
		}
		case 'flexible/special': {
			const snap = curated.filter(({ card }) => card.group === '1');

			// Backfilled cards will always be treated as 'standard' cards
			const standard = [
				...curated.filter(({ card }) => card.group === '0'),
				...backfill,
			];
			const enhanceOptions = (offset = 0) => ({
				cardInTagPage: false,
				editionId,
				discussionApiUrl,
				offset,
				isLoopingVideoTest,
			});

			return {
				// Splash is not supported on these container types
				splash: [],
				huge: [],
				veryBig: [],
				big: [],
				// Only 'snap' and 'standard' are supported by dynamic/package
				snap: enhanceCards(snap, enhanceOptions()),
				standard: enhanceCards(standard, enhanceOptions(snap.length)),
			};
		}
		default:
			// All other container types do not support grouping
			return {
				splash: [],
				snap: [],
				huge: [],
				veryBig: [],
				big: [],
				standard: [],
			};
	}
};
