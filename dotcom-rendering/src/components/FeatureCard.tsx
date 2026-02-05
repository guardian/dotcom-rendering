import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
	until,
} from '@guardian/source/foundations';
import { Hide, SvgMediaControlsPlay } from '@guardian/source/react-components';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { secondsToDuration } from '../lib/formatTime';
import { getZIndex } from '../lib/getZIndex';
import { getOphanComponents } from '../lib/labs';
import { transparentColour } from '../lib/transparentColour';
import { palette } from '../palette';
import type { Branding } from '../types/branding';
import type { StarRating as Rating, RatingSizeType } from '../types/content';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontImage,
	DCRSupportingContent,
} from '../types/front';
import type { CardMediaType } from '../types/layout';
import type { MainMedia } from '../types/mainMedia';
import { BrandingLabel } from './BrandingLabel';
import { CardFooter } from './Card/components/CardFooter';
import { CardLink } from './Card/components/CardLink';
import type { MediaSizeType } from './Card/components/MediaWrapper';
import { narrowPlayIconDiameter, PlayIcon } from './Card/components/PlayIcon';
import { TrailText } from './Card/components/TrailText';
import { CardHeadline, type ResponsiveFontSize } from './CardHeadline';
import type { Loading } from './CardPicture';
import { CardPicture } from './CardPicture';
import { ContainerOverrides } from './ContainerOverrides';
import { FeatureCardCardAge } from './FeatureCardCardAge';
import { FeatureCardCommentCount } from './FeatureCardCommentCount';
import { FormatBoundary } from './FormatBoundary';
import { Island } from './Island';
import { Pill } from './Pill';
import { SelfHostedVideo } from './SelfHostedVideo.importable';
import { StarRating } from './StarRating/StarRating';
import { SupportingContent } from './SupportingContent';
import { WaveForm } from './WaveForm';
import { YoutubeBlockComponent } from './YoutubeBlockComponent.importable';

const baseCardStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	/* We absolutely position the faux link
		so this is required here */
	position: relative;

	/* Target Safari 10.1 */
	/* https://www.browserstack.com/guide/create-browser-specific-css */
	@media not all and (min-resolution: 0.001dpcm) {
		@supports (-webkit-appearance: none) and
			(not (stroke-color: transparent)) {
			display: grid;
			grid-auto-rows: min-content;
			align-content: start;
		}
	}

	/* a tag specific styles */
	color: inherit;
	text-decoration: none;
`;

const underlineOnHoverStyles = css`
	/* Only underline the headline element we want to target (not kickers/sublink headlines) */

	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

const hoverStyles = css`
	:hover .media-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: ${palette('--card-background-hover')};
	}

	${underlineOnHoverStyles}
	/** When we hover on sublinks, we want to prevent the general hover styles applying */
	:has(ul.sublinks:hover, .branding-logo:hover) {
		.card-headline .show-underline {
			text-decoration: none;
		}

		.media-overlay {
			background-color: transparent;
		}
	}
`;

const contentStyles = css`
	display: flex;
	flex-basis: 100%;
	width: 100%;
	gap: ${space[2]}px;
	flex-direction: column;
`;

const overlayContainerStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	cursor: pointer;
	z-index: ${getZIndex('mediaOverlay')};
`;

const immersiveOverlayContainerStyles = css`
	${from.tablet} {
		top: 0;
		height: 100%;
		/**
		* Why 268px?
		* 220 is the width of 4 columns on tablet and 3 columns on desktop.
		* 48px is to ensure the gradient does not render the content inaccessible.
		*/
		width: 268px;
		z-index: ${getZIndex('mediaOverlay')};
	}
`;

const noPointerEvents = css`
	pointer-events: none;
`;

/**
 * Image mask gradient has additional colour stops to emulate a non-linear
 * ease in / ease out curve to make the transition smoother. Values were
 * generated with https://non-boring-gradients.netlify.app and manually
 * optimised. (Opacity values have been rounded and the number of colour stops
 * reduced.) The following article has more detail on non-linear gradients:
 * https://css-tricks.com/easing-linear-gradients/
 */
const overlayMaskGradientStyles = (angle: string) => css`
	mask-image: linear-gradient(
		${angle},
		transparent 0px,
		rgba(0, 0, 0, 0.0381) 8px,
		rgba(0, 0, 0, 0.1464) 16px,
		rgba(0, 0, 0, 0.3087) 24px,
		rgba(0, 0, 0, 0.5) 32px,
		rgba(0, 0, 0, 0.6913) 40px,
		rgba(0, 0, 0, 0.8536) 48px,
		rgba(0, 0, 0, 0.9619) 56px,
		rgb(0, 0, 0) 64px
	);
