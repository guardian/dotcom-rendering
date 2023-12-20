import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import {
	from,
	palette as sourcePalette,
	space,
} from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { decidePalette } from '../../lib/decidePalette';
import { getZIndex } from '../../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../../lib/useCommentCount';
import type { Branding } from '../../types/branding';
import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRSlideshowImage,
	DCRSnapType,
	DCRSupportingContent,
} from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import type { Palette } from '../../types/palette';
import { Avatar } from '../Avatar';
import { CardCommentCount } from '../CardCommentCount.importable';
import { CardHeadline } from '../CardHeadline';
import type { Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';
import { Hide } from '../Hide';
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
	headlineText: string;
	headlineSize?: SmallHeadlineSize;
	headlineSizeOnMobile?: SmallHeadlineSize;
	showQuotedHeadline?: boolean;
	byline?: string;
	showByline?: boolean;
	webPublicationDate?: string;
	imageUrl?: string;
	imageAltText?: string;
	imagePosition?: ImagePositionType;
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
	starRating?: number;
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
	onwardsSource?: string;
	pauseOffscreenVideo?: boolean;
	showMainVideo?: boolean;
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
	rating: number;
	cardHasImage: boolean;
}) => (
	<div css={starWrapper(cardHasImage)}>
		<Hide when="above" breakpoint="desktop">
			<StarRating rating={rating} size="small" breakpoint="mobile" />
		</Hide>
		<Hide when="below" breakpoint="desktop">
			<StarRating
				rating={rating}
				size={cardHasImage ? 'medium' : 'small'}
				breakpoint="wide"
			/>
		</Hide>
	</div>
);

/**
 * This functions contains the business logic that decides when the card age should be
 * shown. It uses the format of the article the card links to as well as information
 * about the container where the card sits.
 *
 */

type RenderFooter = ({
	displayLines,
}: {
	displayLines: boolean;
}) => JSX.Element;

const DecideFooter = ({
	isOpinion,
	hasSublinks,
	isOnwardContent,
	renderFooter,
}: {
	isOpinion: boolean;
	hasSublinks?: boolean;
	isOnwardContent?: boolean;
	renderFooter: RenderFooter;
}) => {
	if (isOpinion && !hasSublinks && !isOnwardContent) {
		// Opinion cards without sublinks render the entire footer, including lines,
		// outside, sitting along the very bottom of the card
		// Unless they are onwardContent cards
		return null;
	}
	// For all other cases (including opinion cards that *do* have sublinks) we
	// render a version of the footer without lines here
	return renderFooter({
		displayLines: false,
	});
};

