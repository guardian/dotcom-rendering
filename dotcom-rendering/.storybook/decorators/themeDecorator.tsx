// ----- Imports ----- //

import { css } from '@emotion/react';
import { storybookPaletteDeclarations as paletteDeclarations } from '../mocks/paletteDeclarations';
import {
	palette as sourcePalette,
	space,
	textSans15,
} from '@guardian/source/foundations';
import {
	type Decorator,
	type StoryContext,
	type StrictArgs,
} from '@storybook/react';
import { ArticleFormat } from '@guardian/libs';
import type { CSSProperties } from 'react';

const darkStoryCss = css`
	background-color: ${sourcePalette.neutral[0]};
	color: ${sourcePalette.neutral[97]};
`;
const lightStoryCss = css`
	background-color: ${sourcePalette.neutral[100]};
	color: ${sourcePalette.neutral[7]};
`;

function backgroundColour<Args>(
	colourScheme: 'light' | 'dark',
	context: StoryContext<Args>,
): CSSProperties['backgroundColor'] {
	return colourScheme === 'light'
		? context.parameters.colourSchemeBackground?.light ??
				sourcePalette.neutral[100]
		: context.parameters.colourSchemeBackground?.dark ??
				sourcePalette.neutral[0];
}

function textColour<Args>(
	colourScheme: 'light' | 'dark',
	context: StoryContext<Args>,
): CSSProperties['color'] {
	return colourScheme === 'light'
		? context.parameters.colourSchemeTextColour?.light ??
				sourcePalette.neutral[7]
		: context.parameters.colourSchemeTextColour?.dark ??
				sourcePalette.neutral[97];
}

// ----- Decorators ----- //

/**
 * Creates storybook decorator used to wrap components in an element
 * containing the light or dark mode palette colours.
 */
export const colourSchemeDecorator =
	(colourScheme: 'light' | 'dark') =>
	<Args = StrictArgs,>(formats: ArticleFormat[]): Decorator<Args> =>
	(Story, context) => (
		<>
			{formats.map((format) => (
				<div
					data-color-scheme={colourScheme}
					css={css(paletteDeclarations(format, colourScheme))}
					style={{
						backgroundColor: backgroundColour<Args>(
							colourScheme,
							context,
						),
						color: textColour<Args>(colourScheme, context),
					}}
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
					${textSans15};
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
