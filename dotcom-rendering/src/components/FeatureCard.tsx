import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { palette as sourcePalette } from '@guardian/source/foundations';
import { isMediaCard } from '../lib/cardHelpers';
import { getZIndex } from '../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../lib/useCommentCount';
import { palette } from '../palette';
import type { Branding } from '../types/branding';
import type { StarRating as Rating } from '../types/content';
import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontImage,
	DCRSlideshowImage,
	DCRSnapType,
	DCRSupportingContent,
} from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import type { OnwardsSource } from '../types/onwards';
import { Avatar } from './Avatar';
import { AvatarContainer } from './Card/components/AvatarContainer';
import { CardAge } from './Card/components/CardAge';
import { CardBranding } from './Card/components/CardBranding';
import { CardFooter } from './Card/components/CardFooter';
import { CardLayout, type GapSize } from './Card/components/CardLayout';
import { CardLink } from './Card/components/CardLink';
import { CardWrapper } from './Card/components/CardWrapper';
import { ContentWrapper } from './Card/components/ContentWrapper';
import { HeadlineWrapper } from './Card/components/HeadlineWrapper';
import type {
	ImagePositionType,
	ImageSizeType,
} from './Card/components/ImageWrapper';
import { ImageWrapper } from './Card/components/ImageWrapper';
import { type TrailTextSize } from './Card/components/TrailText';
import { CardCommentCount } from './CardCommentCount.importable';
import { CardHeadline, type ResponsiveFontSize } from './CardHeadline';
import type { AspectRatio, Loading } from './CardPicture';
import { CardPicture } from './CardPicture';
import { Island } from './Island';
import { LatestLinks } from './LatestLinks.importable';
import { MediaDuration } from './MediaDuration';
import { Slideshow } from './Slideshow';
import { Snap } from './Snap';
import { SnapCssSandbox } from './SnapCssSandbox';
import type { Alignment } from './SupportingContent';
import { SupportingContent } from './SupportingContent';
import { YoutubeBlockComponent } from './YoutubeBlockComponent.importable';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';

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
	isOnwardContent?: boolean;
	trailText?: string;
	avatarUrl?: string;
	showClock?: boolean;
	mainMedia?: MainMedia;
	/** Note YouTube recommends a minimum width of 480px @see https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-youtube-player-size
	 * At 300px or below, the player will begin to lose functionality e.g. volume controls being omitted.
	 * Youtube requires a minimum width 200px.
	 */
	isPlayableMediaCard?: boolean;
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
	/** Alows the consumer to set an aspect ratio on the image of 5:3 or 5:4 */
	aspectRatio?: AspectRatio;
	index?: number;
	/** The Splash card in a flexible container gets a different visual treatment to other cards*/
	isFlexSplash?: boolean;
	showTopBarDesktop?: boolean;
	showTopBarMobile?: boolean;
	trailTextSize?: TrailTextSize;
	/** If specified, overrides trail text colour */
	trailTextColour?: string;
	cardType: 'static' | 'carousel';
};

// const starWrapper = (cardHasImage: boolean) => css`
// 	background-color: ${sourcePalette.brandAlt[400]};
// 	color: ${sourcePalette.neutral[0]};
// 	margin-top: ${cardHasImage ? '2' : space[1]}px;
// 	display: inline-block;

// 	${from.tablet} {
// 		margin-top: ${space[1]}px;
// 	}
// `;

// const StarRatingComponent = ({
// 	rating,
// 	cardHasImage,
// }: {
// 	rating: Rating;
// 	cardHasImage: boolean;
// }) => (
// 	<div css={starWrapper(cardHasImage)}>
// 		<StarRating rating={rating} size="small" />
// 	</div>
// );

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
		background-color: ${sourcePalette.neutral[7]};
		opacity: 0.1;
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
	}
`;

const desktopTopBarStyles = css`
	:before {
		border-top: 1px solid ${palette('--card-border-top')};
		content: '';
		z-index: 2;
		width: 100%;
		padding-bottom: ${space[2]}px;
		background-color: unset;
	}
`;

const mobileTopBarStyles = css`
	${until.tablet} {
		${desktopTopBarStyles}
	}
`;

const getMedia = ({
	imageUrl,
	imageAltText,
	mainMedia,
	isPlayableMediaCard,
}: {
	imageUrl?: string;
	imageAltText?: string;
	mainMedia?: MainMedia;
	isPlayableMediaCard?: boolean;
}) => {
	if (mainMedia && mainMedia.type === 'Video' && isPlayableMediaCard) {
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

export const isWithinTwelveHours = (webPublicationDate: string): boolean => {
	const timeDiffMs = Math.abs(
		new Date().getTime() - new Date(webPublicationDate).getTime(),
	);
	const timeDiffHours = timeDiffMs / (1000 * 60 * 60);
	return timeDiffHours <= 12;
};

// const getCardWidth = (type: 'static' | 'carousel') => {
// 	if (type === 'static') {
// 		return css`
// 			width: 325;
// 			${from.tablet} {
// 				width: 337;
// 			}
// 			${from.desktop} {
// 				width: 460;
// 			}
// 		`;
// 	}
// 	return css`
// 		width: 325;
// 		${from.tablet} {
// 			width: 220;
// 		}
// 		${from.desktop} {
// 			width: 300;
// 		}
// 	`;
// };

