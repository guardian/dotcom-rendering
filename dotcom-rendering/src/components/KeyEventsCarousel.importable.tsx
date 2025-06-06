import { css } from '@emotion/react';
import { from, headlineBold17, space } from '@guardian/source/foundations';
import {
	Button,
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useRef } from 'react';
import { getInteractionClient } from '../lib/bridgetApi';
import { palette } from '../palette';
import type { Block } from '../types/blocks';
import type { RenderingTarget } from '../types/renderingTarget';
import { KeyEventCard } from './KeyEventCard';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	id: 'key-events-carousel-desktop' | 'key-events-carousel-mobile';
	absoluteServerTimes: boolean;
	renderingTarget: RenderingTarget;
}
type ValidBlock = Block & {
	title: string;
	blockFirstPublished: number;
};

const carouselStyles = css`
	background-color: ${palette('--key-event-background')};
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	overflow-x: auto;
	overflow-y: hidden;
	margin-right: -10px;
	${from.tablet} {
		margin-right: -20px;
	}

	${from.desktop} {
		margin-right: 0px;
		background-color: ${palette('--key-event-background-desktop')};
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}
`;
const leftMarginStyles = css`
	${from.desktop} {
		margin-left: 240px;
	}
`;

const marginBottomStyles = css`
	${from.desktop} {
		margin-bottom: ${space[12]}px;
	}
`;
const titleStyles = css`
	${headlineBold17};
	/**
	 * Typography preset styles should not be overridden.
	 * This has been done because the styles do not directly map to the new presets.
	 * Please speak to your team's designer and update this to use a more appropriate preset.
	 */
	line-height: 1.3;
	padding-top: ${space[3]}px;
	color: ${palette('--key-event-title')};
`;

const containerStyles = css`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: stretch;
	width: fit-content;
	position: relative;
`;

const buttonStyles = css`
	position: absolute;
	bottom: 0;
	margin-bottom: ${space[4]}px;
	background-color: ${palette('--key-event-button')};
	&:active,
	&:hover {
		outline: none;
		background-color: ${palette('--key-event-button-hover')};
	}
	svg {
		fill: ${palette('--key-event-button-fill')};
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
	id,
	absoluteServerTimes,
	renderingTarget,
}: Props) => {
	const carousel = useRef<HTMLDivElement | null>(null);
	const cardWidth = 200;
	const isApps = renderingTarget === 'Apps';

	const goPrevious = () => {
		if (carousel.current) carousel.current.scrollLeft -= cardWidth;
	};
	const goNext = () => {
		if (carousel.current) carousel.current.scrollLeft += cardWidth;
	};

	const onTouchStart = async () => {
		await getInteractionClient().disableArticleSwipe(true);
	};

	const onTouchEnd = async () => {
		await getInteractionClient().disableArticleSwipe(false);
	};

	const filteredKeyEvents = keyEvents.filter(isValidKeyEvent);
	const carouselLength = filteredKeyEvents.length;
	const shortCarousel = carouselLength <= 4;
	const longCarousel = carouselLength > 6;
	return (
		<>
			<span id={id} />
			<Hide from="desktop">
				<div css={titleStyles}>Key events</div>
			</Hide>
			<div
				onTouchStart={isApps ? onTouchStart : undefined}
				onTouchEnd={isApps ? onTouchEnd : undefined}
				ref={carousel}
				id="key-events-carousel"
				css={[carouselStyles, shortCarousel && leftMarginStyles]}
			>
				<ul css={[containerStyles, longCarousel && marginBottomStyles]}>
					{filteredKeyEvents.map((keyEvent, index) => {
						return (
							<KeyEventCard
								key={keyEvent.id}
								filterKeyEvents={filterKeyEvents}
								id={keyEvent.id}
								blockFirstPublished={
									keyEvent.blockFirstPublished
								}
								isSummary={keyEvent.attributes.summary}
								title={keyEvent.title}
								cardPosition={`${index} of ${carouselLength}`}
								absoluteServerTimes={absoluteServerTimes}
								renderingTarget={renderingTarget}
							/>
						);
					})}
				</ul>
				<Hide until="desktop">
					{longCarousel && (
						<>
							<Button
								hideLabel={true}
								cssOverrides={[buttonStyles, leftButton]}
								iconSide="left"
								icon={<SvgChevronLeftSingle />}
								onClick={goPrevious}
								aria-label="Move key events carousel backwards"
								data-link-name="key event carousel left chevron"
								size="small"
							/>
							<Button
								hideLabel={true}
								cssOverrides={[buttonStyles, rightButton]}
								iconSide="left"
								icon={<SvgChevronRightSingle />}
								onClick={goNext}
								aria-label="Move key events carousel forwards"
								data-link-name="key event carousel right chevron"
								size="small"
							/>
						</>
					)}
				</Hide>
			</div>
		</>
	);
};
