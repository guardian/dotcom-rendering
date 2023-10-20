import { css } from '@emotion/react';
import type { Decorator } from '@storybook/react';
import { paletteDeclarations } from '../palette';

/**
 * Creates storybook decorator used to wrap components in an element
 * containing the light or dark mode palette colours.
 *
 * @param colourScheme Choose whether to use the light or dark palette.
 * @returns A decorator that wraps the component in a `div` containing the
 * palette colours as CSS custom properties.
 */
const colourSchemeDecorator =
	(colourScheme: 'light' | 'dark') =>
	(format: ArticleFormat): Decorator =>
	(Story) =>
		(
			<div css={css(paletteDeclarations(format, colourScheme))}>
				<Story />
			</div>
		);

export const lightMode = colourSchemeDecorator('light');
export const darkMode = colourSchemeDecorator('dark');
