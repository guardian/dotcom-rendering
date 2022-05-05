import { css } from '@emotion/react';
import { neutral, brandAlt, space } from '@guardian/source-foundations';
import {
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { useState } from 'react';

const buttonContainerStyles = css`
	display: flex;
	height: 34px;
	margin-top: 10px;
	margin-bottom: ${space[5]}px;
	position: absolute;
	bottom: 0;
	justify-content: space-between;
	width: 100%;
	padding-right: 40px;
`;

const buttonStyles = css`
	border: 0 none;
	border-radius: 100%;
	height: 34px;
	width: 34px;
	cursor: pointer;
	padding: 0;
	background-color: ${neutral[0]};
	bottom: 4px;
	&:active,
	&:hover {
		outline: none;
		background-color: ${brandAlt[400]};
		svg {
			fill: ${neutral[7]};
		}
	}

	&:focus {
		outline: none;
	}

	svg {
		fill: ${neutral[100]};
		height: 34px;
	}
`;

const disabledButtonStyles = css`
	background-color: ${neutral[60]};
	cursor: 'default';

	&:hover,
	&:focus {
		background-color: ${neutral[60]};

		svg {
			fill: ${neutral[100]};
		}
	}
`;

function isLastCardShow(index: number) {
	const totalKeyEvents =
		document.getElementById('key-event-cards')?.children.length;

	const carousel = document.getElementById('key-event-carousel');
	const width = carousel?.clientWidth;
	const eventsInView = Math.round(width / 180);

	return totalKeyEvents - eventsInView === index;
}
/**
 *
 * A function to scroll the key events carousel on click.
 *
 * @param {string} direction The direction to scroll
 * @returns void
 */
function scrollOnClick(
	direction: 'left' | 'right',
	setIndex: any,
	index: number,
	setLastCard: any,
	lastCard: boolean,
) {
	const carousel = document.getElementById('key-event-carousel');
	if (
		(lastCard && direction === 'right') ||
		(index === 0 && direction === 'left')
	)
		return;
	if (carousel) {
		if (direction === 'left') {
			carousel.scrollLeft -= 180;
			setIndex((i: number) => i - 1);
		} else {
			carousel.scrollLeft += 180;
			setIndex((i: number) => i + 1);
		}
	}
	const lastCardShowing = isLastCardShow(index);
	setLastCard(lastCardShowing);
}

export const CarouselButtons = () => {
	const [index, setIndex] = useState(1);
	const [isLastCard, setIsLastCard] = useState(false);
	const isFirstCard = index === 1;

	return (
		<Hide until="desktop">
			<span css={buttonContainerStyles}>
				<button
					css={[buttonStyles, isFirstCard && disabledButtonStyles]}
					type="button"
					aria-label="Move key events carousel backwards"
					onClick={() =>
						scrollOnClick(
							'left',
							setIndex,
							index,
							setIsLastCard,
							isLastCard,
						)
					}
				>
					<SvgChevronLeftSingle />
				</button>
				<button
					css={[buttonStyles, isLastCard && disabledButtonStyles]}
					type="button"
					aria-label="Move key events carousel forwards"
					onClick={() =>
						scrollOnClick(
							'right',
							setIndex,
							index,
							setIsLastCard,
							isLastCard,
						)
					}
				>
					<SvgChevronRightSingle />
				</button>
			</span>
		</Hide>
	);
};
