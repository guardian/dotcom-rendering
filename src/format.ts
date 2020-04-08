// ----- Imports ----- //

import { Pillar } from 'pillar';


// ----- Types ----- //

const enum Design {
    Article,
    Media,
    Review,
    Analysis,
    Comment,
    Feature,
    Live,
    Recipe,
    MatchReport,
    Interview,
    GuardianView,
    Quiz,
    AdvertisementFeature,
}

const enum Display {
    Standard,
    Immersive,
    Showcase,
}

interface Format {
    pillar: Pillar;
    design: Design;
    display: Display;
}


// ----- Exports ----- //

export {
    Format,
    Design,
    Display,
}
