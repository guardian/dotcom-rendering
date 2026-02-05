import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import type { AdPlaceholderBlockElement, FEElement } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';

/**
 * Positioning rules:
 *
 * - Is further than 3 elements in
 * - Is at least 6 elements after the previous ad
 * - No more than 15 ads in an article
 * - Last element should not be followed by an ad
 * - Ad should not appear immediately before an image
 */
const isSuitablePosition = (
	elementCounter: number,
	numberOfAdsInserted: number,
	lastAdIndex: number,
	prevIsParagraphOrImage: boolean,
	isLastElement: boolean,
	isParagraph: boolean,
): boolean => {
	// Rules for ad placement
	const adEveryNElements = 6;
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
	const isFirstAdIndex = elementCounter >= firstAdIndex && lastAdIndex === 0;

	// Check that we are at least `adEveryNElements` elements after the previous ad
	const isEnoughElementsAfter =
		elementCounter - lastAdIndex >= adEveryNElements;

	// Insert an ad placeholder before the current element if it is a paragraph, the
	// previous element was an image or a paragraph, and if the position is eligible
	return (
		isParagraph &&
		prevIsParagraphOrImage &&
		(isFirstAdIndex || isEnoughElementsAfter)
	);
};

const isParagraph = (element: FEElement) =>
	element._type === 'model.dotcomrendering.pageElements.TextBlockElement';

// We don't want to insert an ad after an image that isn't full width as it looks bad
const isEligibleImage = (element: FEElement) =>
	element._type === 'model.dotcomrendering.pageElements.ImageBlockElement' &&
	element.role !== 'thumbnail' &&
	element.role !== 'supporting';

const insertPlaceholder = (
	prevElements: FEElement[],
	currentElement: FEElement,
	adPosition: number,
): FEElement[] => {
	const placeholder: AdPlaceholderBlockElement = {
		_type: 'model.dotcomrendering.pageElements.AdPlaceholderBlockElement',
		adPosition,
	};
	return [...prevElements, placeholder, currentElement];
};

const insertPlaceholderAfterCurrentElement = (
	prevElements: FEElement[],
	currentElement: FEElement,
	adPosition: number,
): FEElement[] => {
	const placeholder: AdPlaceholderBlockElement = {
		_type: 'model.dotcomrendering.pageElements.AdPlaceholderBlockElement',
		adPosition,
	};
	return [...prevElements, currentElement, placeholder];
};

type ReducerAccumulatorGallery = {
	elements: FEElement[];
	imageBlockElementCounter: number;
	adPlaceholderCounter: number;
};

/**
 * Insert ad placeholders for gallery articles.
 * Gallery-specific rules:
 * - Place ads after every 4th image
 * - Start placing ads after the 4th image
 * @param elements - The array of elements to enhance
 * @returns The enhanced array of elements with ad placeholders inserted
 */
const insertAdPlaceholdersForGallery = (elements: FEElement[]): FEElement[] => {
	const elementsWithReducerContext = elements.reduce(
		(
			prev: ReducerAccumulatorGallery,
			currentElement: FEElement,
		): ReducerAccumulatorGallery => {
			const imageBlockElementCounter =
				currentElement._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement'
					? prev.imageBlockElementCounter + 1
					: prev.imageBlockElementCounter;

			const shouldInsertAd = imageBlockElementCounter % 4 === 0;

			return {
				elements: shouldInsertAd
					? insertPlaceholderAfterCurrentElement(
							prev.elements,
							currentElement,
							prev.adPlaceholderCounter,
					  )
					: [...prev.elements, currentElement],
				imageBlockElementCounter,
				adPlaceholderCounter: shouldInsertAd
					? prev.adPlaceholderCounter + 1
					: prev.adPlaceholderCounter,
			};
		},
		// Initial value for reducer function
		{
			elements: [],
			imageBlockElementCounter: 0,
			adPlaceholderCounter: 0,
		},
	);

	return elementsWithReducerContext.elements;
};

/**
 * - elementCounter: the number of paragraphs and images that we've counted when considering ad insertion
 * - lastAdIndex: the index of the most recently inserted ad, used to calculate the elements between subsequent ads
 * - numberOfAdsInserted: we use this to make sure that our total number of ads on an article does not exceed maxAds
 * - prevIsAParagraphOrImage: we use this to check whether or not the previous element is suitable to insert an ad
 * beneath - we don't want to insert an ad underneath a rich link, for example
 */
type ReducerAccumulator = {
	elements: FEElement[];
	elementCounter: number;
	lastAdIndex: number;
	numberOfAdsInserted: number;
	prevIsParagraphOrImage: boolean;
};

const insertAdPlaceholders = (elements: FEElement[]): FEElement[] => {
	const elementsWithReducerContext = elements.reduce(
		(
			prev: ReducerAccumulator,
			currentElement: FEElement,
			idx: number,
		): ReducerAccumulator => {
			const elementCounter =
				isParagraph(currentElement) || isEligibleImage(currentElement)
					? prev.elementCounter + 1
					: prev.elementCounter;

			const shouldInsertAd = isSuitablePosition(
				elementCounter,
				prev.numberOfAdsInserted,
				prev.lastAdIndex,
				prev.prevIsParagraphOrImage,
				elements.length === idx + 1,
				isParagraph(currentElement),
			);

			const currentElements = [...prev.elements, currentElement];

			return {
				elements: shouldInsertAd
					? insertPlaceholder(
							prev.elements,
							currentElement,
							prev.numberOfAdsInserted,
					  )
					: currentElements,
				elementCounter,
				lastAdIndex: shouldInsertAd ? elementCounter : prev.lastAdIndex,
				numberOfAdsInserted: shouldInsertAd
					? prev.numberOfAdsInserted + 1
					: prev.numberOfAdsInserted,
				prevIsParagraphOrImage:
					isParagraph(currentElement) ||
					isEligibleImage(currentElement),
			};
		},
		// Initial value for reducer function
		{
			elements: [],
			elementCounter: 0,
			lastAdIndex: 0,
			numberOfAdsInserted: 0,
			prevIsParagraphOrImage: false,
		},
	);

	return elementsWithReducerContext.elements;
};

export const enhanceAdPlaceholders =
	(
		format: ArticleFormat,
		renderingTarget: RenderingTarget,
		shouldHideAds: boolean,
	) =>
	(elements: FEElement[]): FEElement[] => {
		if (shouldHideAds) return elements;

		// Ads are intentionally disabled for apps interactive articles
		if (
			renderingTarget === 'Apps' &&
			format.design === ArticleDesign.Interactive
		) {
			return elements;
		}

		// In galleries the AdPlaceholders are inserted in both
		// Web & App because the same logic is used for both
		if (format.design === ArticleDesign.Gallery) {
			return insertAdPlaceholdersForGallery(elements);
		}

		if (
			renderingTarget === 'Apps' &&
			format.design !== ArticleDesign.LiveBlog &&
			format.design !== ArticleDesign.DeadBlog
		) {
			return insertAdPlaceholders(elements);
		}

		return elements;
	};
