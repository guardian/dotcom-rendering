import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { brandAltBackground, space } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import type { Branding } from '../../../types/branding';
import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRSnapType,
	DCRSupportingContent,
} from '../../../types/front';
import type { Palette } from '../../../types/palette';
import { decidePalette } from '../../lib/decidePalette';
import { getZIndex } from '../../lib/getZIndex';
import { Avatar } from '../Avatar';
import { CardHeadline } from '../CardHeadline';
import { FrontPicture } from '../FrontPicture';
import { Hide } from '../Hide';
import { MediaMeta } from '../MediaMeta';
import { Snap } from '../Snap';
import { StarRating } from '../StarRating/StarRating';
import { SupportingContent } from '../SupportingContent';
import { AvatarContainer } from './components/AvatarContainer';
import { CardAge } from './components/CardAge';
import { CardBranding } from './components/CardBranding';
import { CardFooter } from './components/CardFooter';
import { CardLayout } from './components/CardLayout';
import { CardLink } from './components/CardLink';
import { CardWrapper } from './components/CardWrapper';
import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { ImageWrapper } from './components/ImageWrapper';
import { TrailTextWrapper } from './components/TrailTextWrapper';

export type Props = {
	linkTo: string;
	format: ArticleFormat;
	headlineText: string;
	headlineSize?: SmallHeadlineSize;
	headlineSizeOnMobile?: SmallHeadlineSize;
	/** Even with design !== Comment, a piece can be opinion */
	showQuotes?: boolean;
	byline?: string;
	showByline?: boolean;
	webPublicationDate?: string;
	imageUrl?: string;
	imagePosition?: ImagePositionType;
	imagePositionOnMobile?: ImagePositionType;
	/** Size is ignored when position = 'top' because in that case the image flows based on width */
	imageSize?: ImageSizeType;
	trailText?: string;
	avatarUrl?: string;
	showClock?: boolean;
	mediaType?: MediaType;
	mediaDuration?: number;
	kickerText?: string;
	showPulsingDot?: boolean;
	/** Sometimes kickers and headlines are separated by a slash */
	showSlash?: boolean;
	starRating?: number;
	minWidthInPixels?: number;
	/** Used for Ophan tracking */
	dataLinkName?: string;
	/** Only used on Labs cards */
	branding?: Branding;
	supportingContent?: DCRSupportingContent[];
	snapData?: DCRSnapType;
	containerPalette?: DCRContainerPalette;
	containerType?: DCRContainerType;
	showAge?: boolean;
	discussionId?: string;
	/** The first card in a dynamic package is ”Dynamo” and gets special styling */
	isDynamo?: true;
};

const StarRatingComponent = ({ rating }: { rating: number }) => (
	<div
		css={css`
			background-color: ${brandAltBackground.primary};
			margin-top: ${space[1]}px;
			display: inline-block;
		`}
	>
		<Hide when="above" breakpoint="desktop">
			<StarRating rating={rating} size="small" />
		</Hide>
		<Hide when="below" breakpoint="desktop">
			<StarRating rating={rating} size="medium" />
		</Hide>
	</div>
);

/**
 * This functions contains the business logic that decides when the card age should be
 * shown. It uses the format of the article the card links to as well as information
 * about the container where the card sits.
 *
 */
const decideIfAgeShouldShow = ({
	containerPalette,
	format,
	showAge,
}: {
	containerPalette?: DCRContainerPalette;
	format: ArticleFormat;
	showAge: boolean;
}): boolean => {
	// Some containers force all cards to show age. E.g., The articles in the headlines
	// container are typically very recent so we want to display age there
	if (showAge) return true;
	// Palettes are time sensitive so show age if one is being used
	if (containerPalette) return true;
	// Liveblogs are evidently time sensitive
	if (format.design === ArticleDesign.LiveBlog) return true;
	// Otherwise, do not show the article age on the Card
	return false;
};

