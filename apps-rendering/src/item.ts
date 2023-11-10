// ----- Imports ----- //

import type { Branding } from '@guardian/apps-rendering-api-models/branding';
import { Edition } from '@guardian/apps-rendering-api-models/edition';
import type { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import type { RelatedContent } from '@guardian/apps-rendering-api-models/relatedContent';
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
import type { BodyElement } from 'bodyElement';
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
import type { Image } from 'image';
import { parseCardImage } from 'image';
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
import { Result } from 'result';
import { MainMediaKind } from 'mainMedia';
import { OptionKind } from '@guardian/types/src/option';

// ----- Item Type ----- //

interface Fields extends ArticleFormat {
	headline: string;
	standfirst: Optional<DocumentFragment>;
	byline: string;
	bylineHtml: Option<DocumentFragment>;
	publishDate: Option<Date>;
	mainMedia: Option<MainMedia>;
	contributors: Contributor[];
	series: Optional<Tag>;
	commentable: boolean;
	tags: Tag[];
	shouldHideReaderRevenue: boolean;
	branding: Option<Branding>;
	commentCount: Option<number>;
	relatedContent: Option<ResizedRelatedContent>;
	logo: Option<Logo>;
	webUrl: string;
	edition: Edition;
	promotedNewsletter: Option<Newsletter>;
	shouldHideAdverts: boolean;
	outline: Outline;
}

interface MatchReport extends Fields {
	design: ArticleDesign.MatchReport;
	body: BodyElement[];
	football: Optional<MatchScores>;
}

interface ResizedRelatedContent extends RelatedContent {
	resizedImages: Array<Option<Image>>;
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
	body: BodyElement[];
	starRating: Option<number>;
}

interface Comment extends Fields {
	design: ArticleDesign.Comment;
	body: BodyElement[];
}

interface Letter extends Fields {
	design: ArticleDesign.Letter;
	body: BodyElement[];
}

interface Editorial extends Fields {
	design: ArticleDesign.Editorial;
	body: BodyElement[];
}

interface Interactive extends Fields {
	design: ArticleDesign.Interactive;
	body: BodyElement[];
}

interface Obituary extends Fields {
	design: ArticleDesign.Obituary;
	body: BodyElement[];
}

interface Correction extends Fields {
	design: ArticleDesign.Correction;
	body: BodyElement[];
}
interface Interview extends Fields {
	design: ArticleDesign.Interview;
	body: BodyElement[];
}

interface Quiz extends Fields {
	design: ArticleDesign.Quiz;
	body: BodyElement[];
}
interface Recipe extends Fields {
	design: ArticleDesign.Recipe;
	body: BodyElement[];
}

interface Feature extends Fields {
	design: ArticleDesign.Feature;
	body: BodyElement[];
}
interface PhotoEssay extends Fields {
	design: ArticleDesign.PhotoEssay;
	body: BodyElement[];
}

interface PrintShop extends Fields {
	design: ArticleDesign.PrintShop;
	body: BodyElement[];
}

interface Analysis extends Fields {
	design: ArticleDesign.Analysis;
	body: BodyElement[];
}

interface Explainer extends Fields {
	design: ArticleDesign.Explainer;
	body: BodyElement[];
}

interface Gallery extends Fields {
	design: ArticleDesign.Gallery;
	body: BodyElement[];
}

interface Audio extends Fields {
	design: ArticleDesign.Audio;
	body: BodyElement[];
}

interface Video extends Fields {
	design: ArticleDesign.Video;
	body: BodyElement[];
}

interface Standard extends Fields {
	design: ArticleDesign.Standard;
	body: BodyElement[];
}

interface NewsletterSignup extends Fields {
	design: ArticleDesign.NewsletterSignup;
	body: BodyElement[];
}

interface PhotoEssay extends Fields {
	design: ArticleDesign.PhotoEssay;
	body: BodyElement[];
}

interface PrintShop extends Fields {
	design: ArticleDesign.PrintShop;
	body: BodyElement[];
}

interface FullPageInteractive extends Fields {
	design: ArticleDesign.FullPageInteractive;
	body: BodyElement[];
}

interface Timeline extends Fields {
	design: ArticleDesign.Timeline;
	body: BodyElement[];
}

interface Profile extends Fields {
	design: ArticleDesign.Profile;
	body: BodyElement[];
}

interface Picture extends Fields {
	design: ArticleDesign.Picture;
	body: BodyElement[];
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
	| Explainer
	| Gallery
	| Audio
	| Video
	| Recipe
	| Feature
	| Quiz
	| NewsletterSignup
	| PhotoEssay
	| PrintShop
	| FullPageInteractive
	| Timeline
	| Profile
	| Picture;

// ----- Convenience Types ----- //

type ItemFields = Omit<Fields, 'design'>;

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

const parseItemFields = (
	context: Context,
	request: RenderingRequest,
	body: BodyElement[],
): ItemFields => {
	const { content, commentCount, relatedContent, campaigns } = request;
	return {
		theme: getReport(campaigns ?? []).withDefault(
			Optional.fromNullable(content.pillarId)
				.flatMap(getPillarFromId)
				.withDefault(ArticlePillar.News),
		),
		display: getDisplay(content),
		headline: content.fields?.headline ?? '',
		standfirst: Optional.fromNullable(content.fields?.standfirst).map(
			context.docParser,
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
		commentCount: fromNullable(commentCount),
		relatedContent: pipe(
			relatedContent,
			fromNullable,
			map((relatedContent) => ({
				...relatedContent,
				resizedImages: relatedContent.relatedItems.map((item) =>
					parseCardImage(item.headerImage, context.salt),
				),
			})),
		),
		logo: paidContentLogo(content.tags),
		webUrl: content.webUrl,
		edition: Optional.fromNullable(request.edition).withDefault(Edition.UK),
		promotedNewsletter: fromNullable(request.promotedNewsletter),
		shouldHideAdverts: request.content.fields?.shouldHideAdverts ?? false,
		outline: request.content.fields?.showTableOfContents
			? fromBodyElements(body)
			: [],
	};
};

const parseBody = (
	context: Context,
	request: RenderingRequest,
): BodyElement[] => {
	const { content } = request;
	const body = content.blocks?.body ?? [];
	const atoms = content.atoms;
	const campaigns = request.campaigns ?? [];
	const elements = [...body].shift()?.elements;

	return elements !== undefined
		? Result.partition(parseElements(context, campaigns, atoms)(elements))
				.oks
		: [];
};

const hasSomeTag =
	(tagIds: string[]) =>
	(tags: Tag[]): boolean =>
		tags.some((tag) => tagIds.includes(tag.id));

const hasTag =
	(tagId: string) =>
	(tags: Tag[]): boolean =>
		tags.some((tag) => tag.id === tagId);

const hasMainElement =
	(mainMediaKind: MainMediaKind) =>
	(mainMedia: Option<MainMedia>): boolean =>
		mainMedia.kind === OptionKind.Some
			? mainMedia.value.kind === mainMediaKind
			: false;

const isAudio = hasTag('type/audio');

const isVideo = hasTag('type/video');

const isGallery = hasTag('type/gallery');

const isNews = hasTag('tone/news');

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

const isTimeline = hasTag('tone/timelines');

const isProfile = hasTag('tone/profiles');

const isCorrection = hasTag('theguardian/series/correctionsandclarifications');

const isPicture = hasTag('type/picture');

const hasCartoon = hasMainElement(MainMediaKind.Cartoon);

const fromCapiLiveBlog =
	(context: Context) =>
	(
		request: RenderingRequest,
		blockId: Option<string>,
		itemFields: ItemFields,
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
			...itemFields,
		};
	};

const fromCapi =
	(context: Context) =>
	(request: RenderingRequest, page: Option<string>): Item => {
		const { content } = request;
		const { tags, fields } = content;

		const body = parseBody(context, request);
		const itemFields = parseItemFields(context, request, body);

		if (isLive(tags)) {
			return fromCapiLiveBlog(context)(request, page, itemFields);
		}

		// These checks aim for parity with the CAPI Scala client:
		// https://github.com/guardian/content-api-scala-client/blob/9e249bcef47cc048da483b3453c10dd7d2e9565d/client/src/main/scala/com.gu.contentapi.client/utils/CapiModelEnrichment.scala
		if (isInteractive(content)) {
			return {
				design: ArticleDesign.Interactive,
				body,
				...itemFields,
			};
		} else if (isGallery(tags)) {
			return {
				design: ArticleDesign.Gallery,
				body,
				...itemFields,
			};
		} else if (isAudio(tags)) {
			return {
				design: ArticleDesign.Audio,
				body,
				...itemFields,
			};
		} else if (isVideo(tags)) {
			return {
				design: ArticleDesign.Video,
				body,
				...itemFields,
			};
		} else if (isPicture(tags)) {
			return {
				design: ArticleDesign.Picture,
				body,
				...itemFields,
			};
		} else if (isReview(tags)) {
			return {
				design: ArticleDesign.Review,
				starRating: fromNullable(fields?.starRating),
				body,
				...itemFields,
			};
		} else if (isAnalysis(tags)) {
			return {
				design: ArticleDesign.Analysis,
				body,
				...itemFields,
			};
		} else if (isExplainer(tags)) {
			return {
				design: ArticleDesign.Explainer,
				body,
				...itemFields,
			};
		} else if (isCorrection(tags)) {
			return {
				design: ArticleDesign.Correction,
				body,
				...itemFields,
			};
		} else if (isLetter(tags)) {
			return {
				design: ArticleDesign.Letter,
				body,
				...itemFields,
			};
		} else if (isObituary(tags)) {
			return {
				design: ArticleDesign.Obituary,
				body,
				...itemFields,
			};
		} else if (isGuardianView(tags)) {
			return {
				design: ArticleDesign.Editorial,
				body,
				...itemFields,
			};
		} else if (isComment(tags)) {
			return {
				design: ArticleDesign.Comment,
				body,
				...itemFields,
				theme:
					itemFields.theme === ArticlePillar.News
						? ArticlePillar.Opinion
						: itemFields.theme,
			};
		} else if (isInterview(tags)) {
			return {
				design: ArticleDesign.Interview,
				body,
				...itemFields,
			};
		} else if (isRecipe(tags)) {
			return {
				design: ArticleDesign.Recipe,
				body,
				...itemFields,
			};
		} else if (isFeature(tags)) {
			return {
				design: ArticleDesign.Feature,
				body,
				...itemFields,
			};
		} else if (isQuiz(tags)) {
			return {
				design: ArticleDesign.Quiz,
				body,
				...itemFields,
			};
		} else if (isLabs(tags)) {
			return {
				design: ArticleDesign.Standard,
				body,
				...itemFields,
				theme: ArticleSpecial.Labs,
			};
		} else if (isMatchReport(tags)) {
			return {
				design: ArticleDesign.MatchReport,
				football: Optional.fromNullable(
					request.footballContent,
				).flatMap(parseMatchScores),
				body,
				...itemFields,
			};
		} else if (isTimeline(tags)) {
			return {
				design: ArticleDesign.Timeline,
				body,
				...itemFields,
			};
		} else if (isProfile(tags)) {
			return {
				design: ArticleDesign.Profile,
				body,
				...itemFields,
			};
		}

		return {
			design: ArticleDesign.Standard,
			body,
			...itemFields,
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
	ResizedRelatedContent,
	Letter,
	Editorial,
	Interview,
	Recipe,
	Quiz,
	PhotoEssay,
	Feature,
	PrintShop,
	Explainer,
	Gallery,
	Audio,
	Video,
	Interactive,
	NewsletterSignup,
	Obituary,
	Correction,
	Timeline,
	Profile,
	fromCapi,
	fromCapiLiveBlog,
	getFormat,
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
	isNews,
	isTimeline,
	isProfile,
	hasCartoon,
};
