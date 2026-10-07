import type { DCRGroupedTrails } from './front';
import type { MainMedia } from './mainMedia';

/** Result of the enhance tag page storylines logic */
export type ParsedStoryline = {
	id: string;
	title: string;
	categories: ParsedCategory[];
};

export type ParsedCategory = {
	title: string;
	groupedTrails: DCRGroupedTrails;
};

// The types below should match up with those defined in the tool:
// https://github.com/guardian/tag-page-supercharger/blob/main/app/models/FrontendContent.scala#L9
export type ImageData = {
	src: string;
	altText: string;
	isAvatar: boolean;
	mediaData?: MainMedia | null;
};

export type ArticleData = {
	url: string;
	headline: string;
	byline?: string | null;
	publicationTime: string;
	image?: ImageData | null;
};

export type CategoryContent = {
	category: string;
	articles: ArticleData[];
};

export type Storyline = {
	title: string;
	content: CategoryContent[];
};

export type StorylinesContent = {
	created: string;
	tag: string;
	storylines: Storyline[];
	articleCount?: number | null;
	earliestArticleTime?: string | null;
	latestArticleTime?: string | null;
};
