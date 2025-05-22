import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Hide, Link, SvgCamera } from '@guardian/source/react-components';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../../lib/articleFormat';
import { isMediaCard } from '../../lib/cardHelpers';
import { isWithinTwelveHours, secondsToDuration } from '../../lib/formatTime';
import { getZIndex } from '../../lib/getZIndex';
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
import { MediaMeta } from '../MediaMeta';
import { Pill } from '../Pill';
import { Slideshow } from '../Slideshow';
import { SlideshowCarousel } from '../SlideshowCarousel.importable';
import { Snap } from '../Snap';
import { SnapCssSandbox } from '../SnapCssSandbox';
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
	ImageFixedSizeOptions,
	ImagePositionType,
	ImageSizeType,
} from './components/ImageWrapper';
import { ImageWrapper } from './components/ImageWrapper';
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
	imagePositionOnDesktop?: ImagePositionType;
	imagePositionOnMobile?: ImagePositionType;
	/** Size is ignored when position = 'top' because in that case the image flows based on width */
	imageSize?: ImageSizeType;
	imageLoading: Loading;
	isCrossword?: boolean;
	isNewsletter?: boolean;
	isOnwardContent?: boolean;
	trailText?: string;
	avatarUrl?: string;
	showClock?: boolean;
	mainMedia?: MainMedia;
	/** Note YouTube recommends a minimum width of 480px @see https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-youtube-player-size
	 * At 300px or below, the player will begin to lose functionality e.g. volume controls being omitted.
	 * Youtube requires a minimum width 200px.
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
	pauseOffscreenVideo?: boolean;
	showMainVideo?: boolean;
	isTagPage?: boolean;
	/** Allows the consumer to set an aspect ratio on the image of 5:3, 5:4, 4:5 or 1:1 */
	aspectRatio?: AspectRatio;
	index?: number;
	/** The Splash card in a flexible container gets a different visual treatment to other cards*/
	isFlexSplash?: boolean;
	showTopBarDesktop?: boolean;
	showTopBarMobile?: boolean;
	trailTextSize?: TrailTextSize;
	/** A kicker image is seperate to the main media and renders as part of the kicker */
	showKickerImage?: boolean;
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
	imagePositionOnMobile?: ImagePositionType,
	imagePositionOnDesktop?: ImagePositionType,
) => css`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	svg {
		display: block;
		width: 100%;
		height: ${imagePositionOnMobile === 'top' ? 50 : 29}px;
		${from.mobileMedium} {
			height: ${imagePositionOnMobile === 'top' ? 50 : 33}px;
		}
		${from.tablet} {
			height: ${imagePositionOnDesktop === 'top' ? 50 : 33}px;
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

const podcastImageStyles = (imageSize: ImageSizeType) => {
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
	if (mainMedia?.type === 'Video' && canPlayInline) {
		return {
			type: 'video',
			mainMedia,
			...(imageUrl && { imageUrl }),
		} as const;
	}
	if (slideshowImages) return { type: 'slideshow', slideshowImages } as const;
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
	imagePositionOnDesktop?: ImagePositionType,
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
		imagePositionOnDesktop === 'top' ||
		imagePositionOnDesktop === 'bottom' ||
		showLivePlayable
	) {
		return 'outer';
	}

	return alignment === 'vertical' ? 'inner' : 'outer';
};

const getHeadlinePosition = ({
	isFlexSplash,
	containerType,
	showLivePlayable,
	isMediaCardOrNewsletter,
}: {
	containerType?: DCRContainerType;
	isFlexSplash?: boolean;
	showLivePlayable: boolean;
	isMediaCardOrNewsletter: boolean;
}) => {
	if (isMediaCardOrNewsletter) {
		return 'inner';
	}

	if (containerType === 'flexible/special' && isFlexSplash) {
		return 'outer';
	}

	if (
		containerType === 'flexible/general' &&
		isFlexSplash &&
		showLivePlayable
	) {
		return 'outer';
	}

	return 'inner';
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
	imagePositionOnDesktop = 'top',
	imagePositionOnMobile = 'left',
	imageSize = 'small',
	imageLoading,
	trailText,
	avatarUrl,
	showClock,
	mainMedia,
	canPlayInline,
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
	pauseOffscreenVideo = false,
	showMainVideo = true,
	absoluteServerTimes,
	isTagPage = false,
	aspectRatio,
	index = 0,
	isFlexSplash,
	showTopBarDesktop = true,
	showTopBarMobile = true,
	trailTextSize,
	showKickerImage = false,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;
	const sublinkPosition = decideSublinkPosition(
		supportingContent,
		imagePositionOnDesktop,
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

	// Currently pills are only shown within beta containers.
	const showPill = isBetaContainer && isMediaCardOrNewsletter;

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

	/**
	 * For opinion type cards with avatars (which aren't onwards content)
	 * we render the footer in a different location
	 */
	const isOpinionCardWithAvatar =
		isOpinion && !isOnwardContent && media?.type === 'avatar';

	/**
	 * The avatar position is not always the same as the image position.
	 */
	const avatarPosition = decideAvatarPosition(
		imagePositionOnMobile,
		imagePositionOnDesktop,
		isBetaContainer,
	);

	const backgroundColour = isMediaCardOrNewsletter
		? palette('--card-media-background')
		: palette('--card-background');

	/* Whilst we migrate to the new container types, we need to check which container we are in. */
	const isFlexibleContainer =
		containerType === 'flexible/special' ||
		containerType === 'flexible/general';

	const isSmallCard = containerType === 'scrollable/small';

	const imageFixedSizeOptions = (): ImageFixedSizeOptions => {
		if (isSmallCard) {
			return {
				mobile: 'tiny',
				tablet: 'small',
				desktop: 'small',
			};
		}
		if (isFlexibleContainer) return { mobile: 'small' };
		return { mobile: 'medium' };
	};

	const headlinePosition = getHeadlinePosition({
		containerType,
		isFlexSplash,
		showLivePlayable,
		isMediaCardOrNewsletter,
	});

	const hideTrailTextUntil = () => {
		if (isFlexibleContainer) {
			return undefined;
		} else if (
			imageSize === 'large' &&
			imagePositionOnDesktop === 'right' &&
			media?.type !== 'avatar'
		) {
			return 'desktop';
		} else {
			return 'tablet';
		}
	};

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

		if (isFlexSplash) {
			return {
				row: 'small',
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
			imagePositionOnDesktop === 'bottom' ||
			imagePositionOnMobile === 'bottom'
		) {
			return {
				row: 'tiny',
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
						(imagePositionOnMobile === 'bottom' ||
							isMediaCard(format)))
				}
				fillBackgroundOnDesktop={isBetaContainer && isMediaCard(format)}
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
				dataLinkName={dataLinkName}
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
					/>
					{!isUndefined(starRating) ? (
						<StarRatingComponent
							rating={starRating}
							cardHasImage={!!image}
						/>
					) : null}
					{!showPill && !!mainMedia && mainMedia.type !== 'Video' && (
						<MediaMeta
							mediaType={mainMedia.type}
							hasKicker={!!kickerText}
						/>
					)}
				</div>
			)}

			<CardLayout
				cardBackgroundColour={backgroundColour}
				imagePositionOnDesktop={imagePositionOnDesktop}
				imagePositionOnMobile={imagePositionOnMobile}
				minWidthInPixels={minWidthInPixels}
				imageType={media?.type}
				containerType={containerType}
				gapSizes={getGapSizes()}
				isBetaContainer={isBetaContainer}
			>
				{/**
				 * Waveform for podcasts is absolutely positioned at bottom of
				 * card, behind everything else
				 */}
				{isBetaContainer && mainMedia?.type === 'Audio' && (
					<div
						css={waveformWrapper(
							imagePositionOnMobile,
							imagePositionOnDesktop,
						)}
					>
						<SvgWaveform />
					</div>
				)}
				{media && (
					<ImageWrapper
						imageSize={imageSize}
						imageFixedSizes={imageFixedSizeOptions()}
						imageType={media.type}
						imagePositionOnDesktop={imagePositionOnDesktop}
						imagePositionOnMobile={imagePositionOnMobile}
						hideImageOverlay={
							media.type === 'slideshow' && isFlexibleContainer
						}
						padImage={isMediaCardOrNewsletter && isBetaContainer}
					>
						{media.type === 'slideshow' &&
							(isFlexibleContainer ? (
								<div
									css={css`
										position: relative;
										z-index: ${getZIndex(
											'card-nested-link',
										)};
									`}
								>
									<Island
										priority="feature"
										defer={{ until: 'visible' }}
									>
										<SlideshowCarousel
											images={media.slideshowImages}
											imageSize={imageSize}
											hasNavigationBackgroundColour={
												!!hasSublinks
											}
										/>
									</Island>
								</div>
							) : (
								<Slideshow
									images={media.slideshowImages}
									imageSize={imageSize}
									isDynamo={isDynamo}
								/>
							))}
						{media.type === 'avatar' && (
							<AvatarContainer
								imageSize={imageSize}
								imagePositionOnDesktop={imagePositionOnDesktop}
								imagePositionOnMobile={imagePositionOnMobile}
								isBetaContainer={isBetaContainer}
							>
								<Avatar
									src={media.avatarUrl}
									alt={byline ?? ''}
									imageSize={
										isBetaContainer ? imageSize : undefined
									}
								/>
							</AvatarContainer>
						)}
						{media.type === 'video' && (
							<>
								{showMainVideo ? (
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
													isBetaContainer &&
													isVideoArticle
														? undefined
														: media.mainMedia
																.duration
												}
												posterImage={
													media.mainMedia.images
												}
												overrideImage={media.imageUrl}
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
												pauseOffscreenVideo={
													pauseOffscreenVideo
												}
												showTextOverlay={
													containerType ===
													'fixed/video'
												}
												//** TODO: IMPROVE THIS MAPPING */
												// image size defaults to small if not provided. However, if the headline size is large or greater, we want to assume the image is also large so that the play icon is correctly sized.
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
													) || imageSize !== 'small'
														? 'large'
														: 'small'
												}
												iconSizeOnMobile={
													imagePositionOnMobile ===
														'left' ||
													imagePositionOnMobile ===
														'right'
														? 'small'
														: 'large'
												}
												hidePillOnMobile={
													imagePositionOnMobile ===
														'left' ||
													imagePositionOnMobile ===
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
												media.imageUrl
													? media.imageUrl
													: media.mainMedia.images.reduce(
															(prev, current) =>
																prev.width >
																current.width
																	? prev
																	: current,
													  ).url
											}
											imageSize={imageSize}
											alt={headlineText}
											loading={imageLoading}
											roundedCorners={isOnwardContent}
											aspectRatio={aspectRatio}
										/>
									</div>
								)}
							</>
						)}
						{media.type === 'picture' && (
							<>
								<CardPicture
									mainImage={media.imageUrl}
									imageSize={imageSize}
									alt={media.imageAltText}
									loading={imageLoading}
									roundedCorners={isOnwardContent}
									aspectRatio={aspectRatio}
								/>
								{(isVideoMainMedia ||
									(isVideoArticle && !isBetaContainer)) &&
									mainMedia.duration > 0 && (
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
									<div css={[podcastImageStyles(imageSize)]}>
										<CardPicture
											mainImage={media.podcastImage.src}
											imageSize={'small'}
											alt={media.imageAltText}
											loading={imageLoading}
											roundedCorners={isOnwardContent}
											aspectRatio={'1:1'}
										/>
									</div>
								) : (
									<CardPicture
										mainImage={media.trailImage.src ?? ''}
										imageSize={imageSize}
										alt={media.trailImage.altText}
										loading={imageLoading}
										aspectRatio={aspectRatio}
									/>
								)}
							</>
						)}
					</ImageWrapper>
				)}

				{containerType !== 'fixed/video' && (
					<ContentWrapper
						imageType={media?.type}
						imageSize={imageSize}
						isBetaContainer={isBetaContainer}
						imagePositionOnDesktop={
							image ? imagePositionOnDesktop : 'none'
						}
						imagePositionOnMobile={
							image ? imagePositionOnMobile : 'none'
						}
						padContent={determinePadContent(
							isMediaCardOrNewsletter,
							isBetaContainer,
							isOnwardContent,
						)}
						padRight={
							!!isFlexSplash &&
							image &&
							imagePositionOnDesktop === 'right'
						}
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
									/>
									{!isUndefined(starRating) ? (
										<StarRatingComponent
											rating={starRating}
											cardHasImage={!!image}
										/>
									) : null}
									{!showPill &&
										!!mainMedia &&
										mainMedia.type !== 'Video' && (
											<MediaMeta
												mediaType={mainMedia.type}
												hasKicker={!!kickerText}
											/>
										)}
								</HeadlineWrapper>
							)}

							{!!trailText && media?.type !== 'podcast' && (
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
											{format.theme ===
												ArticleSpecial.Labs &&
												branding && (
													<CardBranding
														branding={branding}
														onwardsSource={
															onwardsSource
														}
														containerPalette={
															containerPalette
														}
													/>
												)}
										</>
									) : (
										<CardFooter
											format={format}
											age={decideAge()}
											commentCount={<CommentCount />}
											cardBranding={
												branding ? (
													<CardBranding
														branding={branding}
														onwardsSource={
															onwardsSource
														}
														containerPalette={
															containerPalette
														}
													/>
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
						<div
							style={isOnwardContent ? { marginTop: 'auto' } : {}}
						>
							{decideInnerSublinks()}
						</div>

						{sublinkPosition === 'outer' &&
							supportingContentAlignment === 'horizontal' &&
							imagePositionOnDesktop === 'right' && (
								<HorizontalDivider />
							)}
					</ContentWrapper>
				)}
			</CardLayout>

			<div
				css={
					/** We allow this area to take up more space so that cards without
					 * sublinks next to cards with sublinks have the same meta alignment */
					isBetaContainer &&
					(imagePositionOnDesktop === 'left' ||
						imagePositionOnDesktop === 'right') &&
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
							branding ? (
								<CardBranding
									branding={branding}
									onwardsSource={onwardsSource}
								/>
							) : undefined
						}
						showLivePlayable={showLivePlayable}
						shouldReserveSpace={{
							mobile: avatarPosition.mobile === 'bottom',
							desktop: avatarPosition.desktop === 'bottom',
						}}
					/>
				)}
			</div>
		</CardWrapper>
	);
};
