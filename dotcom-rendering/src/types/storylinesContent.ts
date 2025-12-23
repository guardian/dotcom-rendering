import type { DCRGroupedTrails } from './front';
import type { MainMedia } from './mainMedia';

// // These should match the categories defined in the tool: https://github.com/guardian/tag-page-supercharger/blob/main/app/services/FrontendRendererService.scala#L59
// export enum StorylineCategory {
// 	Explainers = 'Explainers',
// 	ContrastingOpinions = 'Contrasting opinions',
// 	FindMultimedia = 'Find multimedia',
// 	DeepReads = 'Deep Reads',
// 	ProfilesAndInterviews = 'Profiles and Interviews',
// 	KeyStories = 'Key Stories',
// }

export type ParsedStoryline = {
	id: string;
	title: string;
	categories: ParsedCategory[];
};

export type ParsedCategory = {
	title: string;
	containerType: string;
	groupedTrails: DCRGroupedTrails;
};

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
