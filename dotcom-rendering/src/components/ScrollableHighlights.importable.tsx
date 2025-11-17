import { css } from '@emotion/react';
import type { ABTestAPI as ABTestAPIType } from '@guardian/ab-core';
import { from, space } from '@guardian/source/foundations';
import {
	Button,
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { getZIndex } from '../lib/getZIndex';
import { ophanComponentId } from '../lib/ophan-helpers';
import {
	clearHighlightsState,
	getOrderedHighlights,
	onHighlightEvent,
	resetHighlightsState,
} from '../lib/personaliseHighlights';
import { useAB } from '../lib/useAB';
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
	scroll-behavior: auto;
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

const scrollSnapStyles = css`
	scroll-snap-type: x mandatory;
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

const isEqual = (
	historicalHighlights: DCRFrontCard[],
	currentHighlights: DCRFrontCard[],
) => {
	const c = currentHighlights.map((v) => v.url);
	const h = historicalHighlights.map((v) => v.url);
	return c.every((v) => {
		return h.includes(v);
	});
};
export const ScrollableHighlights = ({ trails, frontId }: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);
	const carouselLength = trails.length;
	const imageLoading = 'eager';
	const [showPreviousButton, setShowPreviousButton] = useState(false);
	const [showNextButton, setShowNextButton] = useState(true);
	const [shouldShowHighlights, setShouldShowHighlights] = useState(false);
	const [orderedTrails, setOrderedTrails] = useState<DCRFrontCard[]>(trails);

	const ABTestAPI = useAB()?.api;

	type Attr =
		| 'click-tracking'
		| 'view-tracking'
		| 'click-and-view-tracking'
		| 'not-in-test'
		| undefined;

	const getUserABAttr = (api?: ABTestAPIType): Attr => {
		if (!api) return undefined;

		if (api.isUserInVariant('PersonalisedHighlights', 'click-tracking')) {
			return 'click-tracking';
		}
		if (api.isUserInVariant('PersonalisedHighlights', 'view-tracking')) {
			return 'view-tracking';
		}
		if (
			api.isUserInVariant(
				'PersonalisedHighlights',
				'click-and-view-tracking',
			)
		) {
			return 'click-and-view-tracking';
		}
		return 'not-in-test';
	};

	const abTestPersonalisedHighlightAttr = getUserABAttr(ABTestAPI);

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
		if (
			abTestPersonalisedHighlightAttr === 'view-tracking' ||
			abTestPersonalisedHighlightAttr === 'click-and-view-tracking'
		) {
			onHighlightEvent('VIEW');
		}
	}, [abTestPersonalisedHighlightAttr]);

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
		if (abTestPersonalisedHighlightAttr === undefined) {
			return;
		}

		if (abTestPersonalisedHighlightAttr === 'not-in-test') {
			clearHighlightsState();
			setOrderedTrails(trails);
			setShouldShowHighlights(true);
			return;
		}

		const personalisedHighlights = getOrderedHighlights(trails);
		if (
			personalisedHighlights.length === 0 ||
			personalisedHighlights.length !== trails.length ||
			!isEqual(personalisedHighlights, trails)
		) {
			/* Reset to editorial order */
			resetHighlightsState(trails);
			setOrderedTrails(trails);
			setShouldShowHighlights(true);
			return;
		}
		/* Otherwise, use personalised order from local storage */
		setOrderedTrails(personalisedHighlights);
		setShouldShowHighlights(true);
		/* Fire a view event only if the container has been personalised */
		void submitComponentEvent(
			{
				component: {
					componentType: 'CONTAINER',
					id: `reordered-highlights-container`,
				},
				action: 'VIEW',
			},
			'Web',
		);
	}, [trails, abTestPersonalisedHighlightAttr]);

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
					/*
					 * Enable scroll-snap only when visible to prevent browser scroll anchoring.
					 * When items reorder, browsers try to keep previously visible items in view,
					 * causing unwanted scrolling. Enabling snap after reordering forces position 0.
					 // */
					shouldShowHighlights && scrollSnapStyles,
				]}
				data-heatphan-type="carousel"
			>
				{orderedTrails.map((trail) => {
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
								trackCardClick={() => {
									if (
										abTestPersonalisedHighlightAttr ===
											'click-tracking' ||
										abTestPersonalisedHighlightAttr ===
											'click-and-view-tracking'
									) {
										onHighlightEvent('CLICK', trail);
									}
								}}
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
