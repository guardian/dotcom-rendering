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
import { takeFirst } from '../lib/tuple';
import { palette } from '../palette';
import type { DCRSlideshowImage } from '../types/front';
import type { ImageSizeType } from './Card/components/ImageWrapper';
import { CardPicture } from './CardPicture';
import { SlideshowCarouselScrollingDots } from './SlideshowCarouselScrollingDots';

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

type Props = {
	images: readonly DCRSlideshowImage[];
	imageSize: ImageSizeType;
	hasNavigationBackgroundColour: boolean;
};

export const SlideshowCarousel = ({
	images,
	imageSize,
	hasNavigationBackgroundColour,
}: Props) => {
	const carouselRef = useRef<HTMLUListElement | null>(null);
	const [previousButtonEnabled, setPreviousButtonEnabled] = useState(false);
	const [nextButtonEnabled, setNextButtonEnabled] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);

	const scrollTo = (direction: 'left' | 'right') => {
		if (!carouselRef.current) return;

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
		if (!carouselElement) return;

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
		if (!carouselElement) return;

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
	 * Restrict slideshow to a maximum of 10 images
	 */
	const slideshowImages = takeFirst(images, 10);
	const slideshowImageCount = slideshowImages.length;

	return (
		<div>
			<ul
				ref={carouselRef}
				css={carouselStyles}
				data-heatphan-type="carousel"
			>
				{slideshowImages.map((image, index) => {
					const loading = index > 0 ? 'lazy' : 'eager';
					return (
						<li css={carouselItemStyles} key={image.imageSrc}>
							<figure>
								<CardPicture
									mainImage={image.imageSrc}
									imageSize={imageSize}
									aspectRatio="5:4"
									alt={image.imageCaption}
									loading={loading}
								/>
								{!!image.imageCaption && (
									<figcaption css={captionStyles}>
										{image.imageCaption}
									</figcaption>
								)}
							</figure>
						</li>
					);
				})}
			</ul>

			{slideshowImageCount > 1 && (
				<div css={navigationStyles(hasNavigationBackgroundColour)}>
					<div css={scrollingDotStyles}>
						<SlideshowCarouselScrollingDots
							total={slideshowImageCount}
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
							aria-label="View next image in slideshow"
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
							aria-label="View previous image in slideshow"
							// TODO: data-link-name="slideshow carousel right chevron"
						/>
					</div>
				</div>
			)}
		</div>
	);
};
