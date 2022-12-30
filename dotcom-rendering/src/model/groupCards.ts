import type {
	DCRContainerPalette,
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
	containerPalette?: DCRContainerPalette,
): DCRGroupedTrails => {
	switch (container) {
		case 'dynamic/slow-mpu':
			return {
				// Only big and standard cards are supported on dynamic/slow-mpu
				snap: [],
				huge: [],
				veryBig: [],
				big: enhanceCards(
					curated.filter(({ card }) => card.group === '1'),
					containerPalette,
				),
				standard: enhanceCards(
					// Backfilled cards will always be treated as 'standard' cards
					curated.filter(({ card }) => card.group === '0').concat(backfill),
					containerPalette,
				),
			};
		case 'dynamic/fast':
		case 'dynamic/slow':
			return {
				// Snap is not supported on these container types
				snap: [],
				huge: enhanceCards(
					curated.filter(({ card }) => card.group === '3'),
					containerPalette,
				),
				veryBig: enhanceCards(
					curated.filter(({ card }) => card.group === '2'),
					containerPalette,
				),
				big: enhanceCards(
					curated.filter(({ card }) => card.group === '1'),
					containerPalette,
				),
				standard: enhanceCards(
					// Backfilled cards will always be treated as 'standard' cards
					curated.filter(({ card }) => card.group === '0').concat(backfill),
					containerPalette,
				),
			};
		case 'dynamic/package':
			return {
				huge: [],
				veryBig: [],
				big: [],
				// Only 'snap' and 'standard' are supported by dynamic/package
				snap: enhanceCards(
					curated.filter(({ card }) => card.group === '1'),
					containerPalette,
				),
				standard: enhanceCards(
					// Backfilled cards will always be treated as 'standard' cards
					curated.filter(({ card }) => card.group === '0').concat(backfill),
					containerPalette,
				),
			};
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
