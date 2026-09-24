import { css } from '@emotion/react';
import { isNonNullable } from '@guardian/libs';
import {
	between,
	from,
	headlineBold17,
	headlineLight17,
	space,
	textSansBold14,
	textSansBold17,
	until,
	visuallyHidden,
} from '@guardian/source/foundations';
import {
	SvgChevronDownSingle,
	SvgChevronUpSingle,
} from '@guardian/source/react-components';
import { useEffect, useRef, useState } from 'react';
import { grid } from '../grid';
import { ArticleDisplay, type ArticleFormat } from '../lib/articleFormat';
import { getZIndex } from '../lib/getZIndex';
import type { TableOfContentsItem } from '../model/enhanceTableOfContents';
import { palette } from '../palette';

interface Props {
	tableOfContents: TableOfContentsItem[];
	format: ArticleFormat;
	/**
	 * Renders the more prominent variant used by The Filter: a taller bar on
	 * its own surface, whose label is replaced by the heading of the section
	 * currently being read once it pins to the top of the viewport.
	 */
	isFilterArticle?: boolean;
}

/**
 * The height of The Filter's collapsed "Jump to" bar.
 *
 * This is a fixed value rather than a measured one because it is the single
 * source of truth for two separate things: the line the scroll spy measures
 * headings against, and the `scroll-margin-top` applied to subheadings in
 * `ArticleBody` so that they don't land underneath the bar. It is only valid
 * because the label is `nowrap` and ellipsised, so the bar cannot grow taller.
 * If the label is ever allowed to wrap, both of those will drift.
 */
export const FILTER_TOC_STICKY_HEIGHT = 44;

/**
 * Works out which section the reader is currently in, given the position of
 * each section heading relative to the viewport.
 *
 * The current section is the *last* heading that has scrolled up behind the
 * sticky bar, i.e. whose bottom edge is at or above the bar. Deliberately
 * matching on `bottom` rather than `top` keeps this in step with the
 * `IntersectionObserver` that triggers it: a heading stops intersecting the
 * area below the bar at exactly the moment its bottom crosses that line, so
 * there is always a callback when the answer changes.
 *
 * Returns `undefined` when the reader is above the first heading.
 *
 * @param sections Section headings, in document order.
 */
export const getCurrentSectionId = (
	sections: Array<{ id: string; bottom: number }>,
	stickyHeight: number,
): string | undefined => {
	let current: string | undefined;

	for (const section of sections) {
		if (section.bottom > stickyHeight) break;
		current = section.id;
	}

	return current;
};

const anchorStyles = css`
	color: ${palette('--table-of-contents')};
	text-decoration: none;
	display: block;
	width: 100%;
`;

const paddingStyles = css`
	padding-bottom: ${space[4]}px;
	padding-top: ${space[1]}px;
`;

const listItemStyles = (format: ArticleFormat) => {
	return css`
		${format.display === ArticleDisplay.Immersive
			? headlineLight17
			: headlineBold17};
		box-sizing: border-box;
		border-top: 1px solid ${palette('--table-of-contents-border')};
		display: flex;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			background-color: ${palette('--table-of-contents')};
			width: 100%;
			height: 0;
			transition: height 0.2s ease;
			top: 0;
			left: 0;
		}

		&:hover::before {
			height: ${space[1]}px;
		}
	`;
};

const detailsStyles = css`
	margin: ${space[4]}px 0 ${space[6]}px 0;
	&:not([open]) .is-open,
	&[open] .is-closed {
		display: none;
	}
	&:not([open]) {
		border-bottom: 1px solid ${palette('--table-of-contents-border')};
	}
	/* removes toggle triangle from webkit browsers such as Safari */
	summary::-webkit-details-marker {
		display: none;
	}
`;
const stickyStyles = css`
	position: sticky;
	top: -1px;
	background: ${palette('--article-background')};
	z-index: ${getZIndex('tableOfContents')};
	summary {
		z-index: 1;
		background: ${palette('--article-background')};
	}
	ul {
		max-height: 90vh;
		overflow-y: auto;
	}
`;

const summaryStyles = css`
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	position: relative;
	list-style: none;

	padding: ${space[1]}px 0;
	border-top: 1px solid ${palette('--table-of-contents-border')};

	&:hover {
		text-decoration: underline;
	}

	path {
		fill: ${palette('--table-of-contents')};
	}
`;

const titleStyle = css`
	${textSansBold14}
	color:${palette('--table-of-contents')};
`;

const indexStyle = css`
	margin-right: 18px;
`;

const verticalStyle = css`
	position: absolute;
	left: ${space[4]}px;
	border-left: 1px solid ${palette('--table-of-contents-border')};
	height: 22px;
	top: 0;
	transition: 0.3s all ease;
`;

