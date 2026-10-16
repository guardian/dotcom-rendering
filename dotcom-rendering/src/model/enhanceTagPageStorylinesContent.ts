import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
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

/**
 * Discussion API URL used by the front card model. Storylines cards never
 * surface comment counts, so this is a non-functional placeholder; it is
 * extracted to a constant to avoid duplicating the literal across cards.
 */
const DISCUSSION_API_URL = 'https://discussion.theguardian.com/discussion-api';

/**
 * The set of storyline categories this renderer knows how to format. Frontend
 * sends `category` as a free-form string, so any value outside this union is
 * treated as unknown and rendered with safe defaults.
 */
type StorylineCategory =
	| 'Key Stories'
	| 'Contrasting opinions'
	| 'Explainers'
	| 'Deep Reads'
	| 'Find multimedia'
	| 'Profiles and Interviews';

/**
 * Maps the raw `category` label from Frontend to a known StorylineCategory.
 * Includes known aliases (e.g. 'Opinions' is the display name Frontend may send
 * for 'Contrasting opinions').
 */
const CATEGORY_BY_RAW_LABEL: Record<string, StorylineCategory> = {
	'Key Stories': 'Key Stories',
	'Contrasting opinions': 'Contrasting opinions',
	Opinions: 'Contrasting opinions',
	Explainers: 'Explainers',
	'Deep Reads': 'Deep Reads',
	'Find multimedia': 'Find multimedia',
	'Profiles and Interviews': 'Profiles and Interviews',
};

/**
 * Classifies the raw category label into a known StorylineCategory, resolving
 * aliases. Returns `undefined` for genuinely unknown categories (which are then
 * rendered with safe default formatting) and warns so unexpected Frontend data
 * is observable.
 */
function classifyCategory(raw: string): StorylineCategory | undefined {
	const classified = CATEGORY_BY_RAW_LABEL[raw];
	if (classified === undefined) {
		// eslint-disable-next-line no-console -- surface unexpected data from Frontend
		console.warn(`Unknown storyline category received: "${raw}"`);
	}
	return classified;
}

function decideMultimediaFormat(article: ArticleData): ArticleFormat {
	const theme = ArticleSpecial.SpecialReportAlt;
	const standard: ArticleFormat = {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme,
	};
	switch (article.image?.mediaData?.type) {
		case 'YoutubeVideo':
		case 'SelfHostedVideo':
			return {
				design: ArticleDesign.Video,
				display: ArticleDisplay.Standard,
				theme,
			};
		case 'Audio':
			return {
				design: ArticleDesign.Audio,
				display: ArticleDisplay.Standard,
				theme,
			};
		case 'Gallery':
			return {
				design: ArticleDesign.Gallery,
				display: ArticleDisplay.Standard,
				theme,
			};
		case undefined:
			return standard;
	}
	// Defensive fallback: Frontend is an external source, so guard against a
	// media type the compile-time union does not model (e.g. if the generated
	// schema drifts) rather than returning undefined.
	return standard;
}

function decideFormatForArticle(
	category: StorylineCategory | undefined,
	article: ArticleData,
): ArticleFormat {
	switch (category) {
		case 'Contrasting opinions':
			return {
				design: ArticleDesign.Comment,
				display: ArticleDisplay.Standard,
				theme: Pillar.Opinion,
			};
		case 'Deep Reads':
			return {
				design: ArticleDesign.Feature,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			};
		case 'Explainers':
			// NOTE: Pillar.Sport (theme 2) is a deliberate styling choice here,
			// not a semantic classification of the content.
			return {
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.Sport,
			};
		case 'Find multimedia':
			return decideMultimediaFormat(article);
		case 'Profiles and Interviews':
			// NOTE: ArticleDesign.Interactive (18) + Immersive display is a
			// deliberate styling choice, not a semantic classification.
			return {
				design: ArticleDesign.Interactive,
				display: ArticleDisplay.Immersive,
				theme: Pillar.News,
			};
		// Key Stories is rendered via parseKeyStoriesToFrontCard and never
		// reaches this function; the case is listed only for exhaustiveness.
		case 'Key Stories':
		case undefined:
			return {
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			};
	}
}

