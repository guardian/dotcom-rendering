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

const moreDotStyles = css`
	transform: scale(0.85);
`;

const hiddenDotStyles = css`
	transform: scale(0);
`;

export const ScrollingDots = ({
	total,
	current,
}: {
	total: number;
	current: number;
}) => {
	const scrollingDotOffset = () => {
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

	const dotScale = (index: number) => {
		if (index === dotsVisible - 1 && current < scrollThreshold) {
			return moreDotStyles;
		}

		if (
			index === total - dotsVisible &&
			current >= total - scrollThreshold - 1
		) {
			return moreDotStyles;
		}

		if (
			index === current + scrollThreshold &&
			current >= scrollThreshold &&
			current < total - scrollThreshold - 1
		) {
			return moreDotStyles;
		}

		if (
			index === current - scrollThreshold &&
			current > scrollThreshold &&
			current <= total - scrollThreshold - 1
		) {
			return moreDotStyles;
		}

		if (
			index === current + scrollThreshold + 1 &&
			current >= scrollThreshold &&
			current < total - scrollThreshold - 1
		) {
			return hiddenDotStyles;
		}

		if (
			index === current - scrollThreshold - 1 &&
			current > scrollThreshold &&
			current <= total - scrollThreshold - 1
		) {
			return hiddenDotStyles;
		}

		return;
	};

	return (
		<div css={scrollingDotContainerStyles}>
			<div css={scrollingDotStyles(total)} style={scrollingDotOffset()}>
				{Array.from({ length: total }, (_, index) => (
					<span
						css={[
							dotStyles,
							current === index && activeDotStyles,
							dotScale(index),
						]}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};
