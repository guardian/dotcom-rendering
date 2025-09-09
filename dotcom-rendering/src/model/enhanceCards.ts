import { isUndefined } from '@guardian/libs';
import type {
	FEFrontCard,
	FEMediaAtom,
	FESupportingContent,
} from '../frontend/feFront';
import {
	ArticleDesign,
	type ArticleFormat,
	decideFormat,
} from '../lib/articleFormat';
import { getSoleContributor } from '../lib/byline';
import type { EditionId } from '../lib/edition';
import type { Group } from '../lib/getDataLinkName';
import { getDataLinkNameCard } from '../lib/getDataLinkName';
import { getLargestImageSize } from '../lib/image';
import type { Image } from '../types/content';
import type {
	DCRFrontCard,
	DCRSlideshowImage,
	DCRSupportingContent,
} from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import type { PodcastSeriesImage, TagType } from '../types/tag';
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
	if (trail.display.imageHide) return undefined;
	if (
		trail.type === 'LinkSnap' ||
		trail.properties.image?.type === 'Replace'
	) {
		return trail.properties.image?.item.imageSrc;
	}

	if (trail.properties.isCrossword && trail.properties.maybeContentId) {
		return `https://api.nextgen.guardianapps.co.uk/${trail.properties.maybeContentId}.svg`;
	}

	return trail.properties.maybeContent?.trail.trailPicture?.allImages[0]?.url;
};

/**
 * Fetches podcast series image if it exists within the tags on a trail.
 * Also provides alt text for this image (series name) for when it is rendered.
 */
const getPodcastSeriesImage = (
	trail: FEFrontCard,
): PodcastSeriesImage | undefined => {
	const podcastFromTags = trail.properties.maybeContent?.tags.tags
		.map(({ properties }) => properties)
		.find(({ tagType, podcast }) => tagType === 'Series' && !!podcast);

	return podcastFromTags?.podcast?.image
		? {
				src: podcastFromTags.podcast.image,
				altText: podcastFromTags.webTitle,
		  }
		: undefined;
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
		(trail.properties.mediaSelect?.imageSlideshowReplace ??
			trail.properties.imageSlideshowReplace);
	if (shouldShowSlideshow && assets && assets.length > 0) {
		return assets;
	}
	return undefined;
};

const getLargestImageUrl = (images?: Image[]) => {
	return getLargestImageSize(
		images?.map(({ url, fields: { width } }) => ({
			url,
			width: Number(width),
		})) ?? [],
	)?.url;
};

/**
 * If we have a replacement video, we should prioritise the largest available trail image from the media atom.
 * For all other videos, we should prioritise the card's trail image.
 */
const decideMediaAtomImage = (
	videoReplace: boolean,
	mediaAtom: FEMediaAtom,
	cardTrailImage?: string,
) => {
	const largestMediaAtomImage = getLargestImageUrl(
		mediaAtom.trailImage?.allImages,
	);

	if (videoReplace) {
		return largestMediaAtomImage ?? cardTrailImage;
	}

	return cardTrailImage ?? largestMediaAtomImage;
};

/**
 * While the first Media Atom is *not* guaranteed to be the main media,
 * it *happens to be* correct in the majority of cases.
 * @see https://github.com/guardian/frontend/pull/26247 for inspiration
 */

export const getActiveMediaAtom = (
	videoReplace: boolean,
	mediaAtom?: FEMediaAtom,
	cardTrailImage?: string,
): MainMedia | undefined => {
	if (mediaAtom) {
		const m3u8MimeType = 'application/vnd.apple.mpegurl';
		const asset = mediaAtom.assets
			// filter out m3u8 assets, as these are not yet supported by DCR
			.filter((_) => _.mimeType !== m3u8MimeType)
			.find(({ version }) => version === mediaAtom.activeVersion);

		const image = decideMediaAtomImage(
			videoReplace,
			mediaAtom,
			cardTrailImage,
		);

		if (asset?.platform === 'Url') {
			return {
				type: 'LoopVideo',
				atomId: mediaAtom.id,
				videoId: asset.id,
				duration: mediaAtom.duration ?? 0,
				// Size fixed to a 5:4 ratio
				width: 500,
				height: 400,
				image,
			};
		}

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
				image,
			};
		}
	}

	return undefined;
};

const decideMedia = (
	format: ArticleFormat,
	showMainVideo?: boolean,
	mediaAtom?: FEMediaAtom,
	galleryCount: number = 0,
	audioDuration: string = '',
	podcastImage?: PodcastSeriesImage,
	imageHide?: boolean,
	videoReplace?: boolean,
	cardImage?: string,
): MainMedia | undefined => {
	// If the showVideo toggle is enabled in the fronts tool,
	// we should return the active mediaAtom regardless of the design
	if (!!showMainVideo || !!videoReplace) {
		return getActiveMediaAtom(!!videoReplace, mediaAtom, cardImage);
	}

	switch (format.design) {
		case ArticleDesign.Gallery:
			return { type: 'Gallery', count: galleryCount.toString() };

		case ArticleDesign.Audio:
			return {
				type: 'Audio',
				podcastImage: !imageHide ? podcastImage : undefined,
				duration: audioDuration,
			};

		case ArticleDesign.Video: {
			return getActiveMediaAtom(false, mediaAtom, cardImage);
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
		stripBranding = false,
	}: {
		cardInTagPage: boolean;
		/** Used for the data link name to indicate card position in container */
		offset?: number;
		editionId: EditionId;
		pageId?: string;
		discussionApiUrl: string;
		/** We strip branding from cards if the branding will appear at the collection level instead */
		stripBranding?: boolean;
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

		const isNewsletter = tags.some(
			({ id, type }) =>
				(type === 'Keyword' && id === 'info/newsletter-sign-up') ||
				(type === 'Tone' && id === 'tone/newsletter-tone'),
		);

		const branding = faciaCard.properties.editionBrandings.find(
			(editionBranding) => editionBranding.edition.id === editionId,
		)?.branding;

		const imageSrc = decideImage(faciaCard);

		const podcastImage = getPodcastSeriesImage(faciaCard);

		const isContributorTagPage = !!pageId && pageId.startsWith('profile/');

		const mainMedia = decideMedia(
			format,
			faciaCard.properties.showMainVideo ??
				faciaCard.properties.mediaSelect?.showMainVideo,
			faciaCard.mediaAtom ??
				faciaCard.properties.maybeContent?.elements.mainMediaAtom ??
				faciaCard.properties.maybeContent?.elements.mediaAtoms[0],
			faciaCard.card.galleryCount,
			faciaCard.card.audioDuration,
			podcastImage,
			faciaCard.display.imageHide,
			faciaCard.properties.mediaSelect?.videoReplace,
			imageSrc,
		);

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
			boostLevel: faciaCard.display.boostLevel,
			isImmersive: !!faciaCard.display.isImmersive,
			isCrossword: faciaCard.properties.isCrossword,
			isNewsletter,
			showQuotedHeadline: faciaCard.display.showQuotedHeadline,
			// show latest 3 updates from a live blog
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
			mainMedia,
			isExternalLink: faciaCard.card.cardStyle.type === 'ExternalLink',
			embedUri: faciaCard.properties.embedUri ?? undefined,
			branding: stripBranding ? undefined : branding,
			slideshowImages: decideSlideshowImages(faciaCard),
			showVideo:
				!!(
					faciaCard.properties.showMainVideo ??
					faciaCard.properties.mediaSelect?.showMainVideo
				) || !!faciaCard.properties.mediaSelect?.videoReplace,
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
