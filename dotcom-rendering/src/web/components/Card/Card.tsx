import { css } from '@emotion/react';

import { ArticleDesign } from '@guardian/libs';
import { brandAltBackground } from '@guardian/source-foundations';

import { StarRating } from '../StarRating/StarRating';
import { CardHeadline } from '../CardHeadline';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { Hide } from '../Hide';
import { MediaMeta } from '../MediaMeta';
import { CardCommentCount } from '../CardCommentCount';

import { decidePalette } from '../../lib/decidePalette';
import { formatCount } from '../../lib/formatCount';

import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { CardLayout } from './components/CardLayout';
import { ImageWrapper } from './components/ImageWrapper';
import { AvatarContainer } from './components/AvatarContainer';
import { TrailTextWrapper } from './components/TrailTextWrapper';
import { CardFooter } from './components/CardFooter';
import { CardWrapper } from './components/CardWrapper';
import { CardLink } from './components/CardLink';
import { CardAge } from './components/CardAge';
import { CardBranding } from './components/CardBranding';
import { SupportingContent } from '../SupportingContent';

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
	commentCount?: number;
	starRating?: number;
	minWidthInPixels?: number;
	// Ophan tracking
	dataLinkName?: string;
	// Labs
	branding?: Branding;
	supportingContent?: DCRSupportingContent[];
};

type ImageSizeType = 'small' | 'medium' | 'large' | 'jumbo';

type CoveragesType = {
	image: {
		small: CardPercentageType;
		medium: CardPercentageType;
		large: CardPercentageType;
		jumbo: CardPercentageType;
	};
	content: {
		small: CardPercentageType;
		medium: CardPercentageType;
		large: CardPercentageType;
		jumbo: CardPercentageType;
	};
};

const coverages: CoveragesType = {
	// coverages is how we set the image size relative to the space given
	// to the headline. These percentages are passed to flex-basis inside the
	// wrapper components
	image: {
		small: '25%',
		medium: '50%',
		large: '66%',
		jumbo: '75%',
	},
	content: {
		small: '75%',
		medium: '50%',
		large: '34%',
		jumbo: '25%',
	},
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
	commentCount,
	starRating,
	minWidthInPixels,
	dataLinkName,
	branding,
	supportingContent,
}: Props) => {
	// Decide how we position the image on the card
	let imageCoverage: CardPercentageType | undefined;
	let contentCoverage: CardPercentageType | undefined;
	if (imageSize && imagePosition !== 'top') {
		// We only specifiy an explicit width for the image when
		// we're positioning left or right, not top. Top positioned
		// images flow naturally
		imageCoverage = coverages.image[imageSize];
		contentCoverage = coverages.content[imageSize];
	}

	const showCommentCount = commentCount || commentCount === 0;
	const { long: longCount, short: shortCount } = formatCount(commentCount);

	const cardPalette = decidePalette(format);

	const moreThanTwoSubLinks: boolean = !!(
		supportingContent?.length && supportingContent.length > 2
	);

	const renderFooter = ({
		renderAge = true,
		renderMediaMeta = true,
		renderCommentCount = true,
		renderCardBranding = true,
		renderSupportingContent = true,
		forceVertical = false,
	}: {
		renderAge?: boolean;
		renderMediaMeta?: boolean;
		renderCommentCount?: boolean;
		renderCardBranding?: boolean;
		renderSupportingContent?: boolean;
		forceVertical?: boolean;
	}) => {
		return (
			<CardFooter
				format={format}
				age={
					renderAge && webPublicationDate ? (
						<CardAge
							format={format}
							webPublicationDate={webPublicationDate}
							showClock={showClock}
						/>
					) : undefined
				}
				mediaMeta={
					renderMediaMeta &&
					format.design === ArticleDesign.Media &&
					mediaType ? (
						<MediaMeta
							palette={cardPalette}
							mediaType={mediaType}
							mediaDuration={mediaDuration}
						/>
					) : undefined
				}
				commentCount={
					renderCommentCount &&
					showCommentCount &&
					longCount &&
					shortCount ? (
						<CardCommentCount
							palette={cardPalette}
							long={longCount}
							short={shortCount}
						/>
					) : undefined
				}
				cardBranding={
					renderCardBranding && branding ? (
						<CardBranding branding={branding} format={format} />
					) : undefined
				}
				supportingContent={
					renderSupportingContent &&
					supportingContent &&
					supportingContent.length > 0 ? (
						<SupportingContent
							supportingContent={supportingContent}
							imagePosition={
								forceVertical ? 'top' : imagePosition
							}
						/>
					) : undefined
				}
			/>
		);
	};

	return (
		<CardLink linkTo={linkTo} format={format} dataLinkName={dataLinkName}>
			<CardWrapper palette={cardPalette}>
				<CardLayout
					imagePosition={imagePosition}
					imagePositionOnMobile={imagePositionOnMobile}
					minWidthInPixels={minWidthInPixels}
				>
					{imageUrl && (
						<ImageWrapper
							percentage={imageCoverage}
							imagePositionOnMobile={imagePositionOnMobile}
						>
							<img src={imageUrl} alt="" role="presentation" />
							<>
								{starRating !== undefined ? (
									<StarRatingComponent rating={starRating} />
								) : null}
							</>
						</ImageWrapper>
					)}
					<ContentWrapper percentage={contentCoverage}>
						<Flex>
							<HeadlineWrapper>
								<CardHeadline
									headlineText={headlineText}
									format={format}
									size={headlineSize}
									showQuotes={showQuotes}
									kickerText={
										format.design === ArticleDesign.LiveBlog
											? 'Live'
											: kickerText
									}
									showPulsingDot={
										format.design ===
											ArticleDesign.LiveBlog ||
										showPulsingDot
									}
									showSlash={
										format.design ===
											ArticleDesign.LiveBlog || showSlash
									}
									byline={byline}
									showByline={showByline}
								/>
							</HeadlineWrapper>
							<>
								{avatar && (
									<Hide when="above" breakpoint="tablet">
										<AvatarContainer>
											<Avatar
												imageSrc={avatar.src}
												imageAlt={avatar.alt}
												palette={cardPalette}
											/>
										</AvatarContainer>
									</Hide>
								)}
							</>
						</Flex>
						<div>
							{trailText && (
								<TrailTextWrapper palette={cardPalette}>
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
											palette={cardPalette}
										/>
									</AvatarContainer>
								</Hide>
							)}
							{/* Show the card footer in the same column as the headline content */}
							{!moreThanTwoSubLinks ? (
								renderFooter({ forceVertical: true })
							) : (
								<></>
							)}
						</div>
					</ContentWrapper>
				</CardLayout>
				{/* If there are more than two sublinks break footer out of the headline column into a row below */}
				{moreThanTwoSubLinks ? renderFooter({}) : <></>}
			</CardWrapper>
		</CardLink>
	);
};
