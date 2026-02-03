import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { between, from, space, until } from '@guardian/source/foundations';
import { ArticleDesign, type ArticleFormat } from '../../lib/articleFormat';
import { isMediaCard as isMedia } from '../../lib/cardHelpers';
import { palette } from '../../palette';
import type { StarRating as Rating } from '../../types/content';
import type { DCRFrontImage } from '../../types/front';
import type { MainMedia } from '../../types/mainMedia';
import { CardLink } from '../Card/components/CardLink';
import { CardHeadline } from '../CardHeadline';
import type { Loading } from '../CardPicture';
import { CardPill } from '../CardPill';
import { FormatBoundary } from '../FormatBoundary';
import { StarRating } from '../StarRating/StarRating';
import { HighlightsCardImage } from './HighlightsCardImage';

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
	articleMainMedia?: MainMedia;
};

const container = css`
	display: flex;
	flex-direction: column;
	height: 100%;
	column-gap: ${space[2]}px;
	justify-content: space-between;
	/** Relative positioning is required to absolutely position the card link overlay */
	position: relative;
	padding: ${space[2]}px ${space[2]}px 0 ${space[2]}px;
	background-color: ${palette('--highlights-card-background')};

	/**
	 * Applied word-break: break-word to prevent text overflow and ensure long words break
	 * onto the next line. This is important since the highlights card can only take up a
	 * set portion of the screen to allow for the peeping card on mobile and layout
	 * on larger breakpoints, and the image has a fixed width on all breakpoints.
	 */
	word-break: break-word;

	${until.mobileMedium} {
		min-height: 174px;
	}
	${between.mobileMedium.and.tablet} {
		min-height: 194px;
	}
	${from.tablet} {
		width: 160px;
		padding: 10px 10px 0 10px;
	}
	${from.tablet} {
		width: 280px;
		flex-direction: row;
	}
	${from.desktop} {
		width: 300px;
	}
`;

const spaceBetween = css`
	justify-content: space-between;
`;

const hoverStyles = css`
	:hover .media-overlay {
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

const content = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;

	${from.tablet} {
		padding-bottom: 10px;
	}

	/**
	 * We're deliberately using a font-size that is not in Source so that
	 * the headline doesn't exceed three lines across all mobile breakpoints
	 */
	${between.mobileMedium.and.mobileLandscape} {
		.headline-text {
			font-size: 1rem;
		}
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
	articleMainMedia,
}: HighlightsCardProps) => {
	const isMediaCard = isMedia(format);

	/*
	 * We do not apply space-between to the card if it has star rating as star ratings should be aligned to the headline.
	 * We do apply it for anything else as pills should be aligned with the bottom of the image
	 * */
	const shouldJustifyContent = isUndefined(starRating);

	return (
		<FormatBoundary format={format}>
			<div css={[container, hoverStyles]}>
				<CardLink
					linkTo={linkTo}
					headlineText={headlineText}
					dataLinkName={dataLinkName}
					isExternalLink={isExternalLink}
				/>

				<div css={[content, shouldJustifyContent && spaceBetween]}>
					<CardHeadline
						headlineText={headlineText}
						format={format}
						fontSizes={{
							desktop: 'xxsmall',
							tablet: 'xxsmall',
							mobileMedium: 'xxsmall',
							mobile: 'xxxsmall',
						}}
						showPulsingDot={
							format.design === ArticleDesign.LiveBlog
						}
						kickerText={kickerText}
						isExternalLink={isExternalLink}
						showQuotes={showQuotedHeadline}
						headlineColour={palette('--highlights-card-headline')}
						kickerColour={palette('--highlights-card-kicker-text')}
						quoteColour={palette('--highlights-card-quote-icon')}
					/>

					{!isUndefined(starRating) && (
						<StarRating
							rating={starRating}
							size="small"
							paddingSize="none"
						/>
					)}

					{!!mainMedia && isMediaCard && (
						<div>
							<CardPill
								format={format}
								mainMedia={articleMainMedia}
							/>
						</div>
					)}
				</div>

				{(!!avatarUrl || !!image) && (
					<HighlightsCardImage
						imageLoading={imageLoading}
						image={image}
						avatarUrl={avatarUrl}
						byline={byline}
						mainMedia={mainMedia}
					/>
				)}
			</div>
		</FormatBoundary>
	);
};
