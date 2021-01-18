import { Display } from '@guardian/types/Format';
import { pillarPalette } from '@root/src/lib/pillars';

type Format = { display: Display; designType: DesignType; pillar: CAPIPillar };

const getHeadlineColour = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			return 'white';
		case Display.Showcase:
		case Display.Standard: {
			switch (format.designType) {
				case 'Review':
				case 'Recipe':
				case 'Feature':
					return pillarPalette[format.pillar].dark;
				case 'Interview':
					return 'white';
				default:
					return 'black';
			}
		}
		default:
			return 'black';
	}
};

export const decidePalette = (format: Format) => {
	return {
		headline: {
			colour: getHeadlineColour(format),
		},
	};
};
