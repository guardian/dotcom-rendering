import type { FEElement } from '../types/content';

type Accumulator = {
	elements: FEElement[];
	paragraphCounter: number;
	numberOfAdsInserted: number;
};

/**
 * Positioning rules:
 *
 * - Is further than 3 paragraphs in
 * - Is every 6 paragraphs
 * - No more than 15 ads in an article
 * - Last paragraph should not be followed by an ad
 *
 * @param paragraphCounter
 * @param numberOfAdsInserted
 */
const isSuitablePosition = (
	paragraphCounter: number,
	numberOfAdsInserted: number,
	isLastElement: boolean,
): boolean => {
	const adEveryNParagraphs = 6;
	const firstAdIndex = 3;
	const totalAds = 15;

	// Don't insert more than 15 ads
	if (numberOfAdsInserted >= totalAds) {
		return false;
	}

	// Don't insert advert in final position
	if (isLastElement) {
		return false;
	}

	// We want to insert an ad placeholder every 6 paragraphs
	// starting from the third paragraph
	return (paragraphCounter - firstAdIndex) % adEveryNParagraphs === 0;
};

const insertPlaceholder = (acc: Accumulator): Accumulator => {};

/**
 * Inserts advert placeholders
 */
const adPlaceholder = (elements: FEElement[]): FEElement[] => {
	const elementsWithAds = elements.reduce(
		(acc: Accumulator, el: FEElement): Accumulator => {
			const isLastElement = elements.length === idx + 1;

			isSuitablePosition(el, acc.paragraphCounter, isLastElement)
				? insertPlaceholder(acc)
				: acc;
		},
		[],
	);

	// TODO - remove the last ad slot if it is in the last paragraph position?
	elementsWithAds;

	return elementsWithAds;
};
