import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useRef } from 'react';
import { palette } from '../palette';
import type { DCRFrontCard } from '../types/front';
import { HighlightsCard } from './Masthead/HighlightsCard';

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
	margin: ${space[3]}px 10px;
	:first-child {
		padding-left: 10px;
	}
`;

const verticalLineStyles = css`
	::after {
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
	const carouselRef = useRef<HTMLOListElement | null>(null);
	const carouselLength = trails.length;
	const imageLoading = 'eager';

	const scrollTo = (direction: 'left' | 'right') => {
		if (carouselRef.current) {
			const cardWidth =
				carouselRef.current.querySelector('li')?.offsetWidth || 0;
			const offset = direction === 'left' ? -cardWidth : cardWidth;
			carouselRef.current.scrollBy({
				left: offset,
				behavior: 'smooth',
			});
		}
	};

	return (
		<div>
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

			<>
				<Button
					hideLabel={true}
					iconSide="left"
					icon={<SvgChevronLeftSingle />}
					onClick={() => scrollTo('left')}
					aria-label="Move highlights carousel backwards"
					data-link-name="highlights carousel left chevron"
					size="small"
				/>
				<Button
					hideLabel={true}
					iconSide="left"
					icon={<SvgChevronRightSingle />}
					onClick={() => scrollTo('right')}
					aria-label="Move highlights carousel forwards"
					data-link-name="highlights carousel right chevron"
					size="small"
				/>
			</>
		</div>
	);
};
