import type { Image } from '@guardian/apps-rendering-api-models/image';
import type { RelatedContent } from '@guardian/apps-rendering-api-models/relatedContent';
import { RelatedItemType } from '@guardian/apps-rendering-api-models/relatedItemType';
import type { Content } from '@guardian/content-api-models/v1/content';
import { map, withDefault } from '../vendor/@guardian/types/index';
import {
	articleContributors,
	articleMainImage,
	isAnalysis,
	isFeature,
} from 'capi';
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
import { compose, index, pipe } from 'lib';
import { Optional } from 'optional';

const parseRelatedItemType = (content: Content): RelatedItemType => {
	const { tags } = content;
	if (isFeature(content)) {
		return RelatedItemType.FEATURE;
	} else if (isLive(tags) && content.fields?.liveBloggingNow) {
		return RelatedItemType.LIVE;
	} else if (isReview(tags)) {
		return RelatedItemType.REVIEW;
	} else if (isAnalysis(content)) {
		return RelatedItemType.ANALYSIS;
	} else if (isComment(tags) || isLetter(tags)) {
		return RelatedItemType.COMMENT;
	} else if (isAudio(tags)) {
		return RelatedItemType.AUDIO;
	} else if (isVideo(tags)) {
		return RelatedItemType.VIDEO;
	} else if (isGallery(tags)) {
		return RelatedItemType.GALLERY;
	} else if (isLabs(tags)) {
		return RelatedItemType.ADVERTISEMENT_FEATURE;
	} else {
		return RelatedItemType.ARTICLE;
	}
};

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

const getContributor = compose(index(0), articleContributors);

const parseRelatedContent = (relatedContent: Content[]): RelatedContent => {
	return {
		title: 'Related stories',
		relatedItems: relatedContent
			.map((content) => {
				return {
					title: content.fields?.headline ?? content.webTitle,
					webPublicationDate: content.webPublicationDate,
					headerImage: parseHeaderImage(content),
					link: content.id,
					type: parseRelatedItemType(content),
					pillar: {
						id: content.pillarId ?? 'pillar/news',
						name: content.pillarName ?? 'news',
						sectionIds: [],
					},
					starRating: content.fields?.starRating?.toString(),
					byline: pipe(
						getContributor(content),
						map((t) => t.webTitle),
						withDefault<string | undefined>(undefined),
					),
					bylineImage: pipe(
						getContributor(content),
						map((t) => t.bylineLargeImageUrl),
						withDefault<string | undefined>(undefined),
					),
				};
			})
			.slice(0, 4),
	};
};

export { parseRelatedContent };
