// ----- Imports ----- //

import type { Branding } from '@guardian/apps-rendering-api-models/branding';
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { Asset } from '@guardian/content-api-models/v1/asset';
import { AssetType } from '@guardian/content-api-models/v1/assetType';
import type { Content } from '@guardian/content-api-models/v1/content';
import type { Element } from '@guardian/content-api-models/v1/element';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import type { ArticleFormat } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { andThen, fromNullable, map, none, some } from '@guardian/types';
import type { Option } from '@guardian/types';
import { getPillarFromId } from 'articleFormat';
import type { Body } from 'bodyElement';
import { parseElements } from 'bodyElement';
import { getReport } from 'campaign';
import type { Logo } from 'capi';
import {
	articleMainMedia,
	articleSeries,
	isImmersive,
	isInteractive,
	isPhotoEssay,
	maybeCapiDate,
	paidContentLogo,
} from 'capi';
import type { Contributor } from 'contributor';
import { parseContributors } from 'contributor';
import type { MatchScores } from 'football';
import { parseMatchScores } from 'football';
import { pipe } from 'lib';
import type { LiveBlock } from 'liveBlock';
import { parseMany as parseLiveBlocks } from 'liveBlock';
import type { MainMedia } from 'mainMedia';
import { Optional } from 'optional';
import type { Outline } from 'outline';
import { fromBodyElements } from 'outline';
import type { LiveBlogPagedBlocks } from 'pagination';
import { getPagedBlocks } from 'pagination';
import type { Context } from 'parserContext';
import type { OnwardsContent } from 'relatedContent';
import { parseMapiOnwardsContent } from 'relatedContent';
import { Result } from 'result';

// ----- Item Type ----- //

interface Fields extends ArticleFormat {
	headline: string;
	standfirst: Option<DocumentFragment>;
	byline: string;
	bylineHtml: Option<DocumentFragment>;
	publishDate: Option<Date>;
	mainMedia: Option<MainMedia>;
	contributors: Contributor[];
	series: Option<Tag>;
	commentable: boolean;
	tags: Tag[];
	shouldHideReaderRevenue: boolean;
	branding: Option<Branding>;
	internalShortId: Option<string>;
	commentCount: Option<number>;
	relatedContent: Optional<OnwardsContent>;
	logo: Option<Logo>;
	webUrl: string;
	edition: Edition;
	promotedNewsletter: Option<Newsletter>;
}

interface MatchReport extends Fields {
	design: ArticleDesign.MatchReport;
	body: Body;
	football: Optional<MatchScores>;
}

interface LiveBlog extends Fields {
	design: ArticleDesign.LiveBlog;
	blocks: LiveBlock[];
	totalBodyBlocks: number;
	pagedBlocks: LiveBlogPagedBlocks;
}

interface DeadBlog extends Fields {
	design: ArticleDesign.DeadBlog;
	blocks: LiveBlock[];
	totalBodyBlocks: number;
	pagedBlocks: LiveBlogPagedBlocks;
}

interface Review extends Fields {
	design: ArticleDesign.Review;
	body: Body;
	starRating: Option<number>;
}

interface Comment extends Fields {
	design: ArticleDesign.Comment;
	body: Body;
}

interface Letter extends Fields {
	design: ArticleDesign.Letter;
	body: Body;
}

interface Editorial extends Fields {
	design: ArticleDesign.Editorial;
	body: Body;
}

interface Interactive extends Fields {
	design: ArticleDesign.Interactive;
	body: Body;
}

interface Obituary extends Fields {
	design: ArticleDesign.Obituary;
	body: Body;
}

interface Correction extends Fields {
	design: ArticleDesign.Correction;
	body: Body;
}
interface Interview extends Fields {
	design: ArticleDesign.Interview;
	body: Body;
}

interface Quiz extends Fields {
	design: ArticleDesign.Quiz;
	body: Body;
}
interface Recipe extends Fields {
	design: ArticleDesign.Recipe;
	body: Body;
}

interface Feature extends Fields {
	design: ArticleDesign.Feature;
	body: Body;
}
interface PhotoEssay extends Fields {
	design: ArticleDesign.PhotoEssay;
	body: Body;
}

