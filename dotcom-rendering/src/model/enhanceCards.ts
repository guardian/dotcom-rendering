import { ArticleDesign, ArticlePillar, ArticleSpecial } from '@guardian/libs';
import { getSoleContributor } from '../lib/byline';
import { decideFormat } from '../lib/decideFormat';
import type { EditionId } from '../lib/edition';
import type { Group } from '../lib/getDataLinkName';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import type {
	DCRContainerPalette,
	DCRFrontCard,
	DCRSlideshowImage,
	DCRSupportingContent,
	FEFrontCard,
	FEMediaAtoms,
	FESupportingContent,
} from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import type { FETagType, TagType } from '../types/tag';
import { enhanceSnaps } from './enhanceSnaps';

/**
 *
 * This function makes the decision about when we use the parent's (the
 * container's) format property to override the styling of a sublink, and
 * when we allow the sublink to express its own styling.
 *
 * Eg. If you had a sublink to a lifestyle article, when should it use pink for
 * the kicker and when would that not look right
 *
 * @returns the format property that we will use to style the sublink
 */
const decidePresentationFormat = ({
	linkFormat,
	containerFormat,
	containerPalette,
}: {
	linkFormat?: ArticleFormat;
	containerFormat: ArticleFormat;
	containerPalette?: DCRContainerPalette;
}): ArticleFormat => {
	// Some sublinks are to fronts and so don't have a `format` property
	if (!linkFormat) return containerFormat;
	// If the container has a special palette, use the container format
	if (containerPalette) return containerFormat;
	// These types of article styles have background styles that sublinks
	// need to respect so we use the container format here
	if (
		containerFormat.design === ArticleDesign.LiveBlog ||
		containerFormat.design === ArticleDesign.Gallery ||
		containerFormat.design === ArticleDesign.Audio ||
		containerFormat.design === ArticleDesign.Video ||
		containerFormat.theme === ArticleSpecial.SpecialReport ||
		containerFormat.design === ArticleDesign.Analysis
	)
		return containerFormat;

	// These types of link format designs mean the headline could render
	// poorly (e.g.: white) so we use the container format
	if (
		linkFormat.design === ArticleDesign.LiveBlog ||
		linkFormat.design === ArticleDesign.Gallery ||
		linkFormat.design === ArticleDesign.Audio ||
		linkFormat.theme === ArticleSpecial.SpecialReport ||
		linkFormat.design === ArticleDesign.Video
	)
		return { ...containerFormat, theme: ArticlePillar.News };

	// Otherwise, we can allow the sublink to express its own styling
	return linkFormat;
};

const enhanceSupportingContent = (
	supportingContent: FESupportingContent[],
	format: ArticleFormat,
	containerPalette?: DCRContainerPalette,
): DCRSupportingContent[] => {
	return supportingContent.map((subLink) => {
		// This is the actual DCR format for this sublink
		const linkFormat = subLink.format
			? decideFormat(subLink.format)
			: undefined;
		// This is the format used to decide how the sublink looks (we vary this based
		// on the container background colour)
		const presentationFormat = decidePresentationFormat({
			linkFormat,
			containerFormat: format,
			containerPalette,
		});

		const supportingContentIsLive =
			subLink.format?.design === 'LiveBlogDesign';

		const kickerText = subLink.header?.kicker?.item?.properties.kickerText;

		return {
			format: presentationFormat,
			headline: subLink.header?.headline ?? '',
			url: subLink.properties.href ?? subLink.header?.url,
			kickerText:
				supportingContentIsLive && !kickerText ? 'Live' : kickerText,
		};
	});
};

const decideAvatarUrl = (
	tags: TagType[] = [],
	byline?: string,
): string | undefined => {
	const soleContributor = getSoleContributor(tags, byline);
	return soleContributor?.bylineLargeImageUrl ?? undefined;
};

const decideImage = (trail: FEFrontCard) => {
	if (
		trail.type === 'LinkSnap' ||
		trail.properties.image?.type === 'Replace'
	) {
		return trail.properties.image?.item.imageSrc;
	}

	if (trail.display.imageHide) return undefined;

	if (trail.properties.isCrossword && trail.properties.maybeContentId) {
		return `https://api.nextgen.guardianapps.co.uk/${trail.properties.maybeContentId}.svg`;
	}

	return trail.properties.maybeContent?.trail.trailPicture?.allImages[0]?.url;
};

const decideKicker = (
	trail: FEFrontCard,
	cardInTagFront: boolean,
	pageId?: string,
) => {
	if (trail.properties.isBreaking) {
		return 'Breaking news';
	}

	if (cardInTagFront) {
		return pageId && !pageId.includes('/series')
			? trail.header.seriesOrBlogKicker?.name
			: undefined;
	}

	return trail.header.kicker?.item?.properties.kickerText;
};

const decideSlideshowImages = (
	trail: FEFrontCard,
): DCRSlideshowImage[] | undefined => {
	const assets = trail.properties.image?.item.assets;
	const shouldShowSlideshow =
		trail.properties.image?.type === 'ImageSlideshow' &&
		trail.properties.imageSlideshowReplace;
	if (shouldShowSlideshow && assets && assets.length > 0) {
		return assets;
	}
	return undefined;
};

