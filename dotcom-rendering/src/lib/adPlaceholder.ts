import type { AdPlaceholderSlot, FEElement } from '../types/content';

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

const insertPlaceholder = (
	elements: FEElement[],
	numberOfAdsInserted: Accumulator['numberOfAdsInserted'],
): FEElement[] => {
	const placeholder: AdPlaceholderSlot = {
		_type: 'model.dotcomrendering.pageElements.AdPlaceholderSlot',
		// We only insert square ads for the first ad in the article
		isSquare: numberOfAdsInserted === 0,
	};
	return [...elements, placeholder];
};

/**
 * Inserts advert placeholders
 */
const adPlaceholder = (elements: FEElement[]): FEElement[] => {
	const elementsWithAds = elements.reduce(
		(acc: Accumulator, el: FEElement, idx: number): Accumulator => {
			const isLastElement = elements.length === idx + 1;

			const {
				elements: prevElements,
				paragraphCounter: prevParagraphCounter,
				numberOfAdsInserted: prevNumberOfAdsInserted,
			} = acc;

			const currentParagraphCounter =
				el._type ===
				'model.dotcomrendering.pageElements.TextBlockElement'
					? prevParagraphCounter + 1
					: prevParagraphCounter;

			const shouldInsertAd = isSuitablePosition(
				currentParagraphCounter,
				prevNumberOfAdsInserted,
				isLastElement,
			);

			const currentElements = shouldInsertAd
				? insertPlaceholder(prevElements, prevNumberOfAdsInserted)
				: prevElements;

			const currentNumberOfAdsInserted = shouldInsertAd
				? prevNumberOfAdsInserted + 1
				: prevNumberOfAdsInserted;

			return {
				elements: currentElements,
				paragraphCounter: currentParagraphCounter,
				numberOfAdsInserted: currentNumberOfAdsInserted,
			};
		},
		{
			elements: [],
			paragraphCounter: 0,
			numberOfAdsInserted: 0,
		},
	);

	return elementsWithAds.elements;
};
