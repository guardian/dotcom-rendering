import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import type { ArticleFormat } from '../../lib/articleFormat';
import { palette } from '../../palette';
import type {
	DCRContainerPalette,
	DCRFrontImage,
	DCRSlideshowImage,
} from '../../types/front';
import { ContainerOverrides } from '../ContainerOverrides';
import { FormatBoundary } from '../FormatBoundary';
import { CardHeadline, ResponsiveFontSize } from '../CardHeadline';
import { MediaSizeType } from './components/MediaWrapper';
import { CardPicture, Loading } from '../CardPicture';
import type { MainMedia } from '../../types/mainMedia';
import { CardMediaType } from '../../types/layout';
import { GridItem } from '../GridItem';
import { ArticleDesign, isUndefined } from '@guardian/libs';
import { HeadlineWrapper } from './components/HeadlineWrapper';
import { StarRating } from '../StarRating/StarRating';
import { TrailText } from './components/TrailText';

type CardWrapperProps = {
	children: React.ReactNode;
	format: ArticleFormat;
	showTopBarDesktop: boolean;
	showTopBarMobile: boolean;
	containerPalette?: DCRContainerPalette;
	topBarColour?: string;
};

const horizontalCardStyles = css`
	grid-template-columns: 150px 1fr;
	grid-template-areas: 'image headline' 'image standfirst' 'image meta';
`;

const baseCardStyles = css`
	display: grid;
	grid-template-areas: 'headline' 'image' 'standfirst' 'meta';

	width: 100%;
	/* We absolutely position the faux link so this is required here */
	position: relative;

	${until.desktop} {
		grid-template-columns: 1fr 3fr;
		grid-template-areas: 'image headline' 'image standfirst' 'image meta';
	}

	/*
	 * Target Safari 10.1 to 14.0
	 * https://www.browserstack.com/guide/create-browser-specific-css
	 * Flexbox with gap is not supported until Safari 14.1
	 */
	@media not all and (min-resolution: 0.001dpcm) {
		@supports (-webkit-appearance: none) and (not (display: flex; gap: 1em)) {
			display: grid;
			grid-auto-rows: min-content;
			align-content: start;
		}
	}

	/* <a /> tag specific styles */
	color: inherit;
	text-decoration: none;
`;

const hoverStyles = css`
	:hover .media-overlay {
		width: 100%;
		height: 100%;
		background-color: ${palette('--card-background-hover')};
	}

	/* Only underline the headline element we want to target (not kickers/sublink headlines) */

	:hover .card-headline .show-underline {
		text-decoration: underline;
	}

	/**
	  * We want to prevent the general hover styles applying when
	  * a click won't result in navigating to the main article
	*/

	:has(
			ul.sublinks:hover,
			.video-container:not(.cinemagraph):hover,
			.slideshow-carousel-footer:hover,
			.branding-logo:hover
		) {
		.card-headline .show-underline {
			text-decoration: none;
		}

		.media-overlay {
			background-color: transparent;
		}
	}
`;

const topBarStyles = (colour: string) => css`
	::before {
		border-top: 1px solid ${colour};
		content: '';
		z-index: 2;
		width: 100%;
		padding-bottom: ${space[2]}px;
		background-color: unset;
	}
`;
const mobileTopBarStyles = (colour: string) => css`
	${until.tablet} {
		${topBarStyles(colour)}
	}
`;
const desktopTopBarStyles = (colour: string) => css`
	${from.tablet} {
		${topBarStyles(colour)}
	}
`;

