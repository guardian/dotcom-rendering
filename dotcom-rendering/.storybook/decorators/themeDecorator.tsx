// ----- Imports ----- //

import { css } from '@emotion/react';
import { paletteDeclarations } from '../../src/palette';
import {
	palette as sourcePalette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Decorator } from '@storybook/react';
import { ArticleFormat } from '@guardian/libs';

const darkStoryCss = css`
	background-color: ${sourcePalette.neutral[0]};
	color: ${sourcePalette.neutral[100]};
`;
const lightStoryCss = css`
	background-color: ${sourcePalette.neutral[100]};
	color: ${sourcePalette.neutral[0]};
`;

// ----- Decorators ----- //

/**
 * Creates storybook decorator used to wrap components in an element
 * containing the light or dark mode palette colours.
 */
const colourSchemeDecorator =
	(colourScheme: 'light' | 'dark') =>
	(format: ArticleFormat): Decorator =>
	(Story) => (
		<div
			css={[
				css(paletteDeclarations(format, colourScheme)),
				colourScheme === 'dark' ? darkStoryCss : lightStoryCss,
			]}
		>
			<Story />
		</div>
	);
export const lightDecorator = colourSchemeDecorator('light');
export const darkDecorator = colourSchemeDecorator('dark');

export const myThemeDecorator =
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
