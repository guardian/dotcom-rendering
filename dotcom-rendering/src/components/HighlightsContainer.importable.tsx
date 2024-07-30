import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import {
	Button,
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useRef } from 'react';
import { palette } from '../palette';
import type { DCRFrontCard } from '../types/front';
import { HighlightsCard } from './Masthead/HighlightsCard';

type Props = { trails: DCRFrontCard[] };

const containerStyles = css`
	${from.tablet} {
		padding: 0 20px;
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
	overscroll-behavior: contain;
	${until.desktop} {
		scroll-padding-left: 10px;
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
	margin: ${space[3]}px 10px;
	:first-child {
		${from.tablet} {
			margin-left: 0px;
		}
	}
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
	position: absolute;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	width: calc(
		100% - 40px
	); /* This accounts for the 20px padding on each side of the carousel */
	top: 0;
	pointer-events: none;
`;

const buttonStyles = css`
	z-index: 1;
	pointer-events: all;
`;

const buttonOverlayStyles = css`
	width: 60px;
	height: 100%;
	display: flex;
	align-items: center;
`;

const previousButtonFadeStyles = css`
	background: linear-gradient(
		to right,
		#f6f6f6 0%,
		rgba(250, 250, 250, 0.6) 60%,
		rgba(255, 255, 255, 0) 100%
	);
`;

const nextButtonFadeStyles = css`
	background: linear-gradient(
		to left,
		#f6f6f6 0%,
		rgba(250, 250, 250, 0.6) 60%,
		rgba(255, 255, 255, 0) 100%
	);
`;
/**
 * Generates CSS styles for a grid layout used in a carousel.
 *
 * @param {number} totalCards - The total number of cards in the carousel.
 * @returns {string} - The CSS styles for the grid layout.
 */
const generateCarouselColumnStyles = (totalCards: number) => {
	const peepingCardWidth = 32;

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
			grid-template-columns: repeat(
				${totalCards},
				calc((100% - ${peepingCardWidth}px) / 4)
			);
		}

		${from.desktop} {
			grid-template-columns: repeat(${totalCards}, 1fr);
		}
	`;
};

export const HighlightsContainer = ({ trails }: Props) => {
	const carouselRef = useRef<HTMLOListElement | null>(null);
	const carouselLength = trails.length;
	const imageLoading = 'eager';

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
	return (
		<div css={containerStyles}>
			<ol
				ref={carouselRef}
				css={[
					carouselStyles,
					generateCarouselColumnStyles(carouselLength),
				]}
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
							/>
						</li>
					);
				})}
			</ol>

			<Hide until={'tablet'}>
				<div css={buttonContainerStyles}>
					<div css={[buttonOverlayStyles, previousButtonFadeStyles]}>
						<Button
							css={buttonStyles}
							hideLabel={true}
							iconSide="left"
							icon={<SvgChevronLeftSingle />}
							onClick={() => scrollTo('left')}
							aria-label="Move highlights carousel backwards"
							data-link-name="highlights carousel left chevron"
							size="small"
						/>
					</div>
					<div css={[buttonOverlayStyles, nextButtonFadeStyles]}>
						<Button
							css={buttonStyles}
							hideLabel={true}
							iconSide="left"
							icon={<SvgChevronRightSingle />}
							onClick={() => scrollTo('right')}
							aria-label="Move highlights carousel forwards"
							data-link-name="highlights carousel right chevron"
							size="small"
						/>
					</div>
				</div>
			</Hide>
		</div>
	);
};
