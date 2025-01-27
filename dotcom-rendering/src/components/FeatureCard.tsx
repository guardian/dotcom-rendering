import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Link, SvgMediaControlsPlay } from '@guardian/source/react-components';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { isWithinTwelveHours, secondsToDuration } from '../lib/formatTime';
import { getZIndex } from '../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../lib/useCommentCount';
import { palette } from '../palette';
import type { StarRating as Rating } from '../types/content';
import type {
	AspectRatio,
	DCRContainerPalette,
	DCRFrontImage,
	DCRSupportingContent,
} from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import type { PodcastSeriesImage } from '../types/tag';
import { CardAge as AgeStamp } from './Card/components/CardAge';
import { CardFooter } from './Card/components/CardFooter';
import { CardLink } from './Card/components/CardLink';
import type {
	ImagePositionType,
	ImageSizeType,
} from './Card/components/ImageWrapper';
import { TrailText } from './Card/components/TrailText';
import { CardCommentCount } from './CardCommentCount.importable';
import { CardHeadline, type ResponsiveFontSize } from './CardHeadline';
import type { Loading } from './CardPicture';
import { CardPicture } from './CardPicture';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';
import { Island } from './Island';
import { Pill } from './Pill';
import { StarRating } from './StarRating/StarRating';
import { SupportingContent } from './SupportingContent';

export type Position = 'inner' | 'outer' | 'none';

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
	/** Note YouTube recommends a minimum width of 480px @see https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-youtube-player-size
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
	/** Alows the consumer to set an aspect ratio on the image of 5:3 or 5:4 */
	aspectRatio?: AspectRatio;
	showQuotes?: boolean;
	galleryCount?: number;
	podcastImage?: PodcastSeriesImage;
	audioDuration?: string;
};

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
		width: 100%;
		height: 100%;
		left: 0;
		background-color: ${palette('--card-background-hover')};
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */
	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

const contentStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
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
	justify-content: flex-start;
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

const CardAge = ({
	showClock,
	absoluteServerTimes,
	webPublicationDate,
}: {
	showClock: boolean;
	absoluteServerTimes: boolean;
	webPublicationDate?: string;
}) => {
	if (!webPublicationDate) return undefined;
	const withinTwelveHours = isWithinTwelveHours(webPublicationDate);

	if (withinTwelveHours) {
		return (
			<AgeStamp
				webPublication={{
					date: webPublicationDate,
					isWithinTwelveHours: true,
				}}
				showClock={showClock}
				absoluteServerTimes={absoluteServerTimes}
				isTagPage={false}
				colour={palette('--feature-card-footer-text')}
			/>
		);
	}
	return <></>;
};

const CommentCount = ({
	discussionId,
	linkTo,
	discussionApiUrl,
}: {
	linkTo: string;
	discussionApiUrl?: string;
	discussionId?: string;
}) => {
	if (!discussionId) return null;
	if (!discussionApiUrl) return null;

	return (
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
					colour={palette('--feature-card-footer-text')}
				/>
			</Island>
		</Link>
	);
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
	galleryCount,
	podcastImage,
	audioDuration,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;

	const isVideoMainMedia = mainMedia?.type === 'Video';
	const isVideoArticle = format.design === ArticleDesign.Video;
	const isAudioArticle = format.design === ArticleDesign.Audio;
	const isGalleryArticle = format.design === ArticleDesign.Gallery;

	const videoDuration =
		mainMedia?.type === 'Video' ? mainMedia.duration : undefined;

	const media = getMedia({
		imageUrl: image?.src,
		imageAltText: image?.altText,
		mainMedia,
		canPlayInline,
	});

	return (
		<FormatBoundary format={format}>
			<ContainerOverrides containerPalette={containerPalette}>
				<div css={[baseCardStyles, hoverStyles]}>
					<CardLink
						linkTo={linkTo}
						headlineText={headlineText}
						dataLinkName={dataLinkName}
						isExternalLink={isExternalLink}
					/>
					<div
						css={[
							css`
								display: flex;
								flex-basis: 100%;
								width: 100%;
								gap: ${space[2]}px;
								flex-direction: column;
							`,
						]}
					>
						{media && (
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
												<div css={videoPillStyles}>
													<Pill
														content={
															<time>
																{secondsToDuration(
																	videoDuration,
																)}
															</time>
														}
														icon={
															<SvgMediaControlsPlay />
														}
													/>
												</div>
											)}
									</>
								)}

								{/* This image overlay is styled when the CardLink is hovered */}
								<div className="image-overlay" />

								<div css={contentStyles}>
									{mainMedia?.type === 'Audio' &&
										!!podcastImage?.src && (
											<div
												css={
													podcastImageContainerStyles
												}
											>
												<div css={podcastImageStyles}>
													<CardPicture
														mainImage={
															podcastImage.src
														}
														imageSize="podcast"
														alt={
															podcastImage.altText ??
															''
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
										 * Without the wrapping div the headline and
										 * byline would have space inserted between
										 * them due to being direct children of the
										 * flex container
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
													trailTextSize={'regular'}
													padBottom={false}
												/>
											</div>
										)}
										<CardFooter
											format={format}
											age={
												<CardAge
													webPublicationDate={
														webPublicationDate
													}
													showClock={!!showClock}
													absoluteServerTimes={
														absoluteServerTimes
													}
												/>
											}
											commentCount={
												<CommentCount
													linkTo={linkTo}
													discussionId={discussionId}
													discussionApiUrl={
														discussionApiUrl
													}
												/>
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
											isVideo={isVideoArticle}
											isAudio={isAudioArticle}
											isGallery={isGalleryArticle}
											videoDuration={videoDuration}
											audioDuration={audioDuration}
											galleryCount={galleryCount}
										/>
									</div>
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
