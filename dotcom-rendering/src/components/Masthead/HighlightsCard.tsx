import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { between, from, space, until } from '@guardian/source/foundations';
import { SvgCamera } from '@guardian/source/react-components';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import { isMediaCard as isMedia } from '../../lib/cardHelpers';
import { secondsToDuration } from '../../lib/formatTime';
import { palette } from '../../palette';
import type { StarRating as Rating } from '../../types/content';
import type { DCRFrontImage } from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import { Avatar } from '../Avatar';
import { CardLink } from '../Card/components/CardLink';
import { CardHeadline } from '../CardHeadline';
import type { Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';
import { FormatBoundary } from '../FormatBoundary';
import { Pill } from '../Pill';
import { StarRating } from '../StarRating/StarRating';
import { SvgMediaControlsPlay } from '../SvgMediaControlsPlay';
import { PodcastSeriesImage } from '../../types/tag';
import { PodcastCoverImage } from '../PodcastCoverImage';

export type HighlightsCardProps = {
	linkTo: string;
	format: ArticleFormat;
	headlineText: string;
	showQuotedHeadline: boolean;
	image?: DCRFrontImage;
	imageLoading?: Loading;
	avatarUrl?: string;
	mainMedia?: MainMedia;
	kickerText?: string;
	dataLinkName: string;
	byline?: string;
	isExternalLink: boolean;
	starRating?: Rating;
	galleryCount?: number;
	audioDuration?: string;
	/** The square podcast series image, if it exists for a card */
	podcastImage?: PodcastSeriesImage;
};

const gridContainer = css`
	display: grid;
	background-color: ${palette('--highlights-container-background')};
	/** Relative positioning is required to absolutely
	position the card link overlay */
	position: relative;
	column-gap: ${space[2]}px;
	grid-template-areas:
		'headline headline'
		'media-icon media-icon'
		'. image';

	/* Applied word-break: break-word to prevent text overflow
	and ensure long words break onto the next line.
	This is important since the highlights card can only take up a set portion
	of the screen to allow for the peeping card on mobile and grid layout
	on larger breakpoints, and the image has a fixed width on all breakpoints. */
	word-break: break-word;
	${until.mobileMedium} {
		min-height: 174px;
	}

	${between.mobileMedium.and.desktop} {
		min-height: 194px;
		height: 100%;
	}

	${from.tablet} {
		height: 100%;
		width: 160px;
	}

	${from.desktop} {
		width: 300px;
		grid-template-areas:
			'headline 	image'
			'media-icon image';
	}
`;

const headline = css`
	grid-area: headline;
	margin-bottom: ${space[1]}px;
`;

const mediaIcon = css`
	grid-area: media-icon;
	display: flex;
	align-items: flex-end;
`;

const imageArea = css`
	grid-area: image;
	height: 112px;
	width: 112px;
	align-self: end;
	position: relative;
	${until.desktop} {
		margin-top: ${space[2]}px;
	}
	${from.desktop} {
		align-self: start;
	}
`;

/** Avatar alignment is an exception and should align with the bottom of the card *if* there is a gap.*/
const avatarAlignmentStyles = css`
	align-self: end;
`;

const hoverStyles = css`
	:hover .image-overlay {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
		background-color: ${palette('--card-background-hover')};
	}
	:hover .circular {
		border-radius: 100%;
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */
	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

const starWrapper = css`
	background-color: ${palette('--star-rating-background')};
	color: ${palette('--star-rating-fill')};
	width: fit-content;
	grid-area: media-icon;
	align-self: flex-end;
`;

const decideImage = (
	imageLoading: Loading,
	format: ArticleFormat,
	image?: DCRFrontImage,
	podcastImage?: PodcastSeriesImage,
	avatarUrl?: string,
	byline?: string,
) => {
	if (!image && !avatarUrl) {
		return null;
	}
	if (avatarUrl) {
		return (
			<Avatar
				src={avatarUrl}
				alt={byline ?? ''}
				shape="cutout"
				imageSize="large"
			/>
		);
	}
	if (format.design === ArticleDesign.Audio && podcastImage?.src) {
		return (
			<>
				<CardPicture
					imageSize="medium"
					mainImage={podcastImage.src}
					alt={podcastImage.altText}
					loading={imageLoading}
					isCircular={false}
					aspectRatio={'1:1'}
				/>
				<div className="image-overlay"> </div>
			</>
		);
	}
	if (!image) {
		return null;
	}
	return (
		<>
			<CardPicture
				imageSize="medium"
				mainImage={image.src}
				alt={image.altText}
				loading={imageLoading}
				isCircular={true}
			/>
			{/* This image overlay is styled when the CardLink is hovered */}
			<div className="image-overlay circular"> </div>
		</>
	);
};

export const HighlightsCard = ({
	linkTo,
	format,
	headlineText,
	showQuotedHeadline,
	image,
	imageLoading = 'lazy',
	avatarUrl,
	mainMedia,
	kickerText,
	dataLinkName,
	byline,
	isExternalLink,
	starRating,
	galleryCount,
	audioDuration,
	podcastImage,
}: HighlightsCardProps) => {
	const isMediaCard = isMedia(format);
	const MediaPill = () => (
		<div css={mediaIcon}>
			{mainMedia?.type === 'Video' && (
				<Pill
					content={secondsToDuration(mainMedia.duration)}
					icon={<SvgMediaControlsPlay />}
					iconSize={'small'}
				/>
			)}
			{mainMedia?.type === 'Audio' && (
				<Pill
					content={audioDuration ?? ''}
					icon={<SvgMediaControlsPlay />}
					iconSize={'small'}
				/>
			)}
			{mainMedia?.type === 'Gallery' && (
				<Pill
					prefix="Gallery"
					content={galleryCount?.toString() ?? ''}
					icon={<SvgCamera />}
					iconSide="right"
				/>
			)}
		</div>
	);
	return (
		<FormatBoundary format={format}>
			<div css={[gridContainer, hoverStyles]}>
				<CardLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={dataLinkName}
					isExternalLink={isExternalLink}
				/>

				<div css={headline}>
					<CardHeadline
						headlineText={headlineText}
						format={format}
						fontSizes={{
							desktop: 'xsmall',
							tablet: 'xxsmall',
							mobileMedium: 'xxsmall',
							mobile: 'tiny',
						}}
						showPulsingDot={
							format.design === ArticleDesign.LiveBlog
						}
						kickerText={kickerText}
						isExternalLink={isExternalLink}
						showQuotes={showQuotedHeadline}
						headlineColour={palette('--highlights-card-headline')}
						kickerColour={palette('--highlights-card-kicker-text')}
						isBetaContainer={true}
					/>
				</div>

				{!isUndefined(starRating) ? (
					<div css={starWrapper}>
						<StarRating rating={starRating} size="small" />
					</div>
				) : null}

				{!!mainMedia && isMediaCard && MediaPill()}

				<div css={[imageArea, avatarUrl && avatarAlignmentStyles]}>
					{decideImage(
						imageLoading,
						format,
						image,
						podcastImage,
						avatarUrl,
						byline,
					)}
				</div>
			</div>
		</FormatBoundary>
	);
};
