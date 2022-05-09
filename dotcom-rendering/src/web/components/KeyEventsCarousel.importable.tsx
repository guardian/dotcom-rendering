import { css } from '@emotion/react';
import { ArticleFormat } from '@guardian/libs';
import { Hide } from '@guardian/source-react-components';
import { CarouselButtons } from './KeyEventsCarouselButtons';
import { KeyEventCard } from './KeyEventCard';
import { useEffect, useState } from 'react';
import { Elements } from 'src/amp/components/Elements';

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
	border: 1px solid red;
	/* max-width: 500px; */
`;

const carouselStyles = css`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: stretch;
	width: fit-content;
	margin-bottom: 34px;
`;

const isServer = typeof window === 'undefined';

const container: Element | null = !isServer
	? window.document.getElementById('key-event-carousel')
	: null;

export const KeyEventsCarousel = ({
	keyEvents,
	filterKeyEvents,
	format,
}: Props) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const [elements, setElements] = useState<Element[]>();
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

	useEffect(() => {
		const cards = document.querySelectorAll('#key-event-card');
		setElements(Array.from(cards));
	}, []);

	useEffect(() => {
		function handleIntersect(entries: IntersectionObserverEntry[]) {
			const entry = entries.find((e) => e.isIntersecting);
			if (entry) {
				const index = elements?.findIndex((e) => e === entry.target);

				if (index) {
					console.log('index is ', index);
					setActiveIndex(index);
				}
			}
		}

		const observer = new window.IntersectionObserver(handleIntersect, {
			root: container,
			rootMargin: '0px 0px 0px -1076px',
			threshold: 0.5,
		});

		elements?.forEach((el) => {
			observer.observe(el);
		});
	}, [elements]);

	function goPrevious() {
		if (activeIndex > 0 && elements) {
			if (container) container.scrollLeft -= 180;

			elements[activeIndex - 1].scrollIntoView({
				behavior: 'smooth',
			});
		}
	}

	function goNext() {
		if (elements && activeIndex < elements.length - 1) {
			if (container) container.scrollLeft += 180;
		}
	}
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
				<CarouselButtons
					goPrevious={goPrevious}
					goNext={goNext}
					activeIndex={activeIndex}
					totalCards={transformedKeyEvents.length - 1}
				/>
			</Hide>
		</div>
	);
};