`;

const overlayStyles = css`
	position: relative;
	display: flex;
	flex-direction: column;
	text-align: start;
	gap: ${space[1]}px;
	padding: ${space[9]}px ${space[2]}px ${space[2]}px;

	/*
	 * Ensure the waveform is behind the other elements, e.g. headline, pill.
	 * Links define their own z-index.
	 */
	> :not(.waveform):not(a) {
		z-index: 1;
	}
`;

const immersiveOverlayStyles = css`
	${from.tablet} {
		padding: ${space[2]}px ${space[12]}px ${space[2]}px ${space[2]}px;
		height: 100%;
	}
`;

const blurStyles = css`
	position: absolute;
	inset: 0;
	backdrop-filter: blur(12px) brightness(0.5);
	@supports not (backdrop-filter: blur(12px)) {
		background-color: ${transparentColour(sourcePalette.neutral[10], 0.7)};
	}
	${overlayMaskGradientStyles('180deg')};
`;

const immersiveBlurStyles = css`
	${from.tablet} {
		${overlayMaskGradientStyles('270deg')}
	}
`;

const podcastImageContainerStyles = css`
	position: relative;
	/* Needs to display above the image mask overlay */
	z-index: ${getZIndex('card-podcast-image')};
`;

const podcastImageStyles = css`
	height: 60px;
	width: 60px;
`;

const nonImmersivePodcastImageStyles = css`
	position: absolute;
	/**
	* Displays 8px above the text.
	* desired space above text (8px) - padding-top of text container (36px) = -28px
	*/
	bottom: -28px;
	left: ${space[2]}px;
`;

const trailTextWrapper = css`
	margin-top: ${space[3]}px;

	${until.tablet} {
		display: none;
	}
`;

const videoPillStyles = css`
	position: absolute;
	top: ${space[2]}px;
	right: ${space[2]}px;
`;

const playIconStyles = css`
	position: absolute;
	top: calc(50% - ${narrowPlayIconDiameter / 2}px);
	left: calc(50% - ${narrowPlayIconDiameter / 2}px);
`;

const waveformStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 0;
	height: 40px;
	max-width: 100%;
	overflow: hidden;
	opacity: 0.3;
`;

const getMedia = ({
	imageUrl,
	imageAltText,
	mainMedia,
	showVideo,
}: {
	imageUrl?: string;
	imageAltText?: string;
	mainMedia?: MainMedia;
	showVideo?: boolean;
}) => {
	if (mainMedia?.type === 'SelfHostedVideo' && showVideo) {
		let type: CardMediaType;
		switch (mainMedia.videoStyle) {
			case 'Loop':
				type = 'loop-video';
				break;
			case 'Cinemagraph':
				type = 'cinemagraph';
				break;
			default:
				type = 'default-video';
		}

		return {
			type,
			mainMedia,
		} as const;
	}

	if (mainMedia?.type === 'YoutubeVideo' && showVideo) {
		return {
			type: 'youtube-video',
			mainMedia,
		} as const;
	}

	if (imageUrl) {
		return { type: 'picture', imageUrl, imageAltText } as const;
	}

	return undefined;
};

const renderWaveform = (duration: string, bars: number) => (
	<div css={waveformStyles} className="waveform">
		<WaveForm seed={duration} height={40} bars={bars} barWidth={2} />
	</div>
);

const renderPodcastImage = (
	image: string,
	alt: string,
	isImmersive: boolean,
) => (
	<div css={podcastImageContainerStyles}>
		<div
			css={[
				podcastImageStyles,
				!isImmersive && nonImmersivePodcastImageStyles,
			]}
		>
			<CardPicture
				mainImage={image}
				imageSize="podcast"
				alt={alt}
				loading="lazy"
				aspectRatio="1:1"
			/>
		</div>
	</div>
);

