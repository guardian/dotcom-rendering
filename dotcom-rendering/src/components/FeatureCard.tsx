import { DCRContainerPalette, DCRFrontImage } from '../types/front';
import { AspectRatio, CardPicture, Loading } from './CardPicture';
// import { MediaDuration } from './MediaDuration';
import { palette as sourcePalette } from '@guardian/source/foundations';
import { ArticleDesign, ArticleFormat } from '../lib/articleFormat';
import { Branding } from '../types/branding';
import { MainMedia } from '../types/mainMedia';

import { css } from '@emotion/react';
import { Link } from '@guardian/source/react-components';
import { getZIndex } from '../lib/getZIndex';
import { DISCUSSION_ID_DATA_ATTRIBUTE } from '../lib/useCommentCount';
import type { StarRating as Rating } from '../types/content';
import { isWithinTwelveHours } from './Card/Card';
import { CardAge as CardAgeComponent } from './Card/components/CardAge';
import { CardFooter } from './Card/components/CardFooter';
import { CardCommentCount } from './CardCommentCount.importable';
import { CardHeadline, ResponsiveFontSize } from './CardHeadline';
import { Island } from './Island';

type Props = {
	linkTo: string;
	format: ArticleFormat;
	absoluteServerTimes: boolean;
	headlineText: string;
	headlineSizes?: ResponsiveFontSize;
	showQuotedHeadline?: boolean;
	byline?: string;
	showByline?: boolean;
	webPublicationDate?: string;
	image?: DCRFrontImage;
	imageLoading: Loading;
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
	/** Used for Ophan tracking */
	dataLinkName?: string;
	/** Only used on Labs cards */
	branding?: Branding;
	containerPalette?: DCRContainerPalette;
	discussionApiUrl: string;
	discussionId?: string;
	isExternalLink: boolean;
	/** Alows the consumer to set an aspect ratio on the image of 5:3 or 5:4 */
	aspectRatio?: AspectRatio;
	index?: number;
};

const baseCardStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	/* We absolutely position the faux link
		so this is required here */
	position: relative;

	/* Target Safari 10.1 */
	/* https://www.browserstack.com/guide/create-browser-specific-css */
	@media not all and (min-resolution: 0.001dpcm) {
		@supports (-webkit-appearance: none) and
			(not (stroke-color: transparent)) {
			display: grid;
			grid-auto-rows: min-content;
			align-content: start;
		}
	}

	/* a tag specific styles */
	color: inherit;
	text-decoration: none;
`;

const hoverStyles = css`
	:hover .image-overlay {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		left: 0;
		background-color: ${sourcePalette.neutral[7]};
		opacity: 0.1;
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */
	:hover .card-headline .show-underline {
		text-decoration: underline;
	}
`;

const blurredOverlay = css`
	position: absolute;
	bottom: 0;
	width: 100%;
	backdrop-filter: blur(12px); /* Apply blur effect */
	z-index: 9999;
	padding: 8px;
`;

const getMedia = ({
	imageUrl,
	imageAltText,
	mainMedia,
	isPlayableMediaCard,
}: {
	imageUrl?: string;
	imageAltText?: string;
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
	if (imageUrl) {
		return { type: 'picture', imageUrl, imageAltText } as const;
	}
	return undefined;
};

const CardAge = ({
	showClock,
	absoluteServerTimes,
	webPublicationDate,
}: {
	showClock: boolean;
	absoluteServerTimes: boolean;
	webPublicationDate?: string;
}) => {
	if (!webPublicationDate) return undefined;
	const withinTwelveHours = isWithinTwelveHours(webPublicationDate);

	if (!withinTwelveHours) return undefined;

	return (
		<CardAgeComponent
			webPublication={{
				date: webPublicationDate,
				isWithinTwelveHours: withinTwelveHours,
			}}
			showClock={showClock}
			isOnwardContent={false}
			absoluteServerTimes={absoluteServerTimes}
			isTagPage={false}
		/>
	);
};

const CommentCount = ({
	linkTo,
	discussionId,
	discussionApiUrl,
}: {
	linkTo: string;
	discussionId?: string;
	discussionApiUrl?: string;
}) => {
	if (!discussionId) return undefined;
	if (!discussionApiUrl) return undefined;

	return (
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
					isOnwardContent={false}
				/>
			</Island>
		</Link>
	);
};

export const FeatureCard = ({
	linkTo,
	format,
	headlineText,
	headlineSizes,
	showQuotedHeadline,
	byline,
	showByline,
	webPublicationDate,
	image,
	imageLoading,
	showClock,
	mainMedia,
	isPlayableMediaCard,
	kickerText,
	showPulsingDot,
	starRating,
	dataLinkName,
	branding,
	containerPalette,
	discussionApiUrl,
	discussionId,
	isExternalLink,
	absoluteServerTimes,
	aspectRatio,
	index = 0,
}: Props) => {
	const media = getMedia({
		imageUrl: image?.src,
		imageAltText: image?.altText,
		mainMedia,
		isPlayableMediaCard,
	});
	if (!media) return null;
	if (media.type != 'picture') return null;

	return (
		<div css={[baseCardStyles, hoverStyles]}>
			<CardPicture
				mainImage={media.imageUrl}
				imageSize={'feature-large'}
				alt={media.imageAltText}
				loading={imageLoading}
				roundedCorners={false}
				aspectRatio={aspectRatio}
			/>
			<div css={blurredOverlay}>
				<CardHeadline
					headlineText={headlineText}
					format={format}
					fontSizes={{ desktop: 'medium' }}
					showQuotes={false}
					kickerText={
						format.design === ArticleDesign.LiveBlog && !kickerText
							? 'Live'
							: kickerText
					}
					showPulsingDot={
						format.design === ArticleDesign.LiveBlog ||
						showPulsingDot
					}
					byline={byline}
					showByline={showByline}
					isExternalLink={isExternalLink}
				/>

				<CardFooter
					format={format}
					showLivePlayable={false}
					age={
						<CardAge
							showClock={!!showClock}
							absoluteServerTimes={!!absoluteServerTimes}
							webPublicationDate={webPublicationDate}
						/>
					}
					commentCount={
						<CommentCount
							linkTo={linkTo}
							discussionId={discussionId}
							discussionApiUrl={discussionApiUrl}
						/>
					}
				/>
			</div>
		</div>
	);
};
