import type { CAPIElement } from '../../types/content';

/**
 * Maximum number of inline ads to display on the page.
 */
const MAX_INLINE_ADS = 8;

/**
 * Minimum allowed space between the top of the liveblog container and the highest inline ad.
 */
const MIN_SPACE_BEFORE_FIRST_AD = 1_000;

/**
 * Minimum allowed space between inline ads in pixels.
 */
const MIN_SPACE_BETWEEN_ADS = 1_400;

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
 * Predictions are made for desktop, as we prefer to use a value closer to the lower bound,
 * as we would rather display too few ads than too many. Practically, this will mean that we
 * will show the the right frequency of ads on desktop and too few on smaller devices.
 */
const commentElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.CommentBlockElement',
	elementHeightExcludingText: 64,
	textHeight: {
		lineHeight: 23,
		lineLength: 70,
	},
};

const embedElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	elementHeightExcludingText: 205,
};

const guideAtomElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.GuideAtomBlockElement',
	elementHeightExcludingText: 76,
};

const imageElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.ImageBlockElement',
	elementHeightExcludingText: 375,
	textHeight: {
		lineHeight: 20,
		lineLength: 90,
	},
};

const interactiveElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.InteractiveBlockElement',
	elementHeightExcludingText: 400,
};

const richLinkElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.RichLinkBlockElement',
	elementHeightExcludingText: 70,
	textHeight: {
		lineHeight: 20,
		lineLength: 70,
	},
};

const subheadingElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
	elementHeightExcludingText: 0,
	textHeight: {
		lineHeight: 23,
		lineLength: 60,
	},
};

const tableElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.TableBlockElement',
	elementHeightExcludingText: 32,
};

const textElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementHeightExcludingText: 25, // margin
	textHeight: {
		lineHeight: 27,
		lineLength: 70,
	},
};

const tweetElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.TweetBlockElement',
	elementHeightExcludingText: 375,
	textHeight: {
		lineHeight: 24,
		lineLength: 50,
	},
};

const youtubeElementHeightData: BlockElementHeight = {
	type: 'model.dotcomrendering.pageElements.YoutubeBlockElement',
	elementHeightExcludingText: 375,
};

const calculateElementHeight = (
	element: BlockElementHeight,
	elementText?: string,
) => {
	let height = element.elementHeightExcludingText;

	if (element.textHeight && elementText) {
		const { lineHeight, lineLength } = element.textHeight;
		height += lineHeight * Math.ceil(elementText.length / lineLength);
	}

	return height;
};

const calculateElementSize = (element: CAPIElement): number => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
		case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
			return calculateElementHeight(youtubeElementHeightData);

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
		case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
			return calculateElementHeight(
				textElementHeightData,
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
				calculateElementHeight(tableElementHeightData) *
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
const calculateBlockSize = (elements: CAPIElement[]): number =>
	elements.reduce((total, element) => {
		return total + calculateElementSize(element);
	}, 0);

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