const DecideFooter = ({
	isOpinion,
	hasSublinks,
	displayAge,
	renderFooter,
}: {
	isOpinion: boolean;
	hasSublinks?: boolean;
	displayAge: boolean;
	renderFooter: Function;
}) => {
	if (isOpinion && !hasSublinks) {
		// Opinion cards without sublinks render the entire footer, including lines,
		// outside, sitting along the very bottom of the card
		return null;
	}
	// For all other cases (including opinion cards that *do* have sublinks) we
	// render a version of the footer without lines here
	return renderFooter({
		displayAge,
		displayLines: false,
	});
	// Note. Opinion cards always show the lines at the botom of the card (in CommentFooter)
};

const CommentFooter = ({
	hasSublinks,
	palette,
	displayAge,
	renderFooter,
}: {
	hasSublinks?: boolean;
	palette: Palette;
	displayAge: boolean;
	renderFooter: Function;
}) => {
	return hasSublinks ? (
		// For opinion cards with sublinks there is already a footer rendered inside that
		// shows the metadata. We only want to render the lines here
		<StraightLines color={palette.border.lines} count={4} />
	) : (
		// When an opinion card has no sublinks we show the entire footer, including lines
		// outside, along the entire bottom of the card
		renderFooter({
			displayAge,
			displayLines: true,
		})
	);
};

const getImage = ({
	imageUrl,
	avatarUrl,
}: {
	imageUrl?: string;
	avatarUrl?: string;
}): { type: CardImageType; src: string } | undefined => {
	if (avatarUrl) return { type: 'avatar', src: avatarUrl };
	if (imageUrl) return { type: 'mainMedia', src: imageUrl };
	return undefined;
};

