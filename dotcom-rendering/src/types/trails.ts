import type { Branding } from './branding';
import type { DCRFrontImage, DCRSnapType, DCRSupportingContent } from './front';
import type { MainMedia } from './mainMedia';

interface BaseTrailType {
	url: string;
	headline: string;
	webPublicationDate?: string;
	avatarUrl?: string;
	mediaDuration?: number;
	ageWarning?: string;
	byline?: string;
	showByline?: boolean;
	kickerText?: string;
	shortUrl?: string;
	commentCount?: number;
	starRating?: number;
	linkText?: string;
	branding?: Branding;
	isSnap?: boolean;
	isCrossword?: boolean;
	snapData?: DCRSnapType;
	showQuotedHeadline?: boolean;
	discussion?: {
		isCommentable: boolean;
		isClosedForComments: boolean;
		discussionId?: string;
	};
	mainMedia?: MainMedia;
}

export interface TrailType extends BaseTrailType {
	palette?: never;
	format: ArticleFormat;
	supportingContent?: DCRSupportingContent[];
	trailText?: string;
	/** @see JSX.IntrinsicAttributes["data-link-name"] */
	dataLinkName: string;
	discussionId?: string;
	isBoosted?: boolean;
	image?: DCRFrontImage;
}

export interface FETrailType extends BaseTrailType {
	format: FEFormat;
	/**
	 * @deprecated This type must exist as it's passed by frontend, but we shouldn't use it.
	 * We should remove this property upstream in the future
	 */
	designType?: string;
	/**
	 * @deprecated This type must exist as it's passed by frontend, but we shouldn't use it.
	 * We should remove this property upstream in the future
	 */
	pillar?: string;
	carouselImages?: { [key: string]: string };
	isLiveBlog?: boolean;
	masterImage?: string;
	image?: string;
}

export interface TrailTabType {
	heading: string;
	trails: TrailType[];
}

export interface FETrailTabType {
	heading: string;
	trails: FETrailType[];
}
