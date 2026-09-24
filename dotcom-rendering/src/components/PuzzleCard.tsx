import { css } from '@emotion/react';
import {
	between,
	from,
	headlineBold20,
	headlineBold24,
	palette,
	space,
	textSans14,
} from '@guardian/source/foundations';
import type { PuzzleItem } from '../types/puzzlesPage';

/**
 * Shared with `PuzzlesDirectory.tsx` (the Puzzles Hub listing page): both the
 * Hub's own card grid and any other surface that needs to render `PuzzleItem`s
 * in the same visual style (e.g. `PuzzlePageLayout`'s "More from Puzzles &
 * games" rail) render through this one card/row implementation, so the two
 * surfaces can never visually drift apart.
 */

export const getPuzzleUrl = (item: PuzzleItem): string | undefined => {
	const slug = item.slug;
	if (
		item.variant === 'archive-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return `/puzzles-and-games/${slug}/archive`;
	}
	if (
		item.variant === 'iframe-page' &&
		slug !== undefined &&
		slug.length > 0
	) {
		return item.date !== undefined && item.date.length > 0
			? `/puzzles-and-games/${slug}/${item.date}`
			: `/puzzles-and-games/${slug}`;
	}
	const url = item.url;
	if (
		url !== undefined &&
		(url.startsWith('/puzzles-and-games') ||
			url.startsWith('/crosswords/') ||
			/^https?:\/\//.test(url))
	) {
		return url;
	}
	return undefined;
};

export const externalProps = (url: string) =>
	/^https?:\/\//.test(url)
		? { rel: 'noopener noreferrer', target: '_blank' as const }
		: {};

const puzzleColours = (item: PuzzleItem) => {
	switch (item.type) {
		case 'crossword':
			return { background: palette.news[800], title: palette.news[300] };
		case 'sudoku':
			return {
				background: palette.sport[800],
				title: palette.sport[400],
			};
		case 'wordiply':
		case 'word-wheel':
			return {
				background: palette.opinion[800],
				title: palette.opinion[400],
			};
		default:
			return {
				background: item.backgroundColour,
				title: palette.neutral[7],
			};
	}
};

const cardStyles = (
	variant: PuzzleItem['cardVariant'],
	hasImage: boolean,
	isFeatured: boolean,
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

	${isFeatured &&
	css`
		${from.leftCol} {
			min-height: 368px;
			height: 368px;
			padding-right: 0;
		}
	`}

	:hover .puzzle-card-title {
		text-decoration: underline;
	}

	:focus-visible {
		outline: 3px solid ${palette.brand[500]};
		outline-offset: 2px;
	}
`;

const cardTextStyles = (isFeatured: boolean) => css`
	position: relative;
	z-index: ${isFeatured ? 1 : 'auto'};
	display: flex;
	min-width: 0;
	flex-direction: column;
	padding: ${space[1]}px ${space[2]}px ${space[2]}px;
`;

/**
 * `smallTitle` forces the title down to a flat `headlineBold20` regardless
 * of `variant`, for PuzzlePageLayout's "More from Puzzles & games" rail
 * only - the Hub's own card grid (PuzzlesDirectory.tsx) keeps its
 * variant-based sizing (`compact` -> `headlineBold20`, else ->
 * `headlineBold24`), since `PuzzleCard`/`Rows` is shared between the two
 * and a flat change here would otherwise resize the Hub's cards too.
 */
const cardTitleStyles = (
	variant: PuzzleItem['cardVariant'],
	smallTitle: boolean,
) => css`
	${smallTitle || variant === 'compact' ? headlineBold20 : headlineBold24};
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

const cardImageStyles = (isFeatured: boolean) => css`
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

	${isFeatured &&
	css`
		${from.leftCol} {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 345px;
			max-width: 75%;
			height: 276px;
		}
	`}
`;

export const PuzzleCard = ({
	isFeatured,
	item,
	smallTitle = false,
}: {
	isFeatured: boolean;
	item: PuzzleItem;
	smallTitle?: boolean;
}) => {
	const url = getPuzzleUrl(item);
	const colours = puzzleColours(item);
	const setter = item.type === 'crossword' ? item.setter?.trim() : undefined;
	const hasImage =
		item.image !== undefined &&
		item.image.length > 0 &&
		item.cardVariant !== 'compact';
	const contents = (
		<>
			<div css={cardTextStyles(isFeatured)}>
				<span
					className="puzzle-card-title"
					css={cardTitleStyles(item.cardVariant, smallTitle)}
					style={{ color: colours.title }}
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
					css={cardImageStyles(isFeatured)}
					src={item.image}
				/>
			)}
		</>
	);
	const style = { backgroundColor: colours.background };
	return url !== undefined ? (
		<a
			css={cardStyles(item.cardVariant, hasImage, isFeatured)}
			href={url}
			style={style}
			{...externalProps(url)}
		>
			{contents}
		</a>
	) : (
		<article
			css={cardStyles(item.cardVariant, hasImage, isFeatured)}
			style={style}
		>
			{contents}
		</article>
	);
};

