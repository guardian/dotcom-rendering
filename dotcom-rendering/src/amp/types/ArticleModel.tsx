import type { CommercialProperties } from '../../types/commercial';
import type { CAPIElement } from '../../types/content';
import type { TagType } from '../../types/tag';
import type { EditionId } from '../../web/lib/edition';

// This is a subset of CAPIArticleType for use in AMP and as a result there needs to be parity between the types of shared fields.
export interface ArticleModel {
	headline: string;
	standfirst: string;
	webTitle: string;
	mainMediaElements: CAPIElement[];
	keyEvents: Block[]; // liveblog-specific
	pagination?: Pagination;
	blocks: Block[];
	byline?: string;
	webPublicationDateDeprecated: string;
	webPublicationDateDisplay: string;
	pageId: string;
	format: CAPIFormat;

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
	subMetaSectionLinks: CAPILinkType[];
	subMetaKeywordLinks: CAPILinkType[];
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
