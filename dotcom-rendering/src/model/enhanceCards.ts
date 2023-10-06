import { ArticleDesign, ArticleSpecial, Pillar } from '@guardian/libs';
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
	FEMediaAtom,
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
		return { ...containerFormat, theme: Pillar.News };

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

		const kickerText = subLink.header.kicker?.item?.properties.kickerText;

		return {
			format: presentationFormat,
			headline: subLink.header.headline ?? '',
			url: decideUrl(subLink),
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

/**
 * This function decides the best URL to link to on a Card or Supporting Content. It will pick the first non-undefined property of the following:
 *
 * `trail.properties.webUrl` - Where CAPI expects the content to be. Fully qualified but turned into a relative URL by DCR if possible. Ignored if the trail is type LinkSnap.
 * `trail.properties.href` - Location that a LinkSnap references.
 * `trail.header.url` - Where Frontend/FAPI expects the content to be. Usually identical to a relative-ized webUrl. In theory this should never get picked but it's the only URL where we're guaranteed it not be undefined which makes TypeScript happy.
 */
const decideUrl = (trail: FESupportingContent | FEFrontCard) => {
	/**
	 * Frontend gives us fully qualified webUrls (https://www.theguardian.com/a/thing) which we want as relative URLs instead
	 *
	 * Don't try to provide a relative URL for LinkSnap, these will link to domains other than www.theguardian.com and therefore wont have a relative path.
	 */
	if (
		trail.properties.webUrl !== undefined &&
		!('type' in trail && trail.type === 'LinkSnap')
	) {
		try {
			return new URL(trail.properties.webUrl).pathname;
		} catch (_) {
			/**
			 * In theory CAPI/FAPI/Frontend should never give us an webURL but
			 * lets just fallback to a non relative URL just in case.
			 *
			 * Ideally we'd like to know when this happens, but unfortunately we can't access `logger` from here as this code also needs to be ran on the client by ShowMore.
			 */
		}
	}

	return trail.properties.webUrl ?? trail.properties.href ?? trail.header.url;
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

const getActiveMediaAtom = (mediaAtom?: FEMediaAtom): MainMedia | undefined => {
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
};

const decideMedia = (
	format: ArticleFormat,
	showMainVideo?: boolean,
	mediaAtom?: FEMediaAtom,
): MainMedia | undefined => {
	// If the showVideo toggle is enabled in the fronts tool,
	// we should return the active mediaAtom regardless of the design
	if (showMainVideo) {
		return getActiveMediaAtom(mediaAtom);
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
			return { type: 'Gallery' };

		case ArticleDesign.Audio:
			return {
				type: 'Audio',
				duration: mediaAtom?.duration ?? 0,
			};

		case ArticleDesign.Video: {
			return getActiveMediaAtom(mediaAtom);
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
		discussionApiUrl,
	}: {
		cardInTagFront: boolean;
		offset?: number;
		editionId?: EditionId;
		containerPalette?: DCRContainerPalette;
		pageId?: string;
		discussionApiUrl: string;
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

		const branding = faciaCard.properties.editionBrandings.find(
			(editionBranding) => editionBranding.edition.id === editionId,
		)?.branding;

		return {
			format,
			dataLinkName,
			url: decideUrl(faciaCard),
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
			/** This property is coupled to the `image` property above.
			 * There's room to create a codified coupling, but that has more far reaching changes */
			imageAltText:
				faciaCard.properties.maybeContent?.trail.trailPicture
					?.allImages[0]?.fields.altText,
			kickerText: decideKicker(faciaCard, cardInTagFront, pageId),
			supportingContent: faciaCard.supportingContent
				? enhanceSupportingContent(
						faciaCard.supportingContent,
						format,
						containerPalette,
				  )
				: undefined,
			discussionApiUrl,
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
				faciaCard.properties.showMainVideo,
				faciaCard.properties.maybeContent?.elements.mainMediaAtom ??
					faciaCard.properties.maybeContent?.elements.mediaAtoms[0],
			),
			isExternalLink: faciaCard.card.cardStyle.type === 'ExternalLink',
			embedUri: faciaCard.properties.embedUri ?? undefined,
			branding,
			slideshowImages: decideSlideshowImages(faciaCard),
			showMainVideo: faciaCard.properties.showMainVideo,
		};
	});
