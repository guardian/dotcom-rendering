import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import { useRef } from 'react';
import { palette } from '../palette';

type Props = {
	children: React.ReactNode;
	carouselLength: number;
	visibleCardsOnMobile: number;
	visibleCardsOnTablet: number;
};

/**
 * Grid sizing values to calculate negative margin used to pull navigation
 * buttons outside of container into the outer grid column at wide breakpoint.
 */
const gridGap = 20;
const gridGapMobile = 10;

/**
 * On mobile the carousel extends into the outer margins to use the full width
 * of the screen. From tablet onwards the carousel sits within the page grid.
 *
 * The FrontSection container adds a -10px negative margin to either side of
 * the content from tablet so we add the margins back to align the carousel with
 * the grid. From leftCol we retain FrontSection's -10px negative margin on the
 * left side so that the carousel extends into the the middle of the gutter
 * between the grid columns to meet the dividing line.
 */
const containerStyles = css`
	position: relative;
	margin-left: -${gridGapMobile}px;
	margin-right: -${gridGapMobile}px;
	${from.mobileLandscape} {
		margin-left: -${gridGap}px;
		margin-right: -${gridGap}px;
	}
	${from.tablet} {
		margin-left: ${gridGap / 2}px;
		margin-right: ${gridGap / 2}px;
	}
	${from.leftCol} {
		margin-left: 0;
	}
`;

const carouselStyles = css`
	display: grid;
	width: 100%;
	grid-auto-flow: unset;
	grid-auto-columns: unset;
	grid-auto-rows: unset;
	gap: 20px;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overscroll-behavior: contain auto;

	::-webkit-scrollbar {
		display: none;
	}
	scrollbar-width: none;

	padding-left: ${gridGapMobile}px;
	padding-right: ${gridGapMobile}px;
	scroll-padding-left: ${gridGapMobile}px;
	${from.mobileLandscape} {
		padding-left: ${gridGap}px;
		padding-right: ${gridGap}px;
		scroll-padding-left: ${gridGap}px;
	}
	${from.tablet} {
		padding-left: 0;
		padding-right: 0;
		scroll-padding-left: 0;
	}
	${from.leftCol} {
		padding-left: ${gridGap / 2}px;
		scroll-padding-left: ${gridGap / 2}px;
	}

	grid-template-rows: repeat(2, auto);
`;

const itemStyles = css`
	display: flex;
	scroll-snap-align: start;
	grid-area: span 1;
	position: relative;
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

/**
 * Generates CSS styles for a grid layout used in a carousel.
 *
 * @param {number} totalCards - The total number of cards in the carousel.
 * @param {number} visibleCardsOnMobile - Number of cards to show at once on mobile.
 * @param {number} visibleCardsOnTablet - Number of cards to show at once on tablet.
 * @returns {string} - The CSS styles for the grid layout.
 */
const generateCarouselColumnStyles = (
	totalCards: number,
	visibleCardsOnMobile: number,
	visibleCardsOnTablet: number,
) => {
	const columns = Math.ceil(totalCards / 2);
	const peepingCardWidth = space[8];
	const cardGap = 20;
	const offsetPeepingCardWidth =
		peepingCardWidth / visibleCardsOnMobile + cardGap;
	const offsetCardGap =
		(cardGap * (visibleCardsOnTablet - 1)) / visibleCardsOnTablet;

	return css`
		grid-template-columns: repeat(
			${columns},
			calc(
				(100% / ${visibleCardsOnMobile}) - ${offsetPeepingCardWidth}px +
					${gridGapMobile / visibleCardsOnMobile}px
			)
		);

		${from.mobileLandscape} {
			grid-template-columns: repeat(
				${columns},
				calc(
					(100% / ${visibleCardsOnMobile}) -
						${offsetPeepingCardWidth}px +
						${gridGap / visibleCardsOnMobile}px
				)
			);
		}
		${from.tablet} {
			grid-template-columns: repeat(
				${columns},
				calc(${100 / visibleCardsOnTablet}% - ${offsetCardGap}px)
			);
		}
	`;
};

/**
 * A component used in the scrollable small carousel to display up to two stacked rows of cards.
 */
export const ScrollableCarouselStacked = ({
	children,
	carouselLength,
	visibleCardsOnMobile,
	visibleCardsOnTablet,
}: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);

	return (
		<div css={containerStyles}>
			<ol
				ref={carouselRef}
				css={[
					carouselStyles,
					generateCarouselColumnStyles(
						carouselLength,
						visibleCardsOnMobile,
						visibleCardsOnTablet,
					),
				]}
				data-heatphan-type="carousel"
			>
				{children}
			</ol>
		</div>
	);
};

ScrollableCarouselStacked.Item = ({
	children,
}: {
	children: React.ReactNode;
}) => <li css={itemStyles}>{children}</li>;
