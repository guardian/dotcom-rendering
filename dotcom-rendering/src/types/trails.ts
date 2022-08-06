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
}

export interface CAPITrailType extends BaseTrailType {
	format: CAPIFormat;
	// Include pillar and designType until we remove them upstream
	// We type designType as `string` for now so that the field is present,
	// but we don't care what's in it. Pillar we have a type for so we use it
	// but it shouldn't be important.
	designType: string;
	pillar: LegacyPillar;
	carouselImages?: { [key: string]: string };
	isLiveBlog?: boolean;
}

export interface TrailTabType {
	heading: string;
	trails: TrailType[];
}

export interface CAPITrailTabType {
	heading: string;
	trails: CAPITrailType[];
}
