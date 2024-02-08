// ----- Imports ----- //

import { css } from '@emotion/react';
import { storybookPaletteDeclarations as paletteDeclarations } from '../mocks/paletteDeclarations';
import {
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Decorator } from '@storybook/react';
import { ArticleFormat } from '@guardian/libs';

const darkStoryCss = css`
	background-color: ${sourcePalette.neutral[0]};
	color: ${sourcePalette.neutral[97]};
`;
const lightStoryCss = css`
	background-color: ${sourcePalette.neutral[100]};
	color: ${sourcePalette.neutral[7]};
`;

// ----- Decorators ----- //

/**
 * Creates storybook decorator used to wrap components in an element
 * containing the light or dark mode palette colours.
 */
const colourSchemeDecorator =
	(colourScheme: 'light' | 'dark') =>
	(formats: ArticleFormat[]): Decorator =>
	(Story, context) => (
		<>
			{formats.map((format) => (
				<div
					data-color-scheme={colourScheme}
					css={[
						css(paletteDeclarations(format, colourScheme)),
						colourScheme === 'dark' ? darkStoryCss : lightStoryCss,
					]}
				>
					<Story args={{ ...context.args, format }} />
				</div>
			))}
		</>
	);

export const lightDecorator = colourSchemeDecorator('light');
export const darkDecorator = colourSchemeDecorator('dark');

export const browserThemeDecorator =
	(format: ArticleFormat): Decorator =>
	(Story) => (
		<>
			<div
				css={css`
					${textSans.small()}
					background-color: ${sourcePalette.brand[400]};
					color: ${sourcePalette.neutral[100]};
					padding: ${space[2]}px;
				`}
			>
				<span>
					💡 This story uses your local browser preferences to derive
					the theme. Change your browser theme to see the difference
					in light/dark modes.
				</span>
			</div>
			<div
				css={css`
					@media (prefers-color-scheme: dark) {
						${paletteDeclarations(format, 'dark')}
						${darkStoryCss}
					}
					@media (prefers-color-scheme: light) {
						${paletteDeclarations(format, 'light')}
						${lightStoryCss}
					}
				`}
			>
				<Story />
			</div>
		</>
	);
