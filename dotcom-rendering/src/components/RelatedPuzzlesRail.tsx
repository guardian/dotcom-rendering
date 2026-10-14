import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	palette as sourcePalette,
} from '@guardian/source/foundations';
import type { PuzzleItem } from '../types/puzzlesPage';
import { MorePuzzlesRows } from './MorePuzzlesCard';

/**
 * The heading column's width matches `PuzzleGrid`'s own `title`/`meta`
 * column exactly (140px from "leftCol", 220px from "wide" - see
 * `PuzzleGrid` above), so "More from" lines up with the "Puzzle/quiz type"
 * column above it, per the Figma design. Below "leftCol", `PuzzleGrid`
 * itself drops that left column entirely (single-column layout), which is
 * why this rail switches to the same stacked-heading layout at that exact
 * breakpoint too, rather than a breakpoint of its own.
 */
const relatedRailStyles = css`
	display: grid;
	gap: 16px;
	padding: 16px 0;
	${from.leftCol} {
		grid-template-columns: 140px minmax(0, 1fr);
		gap: 20px;
	}
	${from.wide} {
		grid-template-columns: 220px minmax(0, 1fr);
	}
`;

/**
 * From "leftCol" up, the heading sits beside the cards (see
 * `relatedRailStyles`), so it gets its own divider on its right edge to
 * separate it from them - the lateral equivalent of the vertical dividers
 * between the cards themselves (`MorePuzzlesCard.tsx`). Below "leftCol"
 * the heading stacks above the cards instead. The horizontal divider the
 * design draws between the heading and the cards there belongs to the cards
 * list rather than to the heading, since it must span exactly from the
 * first card to the last one, not the heading's own width (see
 * `MorePuzzlesCard.tsx`'s `mobileScrollable` styles). Per explicit design
 * direction there is no horizontal divider between rows of cards.
 *
 * `right: -10px` (half of `relatedRailStyles`'s own 20px column gap from
 * "leftCol" up) centres the line in that gap, the same distance from the
 * heading as from the first card - matching how the card-to-card dividers
 * centre themselves in their own gap (`left: calc(var(--puzzles-gap) / -2)`
 * in `MorePuzzlesCard.tsx`) rather than sitting flush against the
 * heading's own edge, which left it visibly further from the card than
 * from the heading.
 */
const relatedRailHeading = css`
	margin: 0;
	${headlineBold20};
	line-height: 1.15;
	${from.leftCol} {
		position: relative;
		::after {
			position: absolute;
			top: 0;
			right: -10px;
			bottom: 0;
			border-right: 1px solid ${sourcePalette.neutral[86]};
			content: '';
			pointer-events: none;
		}
	}
`;

/**
 * Below "leftCol", the heading has the full content width to itself (it
 * stacks above the cards rather than sitting in the narrow 140/220px
 * column - see `relatedRailStyles`), so "More from"/"Puzzles & games" sit
 * on one line there; `display: block` only kicks in from "leftCol" up,
 * where that column width forces them onto their own lines.
 */
const relatedRailHeadingName = css`
	${from.leftCol} {
		display: block;
	}
`;

/**
 * The "More from Puzzles & games" rail shared by the Puzzle Page, the
 * crosswords page and the Puzzles & games archive pages. On mobile the cards
 * scroll horizontally (`mobileScrollable`).
 *
 * Renders the cards with `MorePuzzlesCard.tsx`'s
 * `MorePuzzlesRows` - a deliberately independent copy of the Puzzles Hub
 * listing page's own card/grid implementation (`Rows`/`PuzzleCard`,
 * `src/components/PuzzleCard.tsx`), not that shared implementation itself:
 * per explicit direction, `PuzzleCard.tsx` (owned by the Puzzles Hub team)
 * must not be modified for this rail's needs, so this rail no longer
 * shares it - see `MorePuzzlesCard.tsx`'s own doc comment for what that
 * means for the two staying visually in sync.
 *
 * The heading itself ("More from" / "Puzzles & games") is plain text in a
 * single colour, not a link.
 */
export const RelatedPuzzlesRail = ({ items }: { items: PuzzleItem[] }) => (
	<div css={relatedRailStyles}>
		<h2 css={relatedRailHeading}>
			More from{' '}
			<span css={relatedRailHeadingName}>Puzzles &amp; games</span>
		</h2>
		<MorePuzzlesRows items={items} mobileScrollable={true} />
	</div>
);
