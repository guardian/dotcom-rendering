// ----- Imports ----- //

import {
    text as coreText,
    background as coreBackground,
    neutral,
    news,
    opinion,
    sport,
    culture,
    lifestyle,
} from '@guardian/src-foundations/palette';
import { Format, Design, Display, Pillar } from '@guardian/types/Format';


// ----- Types ----- //

type Colour = string;

interface Palette {
    text: {
        headlinePrimary: Colour;
        headlineInverse: Colour;
    };
    background: {
        headlinePrimary: Colour;
        headlineInverse: Colour;
    };
    border: {
        primary: Colour;
        inverse: Colour;
    };
}


// ----- Functions ----- //

const textHeadlinePrimary = (format: Format): Colour => {
    if (format.display === Display.Immersive || format.design === Design.Media) {
        return neutral[100];
    }

    if (format.design === Design.Feature) {
        switch (format.pillar) {
            case Pillar.Opinion:
                return opinion[300];
            case Pillar.Sport:
                return sport[300];
            case Pillar.Culture:
                return culture[300];
            case Pillar.Lifestyle:
                return lifestyle[300];
            case Pillar.News:
            default:
                return news[300];
        }
    }

    return coreText.primary;
}

const textHeadlineInverse = (_: Format): Colour =>
    neutral[86];

const backgroundHeadlinePrimary = (format: Format): Colour => {
    if (format.display === Display.Immersive) {
        return neutral[7];
    }

    return coreBackground.primary;
}

const backgroundHeadlineInverse = (_: Format): Colour =>
    coreBackground.inverse;

const borderPrimary = (format: Format): Colour => {
    switch (format.pillar) {
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
}

const borderInverse = borderPrimary;


// ----- API ----- //

const text = {
    headlinePrimary: textHeadlinePrimary,
    headlineInverse: textHeadlineInverse,
};

const background = {
    headlinePrimary: backgroundHeadlinePrimary,
    headlineInverse: backgroundHeadlineInverse,
};

const border = {
    primary: borderPrimary,
    inverse: borderInverse,
};

const palette = (format: Format): Palette =>
    ({
        text: {
            headlinePrimary: text.headlinePrimary(format),
            headlineInverse: text.headlineInverse(format),
        },
        background: {
            headlinePrimary: background.headlinePrimary(format),
            headlineInverse: background.headlineInverse(format),
        },
        border: {
            primary: border.primary(format),
            inverse: border.inverse(format),
        },
    });


// ----- Exports ----- //

export {
    Colour,
    text,
    background,
    border,
    palette,
};