interface PrintShop extends Fields {
	design: ArticleDesign.PrintShop;
	body: Body;
}

interface Analysis extends Fields {
	design: ArticleDesign.Analysis;
	body: Body;
	outline: Outline;
}

interface Explainer extends Fields {
	design: ArticleDesign.Explainer;
	body: Body;
	outline: Outline;
}
// Catch-all for other Designs for now. As coverage of Designs increases,
// this will likely be split out into each ArticleDesign type.
interface Standard extends Fields {
	design: Exclude<
		ArticleDesign,
		| ArticleDesign.LiveBlog
		| ArticleDesign.DeadBlog
		| ArticleDesign.Review
		| ArticleDesign.Comment
		| ArticleDesign.Letter
		| ArticleDesign.Editorial
		| ArticleDesign.Analysis
		| ArticleDesign.Explainer
	>;
	body: Body;
}

type Item =
	| LiveBlog
	| DeadBlog
	| Review
	| Comment
	| Standard
	| Interactive
	| MatchReport
	| Letter
	| Obituary
	| Editorial
	| Correction
	| Interview
	| Analysis
	| Explainer;

// ----- Convenience Types ----- //

type ItemFields = Omit<Fields, 'design'>;

type ItemFieldsWithBody = ItemFields & { body: Body };

// ----- Functions ----- //

const getFormat = (item: Item): ArticleFormat => ({
	design: item.design,
	display: item.display,
	theme: item.theme,
});

// The main image for the page is meant to be shown as showcase.
function isShowcaseImage(content: Content): boolean {
	const mainMedia = content.blocks?.main?.elements[0];

	return mainMedia?.imageTypeData?.role === 'showcase';
}

// The main media for the page is an embed.
const isMainEmbed = (elem: Element): boolean =>
	elem.relation === 'main' && elem.type === ElementType.EMBED;

// The first embed asset is meant to be shown as showcase.
const hasShowcaseAsset = (assets: Asset[]): boolean =>
	assets.find((asset) => asset.type === AssetType.EMBED)?.typeData?.role ===
	'showcase';

// There is an embed element that is both the main media for the page,
// and is meant to be displayed as showcase.
const isShowcaseEmbed = (content: Content): boolean =>
	content.elements?.some(
		(elem) => isMainEmbed(elem) && hasShowcaseAsset(elem.assets),
	) ?? false;

function getDisplay(content: Content): ArticleDisplay {
	if (isImmersive(content) || isPhotoEssay(content)) {
		return ArticleDisplay.Immersive;
		// This is meant to replicate the current logic in frontend:
		// https://github.com/guardian/frontend/blob/88cfa609c73545085c3e5f3921631ec344a3eb83/common/app/model/meta.scala#L586
	} else if (isShowcaseImage(content) || isShowcaseEmbed(content)) {
		return ArticleDisplay.Showcase;
	}

	return ArticleDisplay.Standard;
}

/**
 * Some pieces are supported and contain a branding logo. The branding
 * information is separate from the CAPI model, and is passed to AR by MAPI.
 *
 * Sometimes we don't want to show the branding information, even if it's
 * present. This is controlled by the `isInappropriateForSponsorship` field
 * from CAPI, set via a Composer checkbox.
 *
 * This function derives the branding information based on these conditions.
 * @param renderingRequest The request from MAPI
 * @returns An optional object containing branding information
 */
const getBranding = ({
	content,
	branding,
}: RenderingRequest): Option<Branding> =>
	content.fields?.isInappropriateForSponsorship === true
		? none
		: fromNullable(branding);

