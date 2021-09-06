import { palette } from "@guardian/src-foundations";
import { Pillar, Theme } from "@guardian/types";

export type paletteId = 300 | 400;

export interface KeyEvent {
	time: string;
	text: string;
	url: string;
}

export const getColor = (pillar: Theme, paletteId: paletteId) => {
	switch (pillar) {
		case Pillar.Sport:
			return palette.sport[paletteId];
		case Pillar.Culture:
			return palette.culture[paletteId];
		case Pillar.Lifestyle:
			return palette.lifestyle[paletteId];
		case Pillar.Opinion:
			return palette.opinion[paletteId];
		default:
			return palette.news[paletteId];
	}
};
