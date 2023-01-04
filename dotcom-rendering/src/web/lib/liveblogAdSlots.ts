import type {
	BlockquoteBlockElement,
	CAPIElement,
	CommentBlockElement,
	ImageBlockElement,
	RichLinkBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
	TweetBlockElement,
} from '../../types/content';

/**
 * Maximum number of inline ads to display on the page.
 */
const MAX_INLINE_ADS = 8;

/**
 * Minimum allowed space between the top of the liveblog container and the highest inline ad.
 */
const MIN_SPACE_BEFORE_FIRST_AD = 500;

/**
 * Minimum allowed space between inline ads in pixels.
 */
const MIN_SPACE_BETWEEN_ADS = 1_800;

/**
 * Estimated margin associated with an element. Sometimes this is more or less
 */
export const ELEMENT_MARGIN = 12;

// Extra height found in every block.
const BLOCK_HEADER = 20; // Date and time
const BLOCK_FOOTER = 25; // Sharing links (Facebook, Twitter)
const BLOCK_SPACING = 30; // Padding and margins

type BlockElementTextData = {
	lineHeight: number; // approx line height on desktop
	lineLength: number; // approx number of character that fits on a line on desktop
};

type BlockElementHeightData =
	| {
			heightExcludingText: number;
			textHeight: BlockElementTextData;
			text: (element: CAPIElement) => string;
	  }
	| {
			heightExcludingText: number;
			textHeight?: never;
			text?: never;
	  };

/**
 * All known element types that are used in a liveblog block. There are other elements that
 * may be used (see CAPIElement type), but these other elements have not been sighted in
 * a liveblog page, so are not considered here.
 */
type KnownBlockElementType =
	| 'model.dotcomrendering.pageElements.BlockquoteBlockElement'
	| 'model.dotcomrendering.pageElements.CommentBlockElement'
	| 'model.dotcomrendering.pageElements.EmbedBlockElement'
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
 * Approximations of the size each block element type will take up on the page in pixels.
 * Predictions are made for mobile viewports, as data suggests that the majority of liveblog page
 * views are made using mobile devices.
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

const calculateElementHeight = (
	element: CAPIElement,
	heightData: BlockElementHeightData,
) => {
	let height = heightData.heightExcludingText + ELEMENT_MARGIN;

	if (heightData.textHeight) {
		const { lineHeight, lineLength } = heightData.textHeight;
		const characterCount = heightData.text(element).length;

		height += lineHeight * Math.ceil(characterCount / lineLength);
	}

	return height;
};

export const calculateElementSize = (element: CAPIElement): number => {
	const isElementTypeKnown = Object.keys(elementHeightDataMap).includes(
		element._type,
	);

	if (isElementTypeKnown) {
		const elementHeightData =
			elementHeightDataMap[element._type as KnownBlockElementType];

		return calculateElementHeight(element, elementHeightData);
	}

	// Unknown element. Indicates an infrequently used element in liveblogs.
	// Assume a smallish size as we would rather include too few than too many ads
	return 200;
};

/**
 * Approximates the size of a block.
 * A block is a list of Elements that make up one liveblog update
 * An element can be a few paragraphs of text, an image, a twitter embed, etc.
 */
const calculateBlockSize = (elements: CAPIElement[]): number => {
	if (!elements.length) return 0;

	const defaultBlockHeight = BLOCK_HEADER + BLOCK_FOOTER + BLOCK_SPACING;

	return elements.reduce((total, element) => {
		return total + calculateElementSize(element);
	}, defaultBlockHeight);
};

/**
 * Determines whether an ad should be inserted after the next content block
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

	const isFirstAd = numAdsInserted === 0;

	const minSpaceToShowAd = isFirstAd
		? MIN_SPACE_BEFORE_FIRST_AD
		: MIN_SPACE_BETWEEN_ADS;

	return numPixelsWithoutAdvert > minSpaceToShowAd;
};

export { calculateBlockSize, shouldDisplayAd };
