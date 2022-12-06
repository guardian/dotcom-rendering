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

interface RelatedItemFields extends ArticleFormat {
	headline: string;
	publishDate: Option<Date>;
	mainMedia: Option<Image>;
	webUrl: string;
	contributor: Option<Contributor>;
}

interface FeatureRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Feature;
}

interface LiveBlogRelatedItem extends RelatedItemFields {
	design: ArticleDesign.LiveBlog;
}

interface DeadBlogRelatedItem extends RelatedItemFields {
	design: ArticleDesign.DeadBlog;
}

interface ReviewRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Review;
	starRating: string;
}

interface AnalysisRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Analysis;
}

interface CommentRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Comment;
}

interface AudioRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Audio;
	mediaDuration: Optional<number>;
}

interface VideoRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Video;
	mediaDuration: Optional<number>;
}

interface GalleryRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Gallery;
}

interface LabsRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Standard;
	theme: ArticleSpecial.Labs;
}

interface StandardRelatedItem extends RelatedItemFields {
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

type OnwardsContentArticle =
	| FeatureRelatedItem
	| LiveBlogRelatedItem
	| DeadBlogRelatedItem
	| ReviewRelatedItem
	| AnalysisRelatedItem
	| CommentRelatedItem
	| AudioRelatedItem
	| VideoRelatedItem
	| GalleryRelatedItem
	| StandardRelatedItem
	| LabsRelatedItem;

const parseHeaderImage = (
	context: Context,
	content: Content,
): Optional<Image> => {
	return articleMainImage(content).flatMap(parseImage(context));
};

type OnwardsContentSection = {
	category: OnwardsContentCategory;
	content: OnwardsContentArticle[];
};

type RelatedItemFieldsNoDesign = Omit<RelatedItemFields, 'design'>;

const relatedContentFields = (
	context: Context,
	content: Content,
): RelatedItemFieldsNoDesign => ({
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

const parseMapiRelatedContent =
	(context: Context) =>
	(
		maybeRelatedContent: Option<ARModelsOnwardsContent>,
	): Option<OnwardsContentSection> => {
		if (maybeRelatedContent.kind === OptionKind.None) {
			return none;
		}

		const relatedContent = maybeRelatedContent.value;

		return some({
			category: relatedContent.category,
			content: relatedContent.content.map((content) => {
				const { tags } = content;
				if (isFeature(content)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Feature,
					};
				} else if (isLive(tags) && content.fields?.liveBloggingNow) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.LiveBlog,
					};
				} else if (isReview(tags)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Review,
						starRating:
							content.fields?.starRating?.toString() ?? '',
					};
				} else if (isAnalysis(content)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Analysis,
					};
				} else if (isComment(tags) || isLetter(tags)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Comment,
					};
				} else if (isAudio(tags)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Audio,
						mediaDuration: getMediaDuration(content),
					};
				} else if (isVideo(tags)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Video,
						mediaDuration: getMediaDuration(content),
					};
				} else if (isGallery(tags)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Gallery,
					};
				} else if (isLabs(tags)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Standard,
						theme: ArticleSpecial.Labs,
					};
				} else {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Standard,
					};
				}
			}),
		});
	};

const parseCapiRelatedContent = (
	content: Content[],
): ARModelsOnwardsContent => {
	return {
		category: OnwardsContentCategory.RELATED,
		content: content.slice(0, 4),
	};
};

const getFormat = (onwardsArticle: OnwardsContentArticle): ArticleFormat => ({
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
	parseCapiRelatedContent,
	parseMapiRelatedContent,
	getFormat,
	getContributorImage,
	getCategoryTitle,
};

export type { OnwardsContentSection as RelatedContent, OnwardsContentArticle };
