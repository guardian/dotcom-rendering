import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';

/**
 * Overrides palette declarations in light mode to use the accent color for the hosted content.
 * @param accentColor - The accentColor to use for the hosted content in light mode.
 * @returns A CSS string with the overridden palette declarations.
 */
export const overridePaletteColours = (
	accentColor?: string,
): SerializedStyles => {
	return css`
		@media (prefers-color-scheme: light) {
			--article-link-text: ${accentColor ?? 'inherit'};
			--article-link-text-hover: ${accentColor ?? 'inherit'};
			--article-link-border-hover: ${accentColor ?? 'inherit'};
			--accent-colour: ${accentColor ?? `${sourcePalette.neutral[38]}`};
			--lightbox-divider: ${accentColor ?? 'inherit'};
		}
		/* The following styles are to reflect the current accentColor behaviour in storybook as well so we maintain consistency */
		[data-color-scheme='dark'] & {
			--article-link-text: inherit;
			--article-link-text-hover: inherit;
			--article-link-border-hover: inherit;
			/* This CSS variable only exists in the scope of hosted content and it isn't defined in the paletteDeclarations.ts */
			--accent-colour: ${sourcePalette.neutral[86]};
			--lightbox-divider: ${accentColor ?? 'inherit'};
		}
	`;
};
