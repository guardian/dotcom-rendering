import { css } from '@emotion/react';
import {
	from,
	headlineMedium24Object,
	space,
	until,
} from '@guardian/source/foundations';
import {
	Button,
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef /* useState */ } from 'react';
import { palette } from '../palette';
import type {
	DCRContainerPalette,
	DCRContainerType,
	DCRFrontCard,
} from '../types/front';
import { FrontCard } from './FrontCard';

type Props = {
	trails: DCRFrontCard[];
	containerPalette?: DCRContainerPalette;
	showAge?: boolean;
	absoluteServerTimes?: boolean;
	imageLoading: 'lazy' | 'eager';
	containerType: DCRContainerType;
};

/**
 * This needs to match the `FrontSection` title font and is used to calculate
 * the negative margin that aligns the navigation buttons with the title.
 */
const titlePreset = headlineMedium24Object;

/**
 * Grid sizing to calculate negative margin used to pull navigation buttons
 * out side of `FrontSection` container at `wide` breakpoint.
 */
const gridColumnWidth = '60px';
const gridGap = '20px';

const carouselContainerStyles = css`
	display: flex;
	flex-direction: column-reverse;
	${from.wide} {
		flex-direction: row;
	}
`;

const carouselStyles = css`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overscroll-behavior-x: contain;
	overscroll-behavior-y: auto;
	scroll-padding-left: 10px;
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
	margin: ${space[3]}px 10px;
`;

const verticalLineStyles = css`
	:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: -10px;
		width: 1px;
		background-color: ${palette('--card-border-top')};
		transform: translateX(-50%);
	}
`;

const buttonContainerStyles = css`
	margin-left: auto;
	${from.tablet} {
		margin-top: calc(
			(-${titlePreset.fontSize} * ${titlePreset.lineHeight}) -
				${space[3]}px
		);
	}
	${from.leftCol} {
		margin-top: 0;
	}
	${from.wide} {
		margin-left: ${space[2]}px;
		margin-right: calc(${space[2]}px - ${gridColumnWidth} - ${gridGap});
	}
`;

const buttonLayoutStyles = css`
	display: flex;
	gap: ${space[1]}px;
`;

/**
 * Generates CSS styles for a grid layout used in a carousel.
 *
 * @param {number} totalCards - The total number of cards in the carousel.
 * @returns {string} - The CSS styles for the grid layout.
 */
const generateCarouselColumnStyles = (totalCards: number) => {
	const peepingCardWidth = space[8];

	return css`
		${until.tablet} {
			grid-template-columns: repeat(
				${totalCards},
				calc((100% - ${peepingCardWidth}px))
			);
		}

		${from.tablet} {
			grid-template-columns: repeat(${totalCards}, 50%);
		}
	`;
};

/**
 * This is an island - todo
 *
 */
export const ScrollableSmallContainer = ({
	trails,
	containerPalette,
	containerType,
	absoluteServerTimes,
	imageLoading,
	showAge,
}: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);
	const carouselLength = trails.length;

	// const [previousButtonState, setShowPreviousButton] = useState(false);
	// const [nextButtonState, setShowNextButton] = useState(true);

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

		// const scrollLeft = carouselElement.scrollLeft;
		// const maxScrollLeft =
		// 	carouselElement.scrollWidth - carouselElement.clientWidth;

		// setShowPreviousButton(scrollLeft > 0);
		// setShowNextButton(scrollLeft < maxScrollLeft);
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
		<div css={carouselContainerStyles}>
			<ol
				// TODO
				// data-component=""
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
							<FrontCard
								trail={trail}
								imageLoading={imageLoading}
								absoluteServerTimes={!!absoluteServerTimes}
								containerPalette={containerPalette}
								containerType={containerType}
								showAge={!!showAge}
								headlineSize="small"
								headlineSizeOnMobile="small"
								headlineSizeOnTablet="small"
								imagePositionOnDesktop="left"
								imagePositionOnMobile="left"
								imageSize="small" // TODO - needs fixed width images
								trailText={undefined} // unsupported
								supportingContent={undefined} // unsupported
								aspectRatio="5:4"
								kickerText={trail.kickerText}
								showLivePlayable={trail.showLivePlayable}
								// TODO - specify card props
							/>
						</li>
					);
				})}
			</ol>

			<div css={buttonContainerStyles}>
				<Hide until={'tablet'}>
					{carouselLength > 2 && (
						<div css={buttonLayoutStyles}>
							<Button
								hideLabel={true}
								iconSide="left"
								icon={<SvgChevronLeftSingle />}
								onClick={() => scrollTo('left')}
								priority="tertiary"
								// TODO use better colour name
								theme={{
									borderTertiary:
										palette('--card-border-top'),
									textTertiary: palette(
										'--card-headline-trail-text',
									),
								}}
								// TODO
								// aria-label="Move stories backwards"
								// data-link-name="container left chevron"
								size="small"
							/>

							<Button
								hideLabel={true}
								iconSide="left"
								icon={<SvgChevronRightSingle />}
								onClick={() => scrollTo('right')}
								priority="tertiary"
								// TODO use better colour name
								theme={{
									borderTertiary:
										palette('--card-border-top'),
									textTertiary: palette(
										'--card-headline-trail-text',
									),
								}}
								// TODO
								// aria-label="Move stories forwards"
								// data-link-name="container right chevron"
								size="small"
							/>
						</div>
					)}
				</Hide>
			</div>
		</div>
	);
};
