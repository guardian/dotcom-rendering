import { css } from '@emotion/react';
import { ArticleFormat } from '@guardian/libs';
import { neutral, brandAlt, space } from '@guardian/source-foundations';
import {
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { KeyEventsCard } from './KeyEventsCards';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	format: ArticleFormat;
}

const containerStyles = css`
	overflow: hidden;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
`;

const carouselStyles = css`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: stretch;
	width: fit-content;
	margin-bottom: 34px;
`;

const buttonContainerStyles = css`
	display: flex;
	height: 34px;
	margin-top: 10px;
	margin-bottom: ${space[3]}px;
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

/**
 *
 * A function to scroll the key events carousel on click.
 *
 * @param {string} direction The direction to scroll
 * @returns void
 */
function scrollOnClick(direction: 'left' | 'right') {
	const carousel = document.getElementById('key-events-carousel');
	if (carousel) {
		if (direction === 'left') {
			carousel.scrollLeft += 180;
		} else {
			carousel.scrollLeft -= 180;
		}
	}
}

export const KeyEventsCarousel = ({
	keyEvents,
	filterKeyEvents,
	format,
}: Props) => {
	const transformedKeyEvents = keyEvents
		.filter((keyEvent) => {
			return keyEvent.title && keyEvent.blockFirstPublished;
		})
		.map((keyEvent) => {
			return {
				text: keyEvent.title || '', // We fallback to '' here purely to keep ts happy
				url: `?filterKeyEvents=${filterKeyEvents}&page=with:block-${keyEvent.id}#block-${keyEvent.id}`,
				date: new Date(keyEvent.blockFirstPublished || ''), // We fallback to '' here purely to keep ts happy
			};
		});
	return (
		<div id="key-events-carousel" css={containerStyles}>
			<span css={carouselStyles}>
				{transformedKeyEvents.map((keyEvent) => {
					return (
						<KeyEventsCard
							text={keyEvent.text}
							url={keyEvent.url}
							date={keyEvent.date}
							format={format}
						/>
					);
				})}
			</span>
			<Hide until="desktop">
				<span css={buttonContainerStyles}>
					<button
						css={buttonStyles}
						type="button"
						aria-label="Move key events carousel backwards"
						onClick={() => scrollOnClick('left')}
					>
						<SvgChevronLeftSingle />
					</button>
					<button
						css={buttonStyles}
						type="button"
						aria-label="Move key events carousel forwards"
						onClick={() => scrollOnClick('right')}
					>
						<SvgChevronRightSingle />
					</button>
				</span>
			</Hide>
		</div>
	);
};
