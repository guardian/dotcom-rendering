// ----- Imports ----- //

import type { Branding } from '@guardian/apps-rendering-api-models/branding';
import type { RelatedContent } from '@guardian/apps-rendering-api-models/relatedContent';
import type { RenderingRequest } from '@guardian/apps-rendering-api-models/renderingRequest';
import type { Asset } from '@guardian/content-api-models/v1/asset';
import { AssetType } from '@guardian/content-api-models/v1/assetType';
import type { Content } from '@guardian/content-api-models/v1/content';
import type { Element } from '@guardian/content-api-models/v1/element';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import type { Format, Option } from '@guardian/types';
import {
	Design,
	Display,
	fromNullable,
	map,
	Pillar,
	Special,
} from '@guardian/types';
import type { Body } from 'bodyElement';
import { parseElements } from 'bodyElement';
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
import type { MainMedia } from 'headerMedia';
import type { Image } from 'image';
import { parseCardImage } from 'image';
import { pipe2 } from 'lib';
import type { LiveBlock } from 'liveBlock';
import { parseMany as parseLiveBlocks } from 'liveBlock';
import { themeFromString } from 'themeStyles';
import type { Context } from 'types/parserContext';

// ----- Item Type ----- //

interface Fields extends Format {
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
	relatedContent: Option<ResizedRelatedContent>;
	logo: Option<Logo>;
}

interface MatchReport extends Fields {
	design: Design.MatchReport;
	body: Body;
	football: Option<MatchScores>;
}

interface ResizedRelatedContent extends RelatedContent {
	resizedImages: Array<Option<Image>>;
}

interface Liveblog extends Fields {
	design: Design.Live;
	blocks: LiveBlock[];
	totalBodyBlocks: number;
}

interface Review extends Fields {
	design: Design.Review;
	body: Body;
	starRating: number;
}

interface Comment extends Fields {
	design: Design.Comment;
	body: Body;
}

interface Interactive extends Fields {
	design: Design.Interactive;
	body: Body;
}

// Catch-all for other Designs for now. As coverage of Designs increases,
// this will likely be split out into each Design type.
interface Standard extends Fields {
	design: Exclude<Design, Design.Live | Design.Review | Design.Comment>;
	body: Body;
}

type Item = Liveblog | Review | Comment | Standard | Interactive | MatchReport;

// ----- Convenience Types ----- //

type ItemFields = Omit<Fields, 'design'>;

type ItemFieldsWithBody = ItemFields & { body: Body };

// ----- Functions ----- //

