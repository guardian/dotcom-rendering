import { Content } from "@guardian/content-api-models/v1/content";
import { RelatedItemType } from "@guardian/apps-rendering-api-models/relatedItemType";
import { RelatedContent } from "@guardian/apps-rendering-api-models/relatedContent";
import { Image } from '@guardian/apps-rendering-api-models/image';
import { map, OptionKind, fromNullable } from "@guardian/types/option";
import { isFeature, isReview, isAnalysis, articleMainImage } from "capi";
import { isLive, isComment, isAudio, isVideo, isGallery, isAdvertisementFeature } from "item";
import { pipe2, pipe } from "lib";

const parseRelatedItemType = (content: Content): RelatedItemType => {
	const { tags } = content;
	if (isFeature(content)) {
        return RelatedItemType.FEATURE
	} else if (isLive(tags) && content.fields?.liveBloggingNow) {
		return RelatedItemType.LIVE
	} else if (isReview(content)) {
		return RelatedItemType.REVIEW
	} else if (isAnalysis(content)) {
		return RelatedItemType.ANALYSIS
	} else if (isComment(tags)) {
		return RelatedItemType.COMMENT
	} else if (isAudio(tags)) {
		return RelatedItemType.AUDIO
	} else if (isVideo(tags)) {
		return RelatedItemType.VIDEO
	} else if (isGallery(tags)) {
		return RelatedItemType.GALLERY
	} else if (isAdvertisementFeature(tags)) {
		return RelatedItemType.ADVERTISEMENT_FEATURE
	} else {
		return RelatedItemType.ARTICLE
	}
}

const parseHeaderImage = (content: Content): Image | undefined => {
	const optionalImage = pipe(
        articleMainImage(content),
        map(element => {
            const masterAsset = element.assets.find(asset => asset?.typeData?.isMaster);
            const data = element.imageTypeData;
            return pipe2(
				masterAsset,
				fromNullable,
				map(asset => ({
					url: asset.file ?? '#',
					height: asset?.typeData?.height ?? 360,
					width: asset?.typeData?.width ?? 600,
					alt: data?.alt,
				}))
			)
		})
	);

    if (
		optionalImage.kind === OptionKind.Some &&
		optionalImage.value.kind === OptionKind.Some
	) {
        return optionalImage.value.value;
    } else {
        return undefined;
    }
}

const parseRelatedContent = (relatedContent: Content[]): RelatedContent => {
    return {
        title: "Related Stories",
        relatedItems: relatedContent.map(content => {
            return {
                title: content.webTitle,
                lastModified: content.fields?.lastModified,
                headerImage: parseHeaderImage(content),
                link: `/${content.id}`,
                type: parseRelatedItemType(content),
                pillar: {
                    id: content.pillarId ?? "pillar/news",
                    name: content.pillarName ?? "news",
                    sectionIds: []
                },
                starRating: content.fields?.starRating?.toString()
            }
        }).slice(0, 4)
    }
}

export {
    parseRelatedContent
};