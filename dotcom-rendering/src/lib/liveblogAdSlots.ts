import type {
	BlockquoteBlockElement,
	CommentBlockElement,
	FEElement,
	ImageBlockElement,
	RichLinkBlockElement,
	SubheadingBlockElement,
	TableBlockElement,
	TextBlockElement,
	TweetBlockElement,
	YoutubeBlockElement,
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
 * Minimum amount of space in pixels between any pair of inline ads on mobile viewports.
 */
const MIN_SPACE_BETWEEN_ADS_MOBILE = 1_200;

// Extra height found in every block.
const BLOCK_HEADER = 20; // Date and time
const BLOCK_FOOTER = 25; // Sharing links (Facebook, Twitter)
const BLOCK_SPACING = 30; // Padding and margins

type BlockElementTextData = {
	lineHeight: number; // approx line height
	lineLength: number; // approx number of characters that fit on a line
};

type BlockElementHeightData = {
	heightExcludingText: number;
	heightExcludingTextMobile: number;
	margin: number;
} & (
	| {
			textHeight: BlockElementTextData;
			textHeightMobile: BlockElementTextData;
			text: (element: FEElement) => string;
	  }
	| {
			textHeight?: never;
			textHeightMobile?: never;
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
 * "...Mobile" indicates the value is used for devices up to the tablet breakpoint."
 */
const elementHeightDataMap: {
	[key in KnownBlockElementType]: BlockElementHeightData;
} = {
	'model.dotcomrendering.pageElements.BlockquoteBlockElement': {
		heightExcludingText: 0,
		heightExcludingTextMobile: 0,
		margin: 16,
		textHeight: {
			lineHeight: 23.8,
			lineLength: 69,
		},
		textHeightMobile: {
			lineHeight: 23.8,
			lineLength: 40,
		},
		text: (element) =>
			(element as BlockquoteBlockElement).html.replace(/<[^>]+>/g, ''),
	},
	'model.dotcomrendering.pageElements.CommentBlockElement': {
		heightExcludingText: 68,
		heightExcludingTextMobile: 84,
		margin: 48,
		textHeight: {
			lineHeight: 22,
			lineLength: 70,
		},
		textHeightMobile: {
			lineHeight: 22,
			lineLength: 40,
		},
		text: (element) =>
			(element as CommentBlockElement).body.replace(/<[^>]+>/g, ''),
	},
	'model.dotcomrendering.pageElements.EmbedBlockElement': {
		heightExcludingText: 178,
		heightExcludingTextMobile: 251,
		margin: 12,
	},
	'model.dotcomrendering.pageElements.GuideAtomBlockElement': {
		heightExcludingText: 90,
		heightExcludingTextMobile: 77,
		margin: 12,
	},
	'model.dotcomrendering.pageElements.ImageBlockElement': {
		heightExcludingText: 392,
		heightExcludingTextMobile: 220,
		margin: 12,
		textHeight: {
			lineHeight: 19,
			lineLength: 85,
		},
		textHeightMobile: {
			lineHeight: 19,
			lineLength: 45,
		},
		text: (element) => (element as ImageBlockElement).data.caption ?? '',
	},
	'model.dotcomrendering.pageElements.InteractiveBlockElement': {
		heightExcludingText: 537,
		heightExcludingTextMobile: 449,
		margin: 0,
	},
	'model.dotcomrendering.pageElements.RichLinkBlockElement': {
		heightExcludingText: 45,
		heightExcludingTextMobile: 52,
		margin: 12,
		textHeight: {
			lineHeight: 23,
			lineLength: 75,
		},
		textHeightMobile: {
			lineHeight: 19.5,
			lineLength: 39,
		},
		text: (element) => (element as RichLinkBlockElement).text,
	},
	'model.dotcomrendering.pageElements.SubheadingBlockElement': {
		heightExcludingText: 0,
		heightExcludingTextMobile: 0,
		margin: 0,
		textHeight: {
			lineHeight: 23,
			lineLength: 65,
		},
		textHeightMobile: {
			lineHeight: 23,
			lineLength: 31,
		},
		text: (element) =>
			(element as SubheadingBlockElement).html.replace(/<[^>]+>/g, ''),
	},
	'model.dotcomrendering.pageElements.TableBlockElement': {
		heightExcludingText: 32,
		heightExcludingTextMobile: 32,
		margin: 12,
		textHeight: {
			lineHeight: 32,
			lineLength: 100,
		},
		textHeightMobile: {
			lineHeight: 32,
			lineLength: 100,
		},
		text: (element) => (element as TableBlockElement).html,
	},
	'model.dotcomrendering.pageElements.TextBlockElement': {
		heightExcludingText: 0,
		heightExcludingTextMobile: 0,
		margin: 14,
		textHeight: {
			lineHeight: 23.8,
			lineLength: 72,
		},
		textHeightMobile: {
			lineHeight: 23.8,
			lineLength: 39,
		},
		text: (element) =>
			(element as TextBlockElement).html.replace(/<[^>]+>/g, ''),
	},
	'model.dotcomrendering.pageElements.TweetBlockElement': {
		heightExcludingText: 320,
		heightExcludingTextMobile: 190,
		margin: 12,
		textHeight: {
			lineHeight: 24,
			lineLength: 70,
		},
		textHeightMobile: {
			lineHeight: 19,
			lineLength: 42,
		},
		text: (element) => (element as TweetBlockElement).html, // Includes all the markup for the tweet, not just the text
	},
	'model.dotcomrendering.pageElements.VideoYoutubeBlockElement': {
		heightExcludingText: 381,
		heightExcludingTextMobile: 213,
		margin: 0,
	},
	'model.dotcomrendering.pageElements.YoutubeBlockElement': {
		heightExcludingText: 350,
		heightExcludingTextMobile: 195,
		margin: 12,
		textHeight: {
			lineHeight: 19,
			lineLength: 95,
		},
		textHeightMobile: {
			lineHeight: 18,
			lineLength: 45,
		},
		text: (element) => (element as YoutubeBlockElement).mediaTitle,
	},
};

export const calculateApproximateElementHeight = (
	element: FEElement,
	isMobile: boolean,
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

	const heightExcludingText = isMobile
		? heightData.heightExcludingTextMobile
		: heightData.heightExcludingText;

	const estimatedHeightWithoutText = heightExcludingText + heightData.margin;

	if (!heightData.text) {
		return estimatedHeightWithoutText;
	}

	// If the element has text that contributes to the height of the element, estimate
	// the height of the text and increment the height
	const { lineHeight, lineLength } = isMobile
		? heightData.textHeightMobile
		: heightData.textHeight;

	const characterCount = heightData.text(element).length;
	return (
		estimatedHeightWithoutText +
		lineHeight * Math.ceil(characterCount / lineLength)
	);
};

/**
 * Approximates the height of a block.
 * A block is a list of Elements that make up one liveblog update
 * An element can be a few paragraphs of text, an image, a twitter embed, etc.
 */
const calculateApproximateBlockHeight = (
	elements: FEElement[],
	isMobile: boolean,
): number => {
	if (!elements.length) return 0;

	const defaultBlockHeight = BLOCK_HEADER + BLOCK_FOOTER + BLOCK_SPACING;

	return elements.reduce((total, element) => {
		return total + calculateApproximateElementHeight(element, isMobile);
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
	isMobile: boolean,
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

	const minSpaceBetweenAds = isMobile
		? MIN_SPACE_BETWEEN_ADS
		: MIN_SPACE_BETWEEN_ADS_MOBILE;

	return numPixelsWithoutAdvert > minSpaceBetweenAds;
};

export { calculateApproximateBlockHeight, shouldDisplayAd };
