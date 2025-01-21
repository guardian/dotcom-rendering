import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	between,
	from,
	space,
	textSansBold12,
	until,
} from '@guardian/source/foundations';
import { SvgCamera } from '@guardian/source/react-components';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import { isMediaCard as isMedia } from '../../lib/cardHelpers';
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
import { secondsToDuration } from '../MediaDuration';
import { Pill } from '../Pill';
import { StarRating } from '../StarRating/StarRating';
import { SvgMediaControlsPlay } from '../SvgMediaControlsPlay';

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
};

const gridContainer = css`
	display: grid;
	background-color: ${palette('--highlights-container-background')};
	/** Relative positioning is required to absolutely
	position the card link overlay */
	position: relative;
	gap: 8px;
	grid-template-areas:
		'headline 	headline'
		'rating rating'
		'media-icon image';

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

const mediaGrid = css`
	grid-template-areas:
		'image'
		'headline'
		'media-icon';

	${from.desktop} {
		width: 300px;
		grid-template-areas:
			'image headline'
			'image media-icon';
	}
`;

const headline = css`
	grid-area: headline;
`;

const mediaIcon = css`
	grid-area: media-icon;
	align-self: end;
	display: flex;
	align-items: flex-end;
`;

const audioPill = css`
	display: flex;
	align-items: center;
	column-gap: 4px;
`;

const audioPillIcon = css`
	width: ${space[6]}px;
	height: ${space[6]}px;
	background-color: ${palette('--pill-background')};
	border-radius: 50%;

	> svg {
		margin-left: auto;
		margin-right: auto;
		display: block;
		fill: ${palette('--highlights-container-background')};
	}
`;

const audioPillText = css`
	${textSansBold12};
	color: ${palette('--highlight-card-audio-text')};
`;

const imageArea = css`
	grid-area: image;
	height: 106px;
	width: 106px;
	align-self: end;
	position: relative;
	${from.desktop} {
		height: 112px;
		width: 112px;
	}
`;

const hoverStyles = css`
	:hover .image-overlay {
		position: absolute;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
		border-radius: 100%;
		background-color: ${palette('--card-background-hover')};
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
	height: fit-content;
	grid-area: rating;
	${from.desktop} {
		grid-area: media-icon;
		align-self: flex-end;
	}
`;

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
				<div css={audioPill}>
					<div css={audioPillIcon}>
						<SvgMediaControlsPlay />
					</div>
					<span css={audioPillText}>{audioDuration}</span>
				</div>
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
			<div css={[gridContainer, hoverStyles, isMediaCard && mediaGrid]}>
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

				<div css={imageArea}>
					{(avatarUrl && (
						<Avatar
							src={avatarUrl}
							alt={byline ?? ''}
							shape="cutout"
						/>
					)) ??
						(image && (
							<>
								<CardPicture
									imageSize="medium"
									mainImage={image.src}
									alt={image.altText}
									loading={imageLoading}
									isCircular={true}
								/>
								{/* This image overlay is styled when the CardLink is hovered */}
								<div className="image-overlay"> </div>
							</>
						))}
				</div>
			</div>
		</FormatBoundary>
	);
};
