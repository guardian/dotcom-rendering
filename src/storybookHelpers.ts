// ----- Imports ----- //

import { Pillar } from '@guardian/types';
import { select } from '@storybook/addon-knobs';

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

export { selectPillar };
