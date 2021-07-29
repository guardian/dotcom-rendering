// ----- Imports ----- //

import {
	background as coreBackground,
	text as coreText,
	culture,
	lifestyle,
	neutral,
	news,
	opinion,
	sport,
} from '@guardian/src-foundations/palette';
import type { Format } from '@guardian/types';
import { Design, Display, Pillar } from '@guardian/types';

// ----- Types ----- //

type Colour = string;

interface Palette {
	text: {
		headlinePrimary: Colour;
		headlinePrimaryInverse: Colour;
	};
	background: {
		headlinePrimary: Colour;
		headlinePrimaryInverse: Colour;
	};
	border: {
		primary: Colour;
		primaryInverse: Colour;
	};
}

// ----- Functions ----- //

const textHeadlinePrimary = (format: Format): Colour => {
	if (
		format.display === Display.Immersive ||
		format.design === Design.Media
	) {
		return neutral[100];
	}

	if (format.design === Design.Feature || format.design === Design.Review) {
		switch (format.theme) {
			case Pillar.Opinion:
				return opinion[300];
			case Pillar.Sport:
				return sport[300];
			case Pillar.Culture:
				return culture[300];
			case Pillar.Lifestyle:
				return lifestyle[300];
			default:
				return news[300];
		}
	}

	return coreText.primary;
};

const textHeadlinePrimaryInverse = (_: Format): Colour => neutral[86];

const backgroundHeadlinePrimary = (format: Format): Colour => {
	if (format.display === Display.Immersive) {
		return neutral[7];
	} else if (
		format.design === Design.Comment ||
		format.design === Design.Letter ||
		format.design === Design.Editorial
	) {
		return opinion[800];
	} else if (format.design === Design.Media) {
		return coreBackground.inverse;
	}

	return coreBackground.primary;
};

const backgroundHeadlinePrimaryInverse = (_: Format): Colour =>
	coreBackground.inverse;

const borderPrimary = (format: Format): Colour => {
	switch (format.theme) {
		case Pillar.Opinion:
			return opinion[400];
		case Pillar.Sport:
			return sport[400];
		case Pillar.Culture:
			return culture[400];
		case Pillar.Lifestyle:
			return lifestyle[400];
		case Pillar.News:
		default:
			return news[400];
	}
};

const borderPrimaryInverse = borderPrimary;

// ----- API ----- //

const text = {
	headlinePrimary: textHeadlinePrimary,
	headlinePrimaryInverse: textHeadlinePrimaryInverse,
};

const background = {
	headlinePrimary: backgroundHeadlinePrimary,
	headlinePrimaryInverse: backgroundHeadlinePrimaryInverse,
};

const border = {
	primary: borderPrimary,
	primaryInverse: borderPrimaryInverse,
};

const palette = (format: Format): Palette => ({
	text: {
		headlinePrimary: text.headlinePrimary(format),
		headlinePrimaryInverse: text.headlinePrimaryInverse(format),
	},
	background: {
		headlinePrimary: background.headlinePrimary(format),
		headlinePrimaryInverse: background.headlinePrimaryInverse(format),
	},
	border: {
		primary: border.primary(format),
		primaryInverse: border.primaryInverse(format),
	},
});

// ----- Exports ----- //

export { Colour, text, background, border, palette };
