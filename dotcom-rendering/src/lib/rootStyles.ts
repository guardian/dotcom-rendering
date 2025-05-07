import { css, type SerializedStyles } from '@emotion/react';
import {
	focusHalo,
	palette as sourcePalette,
} from '@guardian/source/foundations';
import { paletteDeclarations } from '../paletteDeclarations';
import { rootAdStyles } from './adStyles';
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

	/**
	* Hide scroll depth markers when printing as these are absolutely positioned
	* based on the initial content height. These will still be present in the
	* document at their original location when printing, even if other page
	* elements have been hidden, leading to blank pages being produced.
	*/
	@media print {
		.scroll-depth-marker {
			display: none;
		}
	}

	@view-transition {
		navigation: auto;
	}

	::view-transition-old(hero-image),
	::view-transition-new(hero-image) {
		animation-timing-function: ease-in-out;
		animation-duration: 2s;
	}

	${rootAdStyles}
`;