export type Props = {
	linkTo: string;
	format: ArticleFormat;
	serverTime?: number;
	headlineText: string;
	headlineSizes?: ResponsiveFontSize;
	byline?: string;
	showByline?: boolean;
	webPublicationDate?: string;
	image?: DCRFrontImage;
	/** Size is ignored when position = 'top' because in that case the image flows based on width */
	imageSize: MediaSizeType;
	imageLoading: Loading;
	showClock?: boolean;
	mainMedia?: MainMedia;
	trailText?: string;
	/**
	 * Note YouTube recommends a minimum width of 480px @see https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-youtube-player-size
	 * At 300px or below, the player will begin to lose functionality e.g. volume controls being omitted.
	 * Youtube requires a minimum width 200px.
	 * Similarly for self-hosted videos, we shouldn't display videos in too small a container.
	 * For example, subtitles will not be legible in too small a player.
	 */
	canPlayInline?: boolean;
	showVideo?: boolean;
	kickerText?: string;
	showPulsingDot?: boolean;
	starRating?: Rating;
	/** Used for Ophan tracking */
	dataLinkName?: string;
	/** Only used on Labs cards */
	branding?: Branding;
	/** Supporting content refers to sublinks */
	supportingContent?: DCRSupportingContent[];
	containerPalette?: DCRContainerPalette;
	discussionApiUrl: string;
	discussionId?: string;
	isExternalLink: boolean;
	/** Allows the consumer to set an aspect ratio on the image */
	aspectRatio?: AspectRatio;
	/** Allows the consumer to set an aspect ratio on the image specifically on mobile breakpoints */
	mobileAspectRatio?: AspectRatio;
	showQuotes?: boolean;
	/**
	 * Youtube video requires a unique ID. We append the collectionId to the youtube asset ID, to allow
	 * same video to be on the page multiple times, as long as they are in different collections.
	 * The highlights container above the header is 0, the first container below the header is 1, etc.
	 */
	collectionId: number;
	uniqueId: string;
	isNewsletter?: boolean;
	/**
	 * An immersive feature card variant. It dictates that the card has a full width background image on
	 * all breakpoints. It also dictates the the card change aspect ratio to 5:3 on desktop and 4:5 on mobile.
	 */
	isImmersive?: boolean;
	isStorylines?: boolean;
	starRatingSize: RatingSizeType;
	articleMainMedia?: MainMedia;
};

