import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, isUndefined } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import { isMediaCard } from '../../lib/cardHelpers';
import { getZIndex } from '../../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../../lib/useCommentCount';
import { palette as themePalette } from '../../palette';
import type { Branding } from '../../types/branding';
import type { StarRating as Rating } from '../../types/content';
import type {
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
import { CardHeadline } from '../CardHeadline';
import type { AspectRatio, Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';
import { Island } from '../Island';
import { LatestLinks } from '../LatestLinks.importable';
import { MediaDuration } from '../MediaDuration';
import { MediaMeta } from '../MediaMeta';
import { Slideshow } from '../Slideshow';
import { Snap } from '../Snap';
import { SnapCssSandbox } from '../SnapCssSandbox';
import { StarRating } from '../StarRating/StarRating';
import type { Alignment } from '../SupportingContent';
import { SupportingContent } from '../SupportingContent';
import { YoutubeBlockComponent } from '../YoutubeBlockComponent.importable';
import { AvatarContainer } from './components/AvatarContainer';
import { CardAge } from './components/CardAge';
import { CardBranding } from './components/CardBranding';
import { CardFooter } from './components/CardFooter';
import { CardLayout } from './components/CardLayout';
import { CardLink } from './components/CardLink';
import { CardWrapper } from './components/CardWrapper';
import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import type {
	ImagePositionType,
	ImageSizeType,
} from './components/ImageWrapper';
import { ImageWrapper } from './components/ImageWrapper';
import { TrailTextWrapper } from './components/TrailTextWrapper';

export type Props = {
	linkTo: string;
	format: ArticleFormat;
	absoluteServerTimes: boolean;
	headlineText: string;
	headlineSize?: SmallHeadlineSize;
	headlineSizeOnMobile?: SmallHeadlineSize;
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
	supportingContent?: DCRSupportingContent[];
	supportingContentAlignment?: Alignment;
	snapData?: DCRSnapType;
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	showAge?: boolean;
	discussionApiUrl: string;
	discussionId?: string;
	/** The first card in a dynamic package is ”Dynamo” and gets special styling */
	isDynamo?: true;
	isExternalLink: boolean;
	slideshowImages?: DCRSlideshowImage[];
	showLivePlayable?: boolean;
	onwardsSource?: OnwardsSource;
	pauseOffscreenVideo?: boolean;
	showMainVideo?: boolean;
	isTagPage?: boolean;
	//** Alows the consumer to set an aspect ratio on the image of 5:3 or 5:4 */
	aspectRatio?: AspectRatio;
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

const getMedia = ({
	imageUrl,
	imageAltText,
	avatarUrl,
	isCrossword,
	slideshowImages,
	mainMedia,
	isPlayableMediaCard,
}: {
	imageUrl?: string;
	imageAltText?: string;
	avatarUrl?: string;
	isCrossword?: boolean;
	slideshowImages?: DCRSlideshowImage[];
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
	if (slideshowImages) return { type: 'slideshow', slideshowImages } as const;
	if (avatarUrl) return { type: 'avatar', avatarUrl } as const;
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
): 'inner' | 'outer' | 'none' => {
	if (!supportingContent || supportingContent.length === 0) {
		return 'none';
	}
	if (
		imagePositionOnDesktop === 'top' ||
		imagePositionOnDesktop === 'bottom'
	) {
		return 'outer';
	}
	return alignment === 'vertical' ? 'inner' : 'outer';
};

const isWithinTwelveHours = (webPublicationDate: string): boolean => {
	const timeDiffMs = Math.abs(
		new Date().getTime() - new Date(webPublicationDate).getTime(),
	);
	const timeDiffHours = timeDiffMs / (1000 * 60 * 60);
	return timeDiffHours <= 12;
};

export const Card = ({
	linkTo,
	format,
	headlineText,
	headlineSize,
	headlineSizeOnMobile,
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
	onwardsSource,
	pauseOffscreenVideo = false,
	showMainVideo = true,
	absoluteServerTimes,
	isTagPage = false,
	aspectRatio,
}: Props) => {
	const hasSublinks = supportingContent && supportingContent.length > 0;
	const sublinkPosition = decideSublinkPosition(
		supportingContent,
		imagePositionOnDesktop,
		supportingContentAlignment,
	);

	const showQuotes = !!showQuotedHeadline;

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
				format={format}
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
		avatarUrl,
		isCrossword,
		slideshowImages,
		mainMedia,
		isPlayableMediaCard,
	});

	// For opinion type cards with avatars (which aren't onwards content)
	// we render the footer in a different location
	const showCommentFooter =
		isOpinion && !isOnwardContent && media?.type === 'avatar';

	const cardBackgroundColour = isOnwardContent
		? themePalette('--onward-content-card-background')
		: themePalette('--card-background');

	/**
	 * Some cards in standard containers have contrasting background colours.
	 * We need to add additional padding to these cards to keep the text readable.
	 */
	const hasBackgroundColour = !containerPalette && isMediaCard(format);

	return (
		<CardWrapper
			format={format}
			showTopBar={!isOnwardContent}
			containerPalette={containerPalette}
			isOnwardContent={isOnwardContent}
		>
			<CardLink
				linkTo={linkTo}
				headlineText={headlineText}
				dataLinkName={dataLinkName}
				isExternalLink={isExternalLink}
			/>
			<CardLayout
				cardBackgroundColour={cardBackgroundColour}
				imagePositionOnDesktop={imagePositionOnDesktop}
				imagePositionOnMobile={imagePositionOnMobile}
				minWidthInPixels={minWidthInPixels}
				imageType={media?.type}
				containerType={containerType}
				isOnwardContent={isOnwardContent}
				hasBackgroundColour={hasBackgroundColour}
			>
				{media && (
					<ImageWrapper
						imageSize={imageSize}
						imageType={media.type}
						imagePositionOnDesktop={imagePositionOnDesktop}
						imagePositionOnMobile={imagePositionOnMobile}
						showPlayIcon={showPlayIcon}
					>
						{media.type === 'slideshow' && (
							<Slideshow
								images={media.slideshowImages}
								imageSize={imageSize}
								isDynamo={isDynamo}
							/>
						)}
						{media.type === 'avatar' && (
							<AvatarContainer
								imageSize={imageSize}
								imagePositionOnDesktop={imagePositionOnDesktop}
							>
								<Avatar
									src={media.avatarUrl}
									alt={byline ?? ''}
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
											${getZIndex('card-nested-link')}
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
												duration={
													media.mainMedia.duration
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
												imagePositionOnMobile={
													imagePositionOnMobile
												}
												// image size defaults to small if not provided. However, if the headline size is large or greater, we want to assume the image is also large so that the play icon is correctly sized.
												imageSize={
													headlineSize === 'huge' ||
													headlineSize === 'large' ||
													headlineSize === 'ginormous'
														? 'large'
														: imageSize
												}
												enableAds={false}
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
								{showPlayIcon && mainMedia.duration > 0 && (
									<MediaDuration
										mediaDuration={mainMedia.duration}
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
						{media.type === 'crossword' && (
							<img src={media.imageUrl} alt="" />
						)}
					</ImageWrapper>
				)}

				{containerType != 'fixed/video' && (
					<ContentWrapper
						imageType={media?.type}
						imageSize={imageSize}
						imagePositionOnDesktop={imagePositionOnDesktop}
						hasBackgroundColour={hasBackgroundColour}
						isOnwardContent={isOnwardContent}
					>
						{/* This div is needed to keep the headline and trail text justified at the start */}
						<div
							css={css`
								display: flex;
								flex-direction: column;
								justify-content: flex-start;
								flex-grow: 1;
							`}
						>
							<HeadlineWrapper>
								<CardHeadline
									headlineText={headlineText}
									format={format}
									size={headlineSize}
									sizeOnMobile={headlineSizeOnMobile}
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
								/>
								{!isUndefined(starRating) ? (
									<StarRatingComponent
										rating={starRating}
										cardHasImage={!!image}
									/>
								) : null}
								{!!mainMedia && mainMedia.type !== 'Video' && (
									<MediaMeta
										mediaType={mainMedia.type}
										hasKicker={!!kickerText}
									/>
								)}
							</HeadlineWrapper>

							{!!trailText && (
								<TrailTextWrapper
									imagePositionOnDesktop={
										imagePositionOnDesktop
									}
									imageSize={imageSize}
									imageType={media?.type}
								>
									<div
										dangerouslySetInnerHTML={{
											__html: trailText,
										}}
									/>
								</TrailTextWrapper>
							)}
						</div>

						{/* This div is needed to push this content to the bottom of the card */}
						<div
							style={
								isOnwardContent
									? { marginTop: `${space[4]}px` }
									: {}
							}
						>
							{showLivePlayable && (
								<Island
									priority="feature"
									defer={{ until: 'visible' }}
								>
									<LatestLinks
										id={linkTo}
										isDynamo={isDynamo}
										direction={supportingContentAlignment}
										containerPalette={containerPalette}
										absoluteServerTimes={
											absoluteServerTimes
										}
									></LatestLinks>
								</Island>
							)}

							{!showCommentFooter && (
								<CardFooter
									format={format}
									leftAlign={isOnwardContent}
									age={decideAge()}
									commentCount={<CommentCount />}
									cardBranding={
										branding ? (
											<CardBranding
												branding={branding}
												format={format}
												onwardsSource={onwardsSource}
												containerPalette={
													containerPalette
												}
											/>
										) : undefined
									}
									showLivePlayable={showLivePlayable}
								/>
							)}

							{hasSublinks && sublinkPosition === 'inner' && (
								<SupportingContent
									supportingContent={supportingContent}
									alignment="vertical"
									containerPalette={containerPalette}
									isDynamo={isDynamo}
								/>
							)}
						</div>
					</ContentWrapper>
				)}
			</CardLayout>

			<div
				style={{
					padding:
						hasBackgroundColour || isOnwardContent
							? `0 ${space[2]}px`
							: 0,
				}}
			>
				{hasSublinks && sublinkPosition === 'outer' && (
					<SupportingContent
						supportingContent={supportingContent}
						containerPalette={containerPalette}
						alignment={supportingContentAlignment}
						isDynamo={isDynamo}
					/>
				)}

				{showCommentFooter && (
					<CardFooter
						format={format}
						leftAlign={isOnwardContent}
						age={decideAge()}
						commentCount={<CommentCount />}
						cardBranding={
							branding ? (
								<CardBranding
									branding={branding}
									format={format}
									onwardsSource={onwardsSource}
								/>
							) : undefined
						}
						showLivePlayable={showLivePlayable}
					/>
				)}
			</div>
		</CardWrapper>
	);
};
