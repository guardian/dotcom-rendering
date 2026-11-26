import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { from, palette as sourcePalette } from '@guardian/source/foundations';

/**
 * Overrides palette declarations in light mode to use the accent color for the hosted content.
 * @param accentColor - The accentColor to use for the hosted content in light mode.
 * @returns A CSS string with the overridden palette declarations.
 */
export const hostedPaletteOverrides = (
	colourScheme: 'light' | 'dark',
	accentColor?: string,
): SerializedStyles => {
	switch (colourScheme) {
		case 'light':
			return css`
				--article-link-text: ${accentColor ?? 'inherit'};
				--article-link-text-hover: ${accentColor ?? 'inherit'};
				--article-link-border-hover: ${accentColor ?? 'inherit'};
				--lightbox-divider: ${accentColor ?? 'inherit'};
				/*
				 * This CSS variable only exists in the scope of hosted content
				 * and it isn't defined in the paletteDeclarations.ts
				 */
				--accent-colour: ${accentColor ??
				`${sourcePalette.neutral[38]}`};
			`;
		case 'dark':
			return css`
				--article-link-text: inherit;
				--article-link-text-hover: inherit;
				--article-link-border-hover: inherit;
				--lightbox-divider: ${accentColor ?? 'inherit'};
				/*
				 * This CSS variable only exists in the scope of hosted content
				 * and it isn't defined in the paletteDeclarations.ts
				 */
				--accent-colour: ${sourcePalette.neutral[86]};
			`;
	}
};

export const hostedContentStyleOverrides = (
	darkModeAvailable: boolean,
	accentColour?: string,
): SerializedStyles => {
	return css`
		/* Brute force fix for the fixed hosted header causing odd behaviour on skip to main content */
		${from.tablet} {
			scroll-padding-top: 250px;
		}

		${hostedPaletteOverrides('light', accentColour)}

		${darkModeAvailable
			? css`
					@media (prefers-color-scheme: dark) {
						${hostedPaletteOverrides('dark', accentColour)}
					}
				`
			: ''}
	`;
};
