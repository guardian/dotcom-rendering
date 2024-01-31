import type { DCRFrontImage } from '../types/front';
import type { FETrailType, TrailType } from '../types/trails';
import { decideFormat } from './decideFormat';
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
