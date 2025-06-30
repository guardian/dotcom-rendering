import type {DCRFrontCard, DCRFrontImage} from '../types/front';
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


export const decideOnwardsTrail = (trail: FETrailType, index = 0): DCRFrontCard => {
	const format: ArticleFormat = decideFormat(trail.format);
	console.log(trail.image)
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
		showQuotedHeadline: false,
		discussionApiUrl:"",
		isExternalLink: false,
		showLivePlayable: false,
		isImmersive: false,
		dataLinkName: getDataLinkNameCard(format, '0', index),
	};
};
