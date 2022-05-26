import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { from, space, textSans } from '@guardian/source-foundations';
import {
	Button,
	buttonThemeBrandAlt,
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { useRef } from 'react';
import { decidePalette } from '../lib/decidePalette';
import { KeyEventCard } from './KeyEventCard';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	format: ArticleFormat;
}
type ValidBlock = Block & {
	title: string;
	blockFirstPublished: number;
};

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
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
	width: 90vw;
`;
const titleStyles = css`
	${textSans.small({ fontWeight: 'bold', lineHeight: 'regular' })};
`;

const containerStyles = css`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: stretch;
	width: fit-content;
	position: relative;
	${from.desktop} {
		margin-bottom: ${space[12]}px;
	}
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

const isValidKeyEvent = (keyEvent: Block): keyEvent is ValidBlock => {
	return (
		typeof keyEvent.title === 'string' &&
		typeof keyEvent.blockFirstPublished === 'number'
	);
};
export const KeyEventsCarousel = ({
	keyEvents,
	filterKeyEvents,
	format,
}: Props) => {
	const carousel = useRef<HTMLDivElement | null>(null);
	const palette = decidePalette(format);
	const cardWidth = 200;

	const goPrevious = () => {
		if (carousel.current) carousel.current.scrollLeft -= cardWidth;
	};
	const goNext = () => {
		if (carousel.current) carousel.current.scrollLeft += cardWidth;
	};
	const filteredKeyEvents = keyEvents.filter(isValidKeyEvent);
	return (
		<>
			<Hide from="desktop">
				<div css={titleStyles}>Key events:</div>
			</Hide>
			<div
				ref={carousel}
				id="key-events-carousel"
				css={carouselStyles(palette)}
			>
				<ul css={containerStyles}>
					{filteredKeyEvents.map((keyEvent) => {
						return (
							<KeyEventCard
								format={format}
								filterKeyEvents={filterKeyEvents}
								id={keyEvent.id}
								blockFirstPublished={
									keyEvent.blockFirstPublished
								}
								isSummary={keyEvent.attributes.summary}
								title={keyEvent.title}
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
		</>
	);
};
