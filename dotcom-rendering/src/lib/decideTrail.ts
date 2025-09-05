import type { DCRFrontImage } from '../types/front';
import { type MainMedia } from '../types/mainMedia';
import type { FETrailType, TrailType } from '../types/trails';
import { type ArticleFormat, decideFormat } from './articleFormat';
import { getDataLinkNameCard } from './getDataLinkName';

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

export const decideTrailWithMasterImage = (
	trail: FETrailType,
	index = 0,
): TrailType => {
	const format: ArticleFormat = decideFormat(trail.format);
	const image: DCRFrontImage | undefined = trail.masterImage
		? {
				src: trail.masterImage,
				altText: '', // TODO: Do we get this from frontend?
		  }
		: undefined;

	return {
		...trail,
		image,
		format,
		dataLinkName: getDataLinkNameCard(format, '0', index),
		mainMedia: getMedia(trail.galleryCount),
	};
};

const getMedia = (galleryCount: number | undefined): MainMedia | undefined => {
	if (typeof galleryCount === 'number') {
		return { type: 'Gallery', count: galleryCount.toString() };
	}
	return undefined;
};
