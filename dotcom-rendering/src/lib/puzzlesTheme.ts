import { css, type SerializedStyles } from '@emotion/react';
import { palette } from '@guardian/source/foundations';

/**
 * Shared colours for the Puzzles hub and archive pages. Dark-mode overrides
 * are emitted only when the experiment makes dark mode available, matching
 * the gating used by the global page palette.
 */
export const puzzlesPageTheme = (
	darkModeAvailable: boolean,
): SerializedStyles => css`
	--puzzles-page-background: ${palette.neutral[100]};
	--puzzles-headline-colour: ${palette.neutral[7]};
	--puzzles-text-colour: ${palette.neutral[7]};
	--puzzles-border-colour: ${palette.neutral[86]};

	background: var(--puzzles-page-background);
	color: var(--puzzles-text-colour);

	${darkModeAvailable &&
	css`
		@media (prefers-color-scheme: dark) {
			html:not([data-color-scheme='light']) & {
				--puzzles-page-background: ${palette.neutral[10]};
				--puzzles-card-background: ${palette.neutral[20]};
				--puzzles-card-cadence-colour: ${palette.neutral[97]};
				--puzzles-card-headline-colour: ${palette.neutral[97]};
				--puzzles-card-text-colour: ${palette.neutral[86]};
				--puzzles-headline-colour: ${palette.neutral[97]};
				--puzzles-text-colour: ${palette.neutral[86]};
				--puzzles-border-colour: ${palette.neutral[46]};
			}
		}
	`}
`;
