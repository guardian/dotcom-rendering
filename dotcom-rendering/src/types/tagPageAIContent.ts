import type { DCRGroupedTrails } from './front';
import type { MainMedia } from './mainMedia';

export type Storyline = {
	id: string;
	title: string;
	categories: Category[];
};

// probably want to add a generic category type mapping to those in supercharger (e.g. opinions) and map this to a container type and title (e.g. "Contrasting Opinions" + "flexible/general")
export type Category = {
	title: string;
	containerType: string;
	groupedTrails: DCRGroupedTrails;
};

export type ImageData = {
	src: string;
	altText: string;
	isAvatar: boolean;
	mediaData: MainMedia | null;
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

export type StorylineContent = {
	title: string;
	description: string;
	content: CategoryContent[];
};

export type TPSGContent = {
	created: string;
	tag: string;
	storylines: StorylineContent[];
	articleCount?: number | null;
	earliestArticleTime?: string | null;
	latestArticleTime?: string | null;
};
