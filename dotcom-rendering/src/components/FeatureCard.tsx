import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { Hide, SvgMediaControlsPlay } from '@guardian/source/react-components';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { secondsToDuration } from '../lib/formatTime';
import { getZIndex } from '../lib/getZIndex';
import { palette } from '../palette';
import type { StarRating as Rating } from '../types/content';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontImage,
	DCRSupportingContent,
} from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import { CardFooter } from './Card/components/CardFooter';
import { CardLink } from './Card/components/CardLink';
import type {
	ImagePositionType,
	ImageSizeType,
} from './Card/components/ImageWrapper';
import { TrailText } from './Card/components/TrailText';
import { CardHeadline, type ResponsiveFontSize } from './CardHeadline';
import type { Loading } from './CardPicture';
import { CardPicture } from './CardPicture';
import { ContainerOverrides } from './ContainerOverrides';
import { FeatureCardCardAge } from './FeatureCardCardAge';
import { FeatureCardCommentCount } from './FeatureCardCommentCount';
import { FormatBoundary } from './FormatBoundary';
import { Island } from './Island';
import { MediaDuration } from './MediaDuration';
import { Pill } from './Pill';
import { StarRating } from './StarRating/StarRating';
import { SupportingContent } from './SupportingContent';
import { WaveForm } from './WaveForm';
import { YoutubeBlockComponent } from './YoutubeBlockComponent.importable';

export type Position = 'inner' | 'outer' | 'none';

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

