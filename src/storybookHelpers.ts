// ----- Imports ----- //

import { select } from '@storybook/addon-knobs';

import { Pillar } from 'pillar';


// ----- Helpers ----- //

const pillarOptions = {
    News: Pillar.news,
    Opinion: Pillar.opinion,
    Sport: Pillar.sport,
    Culture: Pillar.arts,
    Lifestyle: Pillar.lifestyle,
};

const selectPillar = (initial: Pillar): Pillar =>
    select('Pillar', pillarOptions, initial);


// ----- Exports ----- //

export {
    selectPillar,
}
