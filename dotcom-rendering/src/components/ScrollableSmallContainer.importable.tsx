import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
// import { palette } from "../palette";
import {
	Button,
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import type { DCRFrontCard } from '../types/front';
import { FrontCard } from './FrontCard';

type Props = { trails: DCRFrontCard[] };

// const containerStyles = css`
// 	${from.tablet} {
// 		padding: 0 ${space[5]}px;
// 	}
// 	${from.wide} {
// 		padding-right: 100px;
// 	}
// `;

// const carouselStyles = css`
// 	display: grid;
// 	grid-auto-columns: 1fr;
// 	grid-auto-flow: column;
// 	overflow-x: auto;
// 	overflow-y: hidden;
// 	scroll-snap-type: x mandatory;
// 	scroll-behavior: smooth;
// 	overscroll-behavior-x: contain;
// 	overscroll-behavior-y: auto;
// 	${until.tablet} {
// 		scroll-padding-left: 10px;
// 	}
// 	${from.tablet} {
// 		scroll-padding-left: 120px;
// 	}
// 	${from.desktop} {
// 		scroll-padding-left: 240px;
// 	}
// 	${from.leftCol} {
// 		scroll-padding-left: 80px;
// 	}

// 	${from.wide} {
// 		scroll-padding-left: 240px;
// 	}
// 	/**
// 	* Hide scrollbars
// 	* See: https://stackoverflow.com/a/38994837
// 	*/
// 	::-webkit-scrollbar {
// 		display: none; /* Safari and Chrome */
// 	}
// 	scrollbar-width: none; /* Firefox */
// 	position: relative;
// `;

// const itemStyles = css`
// 	scroll-snap-align: start;
// 	grid-area: span 1;
// 	position: relative;
// 	margin: ${space[3]}px 10px;
// 	:first-child {
// 		${from.tablet} {
// 			margin-left: 0px;
// 		}

// 		/**
// 		* From left col we add space to the left margin to the first
// 		* child so that the first card in the carousel aligns
// 		* with the start of the pages content in the grid.
// 		*/

// 		${from.leftCol} {
// 			padding-left: 160px; /** 160 === 2 columns and 2 column gaps  */
// 		}
// 		${from.wide} {
// 			padding-left: 0;
// 			margin-left: 240px; /** 240 === 3 columns and 3 column gaps  */
// 		}
// 	}
// `;

// const verticalLineStyles = css`
// 	:not(:last-child)::after {
// 		content: '';
// 		position: absolute;
// 		top: 0;
// 		bottom: 0;
// 		right: -10px;
// 		width: 1px;
// 		background-color: ${palette('--card-border-top')};
// 		transform: translateX(-50%);
// 	}
// `;

/**
 * Generates CSS styles for a grid layout used in a carousel.
 *
 * @param {number} totalCards - The total number of cards in the carousel.
 * @returns {string} - The CSS styles for the grid layout.
 */
const generateCarouselColumnStyles = (totalCards: number) => {
	const peepingCardWidth = space[8];

	return css`
		${until.mobileMedium} {
			grid-template-columns: repeat(${totalCards}, 70%) max(30%);
		}

		${from.mobileMedium} {
			grid-template-columns: repeat(
				${totalCards},
				calc((100% - ${peepingCardWidth}px) / 2)
			);
		}

		${from.tablet} {
			grid-template-columns: repeat(${totalCards}, 1fr);
		}
	`;
};

/**
 * This is an island - todo
 *
 */
export const ScrollableSmallContainer = ({ trails }: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);
	const carouselLength = trails.length;
	const imageLoading = 'eager'; //todo
	const [showPreviousButton, setShowPreviousButton] = useState(false);
	const [showNextButton, setShowNextButton] = useState(true);

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
	 * TODO - should update the style of the navigation buttons based on the carousel's scroll position.
	 *
	 * This function checks the current scroll position of the carousel and sets the styles
	 * of the previous and next buttons accordingly. The previous button is disabled if the carousel
	 * is at the start, and the next button is disabled if the carousel is at the end.
	 */
	const updateButtonVisibilityOnScroll = () => {
		const carouselElement = carouselRef.current;
		if (!carouselElement) return;

		const scrollLeft = carouselElement.scrollLeft;
		const maxScrollLeft =
			carouselElement.scrollWidth - carouselElement.clientWidth;

		setShowPreviousButton(scrollLeft > 0);
		setShowNextButton(scrollLeft < maxScrollLeft);
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
		<div>
			<ol
				data-component=""
				ref={carouselRef}
				css={
					[
						// carouselStyles,
						// generateCarouselColumnStyles(carouselLength),
					]
				}
				data-heatphan-type="carousel"
			>
				{trails.map((trail) => {
					return (
						<li
							key={trail.url}
							// css={[itemStyles, verticalLineStyles]}
						>
							<FrontCard
								trail={trail}
								imageLoading={imageLoading}
								absoluteServerTimes={false}
								// TODO - specify card props
							/>
						</li>
					);
				})}
			</ol>

			<Hide until={'tablet'}>
				<div>
					<Button
						// cssOverrides={buttonStyles}
						hideLabel={true}
						iconSide="left"
						icon={<SvgChevronLeftSingle />}
						onClick={() => scrollTo('left')}
						aria-label="Move highlight stories backwards"
						data-link-name="highlights container left chevron"
						size="small"
					/>
				</div>

				<div>
					<Button
						// cssOverrides={buttonStyles}
						hideLabel={true}
						iconSide="left"
						icon={<SvgChevronRightSingle />}
						onClick={() => scrollTo('right')}
						aria-label="Move highlight stories forwards"
						data-link-name="highlights container right chevron"
						size="small"
					/>
				</div>
			</Hide>
		</div>
	);
};