const CommentFooter = ({
	hasSublinks,
	palette,

	renderFooter,
}: {
	hasSublinks?: boolean;
	palette: Palette;

	renderFooter: RenderFooter;
}) => {
	return hasSublinks ? (
		// For opinion cards with sublinks there is already a footer rendered inside that
		// shows the metadata. We only want to render the lines here
		<StraightLines color={palette.border.lines} count={4} />
	) : (
		// When an opinion card has no sublinks we show the entire footer, including lines
		// outside, along the entire bottom of the card
		renderFooter({
			displayLines: true,
		})
	);
};

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
	if (mainMedia && mainMedia.type === 'Video' && !!isPlayableMediaCard) {
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
	imagePosition?: ImagePositionType,
	alignment?: Alignment,
): 'inner' | 'outer' | 'none' => {
	if (!supportingContent || supportingContent.length === 0) {
		return 'none';
	}
	if (imagePosition === 'top' || imagePosition === 'bottom') {
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
	imageUrl,
	imageAltText,
	imagePosition = 'top',
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
}: Props) => {
	const palette = decidePalette(format, containerPalette);

	const hasSublinks = supportingContent && supportingContent.length > 0;
	const sublinkPosition = decideSublinkPosition(
		supportingContent,
		imagePosition,
		supportingContentAlignment,
	);

	const showQuotes = !!showQuotedHeadline;

	const isOpinion =
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter;

	const renderFooter = ({ displayLines }: { displayLines?: boolean }) => {
		if (showLivePlayable) return <></>;
		return (
			<CardFooter
				format={format}
				containerPalette={containerPalette}
				displayLines={displayLines}
				leftAlign={isOnwardContent}
				age={
					(!!onwardsSource && webPublicationDate) ||
					(showAge &&
						webPublicationDate &&
						isWithinTwelveHours(webPublicationDate)) ? (
						<CardAge
							format={format}
							containerPalette={containerPalette}
							webPublicationDate={webPublicationDate}
							showClock={showClock}
							isDynamo={isDynamo}
							isOnwardContent={isOnwardContent}
						/>
					) : undefined
				}
				commentCount={
					discussionId !== undefined ? (
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
							<Island
								priority="feature"
								defer={{ until: 'visible' }}
							>
								<CardCommentCount
									discussionApiUrl={discussionApiUrl}
									discussionId={discussionId}
									isOnwardContent={isOnwardContent}
								/>
							</Island>
						</Link>
					) : undefined
				}
				cardBranding={
					branding ? (
						<CardBranding branding={branding} format={format} />
					) : undefined
				}
			/>
		);
	};

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

	// We want to show the comment footer with lines, for opinion cards that are not onwardsContent or dynamo
	const showCommentLinesFooter = isOpinion && !isDynamo && !isOnwardContent;

	const media = getMedia({
		imageUrl,
		imageAltText,
		avatarUrl,
		isCrossword,
		slideshowImages,
		mainMedia,
		isPlayableMediaCard,
	});

	return (
		<CardWrapper
			format={format}
			showTopBar={!isOnwardContent}
			containerPalette={containerPalette}
			isDynamo={isDynamo}
			isOnwardContent={isOnwardContent}
		>
			<CardLink
				linkTo={linkTo}
				headlineText={headlineText}
				dataLinkName={dataLinkName}
				isExternalLink={isExternalLink}
			/>
			<CardLayout
				imagePosition={imagePosition}
				imagePositionOnMobile={imagePositionOnMobile}
				minWidthInPixels={minWidthInPixels}
				imageType={media?.type}
				containerType={containerType}
			>
				{media && (
					<ImageWrapper
						imageSize={imageSize}
						imageType={media.type}
						imagePosition={imagePosition}
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
								imagePosition={imagePosition}
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
												id={media.mainMedia.elementId}
												elementId={
													media.mainMedia.elementId
												}
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
								/>
								{showPlayIcon && ( mainMedia.duration > 0 &&
									<MediaDuration
										mediaDuration={mainMedia.duration}
										imagePosition={imagePosition}
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
						imagePosition={imagePosition}
					>
						<HeadlineWrapper
							imagePositionOnMobile={imagePositionOnMobile}
							imagePosition={imagePosition}
							imageUrl={imageUrl}
							hasStarRating={starRating !== undefined}
						>
							<CardHeadline
								headlineText={headlineText}
								format={format}
								containerPalette={containerPalette}
								size={headlineSize}
								sizeOnMobile={headlineSizeOnMobile}
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
								isDynamo={isDynamo}
								isExternalLink={isExternalLink}
								isOnwardContent={isOnwardContent}
							/>
							{starRating !== undefined ? (
								<StarRatingComponent
									rating={starRating}
									cardHasImage={imageUrl !== undefined}
								/>
							) : null}
							{!!mainMedia && mainMedia.type !== 'Video' && (
								<MediaMeta
									mediaType={mainMedia.type}
									hasKicker={!!kickerText}
								/>
							)}
						</HeadlineWrapper>
						{/* This div is needed to push this content to the bottom of the card */}
						<div
							style={
								isOnwardContent
									? { marginTop: `${space[4]}px` }
									: {}
							}
						>
							{!!trailText && (
								<TrailTextWrapper
									containerPalette={containerPalette}
									imagePosition={imagePosition}
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
									></LatestLinks>
								</Island>
							)}
							<DecideFooter
								isOpinion={isOpinion}
								hasSublinks={hasSublinks}
								renderFooter={renderFooter}
								isOnwardContent={isOnwardContent}
							/>
							{hasSublinks && sublinkPosition === 'inner' && (
								<SupportingContent
									supportingContent={supportingContent}
									alignment="vertical"
									containerPalette={containerPalette}
									isDynamo={isDynamo}
									parentFormat={format}
								/>
							)}
						</div>
					</ContentWrapper>
				)}
			</CardLayout>

			{hasSublinks && sublinkPosition === 'outer' && (
				<SupportingContent
					supportingContent={supportingContent}
					parentFormat={format}
					containerPalette={containerPalette}
					isDynamo={isDynamo}
					alignment={supportingContentAlignment}
				/>
			)}
			{showCommentLinesFooter && (
				<CommentFooter
					hasSublinks={hasSublinks}
					palette={palette}
					renderFooter={renderFooter}
				/>
			)}
		</CardWrapper>
	);
};
