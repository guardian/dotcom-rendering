import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold12,
	until,
	width,
} from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import { takeFirst } from '../lib/tuple';
import { palette } from '../palette';
import type { DCRSlideshowMedia } from '../types/front';
import type { MediaSizeType } from './Card/components/MediaWrapper';
import { CardPicture } from './CardPicture';
import { SelfHostedVideo } from './SelfHostedVideo.island';
import type { SubtitleSize } from './SelfHostedVideoPlayer';
import { SlideshowCarouselScrollingDots } from './SlideshowCarouselScrollingDots';
import { YoutubeBlockComponent } from './YoutubeBlockComponent.island';

/**
 * Spike helpers for supporting mixed media (images and videos) in a slideshow.
 * A slide is treated as an image unless it is explicitly typed as a video.
 */
const isVideoSlide = (
	slide: DCRSlideshowMedia,
): slide is Extract<DCRSlideshowMedia, { type: 'video' }> =>
	slide.type === 'video';

const getSlideKey = (slide: DCRSlideshowMedia): string => {
	if (!isVideoSlide(slide)) return slide.imageSrc;
	return slide.video.type === 'YoutubeVideo'
		? slide.video.id
		: slide.video.atomId;
};

const getSlideCaption = (slide: DCRSlideshowMedia): string | undefined =>
	isVideoSlide(slide) ? slide.caption : slide.imageCaption;

const themeButton: Partial<ThemeButton> = {
	borderTertiary: palette('--carousel-chevron-border'),
	textTertiary: palette('--carousel-chevron'),
	backgroundTertiaryHover: palette('--carousel-chevron-hover'),
};

const themeButtonDisabled: Partial<ThemeButton> = {
	borderTertiary: palette('--carousel-chevron-border-disabled'),
	textTertiary: palette('--carousel-chevron-disabled'),
	backgroundTertiaryHover: 'transparent',
};

const carouselStyles = css`
	display: flex;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overscroll-behavior: contain auto;
	/**
	 * Hide scrollbars
	 * See: https://stackoverflow.com/a/38994837
	 */
	::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	scrollbar-width: none; /* Firefox */
`;

const carouselItemStyles = css`
	position: relative;
	flex: 1 0 100%;
	scroll-snap-align: start;
`;

const containerStyles = css`
	position: relative;
	z-index: ${getZIndex('card-nested-link')};
`;

const captionStyles = css`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	${textSansBold12}
	color: ${palette('--slideshow-caption')};
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0.8) 100%
	);
	padding: ${space[10]}px ${space[2]}px ${space[2]}px;
`;

const navigationStyles = (hasBackgroundColour: boolean) => css`
	display: flex;
	align-items: center;
	padding-top: ${space[2]}px;

	${until.tablet} {
		background-color: ${hasBackgroundColour
			? palette('--slideshow-navigation-background')
			: 'transparent'};
	}
`;

const buttonStyles = css`
	display: none;
	${from.tablet} {
		display: flex;
		gap: ${space[1]}px;
	}
`;

/**
 * Padding is added to the left of the scrolling navigation dots to match the
 * width of the navigation buttons on the right at tablet and above. This allows
 * them to be centred below the slideshow image.
 */
const scrollingDotStyles = css`
	display: flex;
	justify-content: center;
	flex: 1 0 0;
	${from.tablet} {
		padding-left: ${width.ctaSmall * 2 + space[2]}px;
	}
`;

const mediaOverlayStyles = css`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
`;

/** Contains the player's z-index, so the caption can sit on top */
const videoPlayerStyles = css`
	isolation: isolate;
`;

const slideLinkStyles = css`
	display: block;
`;

/** Lets clicks through to the video under the caption */
const videoCaptionStyles = css`
	pointer-events: none;
`;

/** Hides the caption once play is clicked, like YouTube's own overlays, so it doesn't cover YouTube's controls */
const youtubeSlideStyles = css`
	&:has(iframe, [data-name^='youtube-placeholder']) > figcaption {
		display: none;
	}
`;

