import { palette } from "@guardian/src-foundations";
import { Pillar, Theme } from "@guardian/types";

export type paletteId = 300 | 400;

interface KeyEvent {
	time: string;
	text: string;
	url: string;
}

const getColor = (theme: Theme, paletteId: paletteId) => {
	switch (theme) {
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

export { KeyEvent, getColor };