export const rowsStyles = css`
	--puzzles-gap: 16px;
	display: flex;
	min-width: 0;
	flex-direction: column;
	gap: 16px;
	${from.phablet} {
		--puzzles-gap: 24px;
		gap: 24px;
	}

	${from.tablet} {
		--puzzles-gap: 20px;
		gap: 20px;
		/*
     * Add 6px above each subsequent card group so its separator sits
     * 16px below the preceding cards and 10px above this row. This is
     * the separator immediately above the compact crossword cards.
     */
		> ul ~ ul {
			margin-top: 6px;
		}
	}
	> ul ~ ul::before {
		position: absolute;
		top: calc(var(--puzzles-gap) / -2);
		right: 0;
		left: 0;
		border-top: 1px solid ${palette.neutral[86]};
		content: '';
		pointer-events: none;
	}
`;

/**
 * The divider precedes every card (including the first row/column), not
 * just the ones after it - per explicit design direction, this replaces
 * the "skip the first row/column" `nth-child` exclusions this helper used
 * to have. `rowStyles` below hides the very first card's divider again,
 * but only in the narrow "tablet"-to-"leftCol" range where its own caller's
 * heading has nowhere to sit beside it (see `rowStyles`'s own comment).
 *
 * Each property is reset to `content: none` immediately before being
 * (re)enabled, because `rowStyles` calls this at "tablet"/"desktop" too via
 * `min-width` media queries that stack rather than replace - without the
 * reset, a divider a lower breakpoint's call turned on can otherwise keep
 * matching after a higher breakpoint changes `columns` underneath it.
 */
const cardGridStyles = (columns: number, tracks = columns) => css`
	grid-template-columns: repeat(${tracks}, minmax(0, 1fr));
	> li {
		grid-column: auto;
	}
	> li::before,
	> li::after {
		content: none;
	}
	> li::before {
		position: absolute;
		top: calc(var(--puzzles-gap) / -2);
		right: 0;
		left: 0;
		border-top: 1px solid ${palette.neutral[86]};
		content: '';
		pointer-events: none;
	}
	${columns > 1 &&
	css`
		> li::before {
			content: none;
		}
		> li::after {
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

export const rowStyles = (
	variant: PuzzleItem['cardVariant'],
	count: number,
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
		> li {
			position: relative;
		}

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
		/*
		 * Below "leftCol", callers (e.g. PuzzlePageLayout's "More from
		 * Puzzles & games" rail) stack their own heading above this grid
		 * rather than beside it, so the very first card's leading divider
		 * has nothing to its left/above to separate from and reads as a
		 * stray line - hidden in just that range. From "leftCol" up,
		 * callers move the heading into its own column beside the grid
		 * (e.g. that same rail, PuzzlesDirectory.tsx's
		 * headingColumnStyles), so the divider is reinstated there.
		 */
		${between.tablet.and.leftCol} {
			> li:first-child::before,
			> li:first-child::after {
				content: none;
			}
		}
	`;
};

export const Rows = ({
	isFeatured = false,
	smallTitle = false,
	rows,
}: {
	isFeatured?: boolean;
	smallTitle?: boolean;
	rows: PuzzleItem[][];
}) => (
	<div css={rowsStyles}>
		{rows
			.filter((row) => row.length > 0)
			.map((row) => (
				<ul
					css={rowStyles(
						row[0]?.cardVariant ?? 'primary',
						row.length,
					)}
					key={row.map(({ id }) => id).join('-')}
				>
					{row.map((item) => (
						<li key={item.id}>
							<PuzzleCard
								isFeatured={isFeatured}
								smallTitle={smallTitle}
								item={item}
							/>
						</li>
					))}
				</ul>
			))}
	</div>
);
