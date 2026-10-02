import { css } from '@emotion/react';
import {
	between,
	from,
	headlineBold20,
	palette,
	space,
	textSans14,
	until,
} from '@guardian/source/foundations';
import type { PuzzleItem } from '../types/puzzlesPage';
import { useConfig } from './ConfigContext';
import { externalProps, getPuzzleUrl } from './PuzzleCard';

/**
 * A deliberate, independent copy of `PuzzleCard.tsx`'s card/grid rendering,
 * for `PuzzlePageLayout`'s "More from Puzzles & games" rail only - per
 * explicit direction, `PuzzleCard.tsx` (owned by the Puzzles Hub team) must
 * not be modified for this rail's needs, so this rail no longer shares that
 * implementation and the two can drift apart without cross-impact. Only the
 * two small, data-only helpers with no styling/layout concerns
 * (`getPuzzleUrl`, `externalProps`) are still imported from there rather
 * than duplicated.
 *
 * Simplified relative to `PuzzleCard.tsx` in the ways this rail's own
 * caller (`RelatedPuzzlesRail`) actually constrains, not in ways the
 * `PuzzleItem` data itself could vary:
 * - `isFeatured` and the small-title/`cardVariant` title-size split are
 *   dropped entirely (this rail never marks a card "featured", and its
 *   title is always the smaller size).
 * - Renders a single flat list of cards (`items: PuzzleItem[]`) instead of
 *   `PuzzleCard`'s `rows: PuzzleItem[][]` groups - this rail never renders
 *   more than one group, so the "divider between groups" styling for a
 *   second `<ul>` is dropped too.
 *
 * Deliberately NOT simplified, since `moreFromPuzzlesAndGames` is typed
 * (`docs/puzzle-page.md`) as the same general `PuzzleItem[]` the Hub uses,
 * with no narrower contract: `cardVariant`-driven grid/typography sizing,
 * image rendering, and the crossword `setter` byline are all kept exactly
 * as `PuzzleCard.tsx` has them, since nothing rules out `frontend` sending
 * this rail a non-"compact", image-bearing, or crossword item in future.
 */

type PuzzleGroupColours = {
	background: string | undefined;
	/** Title colour in light mode. */
	title: string;
	/** Title colour in dark mode: the lighter tint of the same hue. */
	darkTitle: string;
};

/**
 * Light mode -> dark mode title colours for each Puzzles & games group
 * (crosswords, logic puzzles, word games, trivia). The light-mode title
 * colours are too dark to read on the dark mode card background (see
 * `DARK_MODE_CARD_BACKGROUND`), so each group has its lighter counterpart.
 */
const puzzleGroupColours = {
	crosswords: {
		background: palette.news[800],
		title: palette.news[300],
		// Design reference: #FF9081, which is `news[550]` (`news[500]` is #FF5943).
		darkTitle: palette.news[550],
	},
	logicPuzzles: {
		background: palette.sport[800],
		title: palette.sport[400],
		darkTitle: palette.sport[600],
	},
	wordGames: {
		background: palette.opinion[800],
		title: palette.opinion[400],
		darkTitle: palette.opinion[600],
	},
	// No trivia card is sent to the rail yet, so its light-mode colours are
	// provisional; only `darkTitle` comes from design.
	trivia: {
		background: palette.labs[700],
		title: palette.labs[200],
		darkTitle: palette.labs[600],
	},
} satisfies Record<string, PuzzleGroupColours>;

const puzzleColours = (item: PuzzleItem): PuzzleGroupColours => {
	switch (item.type) {
		case 'crossword':
			return puzzleGroupColours.crosswords;
		case 'sudoku':
			return puzzleGroupColours.logicPuzzles;
		case 'wordiply':
		case 'word-wheel':
			return puzzleGroupColours.wordGames;
		case 'trivia':
			return puzzleGroupColours.trivia;
		default:
			return {
				background: item.backgroundColour,
				title: palette.neutral[7],
				darkTitle: palette.neutral[93],
			};
	}
};

/**
 * In dark mode every card in the rail shares one neutral background, in
 * place of the per-type light-mode colours (`puzzleColours`). Only the
 * background changes, the title switches to the lighter tint of its group's
 * colour (`puzzleGroupColours`), and the remaining (cadence) text is
 * lightened, as it would otherwise be near-black on the dark background. Only applied when dark mode is available
 * for the page (`darkModeAvailable`), mirroring how the page's own dark
 * palette is gated (`rootStyles`), and not when the reader has forced the
 * light scheme.
 */
