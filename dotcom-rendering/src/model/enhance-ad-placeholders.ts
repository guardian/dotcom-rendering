import type { AdPlaceholderSlot, FEElement } from '../types/content';

type ReducerAccumulator = {
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
 */
const isSuitablePosition = (
	paragraphIdx: number,
	numAdsInserted: number,
	isLastElement: boolean,
): boolean => {
	// Rules for ad placement
	const adEveryNParagraphs = 6;
	const firstAdIndex = 3;
	const maxAds = 15;

	// Don't insert more than `maxAds` ads
	if (numAdsInserted >= maxAds) {
		return false;
	}

	// Don't insert advert in final position
	if (isLastElement) {
		return false;
	}

	// We want to insert an ad placeholder every `adEveryNParagraphs`
	// paragraphs, starting from the paragraph at `firstAdIndex`
	return (paragraphIdx - firstAdIndex) % adEveryNParagraphs === 0;
};

const isParagraph = (element: FEElement) =>
	element._type === 'model.dotcomrendering.pageElements.TextBlockElement';

const insertPlaceholder = (
	elements: FEElement[],
	numberOfAdsInserted: number,
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
const insertAdPlaceholders = (elements: FEElement[]): FEElement[] => {
	const elementsWithAds = elements.reduce(
		(
			prev: ReducerAccumulator,
			currentElement: FEElement,
			idx: number,
		): ReducerAccumulator => {
			const paragraphCounter = isParagraph(currentElement)
				? prev.paragraphCounter + 1
				: prev.paragraphCounter;

			const shouldInsertAd = isSuitablePosition(
				paragraphCounter,
				prev.numberOfAdsInserted,
				elements.length === idx + 1,
			);

			return {
				elements: shouldInsertAd
					? insertPlaceholder(prev.elements, prev.numberOfAdsInserted)
					: prev.elements,
				paragraphCounter,
				numberOfAdsInserted: shouldInsertAd
					? prev.numberOfAdsInserted + 1
					: prev.numberOfAdsInserted,
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

export const enhanceAdPlaceholders = (blocks: Block[]): Block[] =>
	blocks.map((b) => ({
		...b,
		elements: insertAdPlaceholders(b.elements),
	}));
