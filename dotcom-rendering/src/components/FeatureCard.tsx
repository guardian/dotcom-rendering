import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { SvgMediaControlsPlay } from '@guardian/source/react-components';
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

const contentStyles = css`
	display: flex;
	flex-basis: 100%;
	width: 100%;
	gap: ${space[2]}px;
	flex-direction: column;
`;

/**
 * Image mask gradient has additional colour stops to emulate a non-linear
 * ease in / ease out curve to make the transition smoother. Values were
 * generated with https://non-boring-gradients.netlify.app and manually
 * optimised. (Opacity values have been rounded and the number of colour stops
 * reduced.) The following article has more detail on non-linear gradients:
 * https://css-tricks.com/easing-linear-gradients/
 */
const overlayStyles = css`
	display: flex;
	flex-direction: column;
	text-align: start;
	gap: ${space[1]}px;
	padding: 64px ${space[2]}px ${space[2]}px;
	mask-image: linear-gradient(
		180deg,
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
	backdrop-filter: blur(12px) brightness(0.5);

	/* Ensure the waveform is behind the other elements, e.g. headline, pill */
	> * {
		z-index: 1;
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
			...(imageUrl && { imageUrl }),
		} as const;
	}

	if (imageUrl) {
		return { type: 'picture', imageUrl, imageAltText } as const;
	}

	return undefined;
};

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
	imageSize?: ImageSizeType;
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
	isCartoon?: boolean;
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
	/** Alows the consumer to set an aspect ratio on the image of 5:3 or 5:4 */
	aspectRatio?: AspectRatio;
	showQuotes?: boolean;
	/**
	 * Youtube video requires a unique ID. We append the collectionId to the youtube asset ID, to allow
	 * same video to be on the page multiple times, as long as they are in different collections.
	 * The highlights container above the header is 0, the first container below the header is 1, etc.
	 */
	collectionId: number;
	isNewsletter?: boolean;
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
	imageSize = 'small',
	trailText,
	imageLoading,
	showClock,
	mainMedia,
	canPlayInline,
	isCartoon,
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
	starRating,
	showQuotes,
	collectionId,
	isNewsletter = false,
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

	const showYoutubeVideo = canPlayInline && mainMedia?.type === 'Video';

	const showCardAge =
		webPublicationDate !== undefined && showClock !== undefined;

	const showCommentCount = discussionId !== undefined;

	return (
		<FormatBoundary format={format}>
			<ContainerOverrides containerPalette={containerPalette}>
				<div css={[baseCardStyles, hoverStyles]}>
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
										posterImage={mainMedia.images}
										overrideImage={media?.imageUrl}
										width={300}
										height={375}
										origin="The Guardian"
										mediaTitle={headlineText}
										isMainMedia={true}
										hideCaption={true}
										pauseOffscreenVideo={true}
										aspectRatio={aspectRatio}
										altText={headlineText}
										kickerText={kickerText}
										trailText={
											showByline ? trailText : undefined
										}
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
											roundedCorners={false}
											aspectRatio={aspectRatio}
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
											roundedCorners={false}
											aspectRatio={aspectRatio}
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
									css={css`
										position: absolute;
										bottom: 0;
										left: 0;
										width: 100%;
									`}
								>
									{mainMedia?.type === 'Audio' &&
										!!mainMedia.podcastImage?.src && (
											<div
												css={
													podcastImageContainerStyles
												}
											>
												<div css={podcastImageStyles}>
													<CardPicture
														mainImage={
															mainMedia
																.podcastImage
																.src
														}
														imageSize="podcast"
														alt={
															mainMedia
																.podcastImage
																.altText ?? ''
														}
														loading="lazy"
														roundedCorners={false}
														aspectRatio="1:1"
													/>
												</div>
											</div>
										)}
									<div css={overlayStyles}>
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
												isBetaContainer={true}
												isCartoon={isCartoon}
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

										{mainMedia?.type === 'Audio' && (
											<div css={waveformStyles}>
												<WaveForm
													seed={mainMedia.duration}
													height={64}
													// Just enough to cover the full width of the feature card in it's largest form
													bars={233}
													barWidth={2}
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
