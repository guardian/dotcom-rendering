import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Breakpoint } from '@guardian/source/foundations';
import { from, space } from '@guardian/source/foundations';
import { useRef } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import { ProductCarouselCard } from './ProductCarouselCard';

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
		background-color: ${palette('--card-border-top')};
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
				{products.map((product: ProductBlockElement) => (
					<li
						key={product.productCtas[0]?.url ?? product.elementId}
						css={[subgridStyles, leftBorderStyles]}
					>
						<ProductCarouselCard
							product={product}
							format={format}
						/>
					</li>
				))}
			</ol>
		</div>
	);
};
