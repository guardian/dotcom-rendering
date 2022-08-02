// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Colour } from '@guardian/common-rendering/src/editorialPalette';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';

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

const editionsHeadlineTextColour = (format: ArticleFormat): SerializedStyles =>
	textColour(text.headline(format));

const headlineBackgroundColour = (format: ArticleFormat): SerializedStyles =>
	backgroundColour(
		background.headline(format),
		background.headlineDark(format),
	);

const standfirstBackgroundColour = (format: ArticleFormat): SerializedStyles =>
	backgroundColour(
		background.standfirst(format),
		background.standfirstDark(format),
	);

// ----- Exports ----- //

export {
	headlineBackgroundColour,
	standfirstBackgroundColour,
	editionsHeadlineTextColour,
};
