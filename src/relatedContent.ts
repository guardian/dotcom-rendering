import { Content } from "@guardian/content-api-models/v1/content";
import { RelatedItemType } from "@guardian/apps-rendering-api-models/relatedItemType";
import { RelatedContent } from "@guardian/apps-rendering-api-models/relatedContent";
import { Image } from '@guardian/apps-rendering-api-models/image';
import { andThen, map, OptionKind } from "@guardian/types/option";
import { isFeature, isReview, isAnalysis, articleMainImage } from "capi";
import { isLive, isComment, isAudio, isVideo, isGallery, isAdvertisementFeature } from "item";
import { Context } from 'types/parserContext';
import { pipe2 } from "lib";
import { parseImage } from "image";

const parseRelatedItemType = (content: Content): RelatedItemType => {
    const { tags } = content;
    if (isFeature(content)) {
        return RelatedItemType.FEATURE
      } else if (isLive(tags)) {
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

const parseHeaderImage = (content: Content, context: Context): Image | undefined => {
        const optionalImage = pipe2(
            articleMainImage(content),
            andThen(parseImage(context)),
            map(image => ({
                url: image.src,
                height: image.height,
                width: image.width,
            }),
        ));

        if (optionalImage.kind === OptionKind.Some) {
            return optionalImage.value;
        } else {
            return undefined;
        }
}

const parseRelatedContent = (relatedContent: Content[], context: Context): RelatedContent => {
    return {
        title: "Related Stories",
        relatedItems: relatedContent.map(content => {
            return {
                title: content.webTitle,
                lastModified: content.fields?.lastModified,
                headerImage: parseHeaderImage(content, context),
                link: `/${content.id}`,
                type: parseRelatedItemType(content),
                pillar: {
                    id: content.pillarId ?? "pillar/news",
                    name: content.pillarName ?? "news",
                    sectionIds: []
                },
                mediaDuration: "100",
                starRating: content.fields?.starRating?.toString()
            }
        }).slice(0, 4)
    }
}

export {
    parseRelatedContent
};