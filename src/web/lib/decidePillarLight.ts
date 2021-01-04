import { pillarPalette } from '@frontend/lib/pillars';

export const decidePillarLight = (pillar: CAPIPillar) => {
	// TODO: This function is a tempoary workaround while we wait for source foundation to be updated with
	// these colours
	switch (pillar) {
		case 'news':
			return '#ffbac8';
		case 'sport':
			return '#90dcff';
		case 'culture':
			return pillarPalette[pillar].main;
		case 'lifestyle':
			return pillarPalette[pillar].main;
		case 'opinion':
			return pillarPalette[pillar].main;
		default:
			return pillarPalette[pillar].main;
	}
};
