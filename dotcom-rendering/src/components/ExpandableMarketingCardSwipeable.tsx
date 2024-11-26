import { css } from '@emotion/react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { getOphan } from '../client/ophan/ophan';
import { getZIndex } from '../lib/getZIndex';
import { ExpandableMarketingCard } from './ExpandableMarketingCard';

// The minimum length of the left swipe on the x-axis to close the banner
const LEFT_SWIPE_THRESHOLD_PX = 20;

const isLeftSwipe = (thisXCoord: number, prevXCoord: number | null) => {
	if (prevXCoord === null) {
		return false;
	}

	return thisXCoord + LEFT_SWIPE_THRESHOLD_PX < prevXCoord;
};

const isViewportBelowTopOfBody = (topOfBody: Element) =>
	topOfBody.getBoundingClientRect().top < 0;

interface Props {
	heading: string;
	kicker: string;
	guardianBaseURL: string;
	isExpanded: boolean;
	setIsExpanded: Dispatch<SetStateAction<boolean>>;
	setIsClosed: Dispatch<SetStateAction<boolean>>;
}

const hideBannerStyles = css`
	left: -1200px;
	transition: all 2.5s linear;
`;

const stickyContainerStyles = css`
	position: sticky;
	top: 0;
	z-index: ${getZIndex('expandableMarketingCardOverlay')};

	/* The component slides in from the left-hand side */
	animation: slidein 2.4s linear;

	@keyframes slidein {
		from {
			translate: -1200px 0;
		}

		to {
			translate: 0 0;
		}
	}
`;

const absoluteContainerStyles = css`
	position: absolute;
	width: 100%;
`;

const isClick = (
	pointerDownCoords: [number, number],
	pointerUpCoords: [number | null, number | null],
) => {
	const [lastDownXCoord, lastDownYCoord] = pointerDownCoords;
	const [lastUpXCoord, lastUpYCoord] = pointerUpCoords;

	if (lastUpXCoord === null || lastUpYCoord === null) return false;

	/**
	 * Allow a 5px margin of error to identify a click. We want to
	 * err on the side of expanding the banner if it is touched.
	 */
	return (
		Math.abs(lastUpXCoord - lastDownXCoord) < 5 &&
		Math.abs(lastUpYCoord - lastDownYCoord) < 5
	);
};

/**
 * Provides a swipeable wrapper around the ExpandableMarketingCard component.
 * This component can be dismissed by swiping it to the left.
 */
export const ExpandableMarketingCardSwipeable = ({
	guardianBaseURL,
	heading,
	kicker,
	isExpanded,
	setIsExpanded,
	setIsClosed,
}: Props) => {
	const [lastDownXCoord, setLastDownXCoord] = useState<number | null>(null);
	const [lastDownYCoord, setLastDownYCoord] = useState<number | null>(null);
	const [isDown, setIsDown] = useState(false);
	const [hasSwipedLeft, setHasSwipedLeft] = useState(false);
	const [topOfBody, setTopOfBody] = useState<Element | null>(null);

	/**
	 * On screen sizes below leftCol (<1140px), only display the card
	 * when the user scrolls past the top of the article.
	 */
	const [shouldDisplayCard, setShouldDisplayCard] = useState(false);

	// The distance to the left from the pointer down and current pointer, whilst the pointer is still down.
	const [dragLeftDistance, setDragLeftDistance] = useState(0);

	useEffect(() => {
		setTopOfBody(document.querySelector('[data-gu-name="body"]'));
	}, []);

	useEffect(() => {
		if (!topOfBody) return;

		/**
		 * It's possible that the viewport does not start at the top of the page.
		 */
		if (isViewportBelowTopOfBody(topOfBody)) {
			setShouldDisplayCard(true);
			return;
		}

		/**
		 * Show the card when the top of the body moves out of the viewport.
		 */
		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (!entry) return;
				if (entry.isIntersecting) {
					setShouldDisplayCard(true);
				}
			},
			{ rootMargin: '0px 0px -100%' },
		);

		observer.observe(topOfBody);

		return () => {
			observer.disconnect();
		};
	}, [topOfBody]);

	useEffect(() => {
		const reportView = () => {
			void getOphan('Web').then((ophan) => {
				ophan.record({
					interaction: {
						component: 'us-expandable-marketing-card',
						value: 'us-expandable-marketing-card visible',
					},
				});
			});
		};
		if (shouldDisplayCard) {
			reportView();
		}
	}, [shouldDisplayCard]);

	if (!shouldDisplayCard) {
		return null;
	}

	if (!isExpanded) {
		return (
			<div
				data-component="us-expandable-marketing-card"
				css={[stickyContainerStyles]}
			>
				<div
					data-link-name="us-expandable-marketing-card expand"
					css={[
						absoluteContainerStyles,
						isDown &&
							css`
								left: ${dragLeftDistance}px;
							`,
						hasSwipedLeft && hideBannerStyles,
					]}
					role="button"
					tabIndex={0}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							setIsExpanded(true);
						}
						if (event.key === 'Escape') {
							setIsClosed(true);
						}
					}}
					onPointerDown={(event) => {
						event.preventDefault();

						setIsDown(true);

						setLastDownXCoord(event.clientX);
						setLastDownYCoord(event.clientY);
					}}
					onPointerUp={(event) => {
						event.preventDefault();

						setIsDown(false);

						if (
							isClick(
								[event.clientX, event.clientY],
								[lastDownXCoord, lastDownYCoord],
							)
						) {
							setIsExpanded(true);
						} else if (isLeftSwipe(event.clientX, lastDownXCoord)) {
							setHasSwipedLeft(true);
						}
					}}
					onPointerMove={(event) => {
						event.preventDefault();

						if (isDown) {
							setDragLeftDistance(
								Math.min(
									0,
									event.clientX - (lastDownXCoord ?? 0),
								),
							);
						}
					}}
					onTouchStart={(event) => {
						event.preventDefault();
					}}
				>
					<ExpandableMarketingCard
						{...{
							guardianBaseURL,
							heading,
							kicker,
							isExpanded,
							setIsExpanded,
							setIsClosed,
						}}
					/>
				</div>
			</div>
		);
	}

	return (
		<div
			data-component="us-expandable-marketing-card"
			css={[stickyContainerStyles]}
		>
			<div
				css={[absoluteContainerStyles]}
				role="button"
				tabIndex={0}
				onKeyDown={(event) => {
					if (event.key === 'Escape') {
						setIsClosed(true);
					}
				}}
			>
				<ExpandableMarketingCard
					guardianBaseURL={guardianBaseURL}
					heading={heading}
					kicker={kicker}
					isExpanded={isExpanded}
					setIsClosed={setIsClosed}
				/>
			</div>
		</div>
	);
};