const hoverStyles = css`
	:hover .image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: ${palette('--card-background-hover')};
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */
	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

/** When we hover on sublinks, we want to prevent the general hover styles applying */
const sublinkHoverStyles = css`
	:has(ul.sublinks:hover) {
		.card-headline .show-underline {
			text-decoration: none;
		}
		.image-overlay {
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
		z-index: 1;
	}
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
	display: flex;
	flex-direction: column;
	text-align: start;
	gap: ${space[1]}px;
	padding: 64px ${space[2]}px ${space[2]}px;
	backdrop-filter: blur(12px) brightness(0.5);
	${overlayMaskGradientStyles('180deg')};

	/* Ensure the waveform is behind the other elements, e.g. headline, pill */
	> :not(.waveform) {
		z-index: 1;
	}
`;

const immersiveOverlayStyles = css`
	${from.tablet} {
		height: 100%;
		/**
		* Why 48px right padding?
		* 48px is to point at which the gradient can go behind the content whilst maintaining accessibility.
		*/
		padding: ${space[2]}px ${space[12]}px ${space[2]}px ${space[2]}px;
		backdrop-filter: blur(12px) brightness(0.5);
		${overlayMaskGradientStyles('270deg')}
	}
`;

const podcastImageContainerStyles = css`
	position: relative;
	/* Needs to display above of the image mask overlay */
	z-index: ${getZIndex('card-podcast-image')};
`;

const podcastImageStyles = css`
	height: 80px;
	width: 80px;
`;

const nonImmersivePodcastImageStyles = css`
	position: absolute;
	/**
	* Displays 8px above the text.
	* desired space above text (8px) - padding-top of text container (64px) = -56px
	*/
	bottom: -${space[14]}px;
	left: ${space[2]}px;
`;

const starRatingWrapper = css`
	background-color: ${palette('--star-rating-background')};
	color: ${palette('--star-rating-fill')};
	margin-top: ${space[1]}px;
	display: inline-block;
	width: fit-content;
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

const waveformStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 0;
	height: 64px;
	max-width: 100%;
	overflow: hidden;
	opacity: 0.3;
`;

const getMedia = ({
	imageUrl,
	imageAltText,
	mainMedia,
	canPlayInline,
}: {
	imageUrl?: string;
	imageAltText?: string;
	mainMedia?: MainMedia;
	canPlayInline?: boolean;
}) => {
	if (mainMedia && mainMedia.type === 'Video' && canPlayInline) {
		return {
			type: 'video',
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
		<WaveForm seed={duration} height={64} bars={bars} barWidth={2} />
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
	absoluteServerTimes: boolean;
	headlineText: string;
	headlineSizes?: ResponsiveFontSize;
	byline?: string;
	showByline?: boolean;
	webPublicationDate?: string;
	image?: DCRFrontImage;
	imagePositionOnDesktop?: ImagePositionType /** TODO Remove this prop  */;
	imagePositionOnMobile?: ImagePositionType /** TODO Remove this prop  */;
	/** Size is ignored when position = 'top' because in that case the image flows based on width */
	imageSize: ImageSizeType;
	imageLoading: Loading;
	showClock?: boolean;
	mainMedia?: MainMedia;
	trailText?: string;
	/**
	 * Note YouTube recommends a minimum width of 480px @see https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-youtube-player-size
	 * At 300px or below, the player will begin to lose functionality e.g. volume controls being omitted.
	 * Youtube requires a minimum width 200px.
	 */
	canPlayInline?: boolean;
	kickerText?: string;
	showPulsingDot?: boolean;
	starRating?: Rating;
	/** Used for Ophan tracking */
	dataLinkName?: string;
	/** Only used on Labs cards */
	// branding?: Branding;
	/** Supporting content refers to sublinks */
	supportingContent?: DCRSupportingContent[];
	containerPalette?: DCRContainerPalette;
	discussionApiUrl: string;
	discussionId?: string;
	isExternalLink: boolean;
	/** Alows the consumer to set an aspect ratio on the image */
	aspectRatio?: AspectRatio;
	/** Alows the consumer to set an aspect ratio on the image specifically on mobile breakpoints */
	mobileAspectRatio?: AspectRatio;
	showQuotes?: boolean;
	/**
	 * Youtube video requires a unique ID. We append the collectionId to the youtube asset ID, to allow
	 * same video to be on the page multiple times, as long as they are in different collections.
	 * The highlights container above the header is 0, the first container below the header is 1, etc.
	 */
	collectionId: number;
	isNewsletter?: boolean;
	/**
	 * An immersive feature card variant. It dictates that the card has a full width background image on
	 * all breakpoints. It also dictates the the card change aspect ratio to 5:3 on desktop and 4:5 on mobile.
	 */
	isImmersive?: boolean;
	showVideo?: boolean;
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
	imagePositionOnDesktop = 'top',
	imagePositionOnMobile = 'left',
	imageSize,
	trailText,
	imageLoading,
	showClock,
	mainMedia,
	canPlayInline,
	kickerText,
	showPulsingDot,
	dataLinkName,
	// branding,
	supportingContent,
	containerPalette,
	discussionApiUrl,
	discussionId,
	isExternalLink,
	absoluteServerTimes,
	aspectRatio,
	mobileAspectRatio,
	starRating,
	showQuotes,
	collectionId,
	isNewsletter = false,
	isImmersive = false,
	showVideo = false,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;

	const isVideoMainMedia = mainMedia?.type === 'Video';
	const isVideoArticle = format.design === ArticleDesign.Video;

	const videoDuration =
		mainMedia?.type === 'Video' ? mainMedia.duration : undefined;

	const media = getMedia({
		imageUrl: image?.src,
		imageAltText: image?.altText,
		mainMedia,
		canPlayInline,
	});

	const showYoutubeVideo =
		canPlayInline && showVideo && mainMedia?.type === 'Video';

	const showCardAge =
		webPublicationDate !== undefined && showClock !== undefined;

	const showCommentCount = discussionId !== undefined;

	return (
		<FormatBoundary format={format}>
			<ContainerOverrides containerPalette={containerPalette}>
				<div css={[baseCardStyles, hoverStyles, sublinkHoverStyles]}>
					{!showYoutubeVideo && (
						<CardLink
							linkTo={linkTo}
							headlineText={headlineText}
							dataLinkName={dataLinkName}
							isExternalLink={isExternalLink}
						/>
					)}
					<div css={contentStyles}>
						{showYoutubeVideo && (
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
										id={mainMedia.id}
										assetId={mainMedia.videoId}
										index={collectionId}
										expired={mainMedia.expired}
										format={format}
										stickyVideos={false}
										enableAds={false}
										duration={mainMedia.duration}
										posterImage={mainMedia.image}
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
										isVideoArticle={isVideoArticle}
										showTextOverlay={false}
										hidePillOnMobile={false}
										iconSizeOnDesktop="large"
										iconSizeOnMobile="large"
										headlineSizes={headlineSizes}
										webPublicationDate={webPublicationDate}
										showClock={!!showClock}
										absoluteServerTimes={
											absoluteServerTimes
										}
										linkTo={linkTo}
										discussionId={discussionId}
										discussionApiUrl={discussionApiUrl}
										isFeatureCard={true}
										isImmersive={isImmersive}
										byline={byline}
										showByline={showByline}
									/>
								</Island>
							</div>
						)}
						{!showYoutubeVideo && media && (
							<div
								css={css`
									position: relative;
									background-color: ${palette(
										'--feature-card-background',
									)};
								`}
							>
								{media.type === 'video' && (
									<div>
										<CardPicture
											mainImage={
												media.mainMedia.image ?? ''
											}
											imageSize={imageSize}
											alt={headlineText}
											loading={imageLoading}
											aspectRatio={aspectRatio}
											mobileAspectRatio={
												mobileAspectRatio
											}
										/>
									</div>
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
										{isVideoMainMedia &&
											mainMedia.duration > 0 && (
												<MediaDuration
													mediaDuration={
														mainMedia.duration
													}
													imagePositionOnDesktop={
														imagePositionOnDesktop
													}
													imagePositionOnMobile={
														imagePositionOnMobile
													}
												/>
											)}
									</>
								)}

								{/* This image overlay is styled when the CardLink is hovered */}
								<div className="image-overlay" />

								<div
									css={[
										overlayContainerStyles,
										isImmersive &&
											immersiveOverlayContainerStyles,
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
											overlayStyles,
											isImmersive &&
												immersiveOverlayStyles,
										]}
									>
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
											/>
										</div>

										{starRating !== undefined ? (
											<div css={starRatingWrapper}>
												<StarRating
													rating={starRating}
													size="small"
												/>
											</div>
										) : null}

										{!!trailText && (
											<div css={trailTextWrapper}>
												<TrailText
													trailText={trailText}
													trailTextColour={palette(
														'--feature-card-trail-text',
													)}
													trailTextSize="regular"
													padBottom={false}
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
														absoluteServerTimes={
															absoluteServerTimes
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
											/**TODO: Determine if this is needed */
											// cardBranding={
											// 	branding ? (
											// 		<CardBranding
											// 			branding={branding}
											// 			format={format}
											// 			onwardsSource={
											// 				onwardsSource
											// 			}
											// 			containerPalette={
											// 				containerPalette
											// 			}
											// 		/>
											// 	) : undefined
											// }
											showLivePlayable={false}
											mainMedia={mainMedia}
											isNewsletter={isNewsletter}
										/>

										{!isImmersive &&
											mainMedia?.type === 'Audio' &&
											renderWaveform(
												mainMedia.duration,
												233,
											)}
									</div>
									{/* On video article cards, the duration is displayed in the footer */}
									{!isVideoArticle &&
									isVideoMainMedia &&
									videoDuration !== undefined ? (
										<div css={videoPillStyles}>
											<Pill
												content={
													<time>
														{secondsToDuration(
															videoDuration,
														)}
													</time>
												}
												icon={<SvgMediaControlsPlay />}
											/>
										</div>
									) : null}
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
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};
