import type { Podcast, TagType } from '../types/tag';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from './articleFormat';

export const shouldShowAvatar = (format: ArticleFormat): boolean => {
	switch (format.display) {
		case ArticleDisplay.Immersive:
			return false;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.NumberedList:
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.Feature:
				case ArticleDesign.Review:
				case ArticleDesign.Recipe:
				case ArticleDesign.Interview:
					return true;
				default:
					return false;
			}
		}
		default:
			return false;
	}
};

export const shouldShowContributor = (format: ArticleFormat): boolean => {
	switch (format.display) {
		case ArticleDisplay.NumberedList:
			return true;
		case ArticleDisplay.Immersive:
			return false;
		case ArticleDisplay.Showcase:
		case ArticleDisplay.Standard: {
			switch (format.design) {
				case ArticleDesign.Comment:
				case ArticleDesign.Editorial:
				case ArticleDesign.Analysis:
				case ArticleDesign.Crossword:
					return false;
				default:
					return true;
			}
		}
		default:
			return false;
	}
};

export const getSeriesTag = (tags: TagType[]): TagType | undefined => {
	return tags.find((tag) => tag.type === 'Series' && tag.podcast);
};

export const getPodcast = (tags: TagType[]): Podcast | undefined => {
	const seriesTag = getSeriesTag(tags);

	return seriesTag?.podcast;
};

export const getRssFeedUrl = (tags: TagType[]): string => {
	const seriesTag = getSeriesTag(tags);

	return `/${seriesTag?.id}/podcast.xml`;
};