export const FeatureCard = ({
	linkTo,
	format,
	headlineText,
	headlineSizes,
	byline,
	showByline,
	webPublicationDate,
	image,
	imageSize,
	trailText,
	imageLoading,
	showClock,
	mainMedia,
	canPlayInline = false,
	showVideo = false,
	kickerText,
	showPulsingDot,
	dataLinkName,
	branding,
	supportingContent,
	containerPalette,
	discussionApiUrl,
	discussionId,
	isExternalLink,
	serverTime,
	aspectRatio,
	mobileAspectRatio,
	starRating,
	showQuotes,
	collectionId,
	uniqueId,
	isNewsletter = false,
	isImmersive = false,
	isStorylines = false,
	starRatingSize,
	articleMainMedia,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;

	/**
	 * Determine which type of media to use for the card.
	 * For example, a video might be available, but if we don't want to show it, use an image instead.
	 */
	const media = getMedia({
		imageUrl: image?.src,
		imageAltText: image?.altText,
		mainMedia,
		showVideo: showVideo && canPlayInline,
	});

	if (!media) return null;

	const showCardAge =
		webPublicationDate !== undefined && showClock !== undefined;

	const showCommentCount = discussionId !== undefined;

	const isYoutubeVideo = media.type === 'youtube-video';

	const isSelfHostedVideo =
		media.type === 'loop-video' ||
		media.type === 'default-video' ||
		media.type === 'cinemagraph';

	const isSelfHostedVideoWithControls =
		media.type === 'loop-video' || media.type === 'default-video';

	const labsDataAttributes = branding
		? getOphanComponents({
				branding,
				locationPrefix: 'front-card',
		  })
		: undefined;

	const isLabs = format.theme === ArticleSpecial.Labs;

	const aspectRatioNumber = isImmersive ? 5 / 3 : 4 / 5;

	/* The whole card is clickable on cinemagraphs and pictures */
	const allowLinkThroughOverlay =
		media.type === 'cinemagraph' || media.type === 'picture';

	return (
		<FormatBoundary format={format}>
			<ContainerOverrides containerPalette={containerPalette}>
				<div
					css={[
						baseCardStyles,
						!isSelfHostedVideoWithControls && hoverStyles,
					]}
				>
					{!isYoutubeVideo && !isSelfHostedVideoWithControls && (
						<CardLink
							linkTo={linkTo}
							headlineText={headlineText}
							dataLinkName={dataLinkName}
							isExternalLink={isExternalLink}
						/>
					)}
					<div css={contentStyles}>
						{isYoutubeVideo && (
							<div
								data-chromatic="ignore"
								data-component="youtube-atom"
								css={css`
									display: block;
									position: relative;
									z-index: ${getZIndex('card-nested-link')};
								`}
							>
								<Island
									priority="critical"
									defer={{ until: 'visible' }}
								>
									<YoutubeBlockComponent
										id={media.mainMedia.id}
										assetId={media.mainMedia.videoId}
										index={collectionId}
										expired={media.mainMedia.expired}
										format={format}
										stickyVideos={false}
										enableAds={false}
										duration={media.mainMedia.duration}
										posterImage={media.mainMedia.image}
										width={300}
										height={375}
										origin="The Guardian"
										mediaTitle={headlineText}
										isMainMedia={true}
										hideCaption={true}
										pauseOffscreenVideo={true}
										aspectRatio={aspectRatio}
										mobileAspectRatio={mobileAspectRatio}
										altText={headlineText}
										kickerText={kickerText}
										trailText={trailText}
										hidePillOnMobile={false}
										iconSizeOnDesktop="large"
										iconSizeOnMobile="large"
										headlineSizes={headlineSizes}
										webPublicationDate={webPublicationDate}
										showClock={!!showClock}
										serverTime={serverTime}
										linkTo={linkTo}
										discussionId={discussionId}
										discussionApiUrl={discussionApiUrl}
										isFeatureCard={true}
										isImmersive={isImmersive}
										byline={byline}
										showByline={showByline}
										isLive={media.mainMedia.isLive}
										articleMedia={articleMainMedia}
									/>
								</Island>
							</div>
						)}
						{!isYoutubeVideo && (
							<div
								css={css`
									position: relative;
									background-color: ${palette(
										'--feature-card-background',
									)};
								`}
							>
								{isSelfHostedVideo && (
									<Island
										priority="critical"
										defer={{ until: 'visible' }}
									>
										<SelfHostedVideo
											sources={media.mainMedia.sources}
											atomId={media.mainMedia.atomId}
											uniqueId={uniqueId}
											height={media.mainMedia.height}
											width={media.mainMedia.width}
											videoStyle={
												media.mainMedia.videoStyle
											}
											posterImage={
												media.mainMedia.image ?? ''
											}
											fallbackImage={
												media.mainMedia.image ?? ''
											}
											fallbackImageSize={imageSize}
											fallbackImageLoading={imageLoading}
											fallbackImageAlt={
												media.imageAltText
											}
											fallbackImageAspectRatio={
												aspectRatio
											}
											linkTo={linkTo}
											showProgressBar={false}
											subtitleSource={
												media.mainMedia.subtitleSource
											}
											subtitleSize="small"
											controlsPosition="top"
											minAspectRatio={aspectRatioNumber}
											maxAspectRatio={aspectRatioNumber}
										/>
									</Island>
								)}

								{media.type === 'picture' && (
									<>
										<CardPicture
											mainImage={media.imageUrl}
											imageSize={imageSize}
											alt={media.imageAltText}
											loading={imageLoading}
											aspectRatio={aspectRatio}
											mobileAspectRatio={
												mobileAspectRatio
											}
										/>

										{mainMedia?.type === 'YoutubeVideo' && (
											<>
												{mainMedia.duration > 0 && (
													<div css={videoPillStyles}>
														<Pill
															content={
																<time>
																	{secondsToDuration(
																		mainMedia.duration,
																	)}
																</time>
															}
															icon={
																<SvgMediaControlsPlay />
															}
														/>
													</div>
												)}
												<div css={playIconStyles}>
													<PlayIcon iconWidth="narrow" />
												</div>
											</>
										)}
									</>
								)}

								{/* This overlay is styled when the CardLink is hovered */}
								{!isSelfHostedVideoWithControls && (
									<div className="media-overlay" />
								)}
								<div
									css={[
										overlayContainerStyles,
										isImmersive &&
											immersiveOverlayContainerStyles,
										allowLinkThroughOverlay &&
											noPointerEvents,
									]}
								>
									{mainMedia?.type === 'Audio' &&
										!!mainMedia.podcastImage?.src &&
										(isImmersive ? (
											<Hide from="tablet">
												{renderPodcastImage(
													mainMedia.podcastImage.src,
													mainMedia.podcastImage
														.altText ?? '',
													false, // Immersive cards are styled as feature cards below the tablet viewport
												)}
											</Hide>
										) : (
											renderPodcastImage(
												mainMedia.podcastImage.src,
												mainMedia.podcastImage
													.altText ?? '',
												false,
											)
										))}
									<div
										css={[
											blurStyles,
											isImmersive && immersiveBlurStyles,
										]}
									/>

									<div
										css={[
											overlayStyles,
											isImmersive &&
												immersiveOverlayStyles,
											isSelfHostedVideoWithControls &&
												underlineOnHoverStyles,
										]}
									>
										{/** Only the overlay is a link for self-hosted videos with controls. */}
										{isSelfHostedVideoWithControls && (
											<CardLink
												linkTo={linkTo}
												headlineText={headlineText}
												dataLinkName={dataLinkName}
												isExternalLink={isExternalLink}
											/>
										)}

										{isImmersive &&
											mainMedia?.type === 'Audio' &&
											!!mainMedia.podcastImage?.src && (
												<div
													css={
														podcastImageContainerStyles
													}
												>
													<Hide until="tablet">
														{renderPodcastImage(
															mainMedia
																.podcastImage
																.src,
															mainMedia
																.podcastImage
																.altText ?? '',
															true,
														)}
													</Hide>
												</div>
											)}

										{/**
										 * Without the wrapping div the headline and byline would have space
										 * inserted between them due to being direct children of the flex container
										 */}
										<div>
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
												headlineColour={palette(
													'--feature-card-headline',
												)}
												kickerColour={palette(
													'--feature-card-kicker-text',
												)}
												quoteColour={palette(
													'--feature-card-quote-icon',
												)}
											/>
										</div>

										{!isUndefined(starRating) && (
											<StarRating
												rating={starRating}
												size={starRatingSize}
												useAlternativeTheme={true}
											/>
										)}

										{!!trailText && (
											<div css={trailTextWrapper}>
												<TrailText
													trailText={trailText}
													trailTextColour={palette(
														'--feature-card-trail-text',
													)}
													trailTextSize="regular"
													padBottom={false}
													hideUntil="tablet"
												/>
											</div>
										)}

										<CardFooter
											format={format}
											age={
												showCardAge ? (
													<FeatureCardCardAge
														webPublicationDate={
															webPublicationDate
														}
														showClock={!!showClock}
														serverTime={serverTime}
														isStorylines={
															isStorylines
														}
													/>
												) : undefined
											}
											commentCount={
												showCommentCount ? (
													<FeatureCardCommentCount
														linkTo={linkTo}
														discussionId={
															discussionId
														}
														discussionApiUrl={
															discussionApiUrl
														}
													/>
												) : undefined
											}
											isNewsletter={isNewsletter}
											mainMedia={articleMainMedia}
											headline={headlineText}
										/>

										{!isImmersive &&
											mainMedia?.type === 'Audio' &&
											renderWaveform(
												mainMedia.duration,
												233,
											)}
									</div>
								</div>

								{isImmersive &&
									mainMedia?.type === 'Audio' &&
									renderWaveform(mainMedia.duration, 313)}
							</div>
						)}
					</div>
					{hasSublinks && (
						<SupportingContent
							supportingContent={supportingContent}
							containerPalette={containerPalette}
							alignment="vertical"
							fillBackgroundOnDesktop={true}
							fillBackgroundOnMobile={true}
						/>
					)}
					{isLabs && branding && (
						<BrandingLabel
							branding={branding}
							containerPalette={containerPalette}
							orientation="horizontal"
							alignment="end"
							ophanComponentLink={
								labsDataAttributes?.ophanComponentLink
							}
							ophanComponentName={
								labsDataAttributes?.ophanComponentName
							}
							isLabs={isLabs}
							dataTestId="card-branding-logo"
						/>
					)}
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};
