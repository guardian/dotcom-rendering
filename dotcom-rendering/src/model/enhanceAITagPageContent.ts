// import { timeAgo } from '@guardian/libs';
import type { DCRFrontCard, DCRGroupedTrails } from '../types/front';
import type {
	ArticleData,
	CategoryContent,
	Storyline,
	TPSGContent,
} from '../types/tagPageAIContent';

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
): DCRFrontCard {
	const format = decideFormatForArticle(category, article);
	return {
		format,
		dataLinkName: '',
		url: article.url,
		headline: article.headline,
		trailText: undefined,
		webPublicationDate: article.publicationTime,
		supportingContent: [],
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		byline: article.byline ?? '',
		showByline: category.category === 'Contrasting opinions' ? true : false, // could be true if opinion?
		boostLevel:
			category.category === 'Profiles and Interviews' ||
			category.category === 'Deep Reads'
				? 'megaboost'
				: 'default',
		isImmersive:
			category.category === 'Profiles and Interviews' ||
			category.category === 'Deep Reads'
				? true
				: false, //would be true for profiles/deep reads?
		showQuotedHeadline: false,
		showLivePlayable: false,
		avatarUrl:
			category.category === 'Contrasting opinions' &&
			article.image?.isAvatar
				? article.image?.src
				: undefined, // will need to be set for opinion pieces
		// mainMedia: undefined, // ought to be set for multimedia pieces, but missing the extra info like count?
		mainMedia:
			category.category === 'Find multimedia' && article.image?.mediaData
				? article.image?.mediaData
				: undefined,
		isExternalLink: false,
		image: article.image
			? {
					src: article.image.src,
					altText: article.image.altText || '',
			  }
			: undefined,
	};
}

function parseKeyStoriesToFrontCard(category: CategoryContent): DCRFrontCard {
	const supportingContent = category.articles.slice(1, 5).map((article) => {
		// const articleAge =
		// 	article.publicationTime &&
		// 	timeAgo(new Date(article.publicationTime).getTime()).toString();
		return {
			headline: article.headline,
			url: article.url,
			kickerText: article.publicationTime,
			format: { design: 0, display: 0, theme: 0 },
		};
	});

	return {
		format: { design: 0, display: 0, theme: 0 },
		dataLinkName: '',
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

function decideGroupedTrails(category: CategoryContent): DCRGroupedTrails {
	if (category.category === 'Key Stories') {
		return {
			splash: [parseKeyStoriesToFrontCard(category)],
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
			.map((article) => parseArticleDataToFrontCard(category, article));
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
			.map((article) => parseArticleDataToFrontCard(category, article));
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

export function parseTPSGContentToStorylines(data: TPSGContent): Storyline[] {
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
	return data.storylines.map((storyline, i) => ({
		id: `storyline-${i + 1}`,
		title: storyline.title,
		categories: storyline.content.map((category) => ({
			title: decideCategoryTitle(category),
			containerType: 'flexible/general',
			groupedTrails: decideGroupedTrails(category),
		})),
	}));
}