const getFormat = (item: Item): Format => ({
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

function getDisplay(content: Content): Display {
	if (isImmersive(content) || isPhotoEssay(content)) {
		return Display.Immersive;
		// This is meant to replicate the current logic in frontend:
		// https://github.com/guardian/frontend/blob/88cfa609c73545085c3e5f3921631ec344a3eb83/common/app/model/meta.scala#L586
	} else if (isShowcaseImage(content) || isShowcaseEmbed(content)) {
		return Display.Showcase;
	}

	return Display.Standard;
}

const itemFields = (
	context: Context,
	request: RenderingRequest,
): ItemFields => {
	const { content, branding, commentCount, relatedContent } = request;
	return {
		theme: themeFromString(content.pillarId),
		display: getDisplay(content),
		headline: content.fields?.headline ?? '',
		standfirst: pipe2(
			content.fields?.standfirst,
			fromNullable,
			map(context.docParser),
		),
		byline: content.fields?.byline ?? '',
		bylineHtml: pipe2(
			content.fields?.bylineHtml,
			fromNullable,
			map(context.docParser),
		),
		publishDate: maybeCapiDate(content.webPublicationDate),
		mainMedia: articleMainMedia(content, context),
		contributors: parseContributors(context.salt, content),
		series: articleSeries(content),
		commentable: content.fields?.commentable ?? false,
		tags: content.tags,
		shouldHideReaderRevenue:
			content.fields?.shouldHideReaderRevenue ?? false,
		branding: fromNullable(branding),
		internalShortId: fromNullable(content.fields?.internalShortId),
		commentCount: fromNullable(commentCount),
		relatedContent: pipe2(
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
	};
};

const itemFieldsWithBody = (
	context: Context,
	request: RenderingRequest,
): ItemFieldsWithBody => {
	const { content } = request;
	const body = content.blocks?.body ?? [];
	const atoms = content.atoms;
	const campaigns = request.campaigns;
	const elements = [...body].shift()?.elements;

	return {
		...itemFields(context, request),
		body: elements
			? parseElements(context, atoms, campaigns)(elements)
			: [],
	};
};

const hasSomeTag = (tagIds: string[]) => (tags: Tag[]): boolean =>
	tags.some((tag) => tagIds.includes(tag.id));

const hasTag = (tagId: string) => (tags: Tag[]): boolean =>
	tags.some((tag) => tag.id === tagId);

const isAudio = hasTag('type/audio');

const isVideo = hasTag('type/video');

const isGallery = hasTag('type/gallery');

const isMedia = hasSomeTag([
	'type/audio',
	'type/video',
	'type/gallery',
	'type/picture',
]);

const isReview = hasSomeTag([
	'tone/reviews',
	'tone/livereview',
	'tone/albumreview',
]);

const isAnalysis = hasTag('tone/analysis');

const isComment = hasSomeTag(['tone/comment', 'tone/letters']);

const isFeature = hasTag('tone/features');

const isLive = hasTag('tone/minutebyminute');

const isRecipe = hasTag('tone/recipes');

const isInterview = hasTag('tone/interview');

const isGuardianView = hasTag('tone/editorials');

const isQuiz = hasTag('tone/quizzes');

const isLabs = hasTag('tone/advertisement-features');

const isMatchReport = hasTag('tone/matchreports');
const isPicture = hasTag('type/picture');

const fromCapiLiveBlog = (context: Context) => (
	request: RenderingRequest,
): Liveblog => {
	const { content } = request;
	const body = content.blocks?.body?.slice(0, 7) ?? [];

	return {
		design: Design.Live,
		blocks: parseLiveBlocks(body)(context),
		totalBodyBlocks: content.blocks?.totalBodyBlocks ?? body.length,
		...itemFields(context, request),
	};
};

const fromCapi = (context: Context) => (request: RenderingRequest): Item => {
	const { content } = request;
	const { tags, fields } = content;

	// These checks aim for parity with the CAPI Scala client:
	// https://github.com/guardian/content-api-scala-client/blob/9e249bcef47cc048da483b3453c10dd7d2e9565d/client/src/main/scala/com.gu.contentapi.client/utils/CapiModelEnrichment.scala
	if (isInteractive(content)) {
		return {
			design: Design.Interactive,
			...itemFieldsWithBody(context, request),
		};
	} else if (isMedia(tags)) {
		return {
			design: Design.Media,
			...itemFieldsWithBody(context, request),
		};
	} else if (fields?.starRating !== undefined && isReview(tags)) {
		return {
			design: Design.Review,
			starRating: fields.starRating,
			...itemFieldsWithBody(context, request),
		};
	} else if (isAnalysis(tags)) {
		return {
			design: Design.Analysis,
			...itemFieldsWithBody(context, request),
		};
	} else if (isComment(tags)) {
		const item = itemFieldsWithBody(context, request);
		return {
			design: Design.Comment,
			...item,
			theme: item.theme === Pillar.News ? Pillar.Opinion : item.theme,
		};
	} else if (isInterview(tags)) {
		return {
			design: Design.Interview,
			...itemFieldsWithBody(context, request),
		};
	} else if (isFeature(tags)) {
		return {
			design: Design.Feature,
			...itemFieldsWithBody(context, request),
		};
	} else if (isLive(tags)) {
		return fromCapiLiveBlog(context)(request);
	} else if (isRecipe(tags)) {
		return {
			design: Design.Recipe,
			...itemFieldsWithBody(context, request),
		};
	} else if (isGuardianView(tags)) {
		return {
			design: Design.GuardianView,
			...itemFieldsWithBody(context, request),
		};
	} else if (isQuiz(tags)) {
		return {
			design: Design.Quiz,
			...itemFieldsWithBody(context, request),
		};
	} else if (isLabs(tags)) {
		return {
			design: Design.Article,
			...itemFieldsWithBody(context, request),
			theme: Special.Labs,
		};
	} else if (isMatchReport(tags)) {
		return {
			design: Design.MatchReport,
			football: parseMatchScores(fromNullable(request.footballContent)),
			...itemFieldsWithBody(context, request),
		};
	}

	return {
		design: Design.Article,
		...itemFieldsWithBody(context, request),
	};
};

// ----- Exports ----- //

export {
	Item,
	Comment,
	Liveblog,
	Review,
	Standard,
	MatchReport,
	ResizedRelatedContent,
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
};
