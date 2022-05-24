import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, space } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeBrandAlt,
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';
import { KeyEventCard } from './KeyEventCard';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	format: ArticleFormat;
}

const carouselStyles = (palette: Palette) => css`
	background-color: ${palette.background.keyEvent};
	${from.desktop} {
		background-color: ${palette.background.keyEventFromDesktop};
	}

	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto;
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
	scrollbar-width: none; /* for Firefox */
	-ms-overflow-style: none; /* for Internet Explorer, Edge */
	&::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
`;

const containerStyles = css`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: stretch;
	width: fit-content;
	margin-bottom: ${space[12]}px;
	position: relative;
`;

const buttonStyles = css`
	position: absolute;
	bottom: 0;
	margin-bottom: ${space[4]}px;
	background-color: ${buttonThemeBrandAlt.button.backgroundPrimary};
	&:active,
	&:hover {
		outline: none;
		background-color: ${buttonThemeBrandAlt.button.backgroundTertiaryHover};
	}
`;

const leftButton = css`
	left: ${space[5]}px;
`;

const rightButton = css`
	right: ${space[5]}px;
`;

const isServer = typeof window === 'undefined';
const carousel: HTMLElement | null = !isServer
	? window.document.getElementById('key-event-carousel')
	: null;

export const KeyEventsCarousel = ({
	keyEvents,
	filterKeyEvents,
	format,
}: Props) => {
	const palette = decidePalette(format);
	const cardWidth = 200;
	const goPrevious = () => {
		if (carousel) carousel.scrollLeft -= cardWidth;
	};
	const goNext = () => {
		if (carousel) carousel.scrollLeft += cardWidth;
	};
	const transformedKeyEvents = keyEvents
		.filter((keyEvent) => {
			return keyEvent.title && keyEvent.blockFirstPublished;
		})
		.map((keyEvent) => {
			return {
				text: keyEvent.title || '', // We fallback to '' here purely to keep ts happy
				url: `?filterKeyEvents=${filterKeyEvents}&page=with:block-${keyEvent.id}#block-${keyEvent.id}`,
				date: new Date(keyEvent.blockFirstPublished || ''), // We fallback to '' here purely to keep ts happy
				isSummmary: keyEvent.attributes.summary,
			};
		});
	return (
		<div id="key-event-carousel" css={carouselStyles(palette)}>
			<ul css={containerStyles}>
				{transformedKeyEvents.map((keyEvent) => {
					return (
						<KeyEventCard
							text={keyEvent.text}
							url={keyEvent.url}
							date={keyEvent.date}
							format={format}
							isSummary={keyEvent.isSummmary}
						/>
					);
				})}
			</ul>
			<Hide until="desktop">
				{keyEvents.length > 6 && (
					<>
						<Button
							hideLabel={true}
							cssOverrides={[buttonStyles, leftButton]}
							iconSide="left"
							icon={<SvgChevronLeftSingle />}
							onClick={goPrevious}
							aria-label="Move key events carousel backwards"
						/>
						<Button
							hideLabel={true}
							cssOverrides={[buttonStyles, rightButton]}
							iconSide="left"
							icon={<SvgChevronRightSingle />}
							onClick={goNext}
							aria-label="Move key events carousel forwards"
						/>
					</>
				)}
			</Hide>
		</div>
	);
};
