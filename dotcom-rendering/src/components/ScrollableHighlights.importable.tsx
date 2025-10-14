import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import {
	Button,
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import { ophanComponentId } from '../lib/ophan-helpers';
import { getHighlightClickHistory } from '../lib/personaliseHighlights';
import { palette } from '../palette';
import type { DCRFrontCard } from '../types/front';
import { HighlightsCard } from './Masthead/HighlightsCard';

type Props = {
	trails: DCRFrontCard[];
	frontId?: string;
};

const containerStyles = css`
	padding: ${space[2]}px 0 ${space[3]}px;
	${from.tablet} {
		padding: ${space[2]}px ${space[5]}px;
	}
	${from.wide} {
		padding-right: 100px;
	}
`;

const cardGap = 10;
const horizontalPaddingMobile = 10;
const horizontalPaddingMobileLandscape = 20;

const carouselStyles = css`
	display: grid;
	gap: ${cardGap}px;
	padding: 0 ${horizontalPaddingMobile}px;
	scroll-padding-left: ${horizontalPaddingMobile}px;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overscroll-behavior-x: contain;
	overscroll-behavior-y: auto;

	${from.mobileLandscape} {
		padding: 0 ${horizontalPaddingMobileLandscape}px;
		scroll-padding-left: ${horizontalPaddingMobileLandscape}px;
	}
	${from.tablet} {
		padding: 0;
		scroll-padding-left: 120px;
		gap: ${space[5]}px;
	}
	${from.desktop} {
		scroll-padding-left: 240px;
	}
	${from.leftCol} {
		scroll-padding-left: 160px;
		padding-left: 160px;
	}
	${from.wide} {
		scroll-padding-left: 240px;
		padding-left: 240px;
	}

	/**
	* Hide scrollbars
	* See: https://stackoverflow.com/a/38994837
	*/
	::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	scrollbar-width: none; /* Firefox */
	position: relative;
`;

const itemStyles = css`
	scroll-snap-align: start;
	grid-area: span 1;
	position: relative;
`;

const verticalLineStyles = css`
	${from.tablet} {
		:not(:first-child)::before {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: -10px;
			width: 1px;
			background-color: ${palette('--highlights-container-separator')};
			transform: translateX(-50%);
		}
	}
`;

const buttonStyles = css`
	z-index: ${getZIndex('highlights-carousel-buttons')};
`;

const buttonOverlayStyles = css`
	width: 60px;
	height: 100%;
	display: flex;
	align-items: center;
	position: absolute;
	top: 0;
	pointer-events: all;
`;

const previousButtonFadeStyles = css`
	left: ${space[5]}px;
	background: linear-gradient(
		to right,
		${palette('--highlights-container-start-fade')} 0%,
		${palette('--highlights-container-mid-fade')} 60%,
		${palette('--highlights-container-end-fade')} 100%
	);
`;

const nextButtonFadeStyles = css`
	right: ${space[5]}px;
	justify-content: flex-end;
	background: linear-gradient(
		to left,
		${palette('--highlights-container-start-fade')} 0px,
		${palette('--highlights-container-mid-fade')} 60%,
		${palette('--highlights-container-end-fade')} 100%
	);
`;

/**
 * Generates CSS styles for a grid layout used in a carousel.
 *
 * @param {number} totalCards - The total number of cards in the carousel.
 * @returns {string} - The CSS styles for the grid layout.
 */
const generateCarouselColumnStyles = (totalCards: number) => {
	const peepingCardWidthMobile = 150; // Screens below 375px. Only one card is fully visible;
	const peepingCardWidthMobileMedium = space[8];

	return css`
		grid-template-columns: repeat(
			${totalCards},
			max(
				180px,
				calc(
					100vw -
						(
							${horizontalPaddingMobile +
							cardGap +
							peepingCardWidthMobile}px
						)
				)
			)
		);
		${from.mobileMedium} {
			grid-template-columns: repeat(
				${totalCards},
				calc(
					(
							100vw -
								${horizontalPaddingMobile +
								2 * cardGap +
								peepingCardWidthMobileMedium}px
						) / 2
				)
			);
		}
		${from.mobileLandscape} {
			grid-template-columns: repeat(
				${totalCards},
				calc(
					(
							100vw -
								${horizontalPaddingMobileLandscape +
								2 * cardGap +
								peepingCardWidthMobileMedium}px
						) / 2
				)
			);
		}
		${from.tablet} {
			grid-template-columns: repeat(${totalCards}, 1fr);
		}
	`;
};

/**
 * Typically, Ophan tracking data gets determined in the front layout component.
 * As the highlights exists outside of this front layout (in the header), we need to construct these fields here.
 */
const getOphanInfo = (frontId?: string) => {
	const ophanComponentName = ophanComponentId('highlights');
	const ophanComponentLink = `container-${0} | ${ophanComponentName}`;
	const ophanFrontName = `Front | /${frontId}`;

	return {
		ophanComponentName,
		ophanComponentLink,
		ophanFrontName,
	};
};

export const ScrollableHighlights = ({ trails, frontId }: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);
	const carouselLength = trails.length;
	const imageLoading = 'eager';
	const [showPreviousButton, setShowPreviousButton] = useState(false);
	const [showNextButton, setShowNextButton] = useState(true);
	const [shouldShowHighlights, setShouldShowHighlights] = useState(false);
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
	 * Updates the visibility of the navigation buttons based on the carousel's scroll position.
	 *
	 * This function checks the current scroll position of the carousel and sets the visibility
	 * of the previous and next buttons accordingly. The previous button is shown if the carousel
	 * is scrolled to the right of the start, and the next button is shown if the carousel is not
	 * fully scrolled to the end.
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

	useEffect(() => {
		const history = getHighlightClickHistory();
		if (history === undefined) {
			setShouldShowHighlights(true);
			console.log('history undefined');
		}

		console.log('history defined', history);
		// if there is a history, reorganise highlights then set to true
		// shuffle highlights
		setShouldShowHighlights(true);
	}, []);

	const { ophanComponentLink, ophanComponentName, ophanFrontName } =
		getOphanInfo(frontId);

	return (
		<div
			css={[
				containerStyles,
				{ visibility: shouldShowHighlights ? 'visible' : 'hidden' },
			]}
			data-link-name={ophanFrontName}
		>
			<ol
				data-link-name={ophanComponentLink}
				data-component={ophanComponentName}
				data-container-name={'scrollable/highlights'}
				ref={carouselRef}
				css={[
					carouselStyles,
					generateCarouselColumnStyles(carouselLength),
				]}
				data-heatphan-type="carousel"
			>
				{trails.map((trail) => {
					return (
						<li
							key={trail.url}
							css={[itemStyles, verticalLineStyles]}
						>
							<HighlightsCard
								format={trail.format}
								headlineText={trail.headline}
								kickerText={trail.kickerText}
								avatarUrl={trail.avatarUrl}
								byline={trail.byline}
								image={trail.image}
								imageLoading={imageLoading}
								linkTo={trail.url}
								dataLinkName={trail.dataLinkName}
								isExternalLink={trail.isExternalLink}
								showQuotedHeadline={trail.showQuotedHeadline}
								mainMedia={trail.mainMedia}
								starRating={trail.starRating}
							/>
						</li>
					);
				})}
			</ol>

			<Hide until="tablet">
				{showPreviousButton && (
					<div css={[buttonOverlayStyles, previousButtonFadeStyles]}>
						<Button
							cssOverrides={buttonStyles}
							hideLabel={true}
							iconSide="left"
							icon={<SvgChevronLeftSingle />}
							onClick={() => scrollTo('left')}
							aria-label="Move highlight stories backwards"
							data-link-name="highlights container left chevron"
							size="small"
						/>
					</div>
				)}
				{showNextButton && (
					<div css={[buttonOverlayStyles, nextButtonFadeStyles]}>
						<Button
							cssOverrides={buttonStyles}
							hideLabel={true}
							iconSide="left"
							icon={<SvgChevronRightSingle />}
							onClick={() => scrollTo('right')}
							aria-label="Move highlight stories forwards"
							data-link-name="highlights container right chevron"
							size="small"
						/>
					</div>
				)}
			</Hide>
		</div>
	);
};
