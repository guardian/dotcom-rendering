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
	type: CAPIElement['_type'];
	elementHeightExcludingText: number;
	textHeight?: BlockElementText;
};

/**
 * Approximations of the size each block element type will take up on the page in pixels.
 * Predictions are made for mobile viewports, as data suggests that the majority of liveblog page
 * views are made using mobile devices.
 */
const blockquoteElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.BlockquoteBlockElement',
	elementHeightExcludingText: 0,
	textHeight: {
		lineHeight: 25.5,
		lineLength: 40,
	},
};

const commentElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.CommentBlockElement',
	elementHeightExcludingText: 74,
	textHeight: {
		lineHeight: 18,
		lineLength: 28,
	},
};

const embedElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	elementHeightExcludingText: 251,
};

const guideAtomElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.GuideAtomBlockElement',
	elementHeightExcludingText: 77,
};

const imageElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.ImageBlockElement',
	elementHeightExcludingText: 230,
	textHeight: {
		lineHeight: 20,
		lineLength: 52,
	},
};

const interactiveElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.InteractiveBlockElement',
	elementHeightExcludingText: 600,
};

const richLinkElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
	elementHeightExcludingText: 65,
	textHeight: {
		lineHeight: 16,
		lineLength: 52,
	},
};

const subheadingElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
	elementHeightExcludingText: 0,
	textHeight: {
		lineHeight: 23,
		lineLength: 40,
	},
};

const tableElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.TableBlockElement',
	elementHeightExcludingText: 32,
};

const textElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementHeightExcludingText: 0,
	textHeight: {
		lineHeight: 25.5,
		lineLength: 39,
	},
};

const tweetElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.TweetBlockElement',
	elementHeightExcludingText: 190,
	textHeight: {
		lineHeight: 19,
		lineLength: 40,
	},
};

const videoYoutubeElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement',
	elementHeightExcludingText: 215,
};

const youtubeElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.YoutubeBlockElement',
	elementHeightExcludingText: 239,
};

const calculateElementHeight = (
	element: BlockElementHeight,
	elementText?: string,
) => {
	let height = element.elementHeightExcludingText + ELEMENT_MARGIN;

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
			return calculateElementHeight(youtubeElementHeightData);

		case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
			return calculateElementHeight(videoYoutubeElementHeightData);

		case 'model.dotcomrendering.pageElements.TweetBlockElement':
			return calculateElementHeight(tweetElementHeightData, element.html);

		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return calculateElementHeight(
				imageElementHeightData,
				element.data.caption,
			);

		case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
			return calculateElementHeight(
				richLinkElementHeightData,
				element.text,
			);

		case 'model.dotcomrendering.pageElements.TextBlockElement':
			return calculateElementHeight(
				textElementHeightData,
				element.html.replace(/<[^>]+>/g, ''),
			);

		case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
			return calculateElementHeight(
				blockquoteElementHeightData,
				element.html.replace(/<[^>]+>/g, ''),
			);

		case 'model.dotcomrendering.pageElements.InteractiveBlockElement':
			return calculateElementHeight(interactiveElementHeightData);

		case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
			return calculateElementHeight(
				subheadingElementHeightData,
				element.html.replace(/<[^>]+>/g, ''),
			);

		case 'model.dotcomrendering.pageElements.EmbedBlockElement':
			return calculateElementHeight(embedElementHeightData);

		case 'model.dotcomrendering.pageElements.TableBlockElement':
			return (
				tableElementHeightData.elementHeightExcludingText * // row height * row quantity
				(element.html.match(/<\/tr>/g)?.length ?? 1)
			);

		case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
			return calculateElementHeight(guideAtomElementHeightData);

		case 'model.dotcomrendering.pageElements.CommentBlockElement':
			return calculateElementHeight(
				commentElementHeightData,
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
