import { css } from '@emotion/react';
import { ArticleFormat } from '@guardian/libs';
import { Hide } from '@guardian/source-react-components';
import { CarouselButtons } from './KeyEventsCarouselButtons';
import { KeyEventCard } from './KeyEventCard';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	format: ArticleFormat;
}

const containerStyles = css`
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
		<div id="key-event-carousel" css={containerStyles}>
			<span id="key-event-cards" css={carouselStyles}>
				{transformedKeyEvents.map((keyEvent) => {
					return (
						<KeyEventCard
							text={keyEvent.text}
							url={keyEvent.url}
							date={keyEvent.date}
							format={format}
						/>
					);
				})}
			</span>
			<Hide until="desktop">
				<CarouselButtons />
			</Hide>
		</div>
	);
};
