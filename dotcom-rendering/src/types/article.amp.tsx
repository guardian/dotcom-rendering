import type { EditionId } from '../lib/edition';
import type { CommercialProperties } from './commercial';
import type { FEElement } from './content';
import type { TagType } from './tag';

// This is a subset of FEArticleType for use in AMP and as a result there needs to be parity between the types of shared fields.
export interface AMPArticleModel {
	headline: string;
	standfirst: string;
	affiliateLinksDisclaimer?: string;
	webTitle: string;
	mainMediaElements: FEElement[];
	keyEvents: Block[]; // liveblog-specific
	pagination?: Pagination;
	blocks: Block[];
	byline?: string;
	webPublicationDateDeprecated: string;
	webPublicationDateDisplay: string;
	pageId: string;
	format: FEFormat;

	// Include pillar and designType until we remove them upstream
	// We type designType as `string` for now so that the field is present,
	// but we don't care what's in it. Pillar we have a type for so we use it
	// but it shouldn't be important.
	designType: string;
	pillar: LegacyPillar;

	sectionLabel?: string;
	sectionUrl?: string;
	sectionName?: string;
	tags: TagType[];
	subMetaSectionLinks: FELinkType[];
	subMetaKeywordLinks: FELinkType[];
	webURL: string;
	shouldHideAds: boolean;
	shouldHideReaderRevenue: boolean;
	guardianBaseURL: string;
	hasRelated: boolean;
	hasStoryPackage: boolean;
	isCommentable: boolean;
	editionId: EditionId;
	contentType: string;
	commercialProperties: CommercialProperties;
	isImmersive: boolean;
	starRating?: number;
	isAdFreeUser: boolean;
}
