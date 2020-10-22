import {
    Pillar as TypesPillar,
    Display as TypesDisplay,
    Design as TypesDesign,
    Format,
} from '@guardian/types/Format';
import { Display } from '@root/src/lib/display';

export const toTypesPillar = (p: Pillar): TypesPillar => {
    switch (p) {
        case 'news':
            return TypesPillar.News;
        case 'opinion':
            return TypesPillar.Opinion;
        case 'sport':
            return TypesPillar.Sport;
        case 'culture':
            return TypesPillar.Culture;
        case 'lifestyle':
            return TypesPillar.Lifestyle;
        case 'labs': // unsupported
        default:
            return TypesPillar.News;
    }
};

const toTypesDisplay = (d: Display): TypesDisplay => {
    switch (d) {
        case Display.Standard:
            return TypesDisplay.Standard;
        case Display.Immersive:
            return TypesDisplay.Immersive;
        case Display.Showcase:
            return TypesDisplay.Showcase;
        default:
            return TypesDisplay.Standard;
    }
};

const toTypesDesign = (d: DesignType): TypesDesign => {
    switch (d) {
        case 'Article':
            return TypesDesign.Article;
        case 'Media':
            return TypesDesign.Media;
        case 'Review':
            return TypesDesign.Review;
        case 'Analysis':
            return TypesDesign.Analysis;
        case 'Comment':
            return TypesDesign.Comment;
        case 'Feature':
            return TypesDesign.Feature;
        case 'Live':
            return TypesDesign.Live;
        case 'Recipe':
            return TypesDesign.Recipe;
        case 'MatchReport':
            return TypesDesign.MatchReport;
        case 'Interview':
            return TypesDesign.Interview;
        case 'GuardianView':
            return TypesDesign.GuardianView;
        case 'Quiz':
            return TypesDesign.Quiz;
        case 'AdvertisementFeature':
            return TypesDesign.AdvertisementFeature;

        // note some are unsupported
        default:
            return TypesDesign.Article;
    }
};

export const asFormat = (
    pillar: Pillar,
    display: Display,
    design: DesignType,
): Format => {
    return {
        pillar: toTypesPillar(pillar),
        display: toTypesDisplay(display),
        design: toTypesDesign(design),
    };
};