const enhanceTags = (tags: FETagType[]): TagType[] => {
	return tags.map(({ properties }) => {
		const {
			id,
			tagType,
			webTitle,
			twitterHandle,
			bylineImageUrl,
			contributorLargeImagePath,
		} = properties;

		return {
			id,
			type: tagType,
			title: webTitle,
			twitterHandle,
			bylineImageUrl,
			bylineLargeImageUrl: contributorLargeImagePath,
		};
	});
};

/**
 * While the first Media Atom is *not* guaranteed to be the main media,
 * it *happens to be* correct in the majority of cases.
 * @see https://github.com/guardian/frontend/pull/26247 for inspiration
 */
const decideMedia = (
	format: ArticleFormat,
	mediaAtom?: FEMediaAtoms,
): MainMedia | undefined => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return { type: 'Gallery' };

		case ArticleDesign.Audio:
			return {
				type: 'Audio',
				duration: mediaAtom?.duration ?? 0,
			};

		case ArticleDesign.Video: {
			if (mediaAtom) {
				const asset = mediaAtom.assets.find(
					({ version }) => version === mediaAtom.activeVersion,
				);
				if (asset?.platform === 'Youtube') {
					return {
						type: 'Video',
						elementId: mediaAtom.id,
						videoId: asset.id,
						duration: mediaAtom.duration ?? 0,
						title: mediaAtom.title,
						// Size fixed to a 5:3 ratio
						width: 500,
						height: 300,
						origin: mediaAtom.source ?? 'Unknown origin',
						expired: !!mediaAtom.expired,
						images:
							mediaAtom.posterImage?.allImages.map(
								({ url, fields: { width } }) => ({
									url,
									width: Number(width),
								}),
							) ?? [],
					};
				}
			}
			return undefined;
		}

		default:
			return undefined;
	}
};

export const enhanceCards = (
	collections: FEFrontCard[],
	{
		cardInTagFront,
		offset = 0,
		editionId,
		containerPalette,
		pageId,
	}: {
		cardInTagFront: boolean;
		offset?: number;
		editionId?: EditionId;
		containerPalette?: DCRContainerPalette;
		pageId?: string;
	},
): DCRFrontCard[] =>
	collections.map((faciaCard, index) => {
		// Snap cards may not have a format, default to a standard format if that's the case.
		const format = decideFormat(
			faciaCard.format ?? {
				design: 'ArticleDesign',
				theme: 'NewsPillar',
				display: 'StandardDisplay',
			},
		);
		const group: Group = `${Number(faciaCard.card.group)}${
			faciaCard.display.isBoosted ? '+' : ''
		}`;

		const dataLinkName = getDataLinkNameCard(
			format,
			group,
			offset + index,
			faciaCard.card.cardStyle.type,
		);

		const tags = faciaCard.properties.maybeContent?.tags.tags
			? enhanceTags(faciaCard.properties.maybeContent.tags.tags)
			: [];

		/**
		 * The URL parameter on a Snap header will be a link to the Snap itself, there is a second href
		 * property which contains what the snap is actually linking to. This is commonly used in the
		 * NavList container for linking to non-article pages.
		 * @see NavList
		 */
		const url =
			faciaCard.type === 'LinkSnap' && faciaCard.properties.href
				? faciaCard.properties.href
				: faciaCard.header.url;

		const branding = faciaCard.properties.editionBrandings.find(
			(editionBranding) => editionBranding.edition.id === editionId,
		)?.branding;

		return {
			format,
			dataLinkName,
			url,
			headline: faciaCard.header.headline,
			trailText: faciaCard.card.trailText,
			starRating: faciaCard.card.starRating,
			webPublicationDate:
				faciaCard.card.webPublicationDateOption !== undefined
					? new Date(
							faciaCard.card.webPublicationDateOption,
					  ).toISOString()
					: undefined,
			image: decideImage(faciaCard),
			kickerText: decideKicker(faciaCard, cardInTagFront, pageId),
			supportingContent: faciaCard.supportingContent
				? enhanceSupportingContent(
						faciaCard.supportingContent,
						format,
						containerPalette,
				  )
				: undefined,
			discussionId: faciaCard.discussion.isCommentable
				? faciaCard.discussion.discussionId
				: undefined,
			byline: faciaCard.properties.byline ?? undefined,
			showByline: faciaCard.properties.showByline,
			snapData: enhanceSnaps(faciaCard.enriched),
			isBoosted: faciaCard.display.isBoosted,
			isCrossword: faciaCard.properties.isCrossword,
			showQuotedHeadline: faciaCard.display.showQuotedHeadline,
			showLivePlayable: faciaCard.display.showLivePlayable,
			avatarUrl:
				faciaCard.properties.maybeContent?.tags.tags &&
				faciaCard.properties.image?.type === 'Cutout'
					? decideAvatarUrl(
							tags,
							faciaCard.properties.maybeContent.trail.byline,
					  )
					: undefined,
			mainMedia: decideMedia(
				format,
				faciaCard.properties.maybeContent?.elements.mediaAtoms[0],
			),
			isExternalLink: faciaCard.card.cardStyle.type === 'ExternalLink',
			embedUri: faciaCard.properties.embedUri ?? undefined,
			branding,
			slideshowImages: decideSlideshowImages(faciaCard),
		};
	});