const itemFields = (
	context: Context,
	request: RenderingRequest,
): ItemFields => {
	const { content, commentCount, onwardsContent, campaigns } = request;
	return {
		theme: getReport(campaigns ?? []).withDefault(
			Optional.fromNullable(content.pillarId)
				.flatMap(getPillarFromId)
				.withDefault(ArticlePillar.News),
		),
		display: getDisplay(content),
		headline: content.fields?.headline ?? '',
		standfirst: pipe(
			content.fields?.standfirst,
			fromNullable,
			map(context.docParser),
		),
		byline: content.fields?.byline ?? '',
		bylineHtml: pipe(
			content.fields?.bylineHtml,
			fromNullable,
			andThen((html) => (html !== '' ? some(html) : none)),
			map(context.docParser),
		),
		publishDate: maybeCapiDate(content.webPublicationDate),
		mainMedia: articleMainMedia(content, context).toOption(),
		contributors: parseContributors(context.salt, content),
		series: articleSeries(content),
		commentable: content.fields?.commentable ?? false,
		tags: content.tags,
		shouldHideReaderRevenue:
			content.fields?.shouldHideReaderRevenue ?? false,
		branding: getBranding(request),
		internalShortId: fromNullable(content.fields?.internalShortId),
		commentCount: fromNullable(commentCount),
		relatedContent: Optional.fromNullable(onwardsContent).map(
			parseMapiOnwardsContent(context),
		),
		logo: paidContentLogo(content.tags),
		webUrl: content.webUrl,
		edition: Optional.fromNullable(request.edition).withDefault(Edition.UK),
		promotedNewsletter: fromNullable(request.promotedNewsletter),
	};
};

const outlineFromItem = (item: ItemFieldsWithBody): Outline => {
	const elements = Result.partition(item.body).oks;
	return fromBodyElements(elements);
};

const itemFieldsWithBody = (
	context: Context,
	request: RenderingRequest,
): ItemFieldsWithBody => {
	const { content } = request;
	const body = content.blocks?.body ?? [];
	const atoms = content.atoms;
	const campaigns = request.campaigns ?? [];
	const elements = [...body].shift()?.elements;

	return {
		...itemFields(context, request),
		body: elements
			? parseElements(context, campaigns, atoms)(elements)
			: [],
	};
};

const hasSomeTag =
	(tagIds: string[]) =>
	(tags: Tag[]): boolean =>
		tags.some((tag) => tagIds.includes(tag.id));

const hasTag =
	(tagId: string) =>
	(tags: Tag[]): boolean =>
		tags.some((tag) => tag.id === tagId);

const isAudio = hasTag('type/audio');

const isVideo = hasTag('type/video');

const isGallery = hasTag('type/gallery');

const isReview = hasSomeTag([
	'tone/reviews',
	'tone/livereview',
	'tone/albumreview',
]);

const isAnalysis = hasTag('tone/analysis');

const isExplainer = hasTag('tone/explainers');

const isLetter = hasTag('tone/letters');

const isComment = hasTag('tone/comment');

const isFeature = hasTag('tone/features');

const isLive = hasTag('tone/minutebyminute');

const isRecipe = hasTag('tone/recipes');

const isInterview = hasTag('tone/interview');

const isObituary = hasTag('tone/obituaries');

const isGuardianView = hasTag('tone/editorials');

const isQuiz = hasTag('tone/quizzes');

const isLabs = hasTag('tone/advertisement-features');

const isMatchReport = hasTag('tone/matchreports');

const isCorrection = hasTag('theguardian/series/correctionsandclarifications');

const isPicture = hasTag('type/picture');

const fromCapiLiveBlog =
	(context: Context) =>
	(
		request: RenderingRequest,
		blockId: Option<string>,
	): LiveBlog | DeadBlog => {
		const { content, campaigns } = request;
		const body = content.blocks?.body ?? [];
		const pageSize = content.tags.map((c) => c.id).includes('sport/sport')
			? 30
			: 10;

		const parsedBlocks = parseLiveBlocks(context)(
			body,
			content.tags,
			campaigns ?? [],
		);
		const pagedBlocks = getPagedBlocks(pageSize, parsedBlocks, blockId);
		return {
			design:
				content.fields?.liveBloggingNow === true
					? ArticleDesign.LiveBlog
					: ArticleDesign.DeadBlog,
			blocks: parsedBlocks,
			pagedBlocks,
			totalBodyBlocks: content.blocks?.totalBodyBlocks ?? body.length,
			...itemFields(context, request),
		};
	};