function parseArticleDataToFrontCard(
	category: CategoryContent,
	classified: StorylineCategory | undefined,
	article: ArticleData,
	categoryIndex: number,
	index: number,
	storylineId: string,
): DCRFrontCard {
	const format = decideFormatForArticle(classified, article);
	const group: Group = `${categoryIndex}`;
	const normalisedCategory = (classified ?? category.category)
		.toLowerCase()
		.replace(/\s+/g, '-');
	const dataLinkName = `${storylineId} | ${normalisedCategory} | ${getDataLinkNameCard(
		format,
		group,
		index,
	)}`;
	const mainMedia =
		classified === 'Find multimedia' && article.image?.mediaData
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
		discussionApiUrl: DISCUSSION_API_URL,
		byline: article.byline ?? '',
		showByline: classified === 'Contrasting opinions',
		boostLevel:
			classified === 'Profiles and Interviews' ||
			classified === 'Deep Reads'
				? 'megaboost'
				: 'default',
		isImmersive:
			classified === 'Profiles and Interviews' ||
			classified === 'Deep Reads',
		showQuotedHeadline: false,
		showLivePlayable: false,
		avatarUrl:
			classified === 'Contrasting opinions' &&
			article.image?.isAvatar === true
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
	const standardFormat: ArticleFormat = {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: Pillar.News,
	};
	const supportingContent = category.articles.slice(0, 4).map((article) => {
		return {
			headline: article.headline,
			url: article.url,
			kickerText: '',
			format: standardFormat,
			webPublicationDate: article.publicationTime,
		};
	});

	const leadArticle = category.articles[0];
	return {
		format: standardFormat,
		dataLinkName: `${storylineId} | key-stories`,
		url: leadArticle?.url ?? '',
		headline: '',
		trailText: '',
		webPublicationDate: '',
		supportingContent,
		discussionApiUrl: DISCUSSION_API_URL,
		byline: leadArticle?.byline ?? '',
		showByline: false,
		boostLevel: 'boost',
		isImmersive: false,
		showQuotedHeadline: false,
		showLivePlayable: false,
		avatarUrl: undefined,
		mainMedia: undefined,
		isExternalLink: false,
		image: leadArticle?.image
			? {
					src: leadArticle.image.src,
					altText: leadArticle.image.altText || '',
				}
			: undefined,
	};
}

function decideGroupedTrails(
	category: CategoryContent,
	classified: StorylineCategory | undefined,
	categoryIndex: number,
	storylineId: string,
): DCRGroupedTrails {
	const empty: DCRGroupedTrails = { splash: [], snap: [], standard: [] };

	if (classified === 'Key Stories') {
		// Guard against emitting a splash card with an empty URL when Frontend
		// sends a Key Stories category with no articles.
		if (category.articles.length === 0) {
			return empty;
		}
		return {
			...empty,
			splash: [parseKeyStoriesToFrontCard(category, storylineId)],
		};
	}

	const limit =
		classified === 'Profiles and Interviews' || classified === 'Deep Reads'
			? 1
			: 2;
	const standard = category.articles
		.slice(0, limit)
		.map((article, index) =>
			parseArticleDataToFrontCard(
				category,
				classified,
				article,
				categoryIndex,
				index,
				storylineId,
			),
		);
	return { ...empty, standard };
}

function hasRenderableCards(groupedTrails: DCRGroupedTrails): boolean {
	return (
		groupedTrails.splash.length > 0 ||
		groupedTrails.snap.length > 0 ||
		groupedTrails.standard.length > 0
	);
}

export function parseStorylinesContentToStorylines(
	storylinesContent: StorylinesContent,
): ParsedStoryline[] {
	function decideCategoryTitle(
		classified: StorylineCategory | undefined,
		rawCategory: string,
	): string {
		switch (classified) {
			case 'Key Stories':
				return 'Key Stories';
			case 'Contrasting opinions':
				return 'Opinions';
			case 'Find multimedia':
				return 'Multimedia';
			case 'Explainers':
			case 'Deep Reads':
			case 'Profiles and Interviews':
				return classified;
			case undefined:
				return rawCategory;
		}
	}
	return storylinesContent.storylines.map((storyline, i) => {
		const storylineId = `storyline-${i + 1}`;
		return {
			id: storylineId,
			title: storyline.title,
			categories: storyline.content
				.map((category, categoryIndex) => {
					const classified = classifyCategory(category.category);
					return {
						title: decideCategoryTitle(
							classified,
							category.category,
						),
						groupedTrails: decideGroupedTrails(
							category,
							classified,
							categoryIndex,
							storylineId,
						),
					};
				})
				// Drop categories that produced no renderable cards (e.g. an
				// empty Key Stories group) rather than rendering an empty
				// section heading.
				.filter((category) =>
					hasRenderableCards(category.groupedTrails),
				),
		};
	});
}