export const Card = ({
	linkTo,
	format,
	headlineText,
	headlineSize,
	headlineSizeOnMobile,
	showQuotes,
	byline,
	showByline,
	webPublicationDate,
	imageUrl,
	imagePosition = 'top',
	imagePositionOnMobile = 'left',
	imageSize = 'small',
	trailText,
	avatarUrl,
	showClock,
	mediaType,
	mediaDuration,
	kickerText,
	showPulsingDot,
	showSlash,
	starRating,
	minWidthInPixels,
	dataLinkName,
	branding,
	supportingContent,
	snapData,
	containerPalette,
	containerType,
	showAge = false,
	discussionId,
	isDynamo,
}: Props) => {
	const palette = decidePalette(format, containerPalette);

	const hasSublinks = supportingContent && supportingContent.length > 0;
	const noOfSublinks = supportingContent?.length ?? 0;

	const isOpinion =
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter;

	const renderFooter = ({
		displayAge,
		displayLines,
	}: {
		displayAge?: boolean;
		displayLines?: boolean;
	}) => {
		return (
			<CardFooter
				format={format}
				containerPalette={containerPalette}
				displayLines={displayLines}
				age={
					displayAge && webPublicationDate ? (
						<CardAge
							format={format}
							containerPalette={containerPalette}
							webPublicationDate={webPublicationDate}
							showClock={showClock}
							isDynamo={isDynamo}
						/>
					) : undefined
				}
				commentCount={
					discussionId ? (
						<Link
							// This a tag is initially rendered empty. It gets populated later
							// after a fetch call is made to get all the counts for each Card
							// on the page with a discussion (see FetchCommentCounts.tsx)
							data-name="comment-count-marker"
							data-discussion-id={discussionId}
							data-format={JSON.stringify(format)}
							data-is-dynamo={isDynamo ? 'true' : undefined}
							data-container-palette={containerPalette}
							data-ignore="global-link-styling"
							data-link-name="Comment count"
							href={`${linkTo}#comments`}
							subdued={true}
							cssOverrides={css`
								/* See: https://css-tricks.com/nested-links/ */
								${getZIndex('card-nested-link')}
								/* The following styles turn off those provided by Link */
								color: inherit;
								/* stylelint-disable-next-line property-disallowed-list */
								font-family: inherit;
								font-size: inherit;
								line-height: inherit;
							`}
						/>
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

	const displayAge = decideIfAgeShouldShow({
		containerPalette,
		format,
		showAge,
	});

	if (snapData?.embedHtml) {
		return <Snap snapData={snapData} />;
	}

	const image = getImage({
		imageUrl,
		avatarUrl,
	});

	return (
		<CardWrapper
			format={format}
			containerPalette={containerPalette}
			containerType={containerType}
			isDynamo={isDynamo}
		>
			<CardLink
				linkTo={linkTo}
				headlineText={headlineText}
				dataLinkName={dataLinkName}
			/>
			<CardLayout
				imagePosition={imagePosition}
				imagePositionOnMobile={imagePositionOnMobile}
				minWidthInPixels={minWidthInPixels}
				imageType={image?.type}
			>
				{image && (
					<ImageWrapper
						imageSize={imageSize}
						imageType={image.type}
						imagePosition={imagePosition}
						imagePositionOnMobile={imagePositionOnMobile}
					>
						{image.type === 'avatar' ? (
							<AvatarContainer
								imageSize={imageSize}
								imagePosition={imagePosition}
							>
								<Avatar
									imageSrc={image.src}
									imageAlt={byline ?? ''}
									containerPalette={containerPalette}
									format={format}
								/>
							</AvatarContainer>
						) : (
							<FrontPicture
								master={image.src}
								imageSize={imageSize}
								alt=""
							/>
						)}
					</ImageWrapper>
				)}
				<ContentWrapper
					imageType={image?.type}
					imageSize={imageSize}
					imagePosition={imagePosition}
				>
					<HeadlineWrapper>
						<CardHeadline
							headlineText={headlineText}
							format={format}
							containerPalette={containerPalette}
							size={headlineSize}
							sizeOnMobile={headlineSizeOnMobile}
							showQuotes={showQuotes}
							kickerText={
								format.design === ArticleDesign.LiveBlog
									? 'Live'
									: kickerText
							}
							showPulsingDot={
								format.design === ArticleDesign.LiveBlog ||
								showPulsingDot
							}
							showSlash={
								format.design === ArticleDesign.LiveBlog ||
								showSlash
							}
							byline={byline}
							showByline={showByline}
							isDynamo={isDynamo}
						/>
						{starRating !== undefined ? (
							<StarRatingComponent rating={starRating} />
						) : null}
						{(format.design === ArticleDesign.Gallery ||
							format.design === ArticleDesign.Audio ||
							format.design === ArticleDesign.Video) &&
						mediaType ? (
							<MediaMeta
								containerPalette={containerPalette}
								format={format}
								mediaType={mediaType}
								mediaDuration={mediaDuration}
							/>
						) : undefined}
					</HeadlineWrapper>
					{/* This div is needed to push this content to the bottom of the card */}
					<div>
						{!!trailText && (
							<TrailTextWrapper
								containerPalette={containerPalette}
								format={format}
							>
								<div
									dangerouslySetInnerHTML={{
										__html: trailText,
									}}
								/>
							</TrailTextWrapper>
						)}
						<DecideFooter
							isOpinion={isOpinion}
							hasSublinks={hasSublinks}
							displayAge={displayAge}
							renderFooter={renderFooter}
						/>

						{hasSublinks && noOfSublinks <= 2 ? (
							<SupportingContent
								supportingContent={supportingContent}
								alignment="vertical"
							/>
						) : (
							<></>
						)}
					</div>
				</ContentWrapper>
			</CardLayout>
			{hasSublinks && noOfSublinks > 2 ? (
				<SupportingContent
					supportingContent={supportingContent}
					alignment={
						imagePosition === 'top' ||
						imagePosition === 'bottom' ||
						imageUrl === undefined
							? 'vertical'
							: 'horizontal'
					}
				/>
			) : (
				<></>
			)}
			{isOpinion && (
				<CommentFooter
					hasSublinks={hasSublinks}
					displayAge={displayAge}
					palette={palette}
					renderFooter={renderFooter}
				/>
			)}
		</CardWrapper>
	);
};
