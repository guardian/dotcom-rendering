import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source/foundations';
import { from, space } from '@guardian/source/foundations';
import { useRef } from 'react';

export type FixedSlideWidth = {
	defaultWidth: number;
	widthFromBreakpoints: { breakpoint: Breakpoint; width: number }[];
};

type Props = {
	children: React.ReactNode;
	carouselLength: number;
	fixedSlideWidth: FixedSlideWidth;
};

const baseContainerStyles = css`
	position: relative;
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

export const ProductCarousel = ({
	children,
	carouselLength,
	fixedSlideWidth,
}: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);

	const carouselStyles = [
		baseCarouselStyles,
		generateFixedWidthColumStyles({
			carouselLength,
			fixedSlideWidth,
		}),
	];

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

	return (
		<div css={[baseContainerStyles]}>
			<ol
				ref={carouselRef}
				css={carouselStyles}
				data-heatphan-type="carousel"
				onFocus={scrollToCardOnFocus}
			>
				{children}
			</ol>
		</div>
	);
};
