import React from 'react';
import { css, cx } from 'emotion';

import { Design } from '@guardian/types';
import { brandAltBackground } from '@guardian/src-foundations/palette';

import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import { CardHeadline } from '@frontend/web/components/CardHeadline';
import { Avatar } from '@frontend/web/components/Avatar';
import { Flex } from '@frontend/web/components/Flex';
import { Hide } from '@frontend/web/components/Hide';
import { MediaMeta } from '@frontend/web/components/MediaMeta';
import { CardCommentCount } from '@frontend/web/components/CardCommentCount';

import { formatCount } from '@root/src/web/lib/formatCount';

import { ContentWrapper } from './components/ContentWrapper';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { CardLayout } from './components/CardLayout';
import { ImageWrapper } from './components/ImageWrapper';
import { AvatarContainer } from './components/AvatarContainer';
import { StandfirstWrapper } from './components/StandfirstWrapper';
import { CardFooter } from './components/CardFooter';
import { TopBar } from './components/TopBar';
import { CardLink } from './components/CardLink';
import { CardAge } from './components/CardAge';

type Props = {
	linkTo: string;
	format: Format;
	palette: Palette;
	headlineText: string;
	headlineSize?: SmallHeadlineSize;
	showQuotes?: boolean; // Even with design !== Comment, a piece can be opinion
	byline?: string;
	isLiveBlog?: boolean; // When design === Design.LiveBlog, this denotes if the liveblog is active or not
	showByline?: boolean;
	webPublicationDate?: string;
	imageUrl?: string;
	imagePosition?: ImagePositionType;
	imageSize?: ImageSizeType; // Size is ignored when position = 'top' because in that case the image flows based on width
	isFullCardImage?: boolean; // For use in Carousel until we decide a `Display.Immersive` convention
	standfirst?: string;
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
	alwaysVertical?: boolean;
	minWidthInPixels?: number;
	// Ophan tracking
	dataLinkName?: string;
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
		large: '67%',
		jumbo: '75%',
	},
	content: {
		small: '75%',
		medium: '50%',
		large: '33%',
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
			<div className={starWrapper}>
				<StarRating rating={rating} size="small" />
			</div>
		</Hide>
		<Hide when="below" breakpoint="desktop">
			<div className={starWrapper}>
				<StarRating rating={rating} size="medium" />
			</div>
		</Hide>
	</>
);

const fullCardImageAgeStyles = css`
	min-width: 25%;
	align-self: flex-end;
	text-align: end;
`;

export const Card = ({
	linkTo,
	format,
	palette,
	headlineText,
	headlineSize,
	showQuotes,
	byline,
	showByline,
	webPublicationDate,
	imageUrl,
	imagePosition,
	imageSize,
	isFullCardImage,
	standfirst,
	avatar,
	showClock,
	mediaType,
	mediaDuration,
	kickerText,
	showPulsingDot,
	showSlash,
	commentCount,
	starRating,
	alwaysVertical,
	minWidthInPixels,
	dataLinkName,
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

	return (
		<CardLink
			linkTo={linkTo}
			format={format}
			palette={palette}
			dataLinkName={dataLinkName}
		>
			<TopBar palette={palette} isFullCardImage={isFullCardImage}>
				<CardLayout
					imagePosition={imagePosition}
					alwaysVertical={alwaysVertical}
					minWidthInPixels={minWidthInPixels}
				>
					<>
						{imageUrl && (
							<ImageWrapper
								percentage={imageCoverage}
								alwaysVertical={alwaysVertical}
								isFullCardImage={isFullCardImage}
							>
								<img
									src={imageUrl}
									alt=""
									role="presentation"
								/>
								<>
									{starRating && (
										<StarRatingComponent
											rating={starRating}
										/>
									)}
								</>
							</ImageWrapper>
						)}
						<ContentWrapper
							percentage={contentCoverage}
							isFullCardImage={isFullCardImage}
						>
							<Flex>
								<HeadlineWrapper
									isFullCardImage={isFullCardImage}
								>
									<CardHeadline
										headlineText={headlineText}
										format={format}
										palette={palette}
										size={headlineSize}
										showQuotes={showQuotes}
										kickerText={
											format.design === Design.LiveBlog
												? 'Live'
												: kickerText
										}
										showPulsingDot={
											format.design === Design.LiveBlog ||
											showPulsingDot
										}
										showSlash={
											format.design === Design.LiveBlog ||
											showSlash
										}
										byline={byline}
										showByline={showByline}
										isFullCardImage={isFullCardImage}
									/>
								</HeadlineWrapper>
								<>
									{avatar && (
										<Hide when="above" breakpoint="tablet">
											<AvatarContainer>
												<Avatar
													imageSrc={avatar.src}
													imageAlt={avatar.alt}
													palette={palette}
												/>
											</AvatarContainer>
										</Hide>
									)}
								</>
							</Flex>
							<div
								className={cx(
									isFullCardImage && fullCardImageAgeStyles,
								)}
							>
								{standfirst && (
									<StandfirstWrapper palette={palette}>
										{standfirst}
									</StandfirstWrapper>
								)}
								{avatar && (
									<Hide when="below" breakpoint="tablet">
										<AvatarContainer>
											<Avatar
												imageSrc={avatar.src}
												imageAlt={avatar.alt}
												palette={palette}
											/>
										</AvatarContainer>
									</Hide>
								)}
								<CardFooter
									format={format}
									age={
										webPublicationDate ? (
											<CardAge
												format={format}
												palette={palette}
												webPublicationDate={
													webPublicationDate
												}
												showClock={showClock}
											/>
										) : undefined
									}
									isFullCardImage={isFullCardImage}
									mediaMeta={
										format.design === Design.Media &&
										mediaType ? (
											<MediaMeta
												palette={palette}
												mediaType={mediaType}
												mediaDuration={mediaDuration}
											/>
										) : undefined
									}
									commentCount={
										showCommentCount &&
										longCount &&
										shortCount ? (
											<CardCommentCount
												palette={palette}
												long={longCount}
												short={shortCount}
											/>
										) : undefined
									}
								/>
							</div>
						</ContentWrapper>
					</>
				</CardLayout>
			</TopBar>
		</CardLink>
	);
};
