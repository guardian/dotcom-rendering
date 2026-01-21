import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source/foundations';
import { from, space, textSans14 } from '@guardian/source/foundations';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { nestedOphanComponents } from '../lib/ophan-helpers';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import { CarouselCount } from './CarouselCount';
import { CarouselNavigationButtons } from './CarouselNavigationButtons';
import { ProductCarouselCard } from './ProductCarouselCard';
import { Subheading } from './Subheading';

const carouselHeader = css`
	padding-bottom: 10px;
	padding-top: ${space[6]}px;
	border-bottom: 1px solid ${palette('--product-carousel-card-border')};
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
`;

const countStyles = css`
	${textSans14};
	color: ${palette('--product-carousel-card-counter')};
	align-content: center;
	display: block;
	${from.tablet} {
		display: none;
	}
`;

export type FixedSlideWidth = {
	defaultWidth: number;
	widthFromBreakpoints: { breakpoint: Breakpoint; width: number }[];
};

type Props = {
	products: ProductBlockElement[];
	format: ArticleFormat;
};

const baseContainerStyles = css`
	position: relative;
`;
const navigationStyles = css`
	padding-bottom: ${space[1]}px;
`;

const subgridStyles = css`
	scroll-snap-align: start;
	position: relative;
	display: grid;
	@supports (grid-template-rows: subgrid) {
		grid-column: span 1;
		grid-row: span 4;
		grid-template-rows: subgrid;
	}
`;

const leftBorderStyles = css`
	:not(:first-child)::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -10px;
		width: 1px;
		background-color: ${palette('--product-carousel-card-border')};
		transform: translateX(-50%);
	}
`;

const baseCarouselStyles = css`
	display: grid;
	width: 100%;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overscroll-behavior: contain auto;
	column-gap: ${space[5]}px;
	/**
	 * Hide scrollbars
	 * See: https://stackoverflow.com/a/38994837
	 */
	::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	scrollbar-width: none; /* Firefox */
`;

const generateFixedWidthColumStyles = ({
	fixedSlideWidth,
	carouselLength,
}: {
	fixedSlideWidth: FixedSlideWidth;
	carouselLength: number;
}) => {
	const fixedWidths: SerializedStyles[] = [];
	fixedWidths.push(css`
		grid-template-columns: repeat(
			${carouselLength},
			${fixedSlideWidth.defaultWidth}px
		);
	`);
	for (const { breakpoint, width } of fixedSlideWidth.widthFromBreakpoints) {
		fixedWidths.push(css`
			${from[breakpoint]} {
				grid-template-columns: repeat(${carouselLength}, ${width}px);
			}
		`);
	}
	return fixedWidths;
};

/**
 * This product carousel has some functionality copied from the ScrollableCarousel.
 * As this is part of an A/B/C test, we have decided to copy this functionality so
 * we can move quickly. There will be some work to define a base carousel at some
 * point to see what functionality can be shared.
 */
