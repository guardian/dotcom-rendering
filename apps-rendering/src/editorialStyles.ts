// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import type { Colour } from 'editorialPalette';
import { background, text } from 'editorialPalette';

// ----- Functions ----- //

const textColour = (light: Colour, dark?: Colour): SerializedStyles =>
	css`
		color: ${light};

		${dark &&
		`@media (prefers-color-scheme: dark) {
			color: ${dark};
		}`}
	`;

const backgroundColour = (light: Colour, dark: Colour): SerializedStyles =>
	css`
		background-color: ${light};

		@media (prefers-color-scheme: dark) {
			background-color: ${dark};
		}
	`;

const headlineTextColour = (format: ArticleFormat): SerializedStyles =>
	textColour(
		text.headlinePrimary(format),
		text.headlinePrimaryInverse(format),
	);

const editionsHeadlineTextColour = (format: ArticleFormat): SerializedStyles =>
	textColour(text.headlinePrimary(format));

const headlineBackgroundColour = (format: ArticleFormat): SerializedStyles =>
	backgroundColour(
		background.headlinePrimary(format),
		background.headlinePrimaryInverse(format),
	);

// ----- Exports ----- //

export {
	headlineTextColour,
	headlineBackgroundColour,
	editionsHeadlineTextColour,
};
