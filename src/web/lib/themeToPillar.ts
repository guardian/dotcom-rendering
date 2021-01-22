import { Theme, Pillar, Special } from '@guardian/types';

export const themeToPillar = (theme: Theme): Pillar => {
	switch (theme) {
		case Pillar.News:
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return theme;
		case Special.Labs:
		case Special.SpecialReport:
		default:
			return Pillar.News;
	}
};