export const ScrollableProduct = ({ products, format }: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);
	const [previousButtonEnabled, setPreviousButtonEnabled] = useState(false);
	const [nextButtonEnabled, setNextButtonEnabled] = useState(true);
	const [cardCount, setCardCount] = useState(1);

	const carouselLength = products.length;
	const fixedSlideWidth: FixedSlideWidth = {
		defaultWidth: 240,
		widthFromBreakpoints: [
			{ breakpoint: 'mobileMedium', width: 280 },
			{ breakpoint: 'tablet', width: 220 },
		],
	};

	const carouselStyles = [
		baseCarouselStyles,
		generateFixedWidthColumStyles({
			carouselLength,
			fixedSlideWidth,
		}),
	];
	/**
	 * --- COPIED FROM ScrollableCarousel ---
	 */
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
	 * --- COPIED FROM ScrollableCarousel ---
	 * Throttle scroll events to optimise performance. As we're only using this
	 * to toggle button state as the carousel is scrolled we don't need to
	 * handle every event. This function ensures the callback is only called
	 * once every 200ms, no matter how many scroll events are fired.
	 */
	const throttleEvent = (callback: () => void) => {
		let isThrottled: boolean = false;
		return function () {
			if (!isThrottled) {
				callback();
				isThrottled = true;
				setTimeout(() => (isThrottled = false), 200);
			}
		};
	};

	/**
	 * --- COPIED FROM ScrollableCarousel ---
	 * Scrolls the carousel to a certain position when a card gains focus.
	 *
	 * If a card gains focus (e.g. by tabbing through the elements of the page) then the browser
	 * will scroll the container to the focused card if it is NOT visible. If it is partially visible,
	 * such as in the case with our carousel, then the browser will not bring the card in to view.
	 * (Tested with Chrome and Firefox).
	 */
	const scrollToCardOnFocus = () => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) return;

		/**
		 * We know the carousel has focus,
		 */
		let focusedCarouselPosition = null;
		for (const [index, element] of Array.from(
			carouselElement.childNodes,
		).entries()) {
			if (element.contains(document.activeElement)) {
				focusedCarouselPosition = index + 1;
			}
		}

		/**
		 * If none of the cards in the carousel have focus, we don't change the carousel scroll position.
		 */
		if (focusedCarouselPosition === null) return;

		const cardWidth = carouselElement.querySelector('li')?.offsetWidth ?? 0;

		/**
		 * We use rounding as the users left scroll position is not always equal to the card width, but it is
		 * very close. If the user is mid-scroll when starting focus on a carousel item (unlikely!) then the
		 * scroll position is whichever is closest. We don't need to be exact as the number of carousel slides is small.
		 */
		const scrollPosition = Math.round(
			(carouselElement.scrollLeft + cardWidth) / cardWidth,
		);

		/**
		 * If the focused card is next to the card in the left-most position, then it
		 * is not completely off-screen. It is either partially visible or entirely
		 * visible (when the number of visible carousel slides is greater than 1).
		 *
		 * Bring this adjacent card into the left-most position.
		 */
		if (focusedCarouselPosition === scrollPosition + 1) {
			scrollTo('right');
		} else if (focusedCarouselPosition === scrollPosition - 1) {
			scrollTo('left');
		}
	};

	/**
	 * Update the count of the first card / how far scrolled the carousel is
	 *
	 * This function checks how far along the carousel is scrolled and then
	 * updates the state of cardCount. we use the half of a card because at
	 * this scroll amount the carousel will snap to that card.
	 */
	const updateCardCountOnScroll = useCallback(() => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) return;

		const cardWidth = carouselElement.querySelector('li')?.offsetWidth ?? 0;
		if (!cardWidth) return;

		const count = Math.ceil(
			(carouselElement.scrollLeft + cardWidth / 2) / cardWidth,
		);

		setCardCount((prev) => (prev === count ? prev : count));
	}, []);

	/**
	 * Updates state of navigation buttons based on carousel's scroll position.
	 *
	 * This function checks the current scroll position of the carousel and sets
	 * the styles of the previous and next buttons accordingly. The button state
	 * is toggled when the midpoint of the first or last card has been scrolled
	 * in or out of view.
	 */
	const updateButtonVisibilityOnScroll = useCallback(() => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) return;

		const scrollLeft = carouselElement.scrollLeft;
		const maxScrollLeft =
			carouselElement.scrollWidth - carouselElement.clientWidth;
		const cardWidth = carouselElement.querySelector('li')?.offsetWidth ?? 0;

		setPreviousButtonEnabled(scrollLeft > cardWidth / 2);
		setNextButtonEnabled(scrollLeft < maxScrollLeft - cardWidth / 2);
	}, []);

	const throttledCardCount = useMemo(
		() => throttleEvent(updateCardCountOnScroll),
		[updateCardCountOnScroll],
	);

	const throttledButtonVisibility = useMemo(
		() => throttleEvent(updateButtonVisibilityOnScroll),
		[updateButtonVisibilityOnScroll],
	);

	useEffect(() => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) return;

		carouselElement.addEventListener('scroll', throttledCardCount);
		carouselElement.addEventListener('scroll', throttledButtonVisibility);

		return () => {
			carouselElement.removeEventListener('scroll', throttledCardCount);
			carouselElement.removeEventListener(
				'scroll',
				throttledButtonVisibility,
			);
		};
	}, [throttledCardCount, throttledButtonVisibility]);

	return (
		<>
			<div css={carouselHeader}>
				<Subheading
					format={format}
					id={'at-a-glance'}
					topPadding={false}
				>
					At a glance
				</Subheading>
				<div
					css={navigationStyles}
					id={'at-a-glance-carousel-navigation'}
				></div>
				<div css={countStyles} id={'at-a-glance-carousel-count'}></div>
			</div>
			<div css={[baseContainerStyles]}>
				<ol
					ref={carouselRef}
					css={carouselStyles}
					data-heatphan-type="carousel"
					onFocus={scrollToCardOnFocus}
				>
					{products.map((product: ProductBlockElement) => (
						<li
							key={
								product.productCtas[0]?.url ?? product.elementId
							}
							css={[subgridStyles, leftBorderStyles]}
						>
							<ProductCarouselCard
								product={product}
								format={format}
							/>
						</li>
					))}
				</ol>
				<CarouselNavigationButtons
					previousButtonEnabled={previousButtonEnabled}
					nextButtonEnabled={nextButtonEnabled}
					onClickPreviousButton={() => scrollTo('left')}
					onClickNextButton={() => scrollTo('right')}
					sectionId={'at-a-glance'}
					dataLinkNamePreviousButton={nestedOphanComponents(
						'carousel',
						'previous-button',
					)}
					dataLinkNameNextButton={nestedOphanComponents(
						'carousel',
						'next-button',
					)}
				/>
				<CarouselCount
					sectionId={'at-a-glance'}
					count={cardCount}
					total={carouselLength}
				/>
			</div>
		</>
	);
};
