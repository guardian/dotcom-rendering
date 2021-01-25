import { Display, Design, Format } from '@guardian/types';
import { neutral, text } from '@guardian/src-foundations';

import { pillarPalette } from '@root/src/lib/pillars';

const getHeadlineColour = (format: Format): string => {
	switch (format.display) {
		case Display.Immersive:
			switch (format.design) {
				case Design.PrintShop:
					return text.primary;
				default:
					return neutral[100];
			}
		case Display.Showcase:
		case Display.Standard: {
			switch (format.design) {
				case Design.Review:
				case Design.Recipe:
				case Design.Feature:
					return pillarPalette[format.theme].dark;
				case Design.Interview:
					return neutral[100];
				default:
					return text.primary;
			}
		}
		default:
			return text.primary;
	}
};

export const decidePalette = (format: Format) => {
	return {
		headline: {
			colour: getHeadlineColour(format),
		},
	};
};