const DARK_MODE_CARD_BACKGROUND = '#333333';

const cardColourStyles = (
	colours: PuzzleGroupColours,
	darkModeAvailable: boolean,
) => css`
	background-color: ${colours.background};
	${darkModeAvailable &&
	css`
		@media (prefers-color-scheme: dark) {
			html:not([data-color-scheme='light']) & {
				background-color: ${DARK_MODE_CARD_BACKGROUND};
				color: ${palette.neutral[86]};
			}
		}
	`}
`;

const cardTitleColourStyles = (
	colours: PuzzleGroupColours,
	darkModeAvailable: boolean,
) => css`
	color: ${colours.title};
	${darkModeAvailable &&
	css`
		@media (prefers-color-scheme: dark) {
			html:not([data-color-scheme='light']) & {
				color: ${colours.darkTitle};
			}
		}
	`}
`;

const cardStyles = (
	variant: PuzzleItem['cardVariant'],
	hasImage: boolean,
) => css`
	position: relative;
	display: block;
	width: 100%;
	min-width: 0;
	min-height: ${variant === 'compact' ? 104 : 145}px;
	height: ${variant === 'compact' ? 'auto' : '145px'};
	${hasImage &&
	css`
		padding-right: 181px;
	`}
	box-sizing: border-box;
	color: ${palette.neutral[7]};
	text-decoration: none;

	${from.tablet} {
		max-width: ${variant === 'compact' ? 'none' : '340px'};
	}

	${from.desktop} {
		max-width: ${variant === 'compact' ? 'none' : '460px'};
		min-height: ${variant === 'compact' ? 104 : 176}px;
		height: ${variant === 'compact' ? 'auto' : '176px'};
		${hasImage &&
		css`
			padding-right: 220px;
		`}
	}

	:hover .puzzle-card-title {
		text-decoration: underline;
	}

	:focus-visible {
		outline: 3px solid ${palette.brand[500]};
		outline-offset: 2px;
	}
`;

const cardTextStyles = css`
	position: relative;
	display: flex;
	min-width: 0;
	flex-direction: column;
	padding: ${space[1]}px ${space[2]}px ${space[2]}px;
`;

const cardTitleStyles = css`
	${headlineBold20};
	line-height: 1.15;
`;

const cadenceStyles = css`
	margin-top: ${space[1]}px;
	${textSans14};
	line-height: 1.3;
`;

const setterStyles = css`
	margin-top: ${space[1]}px;
	color: ${palette.news[300]};
	${textSans14};
	line-height: 1.3;
`;

const cardImageStyles = css`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 181px;
	height: 145px;
	min-height: 0;
	object-fit: contain;
	${from.desktop} {
		width: 220px;
		height: 176px;
	}
`;

const MorePuzzlesCard = ({ item }: { item: PuzzleItem }) => {
	const url = getPuzzleUrl(item);
	const { darkModeAvailable } = useConfig();
	const colours = puzzleColours(item);
	const setter = item.type === 'crossword' ? item.setter?.trim() : undefined;
	const hasImage =
		item.image !== undefined &&
		item.image.length > 0 &&
		item.cardVariant !== 'compact';
	const contents = (
		<>
			<div css={cardTextStyles}>
				<span
					className="puzzle-card-title"
					css={[
						cardTitleStyles,
						cardTitleColourStyles(colours, darkModeAvailable),
					]}
				>
					{item.title}
				</span>
				{item.cadence !== undefined && item.cadence.length > 0 && (
					<span css={cadenceStyles}>{item.cadence}</span>
				)}
				{setter && <span css={setterStyles}>By: {setter}</span>}
			</div>
			{hasImage && (
				<img
					alt={item.imageAlt?.trim() || `${item.title} illustration`}
					aria-hidden="true"
					css={cardImageStyles}
					src={item.image}
				/>
			)}
		</>
	);
	const styles = [
		cardStyles(item.cardVariant, hasImage),
		cardColourStyles(colours, darkModeAvailable),
	];
	return url !== undefined ? (
		<a css={styles} href={url} {...externalProps(url)}>
			{contents}
		</a>
	) : (
		<article css={styles}>{contents}</article>
	);
};

const rowsStyles = css`
	--puzzles-gap: 16px;
	display: flex;
	min-width: 0;
	flex-direction: column;
	${from.phablet} {
		--puzzles-gap: 24px;
	}
	${from.tablet} {
		--puzzles-gap: 20px;
	}
`;

