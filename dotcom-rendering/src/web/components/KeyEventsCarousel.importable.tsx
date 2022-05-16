import { css } from '@emotion/react';
import { ArticleFormat } from '@guardian/libs';
import {
	Hide,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import { neutral, brandAlt, space } from '@guardian/source-foundations';
import { KeyEventCard } from './KeyEventCard';

interface Props {
	keyEvents: Block[];
	filterKeyEvents: boolean;
	format: ArticleFormat;
}

const carouselStyles = css`
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
	margin-bottom: 34px;
`;

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
	cursor: default;

	&:hover,
	&:focus {
		background-color: ${neutral[60]};

		svg {
			fill: ${neutral[100]};
		}
	}
`;

export const KeyEventsCarousel = ({
	keyEvents,
	filterKeyEvents,
	format,
}: Props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [carousel, setCarousel] = useState<HTMLElement>();
	const [cards, setCards] = useState<Element[]>();
	const cardWidth = 200;

	// we only want to count cards fully in view so we round down.
	const cardsOnScreen = carousel
		? Math.floor(carousel.clientWidth / cardWidth)
		: 0;

	const isFirstCard = activeIndex === cardsOnScreen;
	const isLastCard = activeIndex === keyEvents.length - 1;

	useEffect(() => {
		const carouselElement = document.getElementById('key-event-carousel');
		const cardsArray = Array.from(
			document.querySelectorAll('#key-event-card'),
		);
		if (carouselElement) setCarousel(carouselElement);
		if (cardsArray) setCards(cardsArray);
	}, []);

	useEffect(() => {
		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			const entry = entries.find((e) => e.isIntersecting);
			const index = cards?.findIndex((e) => e === entry?.target);
			if (index && index !== -1) setActiveIndex(index);
		};

		const observer = new window.IntersectionObserver(handleIntersect, {
			root: carousel,
			rootMargin: '0% 0% 0% -100%',
		});

		cards?.forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, [activeIndex, cards, carousel]);

	const goPrevious = () => {
		if (carousel && !isFirstCard) carousel.scrollLeft -= cardWidth;
	};

	const goNext = () => {
		if (carousel && !isLastCard) carousel.scrollLeft += cardWidth;
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
			};
		});
	return (
		<div id="key-event-carousel" css={carouselStyles}>
			<ul css={containerStyles}>
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
			</ul>
			<Hide until="desktop">
				{keyEvents.length > 6 && (
					<span css={buttonContainerStyles}>
						<button
							css={[
								buttonStyles,
								isFirstCard && disabledButtonStyles,
							]}
							type="button"
							aria-label="Move key events carousel backwards"
							onClick={goPrevious}
						>
							<SvgChevronLeftSingle />
						</button>
						<button
							css={[
								buttonStyles,
								isLastCard && disabledButtonStyles,
							]}
							type="button"
							aria-label="Move key events carousel forwards"
							onClick={goNext}
						>
							<SvgChevronRightSingle />
						</button>
					</span>
				)}
			</Hide>
		</div>
	);
};
