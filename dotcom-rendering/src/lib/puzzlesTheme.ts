import { css, type SerializedStyles } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import {
	getPuzzleGroupPalette,
	type PuzzleGroupKey,
} from './puzzleGroupPalette';

/**
 * Shared colours for the Puzzles hub and archive pages. Dark-mode overrides
 * are emitted only when the experiment makes dark mode available, matching
 * the gating used by the global page palette.
 *
 * When a `group` is given (the archive pages), the page also takes that
 * group's colours: `--puzzles-primary` (chips, titles, setter),
 * `--puzzles-on-primary` (text on a filled chip), `--puzzles-tint` (card
 * background) and `--puzzles-hover` (chip hover fill).
 */
export const puzzlesPageTheme = (
	darkModeAvailable: boolean,
	group?: PuzzleGroupKey,
): SerializedStyles => {
	const groupPalette = group ? getPuzzleGroupPalette(group) : undefined;

	return css`
		--puzzles-page-background: ${palette.neutral[100]};
		--puzzles-header-background: ${palette.opinion[800]};
		--puzzles-headline-colour: ${palette.neutral[7]};
		--puzzles-text-colour: ${palette.neutral[7]};
		--puzzles-supporting-text-colour: ${palette.neutral[46]};
		--puzzles-border-colour: ${palette.neutral[86]};

		${groupPalette &&
		css`
			--puzzles-primary: ${groupPalette.primary};
			--puzzles-on-primary: ${palette.neutral[100]};
			--puzzles-tint: ${groupPalette.tint};
			--puzzles-hover: ${groupPalette.tint};
		`}

		background: var(--puzzles-page-background);
		color: var(--puzzles-text-colour);

		${darkModeAvailable &&
		css`
			@media (prefers-color-scheme: dark) {
				html:not([data-color-scheme='light']) & {
					--puzzles-page-background: ${palette.neutral[10]};
					--puzzles-header-background: ${palette.neutral[20]};
					--puzzles-card-background: ${palette.neutral[20]};
					--puzzles-card-cadence-colour: ${palette.neutral[97]};
					--puzzles-card-headline-colour: ${palette.neutral[97]};
					--puzzles-card-text-colour: ${palette.neutral[86]};
					--puzzles-headline-colour: ${palette.neutral[97]};
					--puzzles-text-colour: ${palette.neutral[86]};
					--puzzles-supporting-text-colour: ${palette.neutral[86]};
					--puzzles-border-colour: ${palette.neutral[46]};
					--puzzles-unavailable-day-border: ${palette.neutral[20]};
					--puzzles-unavailable-day-text: ${palette.neutral[60]};
					${groupPalette &&
					css`
						--puzzles-primary: ${groupPalette.accent};
						--puzzles-on-primary: ${palette.neutral[7]};
						--puzzles-hover: ${palette.neutral[20]};
						--puzzles-card-headline-colour: ${groupPalette.accent};
					`}
				}
			}
		`}
	`;
};
