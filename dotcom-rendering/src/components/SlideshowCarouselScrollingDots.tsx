import { css } from '@emotion/react';
import { palette } from '../palette';

const dotSize = 7;
const dotGap = 4;
const dotsVisible = 5;
const scrollThreshold = Math.floor(dotsVisible / 2);

const scrollingDotContainerStyles = css`
	overflow: hidden;
	max-width: ${dotSize * dotsVisible + dotGap * (dotsVisible - 1) + 8}px;
`;

const scrollingDotStyles = (total: number) => css`
	display: grid;
	gap: ${dotGap}px;
	grid-template-columns: repeat(${total}, ${dotSize}px);
	padding: 4px;
	transition: transform 0.25s ease;
`;

const dotStyles = css`
	width: ${dotSize}px;
	height: ${dotSize}px;
	border-radius: 100%;
	background-color: ${palette('--slideshow-pagination-dot')};
	transition: all 0.25s ease;
`;

const activeDotStyles = css`
	transform: scale(1.15);
	background-color: ${palette('--slideshow-pagination-dot-active')};
`;

const trailingDotStyles = css`
	transform: scale(0.85);
`;

const offscreenDotStyles = css`
	transform: scale(0);
`;

export const SlideshowCarouselScrollingDots = ({
	total,
	current,
}: {
	total: number;
	current: number;
}) => {
	const scrollDots = () => {
		const offsetPerDot = -(dotSize + dotGap);

		if (total <= dotsVisible) return;

		if (current < scrollThreshold) {
			return { transform: 'translateX(0)' };
		}

		if (current >= total - scrollThreshold) {
			return {
				transform: `translateX(${
					(total - dotsVisible) * offsetPerDot
				}px)`,
			};
		}

		return {
			transform: `translateX(${
				(current - scrollThreshold) * offsetPerDot
			}px)`,
		};
	};

	const scaleDot = (index: number) => {
		if (total <= dotsVisible) return;

		/**
		 * If we haven't reached the scroll threshold and the current dot is the
		 * last visible dot apply trailing style to indicate additional pages
		 * to the right
		 */
		if (index === dotsVisible - 1 && current < scrollThreshold) {
			return trailingDotStyles;
		}

		/**
		 * If we're past the scroll threshold at the end and the current dot is
		 * the first visible dot apply trailing style to indicate additional
		 * pages to the left
		 */
		if (
			index === total - dotsVisible &&
			current >= total - scrollThreshold - 1
		) {
			return trailingDotStyles;
		}

		/**
		 * If we've hit the scroll threshold and the current dot is the last
		 * visible dot and there are more dots to the right apply the trailing
		 * style to indicate additional pages to the right
		 */
		if (
			index === current + scrollThreshold &&
			current >= scrollThreshold &&
			current < total - scrollThreshold - 1
		) {
			return trailingDotStyles;
		}

		/**
		 * If we've hit the scroll threshold and the current dot is the first
		 * visible dot and there are more dots to the left apply the trailing
		 * style to indicate additional pages to the left
		 */
		if (
			index === current - scrollThreshold &&
			current > scrollThreshold &&
			current <= total - scrollThreshold - 1
		) {
			return trailingDotStyles;
		}

		/**
		 * If we've hit the scroll threshold and the current dot is just
		 * offscreen to the right apply the offscreen style so the dot size
		 * scales as it scrolls into or out of view
		 */
		if (
			index === current + scrollThreshold + 1 &&
			current >= scrollThreshold &&
			current < total - scrollThreshold - 1
		) {
			return offscreenDotStyles;
		}

		/**
		 * If we've hit the scroll threshold and the current dot is just
		 * offscreen to the left apply the offscreen style so the dot size
		 * scales as it scrolls into or out of view
		 */
		if (
			index === current - scrollThreshold - 1 &&
			current > scrollThreshold &&
			current <= total - scrollThreshold - 1
		) {
			return offscreenDotStyles;
		}

		return;
	};

	return (
		<div css={scrollingDotContainerStyles}>
			<div css={scrollingDotStyles(total)} style={scrollDots()}>
				{Array.from({ length: total }, (_, index) => (
					<span
						css={[
							dotStyles,
							current === index && activeDotStyles,
							scaleDot(index),
						]}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};
