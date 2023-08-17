import type {
	BlockquoteBlockElement,
	CommentBlockElement,
	FEElement,
	ImageBlockElement,
	RichLinkBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
	TweetBlockElement,
} from '../types/content';

/**
 * Maximum number of inline ads to display on liveblog pages.
 */
const MAX_INLINE_ADS = 8;

/**
 * Minimum amount of space in pixels between any pair of inline ads.
 */
const MIN_SPACE_BETWEEN_ADS = 1_500;

/**
 * Estimated margin associated with an element.
 * This can sometimes be slightly more or less.
 */
export const ELEMENT_MARGIN = 12;

// Extra height found in every block.
const BLOCK_HEADER = 20; // Date and time
const BLOCK_FOOTER = 25; // Sharing links (Facebook, Twitter)
const BLOCK_SPACING = 30; // Padding and margins

type BlockElementTextData = {
	lineHeight: number; // approx line height
	lineLength: number; // approx number of characters that fit on a line
};

type BlockElementHeightData = { heightExcludingText: number } & (
	| {
			textHeight: BlockElementTextData;
			text: (element: FEElement) => string;
	  }
	| {
			textHeight?: never;
			text?: never;
	  }
);

/**
 * All known element types that are used in a liveblog block. There are other elements that
 * it is possible to use (see FEElement type), but these other elements have not been
 * sighted in a liveblog page (and there's lots of them), so they are not considered for now.
 */
type KnownBlockElementType =
	| 'model.dotcomrendering.pageElements.BlockquoteBlockElement'
	| 'model.dotcomrendering.pageElements.CommentBlockElement'
	| 'model.dotcomrendering.pageElements.EmbedBlockElement'
	| 'model.dotcomrendering.pageElements.GuideAtomBlockElement'
	| 'model.dotcomrendering.pageElements.ImageBlockElement'
	| 'model.dotcomrendering.pageElements.InteractiveBlockElement'
	| 'model.dotcomrendering.pageElements.RichLinkBlockElement'
	| 'model.dotcomrendering.pageElements.SubheadingBlockElement'
	| 'model.dotcomrendering.pageElements.TableBlockElement'
	| 'model.dotcomrendering.pageElements.TextBlockElement'
	| 'model.dotcomrendering.pageElements.TweetBlockElement'
	| 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement'
	| 'model.dotcomrendering.pageElements.YoutubeBlockElement';

/**
 * Approximations of the height of each type of block element in pixels.
 * Predictions are made for MOBILE viewports, as data suggests that the
 * majority of liveblog page views are made using mobile devices.
 */
const elementHeightDataMap: {
	[key in KnownBlockElementType]: BlockElementHeightData;
} = {
	'model.dotcomrendering.pageElements.BlockquoteBlockElement': {
		heightExcludingText: 0,
		textHeight: {
			lineHeight: 25.5,
			lineLength: 40,
		},
		text: (element) =>
			(element as BlockquoteBlockElement).html.replace(/<[^>]+>/g, ''),
	},
	'model.dotcomrendering.pageElements.CommentBlockElement': {
		heightExcludingText: 74,
		textHeight: {
			lineHeight: 18,
			lineLength: 28,
		},
		text: (element) =>
			(element as CommentBlockElement).body.replace(/<[^>]+>/g, ''),
	},
	'model.dotcomrendering.pageElements.EmbedBlockElement': {
		heightExcludingText: 251,
	},
	'model.dotcomrendering.pageElements.GuideAtomBlockElement': {
		heightExcludingText: 77,
	},
	'model.dotcomrendering.pageElements.ImageBlockElement': {
		heightExcludingText: 230,
		textHeight: {
			lineHeight: 20,
			lineLength: 52,
		},
		text: (element) => (element as ImageBlockElement).data.caption ?? '',
	},
	'model.dotcomrendering.pageElements.InteractiveBlockElement': {
		heightExcludingText: 600,
	},
	'model.dotcomrendering.pageElements.RichLinkBlockElement': {
		heightExcludingText: 65,
		textHeight: {
			lineHeight: 16,
			lineLength: 52,
		},
		text: (element) => (element as RichLinkBlockElement).text,
	},
	'model.dotcomrendering.pageElements.SubheadingBlockElement': {
		heightExcludingText: 0,
		textHeight: {
			lineHeight: 23,
			lineLength: 40,
		},
		text: (element) =>
			(element as SubheadingBlockElement).html.replace(/<[^>]+>/g, ''),
	},
	'model.dotcomrendering.pageElements.TableBlockElement': {
		heightExcludingText: 32,
	},
	'model.dotcomrendering.pageElements.TextBlockElement': {
		heightExcludingText: 0,
		textHeight: {
			lineHeight: 25.5,
			lineLength: 39,
		},
		text: (element) =>
			(element as TextBlockElement).html.replace(/<[^>]+>/g, ''),
	},
	'model.dotcomrendering.pageElements.TweetBlockElement': {
		heightExcludingText: 190,
		textHeight: {
			lineHeight: 19,
			lineLength: 40,
		},
		text: (element) => (element as TweetBlockElement).html,
	},
	'model.dotcomrendering.pageElements.VideoYoutubeBlockElement': {
		heightExcludingText: 215,
	},
	'model.dotcomrendering.pageElements.YoutubeBlockElement': {
		heightExcludingText: 239,
	},
};

export const calculateApproximateElementHeight = (
	element: FEElement,
): number => {
	// Is there a height estimate for this element type?
	const isElementTypeKnown = Object.keys(elementHeightDataMap).includes(
		element._type,
	);
	if (!isElementTypeKnown) {
		// Unknown element. Indicates an infrequently used element in liveblogs.
		// Assume a smallish height as we would rather include too few than too many ads
		return 200;
	}

	const elementType = element._type as KnownBlockElementType;
	const heightData = elementHeightDataMap[elementType];

	let estimatedHeight = heightData.heightExcludingText + ELEMENT_MARGIN;

	// If the element has text that contributes to the height of the element, estimate
	// the height of the text and increment the height
	if (heightData.textHeight) {
		const { lineHeight, lineLength } = heightData.textHeight;
		const characterCount = heightData.text(element).length;

		estimatedHeight += lineHeight * Math.ceil(characterCount / lineLength);
	}

	return estimatedHeight;
};

/**
 * Approximates the height of a block.
 * A block is a list of Elements that make up one liveblog update
 * An element can be a few paragraphs of text, an image, a twitter embed, etc.
 */
const calculateApproximateBlockHeight = (elements: FEElement[]): number => {
	if (!elements.length) return 0;

	const defaultBlockHeight = BLOCK_HEADER + BLOCK_FOOTER + BLOCK_SPACING;

	return elements.reduce((total, element) => {
		return total + calculateApproximateElementHeight(element);
	}, defaultBlockHeight);
};

/**
 * Determines whether an ad should be inserted AFTER the next content block
 */
const shouldDisplayAd = (
	block: number,
	totalBlocks: number,
	numAdsInserted: number,
	numPixelsWithoutAdvert: number,
): boolean => {
	const isFinalBlock = block === totalBlocks;
	if (isFinalBlock || numAdsInserted >= MAX_INLINE_ADS) {
		return false;
	}

	// Always show an advert after the first content block
	const isFirstAd = block === 1;
	if (isFirstAd) {
		return true;
	}

	return numPixelsWithoutAdvert > MIN_SPACE_BETWEEN_ADS;
};

export { calculateApproximateBlockHeight, shouldDisplayAd };
