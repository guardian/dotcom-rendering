import type { OnwardsContent as ARModelsOnwardsContent } from '@guardian/apps-rendering-api-models/onwardsContent';
import { OnwardsContentCategory } from '@guardian/apps-rendering-api-models/onwardsContentCategory';
import type { Content } from '@guardian/content-api-models/v1/content';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { none, OptionKind, some } from '@guardian/types';
import { articleMainImage, isAnalysis, isFeature, maybeCapiDate } from 'capi';
import type { Contributor } from 'contributor';
import { parseContributors } from 'contributor';
import type { Image } from 'image';
import { parseImage } from 'image';
import {
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
import type { Optional } from 'optional';
import type { Context } from 'parserContext';

interface RelatedItemFields {
	headline: string;
	publishDate: Option<Date>;
	mainMedia: Option<Image>;
	webUrl: string;
	contributor: Option<Contributor>;
	design: ArticleDesign;
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
}

interface VideoRelatedItem extends RelatedItemFields {
	design: ArticleDesign.Video;
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
});

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
					};
				} else if (isVideo(tags)) {
					return {
						...relatedContentFields(context, content),
						design: ArticleDesign.Video,
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

const parseRelatedContent = (content: Content[]): ARModelsOnwardsContent => {
	return {
		category: OnwardsContentCategory.RELATED,
		content: content.slice(0, 4),
	};
};

export { parseRelatedContent, parseMapiRelatedContent };
export type { OnwardsContentSection as RelatedContent };
