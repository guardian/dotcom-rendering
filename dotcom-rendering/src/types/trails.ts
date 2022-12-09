import type { Branding } from './branding';
import type { DCRSnapType, DCRSupportingContent } from './front';

type MediaType = 'Video' | 'Audio' | 'Gallery';

interface BaseTrailType {
	url: string;
	headline: string;
	webPublicationDate?: string;
	image?: string;
	avatarUrl?: string;
	mediaType?: MediaType;
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
	snapData?: DCRSnapType;
	showQuotedHeadline?: boolean;
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
	showMainVideo?: boolean;
}

export interface CAPITrailType extends BaseTrailType {
	format: CAPIFormat;
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
}

export interface TrailTabType {
	heading?: string;
	trails: TrailType[];
}

export interface CAPITrailTabType {
	heading: string;
	trails: CAPITrailType[];
}
