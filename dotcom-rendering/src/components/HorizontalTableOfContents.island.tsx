import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { isNonNullable } from '@guardian/libs';
import {
	from,
	space,
	textSans14,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import type { TableOfContentsItem } from '../model/enhanceTableOfContents';
import { palette } from '../palette';

interface Props {
	tableOfContents: TableOfContentsItem[];
}

type ScrollDirection = 'prev' | 'next';

/** Distance between the top of the viewport and the pinned bar. */
const STICKY_TOP = space[2];

/**
 * The bar's fixed height. The links can't wrap, so the bar can't grow, which
 * is what lets this be shared with the section headings' `scroll-margin-top`.
 */
const BAR_HEIGHT = 36;

/** Backdrop below the pinned bar, so content doesn't show right under it. */
const BACKDROP_BOTTOM = space[2];

/** Allowance for sub-pixel rounding in layout measurements. */
const ROUNDING_TOLERANCE = 1;

/**
 * How far below the top of the viewport a section heading sits after a reader
 * follows one of the nav's links: clear of the pinned bar and its backdrop,
 * with a small gap. It is also the line the reader has to scroll a heading
 * past for its section to become the current one, so that following a link
 * always selects it.
 */
export const HORIZONTAL_TABLE_OF_CONTENTS_SCROLL_MARGIN =
	STICKY_TOP + BAR_HEIGHT + BACKDROP_BOTTOM + space[2];

/**
 * Pins to the top of the viewport and fills the space around the bar with the
 * page background at 80% opacity, so the article only faintly shows through as
 * it scrolls under.
 */
const stickyStyles = css`
	position: sticky;
	top: 0;
	z-index: ${getZIndex('tableOfContents')};
	margin: ${space[4] - STICKY_TOP}px 0 ${space[6] - BACKDROP_BOTTOM}px;
	padding: ${STICKY_TOP}px 0 ${BACKDROP_BOTTOM}px;

	/* A pseudo-element, so that the opacity doesn't apply to the bar too. */
	&::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background-color: ${palette('--article-background')};
		opacity: 0.8;
	}
`;

const wrapperStyles = css`
	position: relative;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	width: 100%;
	height: ${BAR_HEIGHT}px;
	padding: 0 10px;
	background-color: ${palette('--table-of-contents-horizontal-background')};
	border: 1px solid ${palette('--table-of-contents-horizontal-border')};
	border-radius: 4px;

	/* Edge fades, shown when there is more to scroll to on that side. */
	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 0;
		z-index: 1;
		width: 45px;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent 0%,
			${palette('--table-of-contents-horizontal-background')} 65%
		);
		pointer-events: none;
		visibility: hidden;
	}

	&::before {
		left: 0;
		transform: rotate(180deg);
		border-radius: 0 4px 4px 0;
	}

	&::after {
		right: 0;
		border-radius: 0 4px 4px 0;
	}

	/* Wider from tablet, where the arrow buttons sit on top of the fades. */
	${from.tablet} {
		&::before,
		&::after {
			width: 90px;
		}
	}
`;

const showPrevFadeStyles = css`
	&::before {
		visibility: visible;
	}
`;

const showNextFadeStyles = css`
	&::after {
		visibility: visible;
	}
`;

const scrollStyles = css`
	flex: 1;
	min-width: 0;
	overflow-x: auto;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const listStyles = css`
	display: flex;
	width: max-content;
	margin: 0;
	/* Room for the focus outline, which the scroll container would clip. */
	padding: ${space[1]}px 2px;
	list-style: none;
`;

const itemStyles = css`
	display: flex;
	align-items: center;
	padding: 0 12px;
	border-right: 1px solid ${palette('--table-of-contents-horizontal-border')};

	&:first-of-type {
		padding-left: 0;
	}

	&:last-of-type {
		padding-right: 0;
		border-right: none;
	}
`;

const linkStyles = css`
	${textSans14};
	display: inline-flex;
	align-items: center;
	min-height: 24px;
	white-space: nowrap;
	color: ${palette('--table-of-contents-horizontal-text')};
	text-decoration: none;
	text-underline-offset: 4px;

	&:hover {
		text-decoration: underline;
	}

	&:focus-visible {
		outline: 2px solid
			${palette('--table-of-contents-horizontal-text-active')};
		outline-offset: 2px;
		border-radius: 2px;
	}

	&[aria-current='location'] {
		${textSansBold14};
		color: ${palette('--table-of-contents-horizontal-text-active')};
	}
`;

const buttonStyles = css`
	position: absolute;
	top: 0;
	z-index: 2;
	display: flex;
	align-items: center;
	height: 100%;
	margin: 0;
	padding: 0 6px;
	background-color: transparent;
	border: none;
	cursor: pointer;

	svg {
		fill: ${palette('--table-of-contents-horizontal-text')};
	}

	&:hover svg {
		fill: ${palette('--table-of-contents-horizontal-text-hover')};
	}

	/* Below tablet the nav is swiped, so only the fades are shown. */
	${until.tablet} {
		display: none;
	}
`;

const buttonPositionStyles: Record<ScrollDirection, SerializedStyles> = {
	prev: css`
		left: 0;
	`,
	next: css`
		right: 0;
	`,
};

/**
 * Works out which section the reader is in: the last heading whose top has
 * scrolled up to the selection line. Unlike observing headings as they enter
 * the viewport, this gives the right answer when scrolling up as well as down.
 * Returns `undefined` above the first heading.
 *
 * @param sections Section headings, in document order.
 * @param selectionLine Distance from the top of the viewport that a heading
 * has to reach for its section to become the current one.
 */
export const getCurrentSectionId = (
	sections: Array<{ id: string; top: number }>,
	selectionLine: number,
): string | undefined => {
	let currentSectionId: string | undefined;

	for (const section of sections) {
		// The tolerance means a heading scrolled exactly to its
		// `scroll-margin-top` counts as current.
		if (section.top > selectionLine + ROUNDING_TOLERANCE) break;
		currentSectionId = section.id;
	}

	return currentSectionId;
};

const getScrollBehavior = (): ScrollBehavior =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches
		? 'auto'
		: 'smooth';

const getMaxScrollLeft = (nav: HTMLElement): number =>
	nav.scrollWidth - nav.clientWidth;

/**
 * Wraps `callback` so that however often it's scheduled, e.g. on every scroll
 * event, it runs at most once per animation frame.
 */
const throttleToAnimationFrame = (callback: () => void) => {
	let frame: number | undefined;

	const schedule = () => {
		frame ??= window.requestAnimationFrame(() => {
			frame = undefined;
			callback();
		});
	};

	const cancel = () => {
		if (frame !== undefined) window.cancelAnimationFrame(frame);
	};

	return { schedule, cancel };
};

/** The scroll position that centres `link` in `nav`, within its scroll range. */
const getCentredScrollLeft = (nav: HTMLElement, link: HTMLElement): number => {
	const navRect = nav.getBoundingClientRect();
	const linkRect = link.getBoundingClientRect();
	const centredScrollLeft =
		nav.scrollLeft +
		(linkRect.left - navRect.left) -
		(navRect.width - linkRect.width) / 2;

	return Math.min(Math.max(centredScrollLeft, 0), getMaxScrollLeft(nav));
};

/** The first item that is cut off on the `direction` side of `nav`. */
const findFirstHiddenItem = (
	nav: HTMLElement,
	direction: ScrollDirection,
): HTMLElement | undefined => {
	const navRect = nav.getBoundingClientRect();
	const items = Array.from(nav.querySelectorAll('li'));

	return direction === 'next'
		? items.find(
				(item) =>
					item.getBoundingClientRect().right >
					navRect.right + ROUNDING_TOLERANCE,
			)
		: items.findLast(
				(item) =>
					item.getBoundingClientRect().left <
					navRect.left - ROUNDING_TOLERANCE,
			);
};

/** Scrolls `nav` by the width of the next cut-off item, i.e. one section. */
const scrollByOneItem = (nav: HTMLElement, direction: ScrollDirection) => {
	const item = findFirstHiddenItem(nav, direction);
	if (!item) return;

	nav.scrollBy({
		left: direction === 'next' ? item.offsetWidth : -item.offsetWidth,
		behavior: getScrollBehavior(),
	});
};

/** Tracks the section of the article that the reader is in. */
const useCurrentSectionId = (
	tableOfContents: TableOfContentsItem[],
): string | undefined => {
	const [currentSectionId, setCurrentSectionId] = useState<string>();

	useEffect(() => {
		const headings = tableOfContents
			.map(({ id }) => document.getElementById(id))
			.filter(isNonNullable);

		if (headings.length === 0) return;

		const updateCurrentSectionId = () =>
			setCurrentSectionId(
				getCurrentSectionId(
					headings.map((heading) => ({
						id: heading.id,
						top: heading.getBoundingClientRect().top,
					})),
					HORIZONTAL_TABLE_OF_CONTENTS_SCROLL_MARGIN,
				),
			);
		const { schedule, cancel } = throttleToAnimationFrame(
			updateCurrentSectionId,
		);

		updateCurrentSectionId();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);

		return () => {
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			cancel();
		};
	}, [tableOfContents]);

	return currentSectionId;
};

/**
 * Whether the nav has more to scroll to on each side. Read from its real
 * scroll position, so it stays right however it was scrolled: swipe,
 * trackpad, arrow or focus.
 */
const useScrollableSides = (navRef: RefObject<HTMLElement>) => {
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);

	useEffect(() => {
		const nav = navRef.current;
		if (!nav) return;

		const updateScrollableSides = () => {
			setCanScrollPrev(nav.scrollLeft > ROUNDING_TOLERANCE);
			setCanScrollNext(
				nav.scrollLeft < getMaxScrollLeft(nav) - ROUNDING_TOLERANCE,
			);
		};
		const { schedule, cancel } = throttleToAnimationFrame(
			updateScrollableSides,
		);

		updateScrollableSides();
		nav.addEventListener('scroll', schedule, { passive: true });

		// Re-measure when the nav or its links change size, e.g. on window
		// resize or once web fonts load and widen the links. Fall back to
		// window resize where ResizeObserver isn't supported.
		let resizeObserver: ResizeObserver | undefined;
		if (typeof ResizeObserver !== 'undefined') {
			resizeObserver = new ResizeObserver(schedule);
			resizeObserver.observe(nav);
			if (nav.firstElementChild) {
				resizeObserver.observe(nav.firstElementChild);
			}
		} else {
			window.addEventListener('resize', schedule);
		}

		return () => {
			nav.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			resizeObserver?.disconnect();
			cancel();
		};
	}, [navRef]);

	return { canScrollPrev, canScrollNext };
};

/**
 * Keeps the current section's link centred in the nav. This scrolls the nav
 * only, unlike `scrollIntoView`, which would also scroll the page.
 */
const useCentredCurrentLink = (
	navRef: RefObject<HTMLElement>,
	currentSectionId: string | undefined,
) => {
	useEffect(() => {
		const nav = navRef.current;
		if (!nav || currentSectionId === undefined) return;

		const link = nav.querySelector<HTMLAnchorElement>(
			`a[href="#${CSS.escape(currentSectionId)}"]`,
		);
		if (!link) return;

		nav.scrollTo({
			left: getCentredScrollLeft(nav, link),
			behavior: getScrollBehavior(),
		});
	}, [navRef, currentSectionId]);
};

/**
 * Keyboard and screen reader users reach every section through the links, so
 * the arrows are mouse-only.
 */
const ScrollButton = ({
	direction,
	onClick,
}: {
	direction: ScrollDirection;
	onClick: () => void;
}) => (
	<button
		type="button"
		css={[buttonStyles, buttonPositionStyles[direction]]}
		onClick={onClick}
		tabIndex={-1}
		aria-hidden="true"
		data-link-name={`horizontal-table-of-contents-${direction}`}
	>
		{direction === 'prev' ? (
			<SvgChevronLeftSingle size="xsmall" />
		) : (
			<SvgChevronRightSingle size="xsmall" />
		)}
	</button>
);

/**
 * A table of contents shown as a sticky, horizontally scrolling bar of the
 * article's sections: the horizontal alternative to the "Jump to" list in
 * `TableOfContents`.
 *
 * The section the reader is in is highlighted and kept centred in the nav. When
 * the sections don't all fit, fades show on the side(s) with more to scroll to,
 * plus arrow buttons from tablet up that move along one section at a time.
 *
 * Section headings need `scroll-margin-top` set to
 * `HORIZONTAL_TABLE_OF_CONTENTS_SCROLL_MARGIN` so that they don't land under
 * the bar.
 */
export const HorizontalTableOfContents = ({ tableOfContents }: Props) => {
	const navRef = useRef<HTMLElement>(null);
	const currentSectionId = useCurrentSectionId(tableOfContents);
	const { canScrollPrev, canScrollNext } = useScrollableSides(navRef);
	useCentredCurrentLink(navRef, currentSectionId);

	const scrollNav = (direction: ScrollDirection) => {
		if (navRef.current) scrollByOneItem(navRef.current, direction);
	};

	return (
		<div css={stickyStyles} data-component="horizontal-table-of-contents">
			<div
				css={[
					wrapperStyles,
					canScrollPrev && showPrevFadeStyles,
					canScrollNext && showNextFadeStyles,
				]}
			>
				{canScrollPrev && (
					<ScrollButton
						direction="prev"
						onClick={() => scrollNav('prev')}
					/>
				)}

				<nav ref={navRef} css={scrollStyles} aria-label="Sections">
					<ul css={listStyles}>
						{tableOfContents.map((item, index) => (
							<li key={item.id} css={itemStyles}>
								<a
									href={`#${item.id}`}
									css={linkStyles}
									aria-current={
										item.id === currentSectionId
											? 'location'
											: undefined
									}
									data-link-name={`horizontal-table-of-contents-item-${index}-${item.id}`}
								>
									{item.title}
								</a>
							</li>
						))}
					</ul>
				</nav>

				{canScrollNext && (
					<ScrollButton
						direction="next"
						onClick={() => scrollNav('next')}
					/>
				)}
			</div>
		</div>
	);
};
