import type { DCRFrontImage } from '../types/front';
import type { FETrailType, TrailType } from '../types/trails';
import { type ArticleFormat, decideFormat } from './articleFormat';
import { getDataLinkNameCard } from './getDataLinkName';

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
	const image: DCRFrontImage | undefined = trail.masterImage // Fix this
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
	};
};
