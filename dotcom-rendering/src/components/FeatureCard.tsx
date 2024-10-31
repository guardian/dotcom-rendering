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
	DCRSnapType,
	DCRSupportingContent,
} from '../types/front';
import type { MainMedia } from '../types/mainMedia';
import { isWithinTwelveHours, StarRatingComponent } from './Card/Card';
import { CardAge as AgeStamp } from './Card/components/CardAge';
import { CardFooter } from './Card/components/CardFooter';
import { CardLink } from './Card/components/CardLink';
import type {
	ImagePositionType,
	ImageSizeType,
} from './Card/components/ImageWrapper';
import { CardCommentCount } from './CardCommentCount.importable';
import { CardHeadline, type ResponsiveFontSize } from './CardHeadline';
import type { AspectRatio, Loading } from './CardPicture';
import { CardPicture } from './CardPicture';
import { ContainerOverrides } from './ContainerOverrides';
import { FormatBoundary } from './FormatBoundary';
import { Island } from './Island';
import { MediaDuration } from './MediaDuration';
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
	snapData?: DCRSnapType;
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	discussionApiUrl: string;
	discussionId?: string;
	isExternalLink: boolean;
	/** Alows the consumer to set an aspect ratio on the image of 5:3 or 5:4 */
	aspectRatio?: AspectRatio;
	index?: number;
};

const baseCardStyles = css`
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

const overlayStyles = css`
	position: absolute;
	width: 100%;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	flex-grow: 1;
	padding: 8px;
	backdrop-filter: blur(12px);
	row-gap: 8px;
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
	containerPalette,
	discussionApiUrl,
	discussionId,
	isExternalLink,
	absoluteServerTimes,
	aspectRatio,
	starRating,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;

	/**TODO: Check if feaure cards should be playable */
	// If the card isn't playable, we need to show a play icon.
	// Otherwise, this is handled by the YoutubeAtom
	const showPlayIcon = mainMedia?.type === 'Video' && !isPlayableMediaCard;

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
								flex-direction: column;
							`,
						]}
					>
						{media && (
							<div
								css={css`
									//** check if these styles are needed  */

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
												roundedCorners={false}
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
											roundedCorners={false}
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
								<div css={overlayStyles}>
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
									{starRating !== undefined ? (
										<StarRatingComponent
											rating={starRating}
											cardHasImage={!!image}
										/>
									) : null}
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
										/**TODO: check if this is needed */
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
									/>
								</div>
							</div>
						)}
					</div>

					{hasSublinks && (
						<SupportingContent
							supportingContent={supportingContent}
							containerPalette={containerPalette}
							alignment={'vertical'}
							fillBackground={true}
						/>
					)}
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};
