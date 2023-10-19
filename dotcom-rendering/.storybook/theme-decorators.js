// ----- Imports ----- //

import { css } from '@emotion/react';
import { paletteDeclarations } from '../src/palette';
import { palette as sourcePalette } from '@guardian/source-foundations';

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
 *
 * @param colourScheme Choose whether to use the light or dark palette.
 * @returns A decorator that wraps the component in a `div` containing the
 * palette colours as CSS custom properties.
 */
const colourSchemeDecorator = (colourScheme) => (format) => (Story) =>
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
