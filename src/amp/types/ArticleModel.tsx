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
	pillar: CAPIPillar;
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
	designType: CAPIDesign;
}
