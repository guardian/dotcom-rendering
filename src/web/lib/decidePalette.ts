import { Display, Design, Special } from '@guardian/types';
import type { Format } from '@guardian/types';
import {
	neutral,
	text,
	specialReport,
	opinion,
} from '@guardian/src-foundations';

import { pillarPalette } from '@root/src/lib/pillars';

const textHeadline = (format: Format): string => {
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

const backgroundArticle = (format: Format): string => {
	// Order matters. We want comment special report pieces to have the opinion background
	if (format.design === Design.Comment) return opinion[800];
	if (format.theme === Special.SpecialReport) return specialReport[800];
	return 'transparent';
};

export const decidePalette = (format: Format) => {
	return {
		text: {
			headline: textHeadline(format),
		},
		background: {
			article: backgroundArticle(format),
		},
	};
};
