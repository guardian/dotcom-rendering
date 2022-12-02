import type { Image } from '@guardian/apps-rendering-api-models/image';
import type { OnwardsContent as ARModelsOnwardsContent } from '@guardian/apps-rendering-api-models/onwardsContent';
import { OnwardsContentCategory } from '@guardian/apps-rendering-api-models/onwardsContentCategory';
import type { Content } from '@guardian/content-api-models/v1/content';
import { ArticleDesign, ArticleSpecial } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { fromNullable, none, OptionKind, some } from '@guardian/types';
import { articleMainImage, isAnalysis, isFeature, maybeCapiDate } from 'capi';
import type { Contributor } from 'contributor';
import { parseContributors } from 'contributor';
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
import { Optional } from 'optional';

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

type RelatedItem =
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

const parseHeaderImage = (content: Content): Image | undefined => {
	const optionalImage = articleMainImage(content).flatMap((element) => {
		const masterAsset = element.assets.find(
			(asset) => asset.typeData?.isMaster,
		);

		return Optional.fromNullable(masterAsset).map((asset) => ({
			url: asset.file ?? '',
			height: asset.typeData?.height ?? 360,
			width: asset.typeData?.width ?? 600,
			altText: element.imageTypeData?.alt,
		}));
	});

	if (optionalImage.isSome()) {
		return optionalImage.value;
	} else {
		return undefined;
	}
};

type OnwardsContent = {
	category: OnwardsContentCategory;
	content: RelatedItem[];
};

type RelatedItemFieldsNoDesign = Omit<RelatedItemFields, 'design'>;

const relatedContentFields = (content: Content): RelatedItemFieldsNoDesign => ({
	headline: content.fields?.headline ?? content.webTitle,
	publishDate: maybeCapiDate(content.webPublicationDate),
	mainMedia: pipe(parseHeaderImage(content), fromNullable),
	webUrl: content.id,
	contributor: index(0)(parseContributors('', content)),
});

const parseMapiRelatedContent = (
	maybeRelatedContent: Option<ARModelsOnwardsContent>,
): Option<OnwardsContent> => {
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
					...relatedContentFields(content),
					design: ArticleDesign.Feature,
				};
			} else if (isLive(tags) && content.fields?.liveBloggingNow) {
				return {
					...relatedContentFields(content),
					design: ArticleDesign.LiveBlog,
				};
			} else if (isReview(tags)) {
				return {
					...relatedContentFields(content),
					design: ArticleDesign.Review,
					starRating: content.fields?.starRating?.toString() ?? '',
				};
			} else if (isAnalysis(content)) {
				return {
					...relatedContentFields(content),
					design: ArticleDesign.Analysis,
				};
			} else if (isComment(tags) || isLetter(tags)) {
				return {
					...relatedContentFields(content),
					design: ArticleDesign.Comment,
				};
			} else if (isAudio(tags)) {
				return {
					...relatedContentFields(content),
					design: ArticleDesign.Audio,
				};
			} else if (isVideo(tags)) {
				return {
					...relatedContentFields(content),
					design: ArticleDesign.Video,
				};
			} else if (isGallery(tags)) {
				return {
					...relatedContentFields(content),
					design: ArticleDesign.Gallery,
				};
			} else if (isLabs(tags)) {
				return {
					...relatedContentFields(content),
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.Labs,
				};
			} else {
				return {
					...relatedContentFields(content),
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

export { parseRelatedContent, parseHeaderImage, parseMapiRelatedContent };
export type { OnwardsContent as RelatedContent };