/**
 * Lifts The Filter's bar off the page onto its own surface. The background is
 * set on the summary as well as the details because the summary sits in its
 * own stacking context (see `stickyStyles`), and it has to stay opaque as the
 * article scrolls underneath it.
 *
 * The bar deliberately stays within the centre column at every breakpoint.
 * Breaking out over the left column reads as a jarring jump as it pins, and
 * would cover the article meta (byline, date, share buttons) that sits there.
 */
/**
 * The width of the pillar rules. Shared so that the side rules can be taken
 * back off the bleed padding, keeping the label aligned with the body copy.
 */
const accentRuleWidth = '1px';

const filterDetailsStyles = css`
	background: ${palette('--table-of-contents-background')};

	summary {
		background: ${palette('--table-of-contents-background')};
	}

	/* Every rule in the component takes the pillar accent. */
	border-left: ${accentRuleWidth} solid
		${palette('--table-of-contents-accent')};
	border-right: ${accentRuleWidth} solid
		${palette('--table-of-contents-accent')};

	/**
	 * The base styles only draw a bottom rule while collapsed, so this closes
	 * the box when expanded. The rule below still has to recolour the
	 * collapsed one separately, being the more specific selector.
	 */
	border-bottom: ${accentRuleWidth} solid
		${palette('--table-of-contents-accent')};

	&:not([open]) {
		border-bottom-color: ${palette('--table-of-contents-accent')};
	}

	summary,
	li {
		border-top-color: ${palette('--table-of-contents-accent')};
	}

	/* The bar that grows out of an item's rule on hover. */
	li::before {
		background-color: ${palette('--table-of-contents-accent')};
	}
`;

/**
 * Widens the bar's surface out to the vertical rules that frame the article,
 * so that it doesn't float inside them with a sliver of the page showing down
 * either side. How far that is depends on what sits alongside the centre
 * column at each breakpoint:
 *
 * - below `tablet` the centre column is inset from the article's edges by one
 *   column gap while inline images bleed past it, so the bar goes full width;
 * - between `tablet` and `desktop` the outer rules sit one full column gap
 *   out on either side;
 * - from `desktop` the centre rule sits half a column gap out, matching the
 *   offset in `grid.centreRule`, and the right edge follows it for symmetry.
 *
 * The padding goes on the `summary` and list items rather than the `details`,
 * so that the text and chevron keep their alignment with the body copy while
 * the background and the horizontal rules still run the full width.
 */
const bleedBy = (amount: string): string => `
	margin-left: calc(-1 * ${amount});
	margin-right: calc(-1 * ${amount});

	summary,
	li {
		padding-left: calc(${amount} - ${accentRuleWidth});
		padding-right: calc(${amount} - ${accentRuleWidth});
	}
`;

const filterFullBleedStyles = css`
	${until.mobileLandscape} {
		${bleedBy(grid.mobileColumnGap)}
	}

	${between.mobileLandscape.and.desktop} {
		${bleedBy(grid.columnGap)}
	}

	${from.desktop} {
		${bleedBy(`calc(${grid.columnGap} / 2)`)}
	}
`;

const filterSummaryStyles = css`
	box-sizing: border-box;

	path {
		fill: ${palette('--table-of-contents-accent')};
	}

	align-items: center;
	gap: ${space[4]}px;
	min-height: ${FILTER_TOC_STICKY_HEIGHT}px;
	padding: ${space[2]}px 0;
`;

/**
 * Truncating to a single line is load bearing: it's what guarantees the bar is
 * exactly `FILTER_TOC_STICKY_HEIGHT` tall however long the section heading is.
 */
const filterTitleStyles = css`
	${textSansBold17}
	color: ${palette('--table-of-contents-accent')};
	min-width: 0;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const filterCurrentAnchorStyles = css`
	color: ${palette('--table-of-contents-accent')};
	text-decoration: underline;
`;

const visuallyHiddenStyles = css`
	${visuallyHidden}
