import { enhanceCards } from './enhanceCards';

/**
 * Groups cards based on their group specified in fronts tool
 *
 * For 'dynamic' container types in fronts tool, cards can be grouped by sizes:
 *  - Huge
 *  - Very big
 *  - Big
 *  - Standard
 *
 * This can be consumed by the rendering layer to tell us how we should size each card, which
 * can very by container type.
 *
 * Backfilled cards are always considered 'standard'.
 *
 * @param curated
 * @param backfill
 * @param containerPalette
 * @returns Card arrays grouped into 'huge', 'veryBig', 'big' and 'standard'
 */
export const groupCards = (
	curated: FEFrontCard[],
	backfill: FEFrontCard[],
	containerPalette?: DCRContainerPalette,
): DCRGroupedTrails => {
	return {
		huge: enhanceCards(
			curated.filter((card) => card.card.group === '3'),
			containerPalette,
		),
		veryBig: enhanceCards(
			curated.filter((card) => card.card.group === '2'),
			containerPalette,
		),
		big: enhanceCards(
			curated.filter((card) => card.card.group === '1'),
			containerPalette,
		),
		standard: enhanceCards(
			// Backfilled cards will always be treated as 'standard' cards
			curated.filter((card) => card.card.group === '0').concat(backfill),
			containerPalette,
		),
	};
};
