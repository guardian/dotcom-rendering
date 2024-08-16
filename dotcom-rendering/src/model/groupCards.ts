import type { EditionId } from '../lib/edition';
import type {
	DCRContainerType,
	DCRGroupedTrails,
	FEFrontCard,
} from '../types/front';
import { enhanceCards } from './enhanceCards';

/**
 * Groups cards based on their group specified in fronts tool
 *
 * For 'dynamic' container types in fronts tool, cards can be grouped by sizes:
 *  - Snap (dynamic/package only)
 *  - Huge
 *  - Very big
 *  - Big
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
): DCRGroupedTrails => {
	switch (container) {
		case 'dynamic/slow-mpu': {
			const big = curated.filter(({ card }) => card.group === '1');
			return {
				// Only big and standard cards are supported on dynamic/slow-mpu
				snap: [],
				huge: [],
				veryBig: [],
				big: enhanceCards(big, {
					cardInTagPage: false,
					editionId,
					discussionApiUrl,
				}),
				standard: enhanceCards(
					// Backfilled cards will always be treated as 'standard' cards
					curated
						.filter(({ card }) => card.group === '0')
						.concat(backfill),
					{
						cardInTagPage: false,
						offset: big.length,
						editionId,
						discussionApiUrl,
					},
				),
			};
		}
		case 'dynamic/fast':
		case 'dynamic/slow': {
			const huge = curated.filter(({ card }) => card.group === '3');
			const veryBig = curated.filter(({ card }) => card.group === '2');
			const big = curated.filter(({ card }) => card.group === '1');
			return {
				// Snap is not supported on these container types
				snap: [],
				huge: enhanceCards(huge, {
					cardInTagPage: false,
					editionId,
					discussionApiUrl,
				}),
				veryBig: enhanceCards(veryBig, {
					cardInTagPage: false,
					offset: huge.length,
					editionId,
					discussionApiUrl,
				}),
				big: enhanceCards(big, {
					cardInTagPage: false,
					offset: huge.length + veryBig.length,
					editionId,
					discussionApiUrl,
				}),
				standard: enhanceCards(
					// Backfilled cards will always be treated as 'standard' cards
					curated
						.filter(({ card }) => card.group === '0')
						.concat(backfill),
					{
						cardInTagPage: false,
						offset: huge.length + veryBig.length + big.length,
						editionId,
						discussionApiUrl,
					},
				),
			};
		}
		case 'flexible/special':
		case 'dynamic/package': {
			const snap = curated.filter(({ card }) => card.group === '1');
			return {
				huge: [],
				veryBig: [],
				big: [],
				// Only 'snap' and 'standard' are supported by dynamic/package
				snap: enhanceCards(snap, {
					cardInTagPage: false,
					editionId,
					discussionApiUrl,
				}),
				standard: enhanceCards(
					// Backfilled cards will always be treated as 'standard' cards
					curated
						.filter(({ card }) => card.group === '0')
						.concat(backfill),
					{
						cardInTagPage: false,
						offset: snap.length,
						editionId,
						discussionApiUrl,
					},
				),
			};
		}
		default:
			// All other container types do not support grouping
			return {
				snap: [],
				huge: [],
				veryBig: [],
				big: [],
				standard: [],
			};
	}
};
