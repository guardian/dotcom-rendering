import type { Group } from '../lib/getDataLinkName';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import type { DCRFrontCard, DCRGroupedTrails } from '../types/front';
import type {
	ArticleData,
	CategoryContent,
	ParsedStoryline,
	StorylinesContent,
} from '../types/storylinesContent';
import { getMediaMetadata } from './enhanceCards';

function decideFormatForArticle(
	category: CategoryContent,
	article: ArticleData,
): {
	design: number;
	display: number;
	theme: number;
} {
	switch (category.category) {
		case 'Contrasting opinions':
			return { design: 8, display: 0, theme: 1 };
		case 'Deep Reads':
			return { design: 10, display: 0, theme: 0 };
		case 'Explainers':
			return { design: 0, display: 0, theme: 2 };
		case 'Find multimedia':
			const mediaType = article.image?.mediaData?.type;
			if (
				mediaType === 'YoutubeVideo' ||
				mediaType === 'SelfHostedVideo'
			) {
				return { design: 4, display: 0, theme: 7 };
			} else if (mediaType === 'Audio') {
				return { design: 3, display: 0, theme: 7 };
			} else if (mediaType === 'Gallery') {
				return { design: 2, display: 0, theme: 7 };
			} else {
				return { design: 0, display: 0, theme: 7 };
			}
		case 'Profiles and Interviews':
			return { design: 18, display: 1, theme: 0 };
		default:
			return { design: 0, display: 0, theme: 0 };
	}
}

function parseArticleDataToFrontCard(
	category: CategoryContent,
	article: ArticleData,
	categoryIndex: number,
	index: number,
	storylineId: string,
): DCRFrontCard {
	const format = decideFormatForArticle(category, article);
	const group: Group = `${categoryIndex}`;
	const normalisedCategory = category.category
		.toLowerCase()
		.replace(/\s+/g, '-');
	const dataLinkName = `${storylineId} | ${normalisedCategory} | ${getDataLinkNameCard(
		format,
		group,
		index,
	)}`;
	const mainMedia =
		category.category === 'Find multimedia' && article.image?.mediaData
			? article.image.mediaData
			: undefined;
	const articleMedia = mainMedia && getMediaMetadata(mainMedia);
	return {
		format,
		dataLinkName,
		url: article.url,
		headline: article.headline,
		trailText: undefined,
		webPublicationDate: article.publicationTime,
		supportingContent: [],
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		byline: article.byline ?? '',
		showByline: category.category === 'Contrasting opinions' ? true : false,
		boostLevel:
			category.category === 'Profiles and Interviews' ||
			category.category === 'Deep Reads'
				? 'megaboost'
				: 'default',
		isImmersive:
			category.category === 'Profiles and Interviews' ||
			category.category === 'Deep Reads'
				? true
				: false,
		showQuotedHeadline: false,
		showLivePlayable: false,
		avatarUrl:
			category.category === 'Contrasting opinions' &&
			article.image?.isAvatar
				? article.image.src
				: undefined,
		mainMedia,
		articleMedia,
		isExternalLink: false,
		image: article.image
			? {
					src: article.image.src,
					altText: article.image.altText || '',
			  }
			: undefined,
	};
}

function parseKeyStoriesToFrontCard(
	category: CategoryContent,
	storylineId: string,
): DCRFrontCard {
	const supportingContent = category.articles.slice(0, 4).map((article) => {
		return {
			headline: article.headline,
			url: article.url,
			kickerText: '',
			format: { design: 0, display: 0, theme: 0 },
			webPublicationDate: article.publicationTime,
		};
	});

	return {
		format: { design: 0, display: 0, theme: 0 },
		dataLinkName: `${storylineId} | key-stories`,
		url: category.articles[0]?.url ?? '',
		headline: '',
		trailText: '',
		webPublicationDate: '',
		supportingContent,
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		byline: category.articles[0]?.byline ?? '',
		showByline: false,
		boostLevel: 'boost',
		isImmersive: false,
		showQuotedHeadline: false,
		showLivePlayable: false,
		avatarUrl: undefined,
		mainMedia: undefined,
		isExternalLink: false,
		image: category.articles[0]?.image
			? {
					src: category.articles[0]?.image.src,
					altText: category.articles[0]?.image.altText || '',
			  }
			: undefined,
	};
}

function decideGroupedTrails(
	category: CategoryContent,
	categoryIndex: number,
	storylineId: string,
): DCRGroupedTrails {
	if (category.category === 'Key Stories') {
		return {
			splash: [parseKeyStoriesToFrontCard(category, storylineId)],
			huge: [],
			veryBig: [],
			big: [],
			snap: [],
			standard: [],
		};
	} else if (
		category.category === 'Profiles and Interviews' ||
		category.category === 'Deep Reads'
	) {
		const frontCards = category.articles
			.slice(0, 1)
			.map((article, index) =>
				parseArticleDataToFrontCard(
					category,
					article,
					categoryIndex,
					index,
					storylineId,
				),
			);
		return {
			splash: [],
			huge: [],
			veryBig: [],
			big: [],
			snap: [],
			standard: frontCards,
		};
	} else {
		const frontCards = category.articles
			.slice(0, 2)
			.map((article, index) =>
				parseArticleDataToFrontCard(
					category,
					article,
					categoryIndex,
					index,
					storylineId,
				),
			);
		return {
			splash: [],
			huge: [],
			veryBig: [],
			big: [],
			snap: [],
			standard: frontCards,
		};
	}
}

export function parseStorylinesContentToStorylines(
	storylinesContent: StorylinesContent,
): ParsedStoryline[] {
	function decideCategoryTitle(category: CategoryContent): string {
		switch (category.category) {
			case 'Key Stories':
				return 'Key Stories';
			case 'Contrasting opinions':
				return 'Opinions';
			case 'Find multimedia':
				return 'Multimedia';
			default:
				return category.category;
		}
	}
	return storylinesContent.storylines.map((storyline, i) => {
		const storylineId = `storyline-${i + 1}`;
		return {
			id: storylineId,
			title: storyline.title,
			categories: storyline.content.map((category, categoryIndex) => ({
				title: decideCategoryTitle(category),
				groupedTrails: decideGroupedTrails(
					category,
					categoryIndex,
					storylineId,
				),
			})),
		};
	});
}
