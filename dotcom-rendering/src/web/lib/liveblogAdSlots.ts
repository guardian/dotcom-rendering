import type { CAPIElement } from '../../types/content';

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

type BlockElementText = {
	lineHeight: number; // approx line height on desktop
	lineLength: number; // approx number of character that fits on a line on desktop
};

type BlockElementHeight = {
	heightExcludingText: number;
	textHeight?: BlockElementText;
};

/**
 * All known element types that are used in a liveblog block. There are other elements that
 * may be used (see CAPIElement type), but these other elements have not been sighted in
 * a liveblog page, so are not considered here.
 */
type BlockElement =
	| 'Blockquote'
	| 'Comment'
	| 'Embed'
	| 'Embed'
	| 'GuideAtom'
	| 'Image'
	| 'Interactive'
	| 'RichLink'
	| 'Subheading'
	| 'Table'
	| 'Text'
	| 'Tweet'
	| 'VideoYoutube'
	| 'Youtube';

/**
 * Approximations of the size each block element type will take up on the page in pixels.
 * Predictions are made for mobile viewports, as data suggests that the majority of liveblog page
 * views are made using mobile devices.
 */
const elementHeightData: {
	[key in BlockElement]: BlockElementHeight;
} = {
	Blockquote: {
		heightExcludingText: 0,
		textHeight: {
			lineHeight: 25.5,
			lineLength: 40,
		},
	},
	Comment: {
		heightExcludingText: 74,
		textHeight: {
			lineHeight: 18,
			lineLength: 28,
		},
	},
	Embed: {
		heightExcludingText: 251,
	},
	GuideAtom: {
		heightExcludingText: 77,
	},
	Image: {
		heightExcludingText: 230,
		textHeight: {
			lineHeight: 20,
			lineLength: 52,
		},
	},
	Interactive: {
		heightExcludingText: 600,
	},
	RichLink: {
		heightExcludingText: 65,
		textHeight: {
			lineHeight: 16,
			lineLength: 52,
		},
	},
	Subheading: {
		heightExcludingText: 0,
		textHeight: {
			lineHeight: 23,
			lineLength: 40,
		},
	},
	Table: {
		heightExcludingText: 32,
	},
	Text: {
		heightExcludingText: 0,
		textHeight: {
			lineHeight: 25.5,
			lineLength: 39,
		},
	},
	Tweet: {
		heightExcludingText: 190,
		textHeight: {
			lineHeight: 19,
			lineLength: 40,
		},
	},
	VideoYoutube: {
		heightExcludingText: 215,
	},
	Youtube: {
		heightExcludingText: 239,
	},
};

const calculateElementHeight = (
	element: BlockElementHeight,
	elementText?: string,
) => {
	let height = element.heightExcludingText + ELEMENT_MARGIN;

	if (element.textHeight && elementText) {
		const { lineHeight, lineLength } = element.textHeight;
		height += lineHeight * Math.ceil(elementText.length / lineLength);
	}

	return height;
};

export const getTextLength = (element: CAPIElement): number => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.TweetBlockElement':
			return element.html.length;

		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return element.data.caption?.length ?? 0;

		case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
			return element.text.length;

		case 'model.dotcomrendering.pageElements.TextBlockElement':
		case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
		case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
			return element.html.replace(/<[^>]+>/g, '').length;

		case 'model.dotcomrendering.pageElements.CommentBlockElement':
			return element.body.replace(/<[^>]+>/g, '').length;

		default:
			return 0;
	}
};

export const calculateElementSize = (element: CAPIElement): number => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
			return calculateElementHeight(elementHeightData.Youtube);

		case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
			return calculateElementHeight(elementHeightData.VideoYoutube);

		case 'model.dotcomrendering.pageElements.TweetBlockElement':
			return calculateElementHeight(
				elementHeightData.Tweet,
				element.html,
			);

		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return calculateElementHeight(
				elementHeightData.Image,
				element.data.caption,
			);

		case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
			return calculateElementHeight(
				elementHeightData.RichLink,
				element.text,
			);

		case 'model.dotcomrendering.pageElements.TextBlockElement':
			return calculateElementHeight(
				elementHeightData.Text,
				element.html.replace(/<[^>]+>/g, ''),
			);

		case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
			return calculateElementHeight(
				elementHeightData.Blockquote,
				element.html.replace(/<[^>]+>/g, ''),
			);

		case 'model.dotcomrendering.pageElements.InteractiveBlockElement':
			return calculateElementHeight(elementHeightData.Interactive);

		case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
			return calculateElementHeight(
				elementHeightData.Subheading,
				element.html.replace(/<[^>]+>/g, ''),
			);

		case 'model.dotcomrendering.pageElements.EmbedBlockElement':
			return calculateElementHeight(elementHeightData.Embed);

		case 'model.dotcomrendering.pageElements.TableBlockElement':
			return (
				elementHeightData.Table.heightExcludingText * // row height * row quantity
				(element.html.match(/<\/tr>/g)?.length ?? 1)
			);

		case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
			return calculateElementHeight(elementHeightData.GuideAtom);

		case 'model.dotcomrendering.pageElements.CommentBlockElement':
			return calculateElementHeight(
				elementHeightData.Comment,
				element.body.replace(/<[^>]+>/g, ''),
			);

		default:
			// unknown element size. Probably an infrequently used elemtent in liveblogs.
			// Assume a smallish size as we would rather include too few than too many ads
			return 200;
	}
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