export const FeatureCard = ({
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
	isPlayableMediaCard,
	kickerText,
	showPulsingDot,
	starRating,
	minWidthInPixels,
	dataLinkName,
	branding,
	supportingContent,
	supportingContentAlignment = 'vertical',
	snapData,
	containerPalette,
	containerType,
	showAge = true,
	discussionApiUrl,
	discussionId,
	isDynamo,
	isCrossword,
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
	showTopBarMobile = false,
	cardType,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;

	// const showQuotes = !!showQuotedHeadline;

	const isOpinion =
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter;

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
				isOnwardContent={isOnwardContent}
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
					${getZIndex('card-nested-link')}
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
						isOnwardContent={isOnwardContent}
					/>
				</Island>
			</Link>
		);

	if (snapData?.embedHtml) {
		return (
			<SnapCssSandbox snapData={snapData}>
				<Snap snapData={snapData} dataLinkName={dataLinkName} />
			</SnapCssSandbox>
		);
	}

	// If the card isn't playable, we need to show a play icon.
	// Otherwise, this is handled by the YoutubeAtom
	const showPlayIcon =
		mainMedia?.type === 'Video' && !isPlayableMediaCard && showMainVideo;

	const media = getMedia({
		imageUrl: image?.src,
		imageAltText: image?.altText,
		mainMedia,
		isPlayableMediaCard,
	});

	return (
		<FormatBoundary format={format}>
			<ContainerOverrides containerPalette={containerPalette}>
				<div
					css={[
						baseCardStyles,
						hoverStyles,
						sublinkHoverStyles,
						showTopBarDesktop && desktopTopBarStyles,
						showTopBarMobile && mobileTopBarStyles,
					]}
				>
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
									/* position relative is required here to bound the image overlay */
									position: relative;
									img {
										width: 100%;
										display: block;
									}
								`}
							>
								{media.type === 'video' && (
									<>
										{showMainVideo ? (
											<div
												data-chromatic="ignore"
												data-component="youtube-atom"
												css={css`
													display: block;
													position: relative;
													${getZIndex(
														'card-nested-link',
													)}
												`}
											>
												<Island
													priority="critical"
													defer={{ until: 'visible' }}
												>
													<YoutubeBlockComponent
														id={media.mainMedia.id}
														assetId={
															media.mainMedia
																.videoId
														}
														index={index}
														duration={
															media.mainMedia
																.duration
														}
														posterImage={
															media.mainMedia
																.images
														}
														overrideImage={
															media.imageUrl
														}
														width={
															media.mainMedia
																.width
														}
														height={
															media.mainMedia
																.height
														}
														origin={
															media.mainMedia
																.origin
														}
														mediaTitle={
															headlineText
														}
														expired={
															media.mainMedia
																.expired
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
														imagePositionOnMobile={
															imagePositionOnMobile
														}
														//** TODO: IMPROVE THIS MAPPING */
														// image size defaults to small if not provided. However, if the headline size is large or greater, we want to assume the image is also large so that the play icon is correctly sized.
														imageSize={
															[
																'small',
																'medium',
																'large',
																'xlarge',
																'xxlarge',
															].includes(
																headlineSizes?.desktop ??
																	'',
															)
																? 'large'
																: imageSize
														}
														enableAds={false}
														aspectRatio={
															aspectRatio
														}
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
																	(
																		prev,
																		current,
																	) =>
																		prev.width >
																		current.width
																			? prev
																			: current,
															  ).url
													}
													imageSize={imageSize}
													alt={headlineText}
													loading={imageLoading}
													roundedCorners={
														isOnwardContent
													}
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
										{showPlayIcon &&
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
								<div
									css={css`
										position: absolute;
										bottom: 0;
										display: flex;
										flex-direction: column;
										justify-content: flex-start;
										flex-grow: 1;
										padding: 8px;
										/* filter: blur(12px); */
									`}
								>
									<HeadlineWrapper>
										<CardHeadline
											headlineText={headlineText}
											format={format}
											fontSizes={headlineSizes}
											showQuotes={false}
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
										/>
									</HeadlineWrapper>

									<CardFooter
										format={format}
										age={decideAge()}
										commentCount={<CommentCount />}
										cardBranding={
											branding ? (
												<CardBranding
													branding={branding}
													format={format}
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
								</div>
							</div>
						)}
					</div>

					{hasSublinks && (
						<SupportingContent
							supportingContent={supportingContent}
							containerPalette={containerPalette}
							alignment={supportingContentAlignment}
							isDynamo={isDynamo}
							isFlexSplash={isFlexSplash}
						/>
					)}
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};
