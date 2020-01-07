// ----- Imports ----- //

import { Pillar, pillarFromString } from 'pillar';
import { Content } from 'capiThriftModels';
import { isFeature, isAnalysis, isImmersive, isReview } from 'capi';


// ----- Types ----- //

const enum Layout {
    Default,
    Immersive,
    Feature,
    Review,
    Analysis,
    Opinion,
    Liveblog,
    Gallery,
    Interactive,
    Picture,
    Video,
    Audio,
}

type Article = {
    layout: Layout;
    pillar: Pillar;
};


// ----- Functions ----- //

function layoutFromCapi(content: Content): Layout {
    switch (content.type) {
        case 'article':
            if (pillarFromString(content.pillarId) === Pillar.opinion) {
                return Layout.Opinion;
            } else if (isImmersive(content)) {
                return Layout.Immersive;
            } else if (isFeature(content)) {
                return Layout.Feature;
            } else if (isReview(content)) {
                return Layout.Review;
            } else if (isAnalysis(content)) {
                return Layout.Analysis;
            }
            return Layout.Default;
        case 'liveblog':
            return Layout.Liveblog;
        case 'gallery':
            return Layout.Gallery;
        case 'interactive':
            return Layout.Interactive;
        case 'picture':
            return Layout.Picture;
        case 'video':
            return Layout.Video;
        case 'audio':
            return Layout.Audio;
        default:
            return Layout.Default;
    }    
}

function fromCapi(content: Content): Article {
    return {
        layout: layoutFromCapi(content),
        pillar: pillarFromString(content.pillarId),
    };
}


// ----- Exports ----- //

export {
    Layout,
    Article,
    fromCapi,
};
