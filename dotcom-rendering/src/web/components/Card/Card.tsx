import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import { brandAltBackground } from '@guardian/source-foundations';
import { Link } from '@guardian/source-react-components';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import { decidePalette } from '../../lib/decidePalette';
import { getZIndex } from '../../lib/getZIndex';
import { Avatar } from '../Avatar';
import { CardHeadline } from '../CardHeadline';
import { Flex } from '../Flex';
import { Hide } from '../Hide';
import { MediaMeta } from '../MediaMeta';
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
	showQuotes?: boolean; // Even with design !== Comment, a piece can be opinion
	byline?: string;
	showByline?: boolean;
	webPublicationDate?: string;
	imageUrl?: string;
	imagePosition?: ImagePositionType;
	imagePositionOnMobile?: ImagePositionType;
	imageSize?: ImageSizeType; // Size is ignored when position = 'top' because in that case the image flows based on width
	trailText?: string;
	avatar?: AvatarType;
	showClock?: boolean;
	mediaType?: MediaType;
	mediaDuration?: number;
	// Kicker
	kickerText?: string;
	showPulsingDot?: boolean;
	showSlash?: boolean;
	starRating?: number;
	minWidthInPixels?: number;
	/** Used for Ophan tracking */
	dataLinkName?: string;
	// Labs
	branding?: Branding;
	supportingContent?: DCRSupportingContent[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	discussionId?: string;
};

const starWrapper = css`
	background-color: ${brandAltBackground.primary};
	position: absolute;
	bottom: 0;
	margin-top: 2px;
`;

const StarRatingComponent: React.FC<{ rating: number }> = ({ rating }) => (
	<>
		<Hide when="above" breakpoint="desktop">
			<div css={starWrapper}>
				<StarRating rating={rating} size="small" />
			</div>
		</Hide>
		<Hide when="below" breakpoint="desktop">
			<div css={starWrapper}>
				<StarRating rating={rating} size="medium" />
			</div>
		</Hide>
	</>
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

export const Card = ({
	linkTo,
	format,
	headlineText,
	headlineSize,
	showQuotes,
	byline,
	showByline,
	webPublicationDate,
	imageUrl,
	imagePosition = 'top',
	imagePositionOnMobile = 'left',
	imageSize,
	trailText,
	avatar,
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
	containerPalette,
	showAge = false,
	discussionId,
}: Props) => {
	const palette = decidePalette(format, containerPalette);

	const hasSublinks = supportingContent && supportingContent.length > 0;
	const noOfSublinks = (supportingContent && supportingContent.length) || 0;

	const isOpinion =
		format.design === ArticleDesign.Comment ||
		format.design === ArticleDesign.Editorial ||
		format.design === ArticleDesign.Letter;

	const renderAge = decideIfAgeShouldShow({
		containerPalette,
		format,
		showAge,
	});

	return (
		<CardWrapper format={format} containerPalette={containerPalette}>
			<CardLink
				linkTo={linkTo}
				dataLinkName={dataLinkName}
				format={format}
				containerPalette={containerPalette}
			/>
			<CardLayout
				imagePosition={imagePosition}
				imagePositionOnMobile={imagePositionOnMobile}
				minWidthInPixels={minWidthInPixels}
			>
				{imageUrl && (
					<ImageWrapper
						imageSize={imageSize}
						imagePosition={imagePosition}
						imagePositionOnMobile={imagePositionOnMobile}
					>
						<img src={imageUrl} alt="" role="presentation" />
						{starRating !== undefined ? (
							<StarRatingComponent rating={starRating} />
						) : null}
					</ImageWrapper>
				)}
				<ContentWrapper
					imageSize={imageSize}
					imagePosition={imagePosition}
				>
					<Flex>
						<HeadlineWrapper>
							<CardHeadline
								headlineText={headlineText}
								format={format}
								containerPalette={containerPalette}
								size={headlineSize}
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
							/>
						</HeadlineWrapper>
						{avatar && (
							<Hide when="above" breakpoint="tablet">
								<AvatarContainer>
									<Avatar
										imageSrc={avatar.src}
										imageAlt={avatar.alt}
										containerPalette={containerPalette}
										format={format}
									/>
								</AvatarContainer>
							</Hide>
						)}
					</Flex>
					<>
						{trailText && (
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
						{avatar && (
							<Hide when="below" breakpoint="tablet">
								<AvatarContainer>
									<Avatar
										imageSrc={avatar.src}
										imageAlt={avatar.alt}
										containerPalette={containerPalette}
										format={format}
									/>
								</AvatarContainer>
							</Hide>
						)}
						<CardFooter
							format={format}
							age={
								renderAge && webPublicationDate ? (
									<CardAge
										format={format}
										containerPalette={containerPalette}
										webPublicationDate={webPublicationDate}
										showClock={showClock}
									/>
								) : undefined
							}
							mediaMeta={
								(format.design === ArticleDesign.Gallery ||
									format.design === ArticleDesign.Audio ||
									format.design === ArticleDesign.Video) &&
								mediaType ? (
									<MediaMeta
										containerPalette={containerPalette}
										format={format}
										mediaType={mediaType}
										mediaDuration={mediaDuration}
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
										data-ignore="global-link-styling"
										data-link-name="Comment count"
										href={`${linkTo}#comments`}
										subdued={true}
										cssOverrides={css`
											/* See: https://css-tricks.com/nested-links/ */
											${getZIndex('card-nested-link')};
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
									<CardBranding
										branding={branding}
										format={format}
									/>
								) : undefined
							}
						/>
						{hasSublinks && noOfSublinks <= 2 ? (
							<SupportingContent
								supportingContent={supportingContent}
								alignment="vertical"
							/>
						) : (
							<></>
						)}
					</>
				</ContentWrapper>
			</CardLayout>
			{hasSublinks && noOfSublinks > 2 ? (
				<SupportingContent
					supportingContent={supportingContent}
					alignment={
						imagePosition === 'top' || imagePosition === 'bottom'
							? 'vertical'
							: 'horizontal'
					}
				/>
			) : (
				<></>
			)}
			{isOpinion && (
				<StraightLines color={palette.border.lines} count={4} />
			)}
		</CardWrapper>
	);
};