`;

/**
 * A table of contents, shown at the top of an article
 * to allow readers to quickly navigate though articles.
 *
 * ## Why does this need to be an Island?
 *
 * We are responding to user interactions on the page.
 *
 */

export const TableOfContents = ({
	tableOfContents,
	format,
	isFilterArticle = false,
}: Props) => {
	const [open, setOpen] = useState(tableOfContents.length < 5);
	const [isStuck, setIsStuck] = useState(false);
	const [currentSectionId, setCurrentSectionId] = useState<string>();
	const tocRef = useRef<HTMLDetailsElement>(null);

	// Automatically collapse the ToC when it becomes sticky (i.e. when it reaches the top of the viewport). This
	// approach is inspired by:
	// https://css-tricks.com/how-to-detect-when-a-sticky-element-gets-pinned/
	useEffect(() => {
		const tocElement = tocRef.current;

		if (!tocElement) {
			return;
		}

		const observer = new IntersectionObserver(
			([e]) => {
				// Verify whether the ToC is at the top of the viewport or the bottom. It should only collapse when it
				// reaches the top.
				if (!e) {
					return;
				}
				const isPinned = e.boundingClientRect.top < 0;
				if (isPinned) {
					setOpen(false);
				}
				setIsStuck(isPinned);
			},
			{ threshold: [1] },
		);

		observer.observe(tocElement);

		return () => {
			observer.disconnect();
		};
	}, []);

	// Track which section the reader is currently in, so that The Filter's bar
	// can show its heading once pinned. The observer is only used as a cheap
	// signal that something crossed the bar; the answer itself is worked out by
	// measuring every heading, which keeps it correct no matter how many
	// crossed in a single scroll.
	useEffect(() => {
		if (!isFilterArticle) {
			return;
		}

		// Anchor ids are added to the `h2`s by `enhanceH2s`.
		const sections = tableOfContents
			.map(({ id }) => document.getElementById(id))
			.filter(isNonNullable);

		if (sections.length === 0) {
			return;
		}

		const updateCurrentSection = () => {
			setCurrentSectionId(
				getCurrentSectionId(
					sections.map((section) => ({
						id: section.id,
						bottom: section.getBoundingClientRect().bottom,
					})),
					FILTER_TOC_STICKY_HEIGHT,
				),
			);
		};

		const observer = new IntersectionObserver(updateCurrentSection, {
			// Shrink the observed area to everything below the sticky bar, so
			// that we're notified each time a heading passes behind it.
			rootMargin: `-${FILTER_TOC_STICKY_HEIGHT}px 0px 0px 0px`,
		});

		for (const section of sections) {
			observer.observe(section);
		}

		return () => {
			observer.disconnect();
		};
	}, [isFilterArticle, tableOfContents]);

	const currentSection = tableOfContents.find(
		({ id }) => id === currentSectionId,
	);
	const showCurrentSection =
		isFilterArticle && isStuck && !open && currentSection !== undefined;

	return (
		<details
			ref={tocRef}
			open={open}
			css={[
				detailsStyles,
				stickyStyles,
				isFilterArticle && filterDetailsStyles,
				isFilterArticle && filterFullBleedStyles,
			]}
			data-component="table-of-contents"
		>
			<summary
				onClick={(e): void => {
					e.preventDefault();
					setOpen((state) => !state);
				}}
				onKeyDown={(e): void => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setOpen((state) => !state);
					}
				}}
				data-link-name={
					open ? 'table-of-contents-close' : 'table-of-contents-open'
				}
				css={[summaryStyles, isFilterArticle && filterSummaryStyles]}
				tabIndex={0}
				role="button"
			>
				<h2 css={[titleStyle, isFilterArticle && filterTitleStyles]}>
					{showCurrentSection ? (
						<>
							{/* Keeps the control's purpose in its accessible
                            name, so that it doesn't read as just a section
                            title when focused. */}
							<span css={visuallyHiddenStyles}>
								Jump to. Current section:{' '}
							</span>
							{currentSection.title}
						</>
					) : (
						'Jump to'
					)}
				</h2>
				<span className="is-closed">
					<SvgChevronDownSingle
						size={isFilterArticle ? 'small' : 'xsmall'}
					/>
				</span>
				<span className="is-open">
					<SvgChevronUpSingle
						size={isFilterArticle ? 'small' : 'xsmall'}
					/>
				</span>
			</summary>

			<ul>
				{tableOfContents.map((item, index) => {
					const isCurrent =
						isFilterArticle && item.id === currentSectionId;

					return (
						<li
							key={item.id}
							css={listItemStyles(format)}
							data-link-name={`table-of-contents-item-${index}-${item.id}`}
						>
							{format.display === ArticleDisplay.NumberedList && (
								<div css={paddingStyles}>
									<span css={indexStyle}>{index + 1}</span>
									<div css={verticalStyle}></div>
								</div>
							)}

							<a
								href={`#${item.id}`}
								aria-current={
									isCurrent ? 'location' : undefined
								}
								css={[
									anchorStyles,
									paddingStyles,
									isCurrent && filterCurrentAnchorStyles,
								]}
								onClick={(): void => {
									setOpen((state) => !state);
								}}
							>
								{item.title}
							</a>
						</li>
					);
				})}
			</ul>
		</details>
	);
};
