// ----- Imports ----- //

import { select } from '@storybook/addon-knobs';

import { Pillar } from '@guardian/types/Format';


// ----- Helpers ----- //

const pillarOptions = {
    News: Pillar.News,
    Opinion: Pillar.Opinion,
    Sport: Pillar.Sport,
    Culture: Pillar.Culture,
    Lifestyle: Pillar.Lifestyle,
};

const selectPillar = (initial: Pillar): Pillar =>
    select('Pillar', pillarOptions, initial);


// ----- Exports ----- //

export {
    selectPillar,
}
