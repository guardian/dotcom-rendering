import { css, type SerializedStyles } from '@emotion/react';
import { palette } from '../palette';
import { paletteDeclarations } from '../paletteDeclarations';
import { ArticleDesign, ArticleDisplay, Pillar } from './articleFormat';
import {
	getPuzzleGroupPalette,
	type PuzzleGroupKey,
} from './puzzleGroupPalette';

/**
 * Wraps content that must keep the light Puzzles & games colours, even when the
 * page is in dark mode (the useful links on the crosswords page).
 */
export const puzzlesLightColours: SerializedStyles = css(
	paletteDeclarations(
		// The Puzzles & games colours are the same for every format.
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Crossword,
			theme: Pillar.News,
		},
		'light',
	).filter((declaration) => /^--(puzzles|unlock-modal)-/.test(declaration)),
);

/**
 * Shared background and text colour for the Puzzles hub and archive pages. The
 * colours themselves, light and dark, are in `paletteDeclarations.ts`.
 *
 * When a `group` is given (the archive pages), the page also takes that
 * group's colours: `--puzzles-primary` (chips, titles, setter),
 * `--puzzles-on-primary` (text on a filled chip), `--puzzles-tint` (card
 * background) and `--puzzles-hover` (chip hover fill).
 *
 * Hub cards take their light colours from the page data, so their dark colours
 * are set here, only when the experiment makes dark mode available, matching
 * the gating used by the global page palette.
 */
export const puzzlesPageTheme = (
	darkModeAvailable: boolean,
	group?: PuzzleGroupKey,
): SerializedStyles => {
	const groupPalette = group ? getPuzzleGroupPalette(group) : undefined;

	return css`
		${groupPalette &&
		css`
			--puzzles-primary: ${groupPalette.themedPrimary};
			--puzzles-on-primary: ${palette('--puzzles-group-on-primary')};
			--puzzles-tint: ${groupPalette.tint};
			--puzzles-hover: ${groupPalette.themedHover};
		`}

		background: ${palette('--puzzles-page-background')};
		color: ${palette('--puzzles-text-colour')};

		${darkModeAvailable &&
		css`
			@media (prefers-color-scheme: dark) {
				html:not([data-color-scheme='light']) & {
					--puzzles-card-background: ${palette(
						'--puzzles-card-surface-dark',
					)};
					--puzzles-card-headline-colour: ${groupPalette
						? groupPalette.accent
						: palette('--puzzles-card-title-dark')};
				}
			}
		`}
	`;
};

/**
 * The palette variables `puzzleAccentStyles` sets. Together they cover every
 * variable that depends on the page theme and is used by the Puzzles & games
 * pages (see `puzzlesThemeCoverage.test.tsx`, which fails when one is missing).
 */
const accentVariables = [
	'--share-button',
	'--series-title-text',
	'--article-section-link-text',
	'--byline-anchor',
	'--byline-hover',
	'--discussion-primary-button-background',
	'--discussion-button-background-hover',
] as const;

/** Themed in light mode only, they are already neutral in dark mode. */
const lightOnlyVariables = ['--byline', '--sign-in-link'] as const;

export const puzzleAccentVariables: readonly string[] = [
	...accentVariables,
	...lightOnlyVariables,
];

const declare = (names: readonly string[], colour: string) =>
	names.map((name) => `${name}: ${colour};`).join('\n');

/**
 * Sets only the accent colour of the words and buttons the article palette
 * takes from the page theme (series and section links, setter, share and
 * print buttons, sign in link and comment buttons), to the group's colour.
 * Leaves the theme, backgrounds and lines alone. The setter and the sign in
 * link keep their neutral theme colours in dark mode.
 */
export const puzzleAccentStyles = (
	group: PuzzleGroupKey,
	darkModeAvailable: boolean,
): SerializedStyles => {
	const { primary, accent } = getPuzzleGroupPalette(group);

	return css`
		${declare(accentVariables, primary)}
		${declare(lightOnlyVariables, primary)}

		${darkModeAvailable &&
		css`
			@media (prefers-color-scheme: dark) {
				html:not([data-color-scheme='light']) & {
					${declare(accentVariables, accent)}
					--byline: ${palette('--puzzles-accent-byline-dark')};
					--sign-in-link: ${palette(
						'--puzzles-accent-sign-in-link-dark',
					)};
				}
			}
		`}
	`;
};
