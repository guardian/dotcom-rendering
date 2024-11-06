import { css } from '@emotion/react';
import {
	from,
	height,
	space,
	textSansBold17Object,
} from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { palette } from '../palette';

type Props = {
	children: React.ReactNode;
	carouselLength: number;
	visibleCardsOnMobile: number;
	visibleCardsOnTablet: number;
};

/**
 * This needs to match the `FrontSection` title font and is used to calculate
 * the negative margin that aligns the navigation buttons with the title.
 */
const titlePreset = textSansBold17Object;

/**
 * Grid sizing to calculate negative margin used to pull navigation buttons
 * out side of `FrontSection` container at `wide` breakpoint.
 */
const gridColumnWidth = '60px';
const gridGap = '20px';

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
	margin-left: -10px;
	margin-right: -10px;
	${from.mobileLandscape} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${from.tablet} {
		margin-left: 10px;
		margin-right: 10px;
	}
	${from.leftCol} {
		margin-left: 0;
		::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			width: 1px;
			background-color: ${palette('--card-border-top')};
			transform: translateX(-50%);
		}
	}
`;

const containerWithNavigationStyles = css`
	display: flex;
	flex-direction: column-reverse;
	${from.tablet} {
		gap: ${space[2]}px;
	}

	${from.wide} {
		flex-direction: row;
		gap: ${space[1]}px;
	}

	/**
	 * From tablet, pull container up so navigation buttons align with title.
	 * The margin is calculated from the front section title font size and line
	 * height, and the default container spacing.
	 *
	 * From wide, the navigation buttons are pulled out of the main content area
	 * into the right-hand column.
	 *
	 * Between leftCol and wide the top of the fixed dividing line is pushed
	 * down so it starts below the navigation buttons and gap, and aligns with
	 * the top of the carousel.
	 */
	${from.tablet} {
		margin-top: calc(
			(-${titlePreset.fontSize} * ${titlePreset.lineHeight}) -
				${space[3]}px
		);
	}
	${from.leftCol} {
		margin-top: 0;
		::before {
			top: ${height.ctaSmall + space[2]}px;
		}
	}
	${from.wide} {
		margin-right: calc(${space[2]}px - ${gridColumnWidth} - ${gridGap});
		::before {
			top: 0;
		}
	}
`;

const carouselStyles = css`
	display: grid;
	width: 100%;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	gap: 20px;
	overflow-x: auto;
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

	padding-left: 10px;
	padding-right: 10px;
	scroll-padding-left: 10px;
	${from.mobileLandscape} {
		padding-left: 20px;
		padding-right: 20px;
		scroll-padding-left: 20px;
	}
	${from.tablet} {
		padding-left: 0;
		padding-right: 0;
		scroll-padding-left: 0;
	}
	${from.leftCol} {
		padding-left: 10px;
		scroll-padding-left: 10px;
	}
`;

const buttonStyles = css`
	display: none;
	${from.tablet} {
		display: flex;
		gap: ${space[1]}px;
		margin-left: auto;
	}
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
	const peepingCardWidth = space[8];
	const cardGap = 20;
	const offsetPeepingCardWidth =
		peepingCardWidth / visibleCardsOnMobile + cardGap;
	const offsetCardGap =
		(cardGap * (visibleCardsOnTablet - 1)) / visibleCardsOnTablet;

	return css`
		/**
		 * On mobile a 32px slice of the next card is shown to indicate there
		 * are more cards that can be scrolled to. Extra padding is also added
		 * to the left and right to align cards with the page grid as the
		 * carousel extends into the outer margins on mobile.
		 *
		 * These values are divided by the number of visible cards and
		 * subtracted from their width so they are shown at the correct size.
		 */
		grid-template-columns: repeat(
			${totalCards},
			calc(
				(100% / ${visibleCardsOnMobile}) - ${offsetPeepingCardWidth}px +
					${10 / visibleCardsOnMobile}px
			)
		);
		${from.mobileLandscape} {
			grid-template-columns: repeat(
				${totalCards},
				calc(
					(100% / ${visibleCardsOnMobile}) -
						${offsetPeepingCardWidth}px +
						${20 / visibleCardsOnMobile}px
				)
			);
		}
		${from.tablet} {
			grid-template-columns: repeat(
				${totalCards},
				calc(${100 / visibleCardsOnTablet}% - ${offsetCardGap}px)
			);
		}
	`;
};

/**
 * A component used in the carousel fronts containers (e.g. small/medium/feature)
 */
export const ScrollableCarousel = ({
	children,
	carouselLength,
	visibleCardsOnMobile,
	visibleCardsOnTablet,
}: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);
	const [previousButtonEnabled, setPreviousButtonEnabled] = useState(false);
	const [nextButtonEnabled, setNextButtonEnabled] = useState(true);

	const showNavigation = carouselLength > visibleCardsOnTablet;

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
	 * the styles of the previous and next buttons accordingly. The previous
	 * button is disabled if the carousel is at the start, and the next button
	 * is disabled if the carousel is at the end.
	 */
	const updateButtonVisibilityOnScroll = () => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) return;

		const scrollLeft = carouselElement.scrollLeft;
		const maxScrollLeft =
			carouselElement.scrollWidth - carouselElement.clientWidth;

		setPreviousButtonEnabled(scrollLeft > 0);
		setNextButtonEnabled(scrollLeft < maxScrollLeft);
	};

	useEffect(() => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) return;

		carouselElement.addEventListener(
			'scroll',
			updateButtonVisibilityOnScroll,
		);

		return () => {
			carouselElement.removeEventListener(
				'scroll',
				updateButtonVisibilityOnScroll,
			);
		};
	}, []);

	return (
		<div
			css={[
				containerStyles,
				showNavigation && containerWithNavigationStyles,
			]}
		>
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
			{showNavigation && (
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
						// TODO
						// aria-label="Move stories backwards"
						// data-link-name="container left chevron"
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
						// TODO
						// aria-label="Move stories forwards"
						// data-link-name="container right chevron"
					/>
				</div>
			)}
		</div>
	);
};

ScrollableCarousel.Item = ({ children }: { children: React.ReactNode }) => (
	<li css={itemStyles}>{children}</li>
);
