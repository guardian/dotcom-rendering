// ----- Imports ----- //

import { css, jsx } from '@emotion/react';
import { paletteDeclarations } from '../../src/palette';
import { palette as sourcePalette } from '@guardian/source-foundations';
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
	(Story) =>
		(
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
