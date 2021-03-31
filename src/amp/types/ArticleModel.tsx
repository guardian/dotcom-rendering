// This is a subset of CAPIType for use in AMP and as a result there needs to be parity between the types of shared fields.
export interface ArticleModel {
	headline: string;
	standfirst: string;
	webTitle: string;
	mainMediaElements: CAPIElement[];
	keyEvents: Block[]; // liveblog-specific
	pagination?: Pagination;
	blocks: Block[];
	author: AuthorType;
	webPublicationDate: string;
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
	subMetaSectionLinks: SimpleLinkType[];
	subMetaKeywordLinks: SimpleLinkType[];
	webURL: string;
	shouldHideAds: boolean;
	shouldHideReaderRevenue: boolean;
	guardianBaseURL: string;
	hasRelated: boolean;
	hasStoryPackage: boolean;
	isCommentable: boolean;
	editionId: Edition;
	contentType: string;
	commercialProperties: CommercialProperties;
	isImmersive: boolean;
	starRating?: number;
}
