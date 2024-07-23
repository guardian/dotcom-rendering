import { css } from '@emotion/react';
import { DCRFrontCard } from 'src/types/front';
import { HighlightsCard } from './HighlightsCard';
import { from, neutral, space, until } from '@guardian/source/foundations';

type Props = { trails: DCRFrontCard[] };

const containerStyles = css`
	${until.desktop} {
		height: 194px;
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
	scroll-padding-left: 10px;
	height: 100%;
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
	::after {
		content: '';
		position: absolute;
		top: ${space[3]}px;
		right: -10px;
		width: 1px;
		height: calc(100% - 24px);
		background-color: ${neutral[73]};
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
			grid-template-columns: repeat(${totalCards}, calc((100%) / 3));
		}
	`;
};

export const HighlightsContainer = ({ trails }: Props) => {
	const carouselLength = trails.length;
	return (
		<div css={containerStyles}>
			<ol
				css={[
					carouselStyles,
					generateCarouselColumnStyles(carouselLength),
				]}
			>
				{trails.map((trail, index) => {
					return (
						<li key={index} css={itemStyles}>
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
		</div>
	);
};
