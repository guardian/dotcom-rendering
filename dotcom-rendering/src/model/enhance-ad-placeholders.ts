import { ArticleDesign } from '@guardian/libs';
import type { AdPlaceholderBlockElement, FEElement } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';

/**
 * Positioning rules:
 *
 * - Is further than 3 blocks in
 * - Is at least 6 blocks after the previous ad
 * - No more than 15 ads in an article
 * - Last block should not be followed by an ad
 */
const isSuitablePosition = (
	blockCounter: number,
	numberOfAdsInserted: number,
	previousAdIndex: number,
	isLastElement: boolean,
	isParagraph: boolean,
): boolean => {
	// Rules for ad placement
	const adEveryNBlocks = 6;
	const firstAdIndex = 3;
	const maxAds = 15;

	// Don't insert more than `maxAds` ads
	if (numberOfAdsInserted >= maxAds) {
		return false;
	}

	// Don't insert advert in final position
	if (isLastElement) {
		return false;
	}

	// Checks that we haven't inserted an ad yet, and that we are far enough in to do so
	const isFirstAdIndex =
		blockCounter >= firstAdIndex && previousAdIndex === 0;

	const isEnoughBlocksAfter =
		blockCounter - previousAdIndex >= adEveryNBlocks;

	// Insert an ad placeholder when we're at least `adEveryNParagraphs` blocks after the
	// previous ad, starting from the paragraph at `firstAdIndex` and only after a paragraph
	return isParagraph && (isFirstAdIndex || isEnoughBlocksAfter);
};

const isParagraph = (element: FEElement) =>
	element._type === 'model.dotcomrendering.pageElements.TextBlockElement';

const isImage = (element: FEElement) =>
	element._type === 'model.dotcomrendering.pageElements.ImageBlockElement';

const insertPlaceholder = (elements: FEElement[]): FEElement[] => {
	const placeholder: AdPlaceholderBlockElement = {
		_type: 'model.dotcomrendering.pageElements.AdPlaceholderBlockElement',
	};
	return [...elements, placeholder];
};

type ReducerAccumulator = {
	elements: FEElement[];
	blockCounter: number;
	previousAdIndex: number;
	numberOfAdsInserted: number;
};

/**
 * Inserts advert placeholders
 */
const insertAdPlaceholders = (elements: FEElement[]): FEElement[] => {
	const elementsWithReducerContext = elements.reduce(
		(
			prev: ReducerAccumulator,
			currentElement: FEElement,
			idx: number,
		): ReducerAccumulator => {
			const blockCounter =
				isParagraph(currentElement) || isImage(currentElement)
					? prev.blockCounter + 1
					: prev.blockCounter;

			const shouldInsertAd = isSuitablePosition(
				blockCounter,
				prev.numberOfAdsInserted,
				prev.previousAdIndex,
				elements.length === idx + 1,
				isParagraph(currentElement),
			);

			const currentElements = [...prev.elements, currentElement];

			return {
				elements: shouldInsertAd
					? insertPlaceholder(currentElements)
					: currentElements,
				blockCounter,
				previousAdIndex: shouldInsertAd
					? blockCounter
					: prev.previousAdIndex,
				numberOfAdsInserted: shouldInsertAd
					? prev.numberOfAdsInserted + 1
					: prev.numberOfAdsInserted,
			};
		},
		// Initial value for reducer function
		{
			elements: [],
			blockCounter: 0,
			previousAdIndex: 0,
			numberOfAdsInserted: 0,
		},
	);

	return elementsWithReducerContext.elements;
};

export const enhanceAdPlaceholders =
	(format: ArticleFormat, renderingTarget: RenderingTarget) =>
	(blocks: Block[]): Block[] =>
		renderingTarget === 'Apps' &&
		format.design !== ArticleDesign.LiveBlog &&
		format.design !== ArticleDesign.DeadBlog
			? blocks.map((b) => ({
					...b,
					elements: insertAdPlaceholders(b.elements),
			  }))
			: blocks;
