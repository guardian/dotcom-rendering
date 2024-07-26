import { ArticleDesign, type ArticleFormat, isUndefined } from '@guardian/libs';
import { getSoleContributor } from '../lib/byline';
import { decideFormat } from '../lib/decideFormat';
import type { EditionId } from '../lib/edition';
import type { Group } from '../lib/getDataLinkName';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import type {
	DCRFrontCard,
	DCRSlideshowImage,
	DCRSupportingContent,
	FEFrontCard,
	FEMediaAtom,
	FESupportingContent,
} from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import type { TagType } from '../types/tag';
import { enhanceSnaps } from './enhanceSnaps';
import { enhanceTags } from './enhanceTags';

const enhanceSupportingContent = (
	supportingContent: FESupportingContent[],
	parentFormat: ArticleFormat,
): DCRSupportingContent[] => {
	return supportingContent.map((subLink) => {
		/** Use link format where available and fallback to parent otherwise */
		const linkFormat = subLink.format
			? decideFormat(subLink.format)
			: parentFormat;

		const supportingContentIsLive =
			subLink.format?.design === 'LiveBlogDesign';

		const kickerText = subLink.header.kicker?.item?.properties.kickerText;

		return {
			format: linkFormat,
			headline: subLink.header.headline,
			url: decideUrl(subLink),
			kickerText:
				!kickerText && supportingContentIsLive ? 'Live' : kickerText,
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
		!isUndefined(trail.properties.webUrl) &&
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
	cardInTagPage: boolean,
	pageId?: string,
) => {
	if (trail.properties.isBreaking) {
		return 'Breaking news';
	}

	if (cardInTagPage) {
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
				id: mediaAtom.id,
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
		cardInTagPage,
		offset = 0,
		editionId,
		pageId,
		discussionApiUrl,
	}: {
		cardInTagPage: boolean;
		offset?: number;
		editionId: EditionId;
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

		const imageSrc = decideImage(faciaCard);

		const isContributorTagPage = !!pageId && pageId.startsWith('profile/');

		return {
			format,
			dataLinkName,
			url: decideUrl(faciaCard),
			headline: faciaCard.header.headline,
			trailText: faciaCard.card.trailText,
			starRating: faciaCard.card.starRating,
			webPublicationDate: !isUndefined(
				faciaCard.card.webPublicationDateOption,
			)
				? new Date(
						faciaCard.card.webPublicationDateOption,
				  ).toISOString()
				: undefined,
			kickerText: decideKicker(faciaCard, cardInTagPage, pageId),
			supportingContent: faciaCard.supportingContent
				? enhanceSupportingContent(faciaCard.supportingContent, format)
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
				!isContributorTagPage &&
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
			...(!!imageSrc && {
				image: {
					src: imageSrc,
					altText:
						faciaCard.properties.maybeContent?.trail.trailPicture
							?.allImages[0]?.fields.altText ?? '',
				},
			}),
		};
	});
