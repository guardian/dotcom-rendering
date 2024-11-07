import { css } from '@emotion/react';
import { between, from, until } from '@guardian/source/foundations';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import { isMediaCard } from '../../lib/cardHelpers';
import { palette } from '../../palette';
import type { DCRFrontImage } from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import { Avatar } from '../Avatar';
import { CardLink } from '../Card/components/CardLink';
import { CardHeadline } from '../CardHeadline';
import type { Loading } from '../CardPicture';
import { CardPicture } from '../CardPicture';
import { FormatBoundary } from '../FormatBoundary';
import { Icon } from '../MediaMeta';

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

const headline = css`
	grid-area: headline;
`;

const mediaIcon = css`
	grid-area: media-icon;
	align-self: end;
	width: 24px;
	height: 24px;
	/* We’re using the text colour for the icon badge */
	background-color: ${palette('--highlights-card-headline')};
	border-radius: 50%;
	display: inline-block;

	> svg {
		width: 20px;
		height: 20px;
		margin-left: auto;
		margin-right: auto;
		margin-top: 2px;
		display: block;
		fill: ${palette('--highlights-container-background')};
	}
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
}: HighlightsCardProps) => {
	const showMediaIcon = isMediaCard(format);

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
					/>
				</div>

				{!!mainMedia && showMediaIcon && (
					<div css={mediaIcon}>
						<Icon mediaType={mainMedia.type} />
					</div>
				)}

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
