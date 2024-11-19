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

	return (
		<div css={scrollingDotContainerStyles}>
			<div css={scrollingDotStyles(total)} style={scrollingDotOffset()}>
				{Array.from({ length: total }, (_, index) => (
					<span
						css={[dotStyles, current === index && activeDotStyles]}
						key={index}
					/>
				))}
			</div>
		</div>
	);
};
