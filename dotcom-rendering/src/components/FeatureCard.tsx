import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import { ArticleDesign, type ArticleFormat } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../lib/useCommentCount';
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
import { CardAge as AgeStamp } from './Card/components/CardAge';
import { CardBranding } from './Card/components/CardBranding';
import { CardFooter } from './Card/components/CardFooter';
import { CardLink } from './Card/components/CardLink';
import { HeadlineWrapper } from './Card/components/HeadlineWrapper';
import type {
	ImagePositionType,
	ImageSizeType,
} from './Card/components/ImageWrapper';
import { type TrailTextSize } from './Card/components/TrailText';
import { CardCommentCount } from './CardCommentCount.importable';
import { CardHeadline, type ResponsiveFontSize } from './CardHeadline';
import type { AspectRatio, Loading } from './CardPicture';
import { CardPicture } from './CardPicture';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';
import { Island } from './Island';
import { MediaDuration } from './MediaDuration';
import { Snap } from './Snap';
import { SnapCssSandbox } from './SnapCssSandbox';
import type { Alignment } from './SupportingContent';
import { SupportingContent } from './SupportingContent';

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

	return (
		<AgeStamp
			webPublication={{
				date: webPublicationDate,
				isWithinTwelveHours: withinTwelveHours,
			}}
			showClock={showClock}
			isOnwardContent={false}
			absoluteServerTimes={absoluteServerTimes}
			isTagPage={false}
		/>
	);
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
					isOnwardContent={false}
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
	imageLoading,
	showClock,
	mainMedia,
	isPlayableMediaCard,
	kickerText,
	showPulsingDot,
	dataLinkName,
	branding,
	supportingContent,
	supportingContentAlignment = 'vertical',
	snapData,
	containerPalette,
	showAge = true,
	discussionApiUrl,
	discussionId,
	isDynamo,
	isOnwardContent = false,
	isExternalLink,
	showLivePlayable = false,
	onwardsSource,
	showMainVideo = true,
	absoluteServerTimes,
	isTagPage = false,
	aspectRatio,
	isFlexSplash,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;

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
				<div css={[baseCardStyles]}>
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
												roundedCorners={isOnwardContent}
												aspectRatio={aspectRatio}
											/>
										</div>
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
										backdrop-filter: blur(12px);
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
										showLivePlayable={false}
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
