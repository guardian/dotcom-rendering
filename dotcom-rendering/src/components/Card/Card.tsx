import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	between,
	from,
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source/foundations';
import { Hide, Link, SvgCamera } from '@guardian/source/react-components';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../../lib/articleFormat';
import { isMediaCard } from '../../lib/cardHelpers';
import { isWithinTwelveHours, secondsToDuration } from '../../lib/formatTime';
import { appendLinkNameMedia } from '../../lib/getDataLinkName';
import { getZIndex } from '../../lib/getZIndex';
import { getOphanComponents } from '../../lib/labs';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../../lib/useCommentCount';
import { BETA_CONTAINERS } from '../../model/enhanceCollections';
import { palette } from '../../palette';
import type { Branding } from '../../types/branding';
import type { StarRating as Rating } from '../../types/content';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontImage,
	DCRSlideshowImage,
	DCRSnapType,
	DCRSupportingContent,
} from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import type { OnwardsSource } from '../../types/onwards';
import { Avatar } from '../Avatar';
import { CardCommentCount } from '../CardCommentCount.importable';
import { CardHeadline, type ResponsiveFontSize } from '../CardHeadline';
import type { Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';
import { Island } from '../Island';
import { LatestLinks } from '../LatestLinks.importable';
import { LoopVideo } from '../LoopVideo.importable';
import type { SubtitleSize } from '../LoopVideoPlayer';
import { Pill } from '../Pill';
import { SlideshowCarousel } from '../SlideshowCarousel.importable';
import { Snap } from '../Snap';
import { SnapCssSandbox } from '../SnapCssSandbox';
import { SponsoredContentLabel } from '../SponsoredContentLabel';
import { StarRating } from '../StarRating/StarRating';
import type { Alignment } from '../SupportingContent';
import { SupportingContent } from '../SupportingContent';
import { SvgMediaControlsPlay } from '../SvgMediaControlsPlay';
import { YoutubeBlockComponent } from '../YoutubeBlockComponent.importable';
import { AvatarContainer } from './components/AvatarContainer';
import { CardAge } from './components/CardAge';
import { CardBranding } from './components/CardBranding';
import { CardFooter } from './components/CardFooter';
import {
	CardLayout,
	decideAvatarPosition,
	type GapSizes,
} from './components/CardLayout';
import { CardLink } from './components/CardLink';
import { CardWrapper } from './components/CardWrapper';
import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import type {
	MediaFixedSizeOptions,
	MediaPositionType,
	MediaSizeType,
} from './components/MediaWrapper';
import { MediaWrapper } from './components/MediaWrapper';
import { SvgWaveform } from './components/SvgWaveform';
import { TrailText, type TrailTextSize } from './components/TrailText';

export type Position = 'inner' | 'outer' | 'none';

export type Props = {
	linkTo: string;
	format: ArticleFormat;
	absoluteServerTimes: boolean;
	headlineText: string;
	headlineSizes?: ResponsiveFontSize;
	showQuotedHeadline?: boolean;
	byline?: string;
	showByline?: boolean;
	webPublicationDate?: string;
	image?: DCRFrontImage;
	mediaPositionOnDesktop?: MediaPositionType;
	mediaPositionOnMobile?: MediaPositionType;
	/** Size is ignored when position = 'top' because in that case the media flows based on width */
	mediaSize?: MediaSizeType;
	imageLoading: Loading;
	isCrossword?: boolean;
	isNewsletter?: boolean;
	isOnwardContent?: boolean;
	trailText?: string;
	avatarUrl?: string;
	showClock?: boolean;
	mainMedia?: MainMedia;
	/**
	 * For interactive media (e.g., video or slideshow), certain card sizes are restricted from displaying
	 * the interactive content because controls may be unavailable or inaccessible at those sizes.
	 *
	 * Note:
	 * - YouTube recommends a minimum embed width of 480px
	 *   @see https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-youtube-player-size
	 * - At widths of 300px or below, the player may lose functionality (e.g., volume controls may be omitted).
	 * - YouTube requires an absolute minimum width of 200px.
	 */
	canPlayInline?: boolean;
	kickerText?: string;
	showPulsingDot?: boolean;
	starRating?: Rating;
	minWidthInPixels?: number;
	/** Used for Ophan tracking */
	dataLinkName?: string;
	/** Only used on Labs cards */
	branding?: Branding;
	/** Supporting content refers to sublinks */
	supportingContent?: DCRSupportingContent[];
	supportingContentAlignment?: Alignment;
	supportingContentPosition?: Position;
	snapData?: DCRSnapType;
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	showAge?: boolean;
	discussionApiUrl: string;
	discussionId?: string;
	/** The first card in a dynamic package is ”Dynamo” and gets special styling */
	isDynamo?: boolean;
	isExternalLink: boolean;
	slideshowImages?: DCRSlideshowImage[];
	/** Determines if liveblog update links are displayed on a card */
	showLivePlayable?: boolean;
	liveUpdatesAlignment?: Alignment;
	liveUpdatesPosition?: Position;
	onwardsSource?: OnwardsSource;
	showVideo?: boolean;
	isTagPage?: boolean;
	/** Allows the consumer to set the aspect ratio on the media */
	aspectRatio?: AspectRatio;
	/** The index of the card in a carousel */
	index?: number;
	/**
	 * Useful for videos. Has the form: collection-{collection ID}-{card grouping type}-{card index}
	 * For example, the first splash card in the second collection would be: "collection-1-splash-0"
	 */
	uniqueId?: string;
	/** The Splash card in a flexible container gets a different visual treatment to other cards */
	isFlexSplash?: boolean;
	/** The Splash card in an onward container gets a different visual treatment to other cards */
	isOnwardSplash?: boolean;
	showTopBarDesktop?: boolean;
	showTopBarMobile?: boolean;
	trailTextSize?: TrailTextSize;
	/** A kicker image is seperate to the main media and renders as part of the kicker */
	showKickerImage?: boolean;
	isInAllBoostsTest?: boolean;
	fixImageWidth?: boolean;
	subtitleSize?: SubtitleSize;
	/** Determines if the headline should be positioned within the content or outside the content */
	headlinePosition?: 'inner' | 'outer';
	/** Feature flag for the labs redesign work */
	showLabsRedesign?: boolean;
};

const starWrapper = (cardHasImage: boolean) => css`
	background-color: ${sourcePalette.brandAlt[400]};
	color: ${sourcePalette.neutral[0]};
	margin-top: ${cardHasImage ? '2' : space[1]}px;
	display: inline-block;

	${from.tablet} {
		margin-top: ${space[1]}px;
	}
`;

const StarRatingComponent = ({
	rating,
	cardHasImage,
}: {
	rating: Rating;
	cardHasImage: boolean;
}) => (
	<div css={starWrapper(cardHasImage)}>
		<StarRating rating={rating} size="small" />
	</div>
);

const waveformWrapper = (
	mediaPositionOnMobile?: MediaPositionType,
	mediaPositionOnDesktop?: MediaPositionType,
) => css`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	svg {
		display: block;
		width: 100%;
		height: ${mediaPositionOnMobile === 'top' ? 50 : 29}px;
		${from.mobileMedium} {
			height: ${mediaPositionOnMobile === 'top' ? 50 : 33}px;
		}
		${from.tablet} {
			height: ${mediaPositionOnDesktop === 'top' ? 50 : 33}px;
		}
	}
`;

const HorizontalDivider = () => (
	<div
		css={css`
			${from.tablet} {
				border-top: 1px solid ${palette('--card-border-top')};
				height: 1px;
				width: 50%;
				${from.tablet} {
					width: 100px;
				}
				${from.desktop} {
					width: 140px;
				}
				margin-top: ${space[3]}px;
			}
		`}
	/>
);

const podcastImageStyles = (imageSize: MediaSizeType) => {
	switch (imageSize) {
		case 'small':
			return css`
				width: 69px;
				height: 69px;
				${from.tablet} {
					width: 98px;
					height: 98px;
				}
			`;

		case 'medium':
			return css`
				width: 98px;
				height: 98px;
				${from.tablet} {
					width: 120px;
					height: 120px;
				}
			`;
		default:
			return css`
				width: 120px;
				height: 120px;
			`;
	}
};

const getMedia = ({
	imageUrl,
	imageAltText,
	avatarUrl,
	isCrossword,
	slideshowImages,
	mainMedia,
	canPlayInline,
	isBetaContainer,
}: {
	imageUrl?: string;
	imageAltText?: string;
	avatarUrl?: string;
	isCrossword?: boolean;
	slideshowImages?: DCRSlideshowImage[];
	mainMedia?: MainMedia;
	canPlayInline?: boolean;
	isBetaContainer: boolean;
}) => {
	if (mainMedia?.type === 'LoopVideo' && canPlayInline) {
		return {
			type: 'loop-video',
			mainMedia,
		} as const;
	}
	if (mainMedia?.type === 'Video' && canPlayInline) {
		return {
			type: 'youtube-video',
			mainMedia,
		} as const;
	}
	if (slideshowImages && canPlayInline) {
		return { type: 'slideshow', slideshowImages } as const;
	}
	if (avatarUrl) return { type: 'avatar', avatarUrl } as const;
	if (
		mainMedia?.type === 'Audio' &&
		mainMedia.podcastImage &&
		isBetaContainer
	) {
		return {
			...mainMedia,
			type: 'podcast',
			trailImage: { src: imageUrl, altText: imageAltText },
		} as const;
	}
	if (imageUrl) {
		const type = isCrossword ? 'crossword' : 'picture';
		return { type, imageUrl, imageAltText } as const;
	}
	return undefined;
};

const decideSublinkPosition = (
	supportingContent?: DCRSupportingContent[],
	mediaPositionOnDesktop?: MediaPositionType,
	alignment?: Alignment,
	supportingContentPosition?: Position,
	showLivePlayable?: boolean,
): 'inner' | 'outer' | 'none' => {
	if (!supportingContent || supportingContent.length === 0) {
		return 'none';
	}

	if (supportingContentPosition) {
		return supportingContentPosition;
	}

	if (
		mediaPositionOnDesktop === 'top' ||
		mediaPositionOnDesktop === 'bottom' ||
		showLivePlayable
	) {
		return 'outer';
	}

	return alignment === 'vertical' ? 'inner' : 'outer';
};

const liveBulletStyles = css`
	width: 9px;
	height: 9px;
	border-radius: 50%;
	background-color: ${palette('--pill-bullet')};
	margin-right: ${space[1]}px;
`;

export const Card = ({
	linkTo,
	format,
	headlineText,
	headlineSizes,
	showQuotedHeadline,
	byline,
	showByline,
	webPublicationDate,
	image,
	mediaPositionOnDesktop = 'top',
	mediaPositionOnMobile = 'left',
	mediaSize = 'small',
	imageLoading,
	trailText,
	avatarUrl,
	showClock,
	mainMedia,
	canPlayInline = false,
	kickerText,
	showPulsingDot,
	starRating,
	minWidthInPixels,
	dataLinkName,
	branding,
	supportingContent,
	supportingContentAlignment = 'vertical',
	supportingContentPosition,
	snapData,
	containerPalette,
	containerType,
	showAge = true,
	discussionApiUrl,
	discussionId,
	isDynamo,
	isCrossword,
	isNewsletter = false,
	isOnwardContent = false,
	isExternalLink,
	slideshowImages,
	showLivePlayable = false,
	liveUpdatesAlignment = 'vertical',
	liveUpdatesPosition = 'inner',
	onwardsSource,
	showVideo = true,
	absoluteServerTimes,
	isTagPage = false,
	aspectRatio,
	index = 0,
	uniqueId = '',
	isFlexSplash,
	isOnwardSplash,
	showTopBarDesktop = true,
	showTopBarMobile = true,
	trailTextSize,
	showKickerImage = false,
	fixImageWidth,
	isInAllBoostsTest = false,
	headlinePosition = 'inner',
	showLabsRedesign = false,
	subtitleSize = 'small',
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;
	const sublinkPosition = decideSublinkPosition(
		supportingContent,
		mediaPositionOnDesktop,
		supportingContentAlignment,
		supportingContentPosition,
		showLivePlayable,
	);
	const showQuotes = !!showQuotedHeadline;

	const isOpinion =
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter;

	const isBetaContainer = BETA_CONTAINERS.includes(containerType ?? '');

	/**
	 * A "video article" refers to standalone video content presented as the main focus of the article.
	 * It is treated as a media card in the design system.
	 */
	const isVideoArticle =
		mainMedia?.type === 'Video' && format.design === ArticleDesign.Video;

	/**
	 * Articles with a video as the main media but not classified as "video articles"
	 * are styled differently and are not treated as media cards.
	 */
	const isVideoMainMedia =
		mainMedia?.type === 'Video' && format.design !== ArticleDesign.Video;

	const decideAge = () => {
		if (!webPublicationDate) return undefined;
		const withinTwelveHours = isWithinTwelveHours(webPublicationDate);

		const shouldShowAge =
			isTagPage || !!onwardsSource || (showAge && withinTwelveHours);

		if (!shouldShowAge) return undefined;

		return (
			<CardAge
				webPublication={{
					date: webPublicationDate,
					isWithinTwelveHours: withinTwelveHours,
				}}
				showClock={showClock}
				absoluteServerTimes={absoluteServerTimes}
				isTagPage={isTagPage}
			/>
		);
	};

	const CommentCount = () =>
		!!discussionId && (
			<Link
				{...{
					[DISCUSSION_ID_DATA_ATTRIBUTE]: discussionId,
				}}
				data-ignore="global-link-styling"
				data-link-name="Comment count"
				href={`${linkTo}#comments`}
				cssOverrides={css`
					/* See: https://css-tricks.com/nested-links/ */
					z-index: ${getZIndex('card-nested-link')};
					/* The following styles turn off those provided by Link */
					color: inherit;
					/* stylelint-disable-next-line property-disallowed-list */
					font-family: inherit;
					font-size: inherit;
					line-height: inherit;
					text-decoration: none;
					min-height: 10px;
				`}
			>
				<Island priority="feature" defer={{ until: 'visible' }}>
					<CardCommentCount
						discussionApiUrl={discussionApiUrl}
						discussionId={discussionId}
					/>
				</Island>
			</Link>
		);

	const MediaOrNewsletterPill = () => (
		<div
			css={css`
				margin-top: auto;
				display: flex;
			`}
		>
			{isVideoArticle && (
				<>
					{mainMedia.duration === 0 ? (
						<Pill
							content="Live"
							icon={<div css={liveBulletStyles} />}
						/>
					) : (
						<Pill
							content={secondsToDuration(mainMedia.duration)}
							icon={<SvgMediaControlsPlay width={18} />}
							prefix="Video"
						/>
					)}
				</>
			)}

			{mainMedia?.type === 'Audio' && (
				<Pill
					content={mainMedia.duration}
					icon={<SvgMediaControlsPlay width={18} />}
					prefix="Podcast"
				/>
			)}
			{mainMedia?.type === 'Gallery' && (
				<Pill
					content={mainMedia.count}
					icon={<SvgCamera />}
					prefix="Gallery"
				/>
			)}
			{isNewsletter && <Pill content="Newsletter" />}
		</div>
	);

	if (snapData?.embedHtml) {
		return (
			<SnapCssSandbox snapData={snapData}>
				<Snap snapData={snapData} dataLinkName={dataLinkName} />
			</SnapCssSandbox>
		);
	}

	/**
-	 * Media cards have contrasting background colours. We add additional
	 * padding to these cards to keep the text readable.
-	 */
	const isMediaCardOrNewsletter = isMediaCard(format) || isNewsletter;

	const showPill = isMediaCardOrNewsletter;

	const media = getMedia({
		imageUrl: image?.src,
		imageAltText: image?.altText,
		avatarUrl,
		isCrossword,
		slideshowImages,
		mainMedia,
		canPlayInline,
		isBetaContainer,
	});

	const resolvedDataLinkName =
		media && dataLinkName
			? appendLinkNameMedia(dataLinkName, media.type)
			: dataLinkName;

	/**
	 * For opinion type cards with avatars (which aren't onwards content)
	 * we render the footer in a different location
	 */
	const isOpinionCardWithAvatar =
		isOpinion && !isOnwardContent && media?.type === 'avatar';

	/**
	 * The avatar position is sometimes different.
	 */
	const avatarPosition = decideAvatarPosition(
		mediaPositionOnMobile,
		mediaPositionOnDesktop,
		isBetaContainer,
	);

	const backgroundColour = isMediaCardOrNewsletter
		? palette('--card-media-background')
		: palette('--card-background');

	/* Whilst we migrate to the new container types, we need to check which container we are in. */
	const isFlexibleContainer =
		containerType === 'flexible/special' ||
		containerType === 'flexible/general';

	const isSmallCard =
		containerType === 'scrollable/small' ||
		containerType === 'scrollable/medium';

	const mediaFixedSizeOptions = (): MediaFixedSizeOptions => {
		if (isSmallCard) {
			return {
				mobile: isInAllBoostsTest ? undefined : 'tiny',
				tablet: 'small',
				desktop: 'small',
			};
		}
		if (isFlexibleContainer) return { mobile: 'small' };
		return { mobile: 'medium' };
	};

	const hideTrailTextUntil = () => {
		if (isFlexibleContainer) {
			return 'tablet';
		}
		if (isOnwardSplash) {
			return undefined;
		}
		if (
			mediaSize === 'large' &&
			mediaPositionOnDesktop === 'right' &&
			media?.type !== 'avatar'
		) {
			return 'desktop';
		}

		return 'tablet';
	};

	const isMoreGalleriesOnwardContent =
		isOnwardContent && onwardsSource === 'more-galleries';
	const shouldShowTrailText = isMoreGalleriesOnwardContent
		? media?.type !== 'podcast' && isOnwardSplash
		: media?.type !== 'podcast';

	/**
	 * Determines the gap of between card components based on card properties
	 * Order matters here as the logic is based on the card properties
	 */
	const getGapSizes = (): GapSizes => {
		if (isOnwardContent) {
			return {
				row: 'none',
				column: 'none',
			};
		}

		if (!isBetaContainer) {
			/**
			 * Media cards have 4px padding around the content so we have a
			 * tiny (4px) gap to account for this and make it 8px total
			 */
			if (isMediaCardOrNewsletter) {
				return {
					row: 'tiny',
					column: 'tiny',
				};
			}

			// Current cards have small padding for everything
			return { row: 'small', column: 'small' };
		}

		if (isSmallCard) {
			return {
				row: 'medium',
				column: 'medium',
			};
		}

		if (
			mediaPositionOnDesktop === 'bottom' ||
			mediaPositionOnMobile === 'bottom'
		) {
			return {
				row: showLivePlayable ? 'small' : 'tiny',
				column: 'large',
			};
		}

		return {
			row: 'small',
			column: 'large',
		};
	};

	/**
	 * Determines how and when to render the `SupportingContent` component in the "outer" position:
	 * - Returns `null` if `supportingContent` is unavailable or `sublinkPosition` is `none`.
	 * - Renders `SupportingContent` for all breakpoints if `sublinkPosition` is `outer`.
	 * - If `sublinkPosition` is `inner`, hides `SupportingContent` from tablet but displays it on smaller breakpoints.
	 */
	const decideOuterSublinks = () => {
		if (!hasSublinks) return null;
		if (sublinkPosition === 'none') return null;

		const Sublinks = () => (
			<SupportingContent
				supportingContent={supportingContent}
				containerPalette={containerPalette}
				alignment={supportingContentAlignment}
				isDynamo={isDynamo}
				isMedia={isMediaCard(format)}
				fillBackgroundOnMobile={
					!!isFlexSplash ||
					(isBetaContainer &&
						!!image &&
						(mediaPositionOnMobile === 'bottom' ||
							isMediaCard(format)))
				}
				fillBackgroundOnDesktop={
					isBetaContainer && isMediaCardOrNewsletter
				}
			/>
		);

		if (sublinkPosition === 'outer') {
			return <Sublinks />;
		}

		return (
			<Hide from={isFlexSplash ? 'desktop' : 'tablet'}>
				<Sublinks />
			</Hide>
		);
	};

	const decideInnerSublinks = () => {
		if (!hasSublinks) return null;
		if (sublinkPosition !== 'inner') return null;

		return (
			<Hide until={isFlexSplash ? 'desktop' : 'tablet'}>
				<SupportingContent
					supportingContent={supportingContent}
					/* inner links are always vertically stacked */
					alignment="vertical"
					containerPalette={containerPalette}
					isDynamo={isDynamo}
					fillBackgroundOnMobile={isFlexSplash}
				/>
			</Hide>
		);
	};

	const determinePadContent = (
		mediaCard: boolean,
		betaContainer: boolean,
		onwardContent: boolean,
	): 'large' | 'small' | undefined => {
		if (mediaCard && betaContainer) return 'large';
		if (mediaCard || onwardContent) return 'small';
		return undefined;
	};

	/**
	 * Decides which branding design to apply based on the labs redesign feature switch
	 * Adds appropriate Ophan data attributes based on card context
	 * Results in a clickable brand logo and sponsorship label
	 */
	const LabsBranding = () => {
		if (!branding) return;
		const getLocationPrefix = () => {
			if (!onwardsSource) {
				return 'front-card';
			}
			if (onwardsSource === 'related-content') {
				return 'article-related-content';
			} else {
				return undefined;
			}
		};
		const locationPrefix = getLocationPrefix();
		const dataAttributes = locationPrefix
			? getOphanComponents({
					branding,
					locationPrefix,
			  })
			: undefined;

		return showLabsRedesign ? (
			<>
				{/** All screen sizes apart from tablet have horizontal orientation */}
				<div
					css={css`
						${between.tablet.and.desktop} {
							display: none;
						}
					`}
				>
					<SponsoredContentLabel
						branding={branding}
						containerPalette={containerPalette}
						orientation="horizontal"
						alignment="end"
						ophanComponentLink={dataAttributes?.ophanComponentLink}
						ophanComponentName={dataAttributes?.ophanComponentName}
					/>
				</div>
				{/** Tablet sized screens have vertical orientation */}
				<div
					css={css`
						${until.tablet} {
							display: none;
						}
						${from.desktop} {
							display: none;
						}
					`}
				>
					<SponsoredContentLabel
						branding={branding}
						containerPalette={containerPalette}
						orientation="vertical"
						alignment="end"
						ophanComponentLink={dataAttributes?.ophanComponentLink}
						ophanComponentName={dataAttributes?.ophanComponentName}
					/>
				</div>
			</>
		) : (
			<CardBranding
				branding={branding}
				containerPalette={containerPalette}
				onwardsSource={onwardsSource}
			/>
		);
	};

	return (
		<CardWrapper
			format={format}
			showTopBarDesktop={showTopBarDesktop}
			showTopBarMobile={showTopBarMobile}
			isOnwardContent={isOnwardContent}
			containerPalette={containerPalette}
		>
			<CardLink
				linkTo={linkTo}
				headlineText={headlineText}
				dataLinkName={resolvedDataLinkName}
				isExternalLink={isExternalLink}
			/>
			{headlinePosition === 'outer' && (
				<div
					css={css`
						padding-bottom: ${space[5]}px;
					`}
					style={{ backgroundColor: backgroundColour }}
				>
					<CardHeadline
						headlineText={headlineText}
						format={format}
						fontSizes={headlineSizes}
						showQuotes={showQuotes}
						kickerText={
							format.design === ArticleDesign.LiveBlog &&
							!kickerText
								? 'Live'
								: kickerText
						}
						showPulsingDot={
							format.design === ArticleDesign.LiveBlog ||
							showPulsingDot
						}
						byline={byline}
						showByline={showByline}
						isExternalLink={isExternalLink}
						showLabsRedesign={showLabsRedesign}
					/>
					{!isUndefined(starRating) ? (
						<StarRatingComponent
							rating={starRating}
							cardHasImage={!!image}
						/>
					) : null}
				</div>
			)}

			{/** Don't merge this! */}
			<p>subtitleSize: {subtitleSize}</p>
			<CardLayout
				cardBackgroundColour={backgroundColour}
				mediaPositionOnDesktop={mediaPositionOnDesktop}
				mediaPositionOnMobile={mediaPositionOnMobile}
				minWidthInPixels={minWidthInPixels}
				mediaType={media?.type}
				gapSizes={getGapSizes()}
				isBetaContainer={isBetaContainer}
			>
				{/**
				 * Waveform for podcasts is absolutely positioned at bottom of
				 * card, behind everything else
				 */}
				{mainMedia?.type === 'Audio' && (
					<div
						css={waveformWrapper(
							mediaPositionOnMobile,
							mediaPositionOnDesktop,
						)}
					>
						<SvgWaveform />
					</div>
				)}
				{media && (
					<MediaWrapper
						mediaSize={mediaSize}
						mediaFixedSizes={mediaFixedSizeOptions()}
						mediaType={media.type}
						mediaPositionOnDesktop={mediaPositionOnDesktop}
						mediaPositionOnMobile={mediaPositionOnMobile}
						fixImageWidth={
							fixImageWidth ??
							(mediaPositionOnMobile === 'left' ||
								mediaPositionOnMobile === 'right')
						}
						hideImageOverlay={media.type === 'slideshow'}
						padMedia={isMediaCardOrNewsletter && isBetaContainer}
						isBetaContainer={isBetaContainer}
					>
						{media.type === 'slideshow' && (
							<div
								css={css`
									position: relative;
									z-index: ${getZIndex('card-nested-link')};
								`}
							>
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<SlideshowCarousel
										images={media.slideshowImages}
										imageSize={mediaSize}
										hasNavigationBackgroundColour={
											!!hasSublinks
										}
									/>
								</Island>
							</div>
						)}
						{media.type === 'avatar' && (
							<AvatarContainer
								imageSize={mediaSize}
								imagePositionOnDesktop={mediaPositionOnDesktop}
								imagePositionOnMobile={mediaPositionOnMobile}
								isBetaContainer={isBetaContainer}
								isFlexibleContainer={isFlexibleContainer}
								isInAllBoostsTest={isInAllBoostsTest}
							>
								<Avatar
									src={media.avatarUrl}
									alt={byline ?? ''}
									imageSize={
										isBetaContainer ? mediaSize : undefined
									}
									isInAllBoostsTest={isInAllBoostsTest}
								/>
							</AvatarContainer>
						)}
						{media.type === 'loop-video' && (
							<Island
								priority="critical"
								defer={{ until: 'visible' }}
							>
								<LoopVideo
									// sources={media.mainMedia.sources}
									sources={[
										{
											// Test loop with subtitles
											src: 'https://uploads.guimcode.co.uk/2025/09/01/Loop__Japan_fireball--ace3fcf6-1378-41db-9d21-f3fc07072ab2-1.10.m3u8',
											// src: 'https://uploads.guim.co.uk/2025/08/20/Allaire+loop+--83f7d9ab-b1ff-439c-9631-8febd724829b-1.m3u8',
											mimeType: 'application/x-mpegURL',
										},
										{
											src: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
											mimeType: 'video/mp4',
										},
									]}
									atomId={media.mainMedia.atomId}
									uniqueId={uniqueId}
									height={media.mainMedia.height}
									width={media.mainMedia.width}
									posterImage={media.mainMedia.image ?? ''}
									fallbackImage={media.mainMedia.image ?? ''}
									fallbackImageSize={mediaSize}
									fallbackImageLoading={imageLoading}
									fallbackImageAlt={media.imageAltText}
									fallbackImageAspectRatio="5:4"
									linkTo={linkTo}
									subtitleSource={
										media.mainMedia.subtitleSource
									}
									subtitleSize={subtitleSize}
								/>
							</Island>
						)}
						{media.type === 'youtube-video' && (
							<>
								{showVideo ? (
									<div
										data-chromatic="ignore"
										data-component="youtube-atom"
										css={css`
											display: block;
											position: relative;
											z-index: ${getZIndex(
												'card-nested-link',
											)};
										`}
									>
										<Island
											priority="critical"
											defer={{ until: 'visible' }}
										>
											<YoutubeBlockComponent
												id={media.mainMedia.id}
												assetId={
													media.mainMedia.videoId
												}
												index={index}
												duration={
													isVideoArticle
														? undefined
														: media.mainMedia
																.duration
												}
												posterImage={
													media.mainMedia.image
												}
												width={media.mainMedia.width}
												height={media.mainMedia.height}
												origin={media.mainMedia.origin}
												mediaTitle={headlineText}
												expired={
													media.mainMedia.expired
												}
												format={format}
												isMainMedia={true}
												hideCaption={true}
												stickyVideos={false}
												kickerText={kickerText}
												/*
												 * TODO: IMPROVE THIS MAPPING
												 *
												 * Image size defaults to small if not provided. However, if the
												 * headline size is large or greater, we want to assume the image
												 * is also large so that the play icon is correctly sized.
												 */
												iconSizeOnDesktop={
													[
														'small',
														'medium',
														'large',
														'xlarge',
														'xxlarge',
													].includes(
														headlineSizes?.desktop ??
															'',
													) || mediaSize !== 'small'
														? 'large'
														: 'small'
												}
												iconSizeOnMobile={
													mediaPositionOnMobile ===
														'left' ||
													mediaPositionOnMobile ===
														'right'
														? 'small'
														: 'large'
												}
												hidePillOnMobile={
													mediaPositionOnMobile ===
														'left' ||
													mediaPositionOnMobile ===
														'right'
												}
												enableAds={false}
												aspectRatio={aspectRatio}
											/>
										</Island>
									</div>
								) : (
									<div>
										<CardPicture
											mainImage={
												media.mainMedia.image ?? ''
											}
											imageSize={mediaSize}
											alt={headlineText}
											loading={imageLoading}
											roundedCorners={
												isOnwardContent &&
												!isMoreGalleriesOnwardContent
											}
											aspectRatio={aspectRatio}
											isInAllBoostsTest={
												isInAllBoostsTest
											}
										/>
									</div>
								)}
							</>
						)}
						{media.type === 'picture' && (
							<>
								<CardPicture
									mainImage={media.imageUrl}
									imageSize={mediaSize}
									alt={media.imageAltText}
									loading={imageLoading}
									roundedCorners={
										isOnwardContent &&
										!isMoreGalleriesOnwardContent
									}
									aspectRatio={aspectRatio}
									isInAllBoostsTest={isInAllBoostsTest}
								/>
								{isVideoMainMedia && mainMedia.duration > 0 && (
									<div
										css={css`
											position: absolute;
											top: ${space[2]}px;
											right: ${space[2]}px;
										`}
									>
										<Pill
											content={secondsToDuration(
												mainMedia.duration,
											)}
											icon={
												<SvgMediaControlsPlay
													width={18}
												/>
											}
										/>
									</div>
								)}
							</>
						)}
						{media.type === 'crossword' && (
							<img src={media.imageUrl} alt="" />
						)}
						{media.type === 'podcast' && (
							<>
								{media.podcastImage?.src && !showKickerImage ? (
									<div css={podcastImageStyles(mediaSize)}>
										<CardPicture
											mainImage={media.podcastImage.src}
											imageSize="small"
											alt={media.imageAltText}
											loading={imageLoading}
											roundedCorners={
												isOnwardContent &&
												!isMoreGalleriesOnwardContent
											}
											aspectRatio="1:1"
										/>
									</div>
								) : (
									<CardPicture
										mainImage={media.trailImage.src ?? ''}
										imageSize={mediaSize}
										alt={media.trailImage.altText}
										loading={imageLoading}
										aspectRatio={aspectRatio}
										isInAllBoostsTest={isInAllBoostsTest}
									/>
								)}
							</>
						)}
					</MediaWrapper>
				)}
				<ContentWrapper
					mediaType={media?.type}
					mediaSize={mediaSize}
					isBetaContainer={isBetaContainer}
					mediaPositionOnDesktop={
						image ? mediaPositionOnDesktop : 'none'
					}
					mediaPositionOnMobile={
						image ? mediaPositionOnMobile : 'none'
					}
					padContent={determinePadContent(
						isMediaCardOrNewsletter,
						isBetaContainer,
						isOnwardContent && !isMoreGalleriesOnwardContent,
					)}
				>
					{/* This div is needed to keep the headline and trail text justified at the start */}
					<div
						css={css`
							position: relative;
							display: flex;
							flex-direction: column;
							justify-content: flex-start;
							flex-grow: 1;
						`}
					>
						{headlinePosition === 'inner' && (
							<HeadlineWrapper>
								<CardHeadline
									headlineText={headlineText}
									format={format}
									fontSizes={headlineSizes}
									showQuotes={showQuotes}
									kickerText={
										format.design ===
											ArticleDesign.LiveBlog &&
										!kickerText
											? 'Live'
											: kickerText
									}
									showPulsingDot={
										format.design ===
											ArticleDesign.LiveBlog ||
										showPulsingDot
									}
									byline={byline}
									showByline={showByline}
									isExternalLink={isExternalLink}
									kickerImage={
										showKickerImage &&
										media?.type === 'podcast'
											? media.podcastImage
											: undefined
									}
									showLabsRedesign={showLabsRedesign}
								/>
								{!isUndefined(starRating) ? (
									<StarRatingComponent
										rating={starRating}
										cardHasImage={!!image}
									/>
								) : null}
							</HeadlineWrapper>
						)}

						{!!trailText && shouldShowTrailText && (
							<TrailText
								trailText={trailText}
								trailTextSize={trailTextSize}
								padTop={headlinePosition === 'inner'}
								hideUntil={hideTrailTextUntil()}
							/>
						)}

						{!isOpinionCardWithAvatar && (
							<>
								{showPill ? (
									<>
										<MediaOrNewsletterPill />
										{!showLabsRedesign &&
											format.theme ===
												ArticleSpecial.Labs && (
												<LabsBranding />
											)}
									</>
								) : (
									<CardFooter
										format={format}
										age={decideAge()}
										commentCount={<CommentCount />}
										cardBranding={
											isOnwardContent ||
											!showLabsRedesign ? (
												<LabsBranding />
											) : undefined
										}
										showLivePlayable={showLivePlayable}
									/>
								)}
							</>
						)}
						{showLivePlayable &&
							liveUpdatesPosition === 'inner' && (
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<LatestLinks
										id={linkTo}
										isDynamo={isDynamo}
										direction={
											isFlexibleContainer
												? liveUpdatesAlignment
												: supportingContentAlignment
										}
										containerPalette={containerPalette}
										absoluteServerTimes={
											absoluteServerTimes
										}
										displayHeader={isFlexibleContainer}
										directionOnMobile={
											isFlexibleContainer
												? 'horizontal'
												: undefined
										}
									></LatestLinks>
								</Island>
							)}
					</div>

					{/* This div is needed to push this content to the bottom of the card */}
					<div style={isOnwardContent ? { marginTop: 'auto' } : {}}>
						{decideInnerSublinks()}
					</div>

					{sublinkPosition === 'outer' &&
						supportingContentAlignment === 'horizontal' &&
						mediaPositionOnDesktop === 'right' && (
							<HorizontalDivider />
						)}
				</ContentWrapper>
			</CardLayout>

			{/** This div contains content that sits "outside" of the standard card layout */}
			<div
				css={
					/** We allow this area to take up more space so that cards without
					 * sublinks next to cards with sublinks have the same meta alignment */
					isBetaContainer &&
					(mediaPositionOnDesktop === 'left' ||
						mediaPositionOnDesktop === 'right') &&
					css`
						${from.tablet} {
							flex-basis: 100%;
							background-color: ${backgroundColour};
						}
					`
				}
				style={{
					padding: isOnwardContent ? `0 ${space[2]}px` : 0,
				}}
			>
				{showLivePlayable && liveUpdatesPosition === 'outer' && (
					<Island priority="feature" defer={{ until: 'visible' }}>
						<LatestLinks
							id={linkTo}
							isDynamo={isDynamo}
							direction={
								isFlexibleContainer
									? liveUpdatesAlignment
									: supportingContentAlignment
							}
							containerPalette={containerPalette}
							absoluteServerTimes={absoluteServerTimes}
							displayHeader={isFlexibleContainer}
							directionOnMobile={'horizontal'}
						></LatestLinks>
					</Island>
				)}

				{decideOuterSublinks()}

				{isOpinionCardWithAvatar && (
					<CardFooter
						format={format}
						age={decideAge()}
						commentCount={<CommentCount />}
						cardBranding={
							!showLabsRedesign ? <LabsBranding /> : undefined
						}
						showLivePlayable={showLivePlayable}
						shouldReserveSpace={{
							mobile: avatarPosition.mobile === 'bottom',
							desktop: avatarPosition.desktop === 'bottom',
						}}
					/>
				)}
			</div>

			{showLabsRedesign &&
				!isOnwardContent &&
				format.theme === ArticleSpecial.Labs && <LabsBranding />}
		</CardWrapper>
	);
};
