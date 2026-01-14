import type { DCRFrontImage } from '../types/front';
import type { FETrailType, TrailType } from '../types/trails';
import { type ArticleFormat, decideFormat } from './articleFormat';
import { getDataLinkNameCard } from './getDataLinkName';
import { getSourceImageUrl } from './getSourceImageUrl_temp_fix';

export const dedupeTrail = (trail: FETrailType, webURL: string): boolean => {
	return trail.url !== webURL;
};

export const decideStoryPackageTrails = (
	trails: FETrailType[],
	webURL: string,
): TrailType[] => {
	return trails
		.filter((trail) => dedupeTrail(trail, webURL))
		.map(decideTrail);
};

export const decideTrail = (trail: FETrailType, index = 0): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);
	const image: DCRFrontImage | undefined = trail.image
		? {
				src: trail.image,
				altText: '', // TODO: Do we get this from frontend?
		  }
		: undefined;

	return {
		...trail,
		image,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
	};
};

// This is used for the new ScrollableSmallOnwards component which relies on the masterImage
// In future work, we will need to fully migrate to this function and deprecate decideTrail
export const decideTrailWithMasterImage = (
	trail: FETrailType,
	index = 0,
): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);
	const image: DCRFrontImage | undefined = trail.masterImage
		? {
				src: trail.masterImage,
				altText: '',
		  }
		: undefined;

	return {
		...trail,
		image,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
	};
};

/**
 * When the Onward Journeys AB test is complete, this function can be removed.
 *
 * If we move forward with the new design, we shouuld look to a permanent solution for trail
 * images on onwards content that dont require the deprecated function getSourceImageUrl.
 * An example page with this type of onward content is video articles:
 * https://www.theguardian.com/society/video/2025/dec/12/threshold-the-choir-who-sing-to-the-dying-documentary
 */
export const decideTrailWithMasterImagePreferred = (
	trail: FETrailType,
	index = 0,
): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);

	const masterImageUrl = trail.masterImage;
	const trailImageUrl = trail.image ? getSourceImageUrl(trail.image) : null;

	const imageUrl = masterImageUrl ?? trailImageUrl;
	const image: DCRFrontImage | undefined = imageUrl
		? {
				src: imageUrl,
				altText: '',
		  }
		: undefined;

	return {
		...trail,
		image,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
	};
};