type Props = {
	/**
	 * Slides may be images or videos. The prop retains the `images` name for
	 * backwards compatibility while we spike mixed-media slideshows.
	 */
	images: readonly DCRSlideshowMedia[];
	imageSize: MediaSizeType;
	hasNavigationBackgroundColour: boolean;
	linkTo: string;
	linkAriaLabel: string;
	dataLinkName?: string;
	uniqueId: string;
	subtitleSize: SubtitleSize;
	format: ArticleFormat;
};

export const SlideshowCarousel = ({
	images,
	imageSize,
	hasNavigationBackgroundColour,
	linkTo,
	linkAriaLabel,
	dataLinkName,
	uniqueId,
	subtitleSize,
	format,
}: Props) => {
	const carouselRef = useRef<HTMLUListElement | null>(null);
	const [previousButtonEnabled, setPreviousButtonEnabled] = useState(false);
	const [nextButtonEnabled, setNextButtonEnabled] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);

	const scrollTo = (direction: 'left' | 'right') => {
		if (!carouselRef.current) {
			return;
		}

		const cardWidth =
			carouselRef.current.querySelector('li')?.offsetWidth ?? 0;
		const offset = direction === 'left' ? -cardWidth : cardWidth;
		carouselRef.current.scrollBy({
			left: offset,
			behavior: 'smooth',
		});
	};

	/**
	 * Updates state of navigation buttons based on carousel's scroll position.
	 *
	 * This function checks the current scroll position of the carousel and sets
	 * the styles of the previous and next buttons accordingly. The button state
	 * is toggled when the midpoint of the first or last card has been scrolled
	 * in or out of view.
	 */
	const updatePaginationStateOnScroll = () => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) {
			return;
		}

		const scrollLeft = carouselElement.scrollLeft;
		const maxScrollLeft =
			carouselElement.scrollWidth - carouselElement.clientWidth;
		const cardWidth = carouselElement.querySelector('li')?.offsetWidth ?? 0;

		setPreviousButtonEnabled(scrollLeft > cardWidth / 2);
		setNextButtonEnabled(scrollLeft < maxScrollLeft - cardWidth / 2);
		setCurrentPage(Math.round(scrollLeft / cardWidth));
	};

	/**
	 * Throttle scroll events to optimise performance. As the scroll events are
	 * used to trigger the pagination dot animation we're using
	 * `requestAnimationFrame` rather than `setTimeout` to ensure this animates
	 * smoothly in sync with the carousel being scrolled.
	 */
	const throttleEvent = (callback: () => void) => {
		let requestId: number;
		return function () {
			cancelAnimationFrame(requestId);
			requestId = requestAnimationFrame(callback);
		};
	};

	useEffect(() => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) {
			return;
		}

		carouselElement.addEventListener(
			'scroll',
			throttleEvent(updatePaginationStateOnScroll),
		);

		return () => {
			carouselElement.removeEventListener(
				'scroll',
				throttleEvent(updatePaginationStateOnScroll),
			);
		};
	}, []);

	/**
	 * Restrict slideshow to a maximum of 10 slides
	 */
	const slides = takeFirst(images, 10);
	const slideCount = slides.length;

	return (
		<div
			css={containerStyles}
			role="region"
			aria-roledescription="carousel"
			aria-label="Slideshow"
			aria-live="polite"
		>
			<ul
				ref={carouselRef}
				css={carouselStyles}
				data-heatphan-type="carousel"
			>
				{slides.map((slide, index) => {
					const loading = index > 0 ? 'lazy' : 'eager';
					const caption = getSlideCaption(slide);
					const isCurrentSlide = index === currentPage;
					const slideId = `${uniqueId}-slide-${index}`;
					return (
						<li
							css={carouselItemStyles}
							key={getSlideKey(slide)}
							role="group"
							aria-roledescription="slide"
							aria-label={caption}
							aria-hidden={!isCurrentSlide}
							// @ts-expect-error -- `inert` is only typed from React 19, where it becomes a boolean
							inert={isCurrentSlide ? undefined : ''}
						>
							{/* Video slides aren't links, so clicks reach the video controls */}
							{isVideoSlide(slide) ? (
								<figure
									css={
										slide.video.type === 'YoutubeVideo'
											? youtubeSlideStyles
											: undefined
									}
								>
									<div css={videoPlayerStyles}>
										{slide.video.type === 'YoutubeVideo' ? (
											<YoutubeBlockComponent
												id={slide.video.id}
												assetId={slide.video.videoId}
												index={slideId}
												duration={slide.video.duration}
												posterImage={slide.video.image}
												width={slide.video.width}
												height={slide.video.height}
												origin={slide.video.origin}
												mediaTitle={slide.video.title}
												altText={caption}
												expired={slide.video.expired}
												format={format}
												hideCaption={true}
												stickyVideos={false}
												pauseOffscreenVideo={true}
												hidePillOnMobile={false}
												enableAds={false}
												aspectRatio="5:4"
												isLive={slide.video.isLive}
											/>
										) : (
											<SelfHostedVideo
												sources={slide.video.sources}
												atomId={slide.video.atomId}
												uniqueId={slideId}
												videoStyle={
													slide.video.videoStyle
												}
												aspectRatio={
													slide.video.aspectRatio
												}
												posterImage={
													slide.video.image.src ?? ''
												}
												posterImageAspectRatio={
													slide.video.image
														.aspectRatio
												}
												fallbackImage={
													slide.video.image.src ?? ''
												}
												fallbackImageSize={imageSize}
												fallbackImageLoading={loading}
												fallbackImageAlt={caption}
												fallbackImageAspectRatio="5:4"
												linkTo={linkTo}
												subtitleSource={
													slide.video.subtitleSource
												}
												subtitleSize={subtitleSize}
												// Keeps the caption clear of the controls and subtitles
												controlsPosition={
													caption ? 'top' : 'bottom'
												}
												hideProgressBar={!!caption}
												// Cropped to 5:4 like the image slides
												minAspectRatio={5 / 4}
												maxAspectRatio={5 / 4}
												preventAutoplay={false}
											/>
										)}
									</div>
									{!!caption && (
										<figcaption
											css={[
												captionStyles,
												videoCaptionStyles,
											]}
										>
											{caption}
										</figcaption>
									)}
								</figure>
							) : (
								<a
									href={linkTo}
									aria-label={linkAriaLabel}
									data-link-name={dataLinkName}
									css={slideLinkStyles}
								>
									<figure>
										<CardPicture
											mainImage={slide.imageSrc}
											imageSize={imageSize}
											aspectRatio="5:4"
											alt={caption}
											loading={loading}
										/>
										{!!caption && (
											<figcaption css={captionStyles}>
												{caption}
											</figcaption>
										)}
									</figure>
									<div
										css={mediaOverlayStyles}
										className="media-overlay"
									/>
								</a>
							)}
						</li>
					);
				})}
			</ul>

			{slideCount > 1 && (
				<div
					className="slideshow-carousel-footer"
					css={navigationStyles(hasNavigationBackgroundColour)}
					role="group"
					aria-label="Slide controls"
				>
					<div css={scrollingDotStyles}>
						<SlideshowCarouselScrollingDots
							total={slideCount}
							current={currentPage}
						/>
					</div>
					<div css={buttonStyles}>
						<Button
							hideLabel={true}
							iconSide="left"
							icon={<SvgChevronLeftSingle />}
							onClick={() => scrollTo('left')}
							priority="tertiary"
							theme={
								previousButtonEnabled
									? themeButton
									: themeButtonDisabled
							}
							size="small"
							disabled={!previousButtonEnabled}
							aria-label="Previous slide"
							// TODO: data-link-name="slideshow carousel left chevron"
						/>

						<Button
							hideLabel={true}
							iconSide="left"
							icon={<SvgChevronRightSingle />}
							onClick={() => scrollTo('right')}
							priority="tertiary"
							theme={
								nextButtonEnabled
									? themeButton
									: themeButtonDisabled
							}
							size="small"
							disabled={!nextButtonEnabled}
							aria-label="Next slide"
							// TODO: data-link-name="slideshow carousel right chevron"
						/>
					</div>
				</div>
			)}
		</div>
	);
};
