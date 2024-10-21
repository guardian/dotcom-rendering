import { css, type SerializedStyles } from '@emotion/react';
import {
	focusHalo,
	palette as sourcePalette,
} from '@guardian/source/foundations';
import { paletteDeclarations } from '../palette';
import type { ArticleFormat } from './articleFormat';

/**
 * Global styles for pages:
 * - colour-scheme aware palette declarations
 * - `:focus` halo styles
 * - `::selection` styles
 */
export const rootStyles = (
	format: ArticleFormat,
	darkModeAvailable: boolean,
): SerializedStyles => css`
	:root {
		/* Light palette is default on all platforms */
		${paletteDeclarations(format, 'light')}
		body {
			color: ${sourcePalette.neutral[7]};
		}
		/* Indicate whether UI can adapt https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme */
		color-scheme: ${darkModeAvailable ? 'light dark' : 'light'};
		/* Dark palette only if supported */
		${darkModeAvailable
			? css`
					@media (prefers-color-scheme: dark) {
						:root:not([data-color-scheme='light']) {
							${paletteDeclarations(format, 'dark')}
							body {
								color: ${sourcePalette.neutral[86]};
								background: transparent;
							}
						}
					}
			  `
			: ''}
	}
	/* Crude but effective mechanism. Specific components may need to improve on this behaviour. */
	/* The not(.src...) selector is to work with Source's FocusStyleManager. */
	*:focus {
		${focusHalo}
	}
	::selection {
		background: ${sourcePalette.brandAlt[400]};
		color: ${sourcePalette.neutral[7]};
	}

	.ad-slot-container {
		/* prevent third-party code from breaking our layout */
		max-width: 100%;
	}
`;
