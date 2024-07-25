import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import { palette } from '../../palette';
import type { DCRFrontCard } from '../../types/front';
import { HighlightsCard } from './HighlightsCard';

type Props = { trails: DCRFrontCard[] };

const carouselStyles = css`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	overflow-x: auto;
	overflow-y: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overscroll-behavior: contain;
	scroll-padding-left: 10px;
	/**
	* Hide scrollbars
	* See: https://stackoverflow.com/a/38994837
	*/
	::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	scrollbar-width: none; /* Firefox */
`;

const itemStyles = css`
	scroll-snap-align: start;
	grid-area: span 1;
	position: relative;
	padding: ${space[3]}px 0;
	margin: 0 10px;
	:first-child {
		padding-left: 10px;
	}
`;

const verticalLineStyles = css`
	::after {
		content: '';
		position: absolute;
		top: ${space[3]}px;
		bottom: ${space[3]}px;
		right: -10px;
		width: 1px;
		background-color: ${palette('--card-border-top')};
		transform: translateX(-50%);
	}
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
			grid-template-columns:
				repeat(${totalCards}, calc((100% - ${peepingCardWidth}px) / 2))
				${peepingCardWidth}px;
		}

		${from.tablet} {
			grid-template-columns:
				repeat(${totalCards}, calc((100% - ${peepingCardWidth}px) / 4))
				${peepingCardWidth}px;
		}

		${from.desktop} {
			grid-template-columns: repeat(${totalCards}, 1fr);
		}
	`;
};

export const HighlightsContainer = ({ trails }: Props) => {
	const carouselLength = trails.length;
	return (
		<ol
			css={[carouselStyles, generateCarouselColumnStyles(carouselLength)]}
		>
			{trails.map((trail, index) => {
				return (
					<li key={index} css={[itemStyles, verticalLineStyles]}>
						<HighlightsCard
							format={trail.format}
							headlineText={trail.headline}
							kickerText={trail.kickerText}
							avatarUrl={trail.avatarUrl}
							byline={trail.byline}
						/>
					</li>
				);
			})}
		</ol>
	);
};