/**
 * The divider is vertical only, and only between cards that genuinely sit
 * side by side in the same row - never horizontal, and never before a
 * card that has nothing to its own left (the first card of a row,
 * including a card left on its own when the count doesn't divide evenly
 * into full rows). Per explicit design direction: no top/bottom divider
 * exists at any breakpoint or column count; rows are separated purely by
 * the grid's own `gap`, with no line drawn between them.
 *
 * Reset to `content: none` immediately before being re-enabled, because
 * `rowStyles` calls this at "tablet"/"desktop" too via `min-width` media
 * queries that stack rather than replace - without the reset, a divider a
 * lower breakpoint's call turned on can otherwise keep matching after a
 * higher breakpoint changes `columns` underneath it.
 */
const cardGridStyles = (columns: number, tracks = columns) => css`
	grid-template-columns: repeat(${tracks}, minmax(0, 1fr));
	> li {
		grid-column: auto;
		position: relative;
	}
	> li::after {
		content: none;
	}
	${columns > 1 &&
	css`
		> li:not(:nth-child(${columns}n + 1))::after {
			position: absolute;
			top: 0;
			bottom: 0;
			left: calc(var(--puzzles-gap) / -2);
			border-left: 1px solid ${palette.neutral[86]};
			content: '';
			pointer-events: none;
		}
	`}
`;

/**
 * Copied verbatim from `PuzzleCard.tsx`'s own helper of the same name: the
 * irregular tablet-only "compact" arrangement (a 6-track grid, items
 * spanning 2 or 3 tracks so uneven counts still balance across rows).
 */
const tabletCompactGridStyles = (count: number) => {
	const columns = Math.min(count, 3);
	const remainder = count % 3;

	return css`
		${cardGridStyles(columns, 6)};
		> li {
			grid-column: span ${count < 3 ? 6 / columns : 2};
		}
		${count > 3 &&
		remainder === 2 &&
		css`
			> li:nth-last-child(-n + 2) {
				grid-column: span 3;
			}
		`}
		${count > 3 &&
		remainder === 1 &&
		css`
			> li:last-child {
				grid-column: span 6;
			}
		`}
	`;
};

const rowStyles = (
	variant: PuzzleItem['cardVariant'],
	count: number,
	mobileScrollable: boolean,
) => {
	const mobileColumns = variant === 'compact' ? Math.min(count, 2) : 1;
	const tabletColumns =
		variant === 'compact' ? Math.min(count, 3) : Math.min(count, 2);
	const desktopColumns =
		variant === 'compact' ? Math.min(count, 5) : Math.min(count, 2);

	return css`
		position: relative;
		display: grid;
		${cardGridStyles(mobileColumns)};
		gap: 16px;
		${from.phablet} {
			gap: 24px;
		}
		margin: 0;
		padding: 0;
		list-style: none;

		${from.tablet} {
			${cardGridStyles(tabletColumns)};
			column-gap: 20px;
			row-gap: 26px;
			max-width: 700px;
		}
		${variant === 'compact' &&
		css`
			${between.tablet.and.desktop} {
				${tabletCompactGridStyles(count)};
			}
		`}
		${from.desktop} {
			${cardGridStyles(desktopColumns)};
			max-width: 940px;
		}
		${mobileScrollable &&
		css`
			> li + li::after {
				position: absolute;
				top: 0;
				bottom: 0;
				left: calc(var(--puzzles-gap) / -2);
				border-left: 1px solid ${palette.neutral[86]};
				content: '';
				pointer-events: none;
			}
			${until.phablet} {
				display: flex;
				overflow-x: auto;
				scrollbar-width: none;
				::-webkit-scrollbar {
					display: none;
				}
				> li {
					flex: 0 0 calc((100% - 16px) / 2);
					grid-column: auto;
				}
			}
		`}
	`;
};

export const MorePuzzlesRows = ({
	items,
	mobileScrollable = false,
}: {
	items: PuzzleItem[];
	mobileScrollable?: boolean;
}) => (
	<div css={rowsStyles}>
		<ul
			css={rowStyles(
				items[0]?.cardVariant ?? 'primary',
				items.length,
				mobileScrollable,
			)}
		>
			{items.map((item) => (
				<li key={item.id}>
					<MorePuzzlesCard item={item} />
				</li>
			))}
		</ul>
	</div>
);
