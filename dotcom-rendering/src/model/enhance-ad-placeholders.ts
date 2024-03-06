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
 * - Ad should not appear immediately before an image
 */
const isSuitablePosition = (
	blockCounter: number,
	numberOfAdsInserted: number,
	lastAdIndex: number,
	prevIsParagraphOrImage: boolean,
	isLastElement: boolean,
	isParagraph: boolean,
): boolean => {
	// Rules for ad placement
	const adEveryNBlocks = 6;
	const firstAdIndex = 4;
	const maxAds = 15;

	// Don't insert more than `maxAds` ads
	if (numberOfAdsInserted >= maxAds) {
		return false;
	}

	// Don't insert advert in final position
	if (isLastElement) {
		return false;
	}

	// Check that we haven't inserted an ad yet, and that we are far enough in to do so
	const isFirstAdIndex = blockCounter >= firstAdIndex && lastAdIndex === 0;

	// Check that we are at least `adEveryNParagraphs` blocks after the previous ad
	const isEnoughBlocksAfter = blockCounter - lastAdIndex >= adEveryNBlocks;

	// Insert an ad placeholder before the current element if it is a paragraph, the
	// previous element was an image or a paragraph, and if the position is eligible
	return (
		isParagraph &&
		prevIsParagraphOrImage &&
		(isFirstAdIndex || isEnoughBlocksAfter)
	);
};

const isParagraph = (element: FEElement) =>
	element._type === 'model.dotcomrendering.pageElements.TextBlockElement';

const isImage = (element: FEElement) =>
	element._type === 'model.dotcomrendering.pageElements.ImageBlockElement';

const insertPlaceholder = (
	prevElements: FEElement[],
	currentElement: FEElement,
): FEElement[] => {
	const placeholder: AdPlaceholderBlockElement = {
		_type: 'model.dotcomrendering.pageElements.AdPlaceholderBlockElement',
	};
	return [...prevElements, placeholder, currentElement];
};

/**
 * - blockCounter: the number of paragraphs and images that we've counted when considering ad insertion
 * - lastAdIndex: the index of the most recently inserted ad, used to calculate the blocks between subsequent ads
 * - numberOfAdsInserted: we use this to make sure that our total number of ads on an article does not exceed maxAds
 * - prevIsAParagraphOrImage: we use this to check whether or not the previous element is suitable to insert an ad
 * beneath - we don't want to insert an ad underneath a rich link, for example
 */
type ReducerAccumulator = {
	elements: FEElement[];
	blockCounter: number;
	lastAdIndex: number;
	numberOfAdsInserted: number;
	prevIsParagraphOrImage: boolean;
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
				prev.lastAdIndex,
				prev.prevIsParagraphOrImage,
				elements.length === idx + 1,
				isParagraph(currentElement),
			);

			const currentElements = [...prev.elements, currentElement];

			return {
				elements: shouldInsertAd
					? insertPlaceholder(prev.elements, currentElement)
					: currentElements,
				blockCounter,
				lastAdIndex: shouldInsertAd ? blockCounter : prev.lastAdIndex,
				numberOfAdsInserted: shouldInsertAd
					? prev.numberOfAdsInserted + 1
					: prev.numberOfAdsInserted,
				prevIsParagraphOrImage:
					isParagraph(currentElement) || isImage(currentElement),
			};
		},
		// Initial value for reducer function
		{
			elements: [],
			blockCounter: 0,
			lastAdIndex: 0,
			numberOfAdsInserted: 0,
			prevIsParagraphOrImage: false,
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