const fromCapi =
	(context: Context) =>
	(request: RenderingRequest, page: Option<string>): Item => {
		const { content } = request;
		const { tags, fields } = content;

		// These checks aim for parity with the CAPI Scala client:
		// https://github.com/guardian/content-api-scala-client/blob/9e249bcef47cc048da483b3453c10dd7d2e9565d/client/src/main/scala/com.gu.contentapi.client/utils/CapiModelEnrichment.scala
		if (isInteractive(content)) {
			return {
				design: ArticleDesign.Interactive,
				...itemFieldsWithBody(context, request),
			};
			// This isn't accurate, picture pieces look different to galleries.
			// This is to prevent accidentally breaking Editions until we have
			// a model for pictures.
		} else if (isGallery(tags) || isPicture(tags)) {
			return {
				design: ArticleDesign.Gallery,
				...itemFieldsWithBody(context, request),
			};
		} else if (isAudio(tags)) {
			return {
				design: ArticleDesign.Audio,
				...itemFieldsWithBody(context, request),
			};
		} else if (isVideo(tags)) {
			return {
				design: ArticleDesign.Video,
				...itemFieldsWithBody(context, request),
			};
		} else if (isReview(tags)) {
			return {
				design: ArticleDesign.Review,
				starRating: fromNullable(fields?.starRating),
				...itemFieldsWithBody(context, request),
			};
		} else if (isAnalysis(tags)) {
			const item = itemFieldsWithBody(context, request);
			return {
				design: ArticleDesign.Analysis,
				...item,
				outline: outlineFromItem(item),
			};
		} else if (isExplainer(tags)) {
			const item = itemFieldsWithBody(context, request);
			return {
				design: ArticleDesign.Explainer,
				...item,
				outline: outlineFromItem(item),
			};
		} else if (isCorrection(tags)) {
			return {
				design: ArticleDesign.Correction,
				...itemFieldsWithBody(context, request),
			};
		} else if (isLetter(tags)) {
			return {
				design: ArticleDesign.Letter,
				...itemFieldsWithBody(context, request),
			};
		} else if (isObituary(tags)) {
			return {
				design: ArticleDesign.Obituary,
				...itemFieldsWithBody(context, request),
			};
		} else if (isGuardianView(tags)) {
			return {
				design: ArticleDesign.Editorial,
				...itemFieldsWithBody(context, request),
			};
		} else if (isComment(tags)) {
			const item = itemFieldsWithBody(context, request);
			return {
				design: ArticleDesign.Comment,
				...item,
				theme:
					item.theme === ArticlePillar.News
						? ArticlePillar.Opinion
						: item.theme,
			};
		} else if (isInterview(tags)) {
			return {
				design: ArticleDesign.Interview,
				...itemFieldsWithBody(context, request),
			};
		} else if (isRecipe(tags)) {
			return {
				design: ArticleDesign.Recipe,
				...itemFieldsWithBody(context, request),
			};
		} else if (isFeature(tags)) {
			return {
				design: ArticleDesign.Feature,
				...itemFieldsWithBody(context, request),
			};
		} else if (isLive(tags)) {
			return fromCapiLiveBlog(context)(request, page);
		} else if (isQuiz(tags)) {
			return {
				design: ArticleDesign.Quiz,
				...itemFieldsWithBody(context, request),
			};
		} else if (isLabs(tags)) {
			return {
				design: ArticleDesign.Standard,
				...itemFieldsWithBody(context, request),
				theme: ArticleSpecial.Labs,
			};
		} else if (isMatchReport(tags)) {
			return {
				design: ArticleDesign.MatchReport,
				football: Optional.fromNullable(
					request.footballContent,
				).flatMap(parseMatchScores),
				...itemFieldsWithBody(context, request),
			};
		}

		return {
			design: ArticleDesign.Standard,
			...itemFieldsWithBody(context, request),
		};
	};

// ----- Exports ----- //

export {
	Item,
	Analysis,
	Comment,
	LiveBlog,
	DeadBlog,
	Review,
	Standard,
	MatchReport,
	Letter,
	Editorial,
	Interview,
	Recipe,
	Quiz,
	PhotoEssay,
	Feature,
	PrintShop,
	Explainer,
	fromCapi,
	fromCapiLiveBlog,
	getFormat,
	getDisplay,
	isLabs,
	isLive,
	isComment,
	isAudio,
	isVideo,
	isGallery,
	isPicture,
	isLetter,
	isObituary,
	isReview,
};