export const CardWrapper = ({
	children,
	format,
	showTopBarDesktop,
	showTopBarMobile,
	containerPalette,
	topBarColour = palette('--card-border-top'),
}: CardWrapperProps) => {
	return (
		<FormatBoundary format={format}>
			<ContainerOverrides containerPalette={containerPalette}>
				<div
					css={[
						baseCardStyles,
						hoverStyles,
						showTopBarDesktop && desktopTopBarStyles(topBarColour),
						showTopBarMobile && mobileTopBarStyles(topBarColour),
					]}
				>
					{children}
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};

const getMedia = ({
	imageUrl,
	imageAltText,
	avatarUrl,
	isCrossword,
	slideshowImages,
	mainMedia,
	canPlayInline,
}: {
	imageUrl?: string;
	imageAltText?: string;
	avatarUrl?: string;
	isCrossword?: boolean;
	slideshowImages?: DCRSlideshowImage[];
	mainMedia?: MainMedia;
	canPlayInline?: boolean;
}) => {
	if (mainMedia?.type === 'SelfHostedVideo' && canPlayInline) {
		let type: CardMediaType;
		switch (mainMedia.videoStyle) {
			case 'Default':
				type = 'default-video';
				break;
			case 'Loop':
				type = 'loop-video';
				break;
			case 'Cinemagraph':
				type = 'cinemagraph';
				break;
		}
		return { type, mainMedia } as const;
	}
	if (mainMedia?.type === 'YoutubeVideo' && canPlayInline) {
		return { type: 'youtube-video', mainMedia } as const;
	}
	if (slideshowImages && canPlayInline) {
		return { type: 'slideshow', slideshowImages } as const;
	}
	if (avatarUrl) return { type: 'avatar', avatarUrl } as const;
	if (mainMedia?.type === 'Audio' && mainMedia.podcastImage) {
		return {
			...mainMedia,
			type: 'podcast',
			trailImage: { src: imageUrl, altText: imageAltText },
		} as const;
	}
	if (imageUrl) {
		const type = isCrossword ? 'crossword' : 'picture';
		return { type, imageUrl, imageAltText } as const;
	}
	return undefined;
};

export type CardProps = {
	format: ArticleFormat;
	headlineText: string;
	headlineSizes?: ResponsiveFontSize;
	byline?: string;
	showByline?: boolean;
	image?: DCRFrontImage;

	/** Size is ignored when position = 'top' because in that case the media flows based on width */ mediaSize?: MediaSizeType;
	imageLoading: Loading;
	isCrossword?: boolean;
	avatarUrl?: string;
	mainMedia?: MainMedia;
	/** * For interactive media (e.g., video or slideshow), certain card sizes are restricted from displaying * the interactive content because controls may be unavailable or inaccessible at those sizes. * * Note: * - YouTube recommends a minimum embed width of 480px * @see https://developers.google.com/youtube/terms/required-minimum-functionality#embedded-youtube-player-size * - At widths of 300px or below, the player may lose functionality (e.g., volume controls may be omitted). * - YouTube requires an absolute minimum width of 200px. */ canPlayInline?: boolean;
	kickerText?: string;
	showPulsingDot?: boolean;

	containerPalette?: DCRContainerPalette;

	isExternalLink: boolean;

	showTopBarDesktop?: boolean;
	showTopBarMobile?: boolean;
	trailText?: string;
};
export const GridCard = ({
	format,
	headlineText,
	headlineSizes,
	byline,
	showByline,
	image,
	trailText,
	mediaSize = 'small',
	imageLoading,
	avatarUrl,
	mainMedia,
	canPlayInline = false,
	kickerText,
	showPulsingDot,
	containerPalette,
	isCrossword,
	isExternalLink,
	showTopBarDesktop = true,
	showTopBarMobile = true,
}: CardProps) => {
	const media = getMedia({
		imageUrl: image?.src,
		imageAltText: image?.altText,
		avatarUrl,
		isCrossword,
		slideshowImages: undefined,
		mainMedia,
		canPlayInline,
	});
	return (
		<FormatBoundary format={format}>
			{' '}
			<ContainerOverrides containerPalette={containerPalette}>
				<div
					css={[
						baseCardStyles,
						hoverStyles,
						showTopBarDesktop && desktopTopBarStyles('undefined'),
						showTopBarMobile && mobileTopBarStyles('undefined'),
					]}
				>
					{!!media?.imageUrl && (
						<GridItem area={'image'}>
							<CardPicture
								mainImage={media.imageUrl}
								imageSize={mediaSize}
								alt={media.imageAltText}
								loading={imageLoading}
								aspectRatio={'5:4'}
							/>
						</GridItem>
					)}
					{!!headlineText && (
						<GridItem area={'headline'}>
							<HeadlineWrapper>
								<CardHeadline
									headlineText={headlineText}
									format={format}
									fontSizes={headlineSizes}
									showQuotes={false}
									kickerText={
										format.design ===
											ArticleDesign.LiveBlog &&
										!kickerText
											? 'Live'
											: kickerText
									}
									showPulsingDot={
										format.design ===
											ArticleDesign.LiveBlog ||
										showPulsingDot
									}
									byline={byline}
									showByline={showByline}
									isExternalLink={isExternalLink}
								/>
							</HeadlineWrapper>
						</GridItem>
					)}

					{!!trailText && (
						<TrailText trailText={trailText} padTop={false} />
					)}
				</div>
			</ContainerOverrides>
		</FormatBoundary>
	);
};
