import { css } from '@emotion/react';
import { isNonNullable } from '@guardian/libs';
import {
	from,
	space,
	textSansBold14,
	until,
} from '@guardian/source/foundations';
import {
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { getZIndex } from '../lib/getZIndex';
import type { TableOfContentsItem } from '../model/enhanceTableOfContents';
import { palette } from '../palette';

interface Props {
	tableOfContents: TableOfContentsItem[];
}

/** Distance between the top of the viewport and the pinned bar. */
const STICKY_TOP = space[2];

/**
 * The bar's fixed height. The links can't wrap, so the bar can't grow, which
 * is what lets this be shared with the section headings' `scroll-margin-top`.
 */
const BAR_HEIGHT = 44;

/** Backdrop below the pinned bar, so content doesn't show right under it. */
const BACKDROP_BOTTOM = space[2];

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
 * Works out which section the reader is in: the last heading whose top has
 * scrolled up to the line under the bar. Unlike observing headings as they
 * enter the viewport, this gives the right answer when scrolling up as well as
 * down. Returns `undefined` above the first heading.
 *
 * @param sections Section headings, in document order.
 */
export const getCurrentSectionId = (
	sections: Array<{ id: string; top: number }>,
	line: number,
): string | undefined => {
	let current: string | undefined;

	for (const section of sections) {
		// Allow a pixel for rounding, so that a heading scrolled exactly to its
		// `scroll-margin-top` counts as current.
		if (section.top > line + 1) break;
		current = section.id;
	}

	return current;
};

const prefersReducedMotion = (): boolean =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Pins to the top of the viewport and fills the space around the bar with the
 * page background, so the article doesn't show through as it scrolls under.
 */
const stickyStyles = css`
	position: sticky;
	top: 0;
	z-index: ${getZIndex('tableOfContents')};
	margin: ${space[4] - STICKY_TOP}px 0 ${space[6] - BACKDROP_BOTTOM}px;
	padding: ${STICKY_TOP}px 0 ${BACKDROP_BOTTOM}px;
	background-color: ${palette('--article-background')};
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

const showPrevStyles = css`
	&::before {
		visibility: visible;
	}
`;

const showNextStyles = css`
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
	${textSansBold14};
	display: inline-flex;
	align-items: center;
	min-height: 24px;
	white-space: nowrap;
	color: ${palette('--table-of-contents-horizontal-text')};
	text-decoration: none;
	text-underline-offset: 4px;

	&:hover {
		color: ${palette('--table-of-contents-horizontal-text-hover')};
		text-decoration: underline;
	}

	&:focus-visible {
		outline: 2px solid
			${palette('--table-of-contents-horizontal-text-active')};
		outline-offset: 2px;
		border-radius: 2px;
	}

	&[aria-current='location'] {
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

/**
 * A table of contents shown as a sticky, horizontally scrolling bar of the
 * article's sections: the horizontal alternative to the "Jump to" list in
 * `TableOfContents`.
 *
 * The section the reader is in is highlighted and kept centred in the nav. When
 * the sections don't all fit, fades show on the side(s) with more to scroll to,
 * plus arrow buttons from tablet up.
 *
 * Section headings need `scroll-margin-top` set to
 * `HORIZONTAL_TABLE_OF_CONTENTS_SCROLL_MARGIN` so that they don't land under the bar.
 */
export const HorizontalTableOfContents = ({ tableOfContents }: Props) => {
	const [currentSectionId, setCurrentSectionId] = useState<string>();
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const navRef = useRef<HTMLElement>(null);

	// Track the section the reader is in.
	useEffect(() => {
		// Anchor ids are added to the `h2`s by `enhanceH2s`.
		const sections = tableOfContents
			.map(({ id }) => document.getElementById(id))
			.filter(isNonNullable);

		if (sections.length === 0) return;

		let frame: number | undefined;

		const update = () => {
			frame = undefined;
			setCurrentSectionId(
				getCurrentSectionId(
					sections.map((section) => ({
						id: section.id,
						top: section.getBoundingClientRect().top,
					})),
					HORIZONTAL_TABLE_OF_CONTENTS_SCROLL_MARGIN,
				),
			);
		};

		const scheduleUpdate = () => {
			frame ??= window.requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', scheduleUpdate, { passive: true });
		window.addEventListener('resize', scheduleUpdate);

		return () => {
			window.removeEventListener('scroll', scheduleUpdate);
			window.removeEventListener('resize', scheduleUpdate);
			if (frame !== undefined) window.cancelAnimationFrame(frame);
		};
	}, [tableOfContents]);

	// Show the fades and arrows from the nav's real scroll position, so that
	// they stay right however it was scrolled: swipe, trackpad, arrow or focus.
	useEffect(() => {
		const nav = navRef.current;
		if (!nav) return;

		const update = () => {
			const maxScrollLeft = nav.scrollWidth - nav.clientWidth;
			setCanScrollPrev(nav.scrollLeft > 1);
			setCanScrollNext(nav.scrollLeft < maxScrollLeft - 1);
		};

		update();
		nav.addEventListener('scroll', update, { passive: true });

		// Re-measure when the nav or its links change size, e.g. on window
		// resize or once web fonts load and widen the links.
		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(nav);
		if (nav.firstElementChild)
			resizeObserver.observe(nav.firstElementChild);

		return () => {
			nav.removeEventListener('scroll', update);
			resizeObserver.disconnect();
		};
	}, []);

	// Keep the current section centred in the nav. This scrolls the nav only,
	// unlike `scrollIntoView`, which would also scroll the page.
	useEffect(() => {
		const nav = navRef.current;
		if (!nav || currentSectionId === undefined) return;

		const link = nav.querySelector<HTMLAnchorElement>(
			`a[href="#${CSS.escape(currentSectionId)}"]`,
		);
		if (!link) return;

		const navRect = nav.getBoundingClientRect();
		const linkRect = link.getBoundingClientRect();
		const target =
			nav.scrollLeft +
			(linkRect.left - navRect.left) -
			(navRect.width - linkRect.width) / 2;
		const maxScrollLeft = nav.scrollWidth - nav.clientWidth;

		nav.scrollTo({
			left: Math.min(Math.max(target, 0), maxScrollLeft),
			behavior: prefersReducedMotion() ? 'auto' : 'smooth',
		});
	}, [currentSectionId]);

	const scrollByPage = (direction: -1 | 1) => {
		const nav = navRef.current;
		if (!nav) return;

		nav.scrollBy({
			left: direction * nav.clientWidth * 0.75,
			behavior: prefersReducedMotion() ? 'auto' : 'smooth',
		});
	};

	return (
		<div css={stickyStyles} data-component="horizontal-table-of-contents">
			<div
				css={[
					wrapperStyles,
					canScrollPrev && showPrevStyles,
					canScrollNext && showNextStyles,
				]}
			>
				{canScrollPrev && (
					// Keyboard and screen reader users reach every section
					// through the links, so the arrows are mouse-only.
					<button
						type="button"
						css={[
							buttonStyles,
							css`
								left: 0;
							`,
						]}
						onClick={() => scrollByPage(-1)}
						tabIndex={-1}
						aria-hidden="true"
						data-link-name="horizontal-table-of-contents-prev"
					>
						<SvgChevronLeftSingle size="xsmall" />
					</button>
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
					<button
						type="button"
						css={[
							buttonStyles,
							css`
								right: 0;
							`,
						]}
						onClick={() => scrollByPage(1)}
						tabIndex={-1}
						aria-hidden="true"
						data-link-name="horizontal-table-of-contents-next"
					>
						<SvgChevronRightSingle size="xsmall" />
					</button>
				)}
			</div>
		</div>
	);
};
