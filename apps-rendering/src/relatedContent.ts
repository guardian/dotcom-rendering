import type { OnwardsContent as ARModelsOnwardsContent } from '@guardian/apps-rendering-api-models/onwardsContent';
import { OnwardsContentCategory } from '@guardian/apps-rendering-api-models/onwardsContentCategory';
import type { Content } from '@guardian/content-api-models/v1/content';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticlePillar, ArticleSpecial } from '@guardian/libs';
import { andThen, none, OptionKind, some } from '@guardian/types';
import type { Option } from '@guardian/types';
import {
	articleMainImage,
	articleMainVideo,
	isAnalysis,
	isFeature,
	maybeCapiDate,
} from 'capi';
import type { Contributor } from 'contributor';
import { parseContributors } from 'contributor';
import type { Image } from 'image';
import { parseImage } from 'image';
import {
	getDisplay,
	isAudio,
	isComment,
	isGallery,
	isLabs,
	isLetter,
	isLive,
	isReview,
	isVideo,
} from 'item';
import { index, pipe } from 'lib';
import { Optional } from 'optional';
import type { Context } from 'parserContext';
import { parseVideo } from 'video';
import { Asset } from '@guardian/content-api-models/v1/asset';

interface OnwardsArticleFields extends ArticleFormat {
	headline: string;
	publishDate: Option<Date>;
	mainMedia: Option<Image>;
	webUrl: string;
	contributor: Option<Contributor>;
}

interface FeatureOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.Feature;
}

interface LiveBlogOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.LiveBlog;
}

interface DeadBlogOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.DeadBlog;
}

interface ReviewOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.Review;
	starRating: string;
}

interface AnalysisOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.Analysis;
}

interface CommentOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.Comment;
}

interface AudioOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.Audio;
	mediaDuration: Optional<number>;
}

interface VideoOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.Video;
	mediaDuration: Optional<number>;
}

interface GalleryOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.Gallery;
}

interface LabsOnwardsArticle extends OnwardsArticleFields {
	design: ArticleDesign.Standard;
	theme: ArticleSpecial.Labs;
}

interface StandardOnwardsArticle extends OnwardsArticleFields {
	design: Exclude<
		ArticleDesign,
		| ArticleDesign.Feature
		| ArticleDesign.LiveBlog
		| ArticleDesign.DeadBlog
		| ArticleDesign.Review
		| ArticleDesign.Analysis
		| ArticleDesign.Comment
		| ArticleDesign.Audio
		| ArticleDesign.Video
		| ArticleDesign.Gallery
	>;
}

type OnwardsArticle =
	| FeatureOnwardsArticle
	| LiveBlogOnwardsArticle
	| DeadBlogOnwardsArticle
	| ReviewOnwardsArticle
	| AnalysisOnwardsArticle
	| CommentOnwardsArticle
	| AudioOnwardsArticle
	| VideoOnwardsArticle
	| GalleryOnwardsArticle
	| StandardOnwardsArticle
	| LabsOnwardsArticle;

const parseHeaderImage = (
	context: Context,
	content: Content,
): Optional<Image> => {
	return articleMainImage(content).flatMap(parseImage(context));
};

type OnwardsContent = {
	category: OnwardsContentCategory;
	content: OnwardsArticle[];
};

type OnwardsArticleFieldsNoDesign = Omit<OnwardsArticleFields, 'design'>;

const onwardsArticleFields = (
	context: Context,
	content: Content,
): OnwardsArticleFieldsNoDesign => ({
	headline: content.fields?.headline ?? content.webTitle,
	publishDate: maybeCapiDate(content.webPublicationDate),
	mainMedia: parseHeaderImage(context, content).toOption(),
	webUrl: content.id,
	contributor: index(0)(parseContributors(context.salt, content)),
	display: getDisplay(content),
	theme: ArticlePillar.News,
});

const getContributorImage = (
	maybeContributor: Option<Contributor>,
): Option<Image> =>
	pipe(
		maybeContributor,
		andThen((contributor) => contributor.image),
	);

const durationInSeconds = (asset: Asset): number => {
	const seconds = Optional.fromNullable(
		asset.typeData?.durationSeconds,
	).withDefault(0);
	const minutes = Optional.fromNullable(
		asset.typeData?.durationMinutes,
	).withDefault(0);

	return minutes * 60 + seconds;
};

const getMediaDuration = (content: Content): Optional<number> => {
	if (isAudio(content.tags)) {
		return Optional.fromNullable(
			content.elements?.find(
				(element) => element.type === ElementType.AUDIO,
			)?.assets[0],
		).map((asset) => durationInSeconds(asset));
	} else if (isVideo(content.tags)) {
		articleMainVideo(content)
			.flatMap(parseVideo(content.atoms))
			.map((video) => video.duration);
	}
	return Optional.none();
};

const parseMapiOnwardsContent =
	(context: Context) =>
	(
		maybeOnwardsContent: Option<ARModelsOnwardsContent>,
	): Option<OnwardsContent> => {
		if (maybeOnwardsContent.kind === OptionKind.None) {
			return none;
		}

		const onwardsContent = maybeOnwardsContent.value;

		return some({
			category: onwardsContent.category,
			content: onwardsContent.content.map((content) => {
				const { tags } = content;
				if (isFeature(content)) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Feature,
					};
				} else if (isLive(tags) && content.fields?.liveBloggingNow) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.LiveBlog,
					};
				} else if (isReview(tags)) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Review,
						starRating:
							content.fields?.starRating?.toString() ?? '',
					};
				} else if (isAnalysis(content)) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Analysis,
					};
				} else if (isComment(tags) || isLetter(tags)) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Comment,
					};
				} else if (isAudio(tags)) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Audio,
						mediaDuration: getMediaDuration(content),
					};
				} else if (isVideo(tags)) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Video,
						mediaDuration: getMediaDuration(content),
					};
				} else if (isGallery(tags)) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Gallery,
					};
				} else if (isLabs(tags)) {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Standard,
						theme: ArticleSpecial.Labs,
					};
				} else {
					return {
						...onwardsArticleFields(context, content),
						design: ArticleDesign.Standard,
					};
				}
			}),
		});
	};

const parseCapiOnwardsContent = (
	content: Content[],
): ARModelsOnwardsContent => {
	return {
		category: OnwardsContentCategory.RELATED,
		content: content.slice(0, 4),
	};
};

const getFormat = (onwardsArticle: OnwardsArticle): ArticleFormat => ({
	design: onwardsArticle.design,
	display: onwardsArticle.display,
	theme: onwardsArticle.theme,
});

const getCategoryTitle = (
	onwardsContentCategory: OnwardsContentCategory,
): string => {
	switch (onwardsContentCategory) {
		case OnwardsContentCategory.GALLERY:
			return 'More galleries';
		case OnwardsContentCategory.STORY_PACKAGE:
			return 'More on this story';
		case OnwardsContentCategory.PAID:
		case OnwardsContentCategory.SPORT:
		case OnwardsContentCategory.RELATED:
		case OnwardsContentCategory.SERIES:
		default:
			return 'Related stories';
	}
};

export {
	parseCapiOnwardsContent,
	parseMapiOnwardsContent,
	getFormat,
	getContributorImage,
	getCategoryTitle,
};

export type { OnwardsContent, OnwardsArticle };
