import { Pillar } from '@guardian/types';

import { pillarPalette } from '@frontend/lib/pillars';

export const decidePillarLight = (pillar: Theme) => {
	// TODO: This function is a tempoary workaround while we wait for source foundation to be updated with
	// these colours
	switch (pillar) {
		case Pillar.News:
			return '#ffbac8';
		case Pillar.Sport:
			return '#90dcff';
		case Pillar.Culture:
			return pillarPalette[pillar].main;
		case Pillar.Lifestyle:
			return pillarPalette[pillar].main;
		case Pillar.Opinion:
			return pillarPalette[pillar].main;
		default:
			return pillarPalette[pillar].main;
	}
};
