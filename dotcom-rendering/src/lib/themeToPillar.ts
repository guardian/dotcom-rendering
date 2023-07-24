import { Pillar } from '@guardian/libs';

export const themeToPillar = (theme?: ArticleTheme): Pillar | undefined => {
	switch (theme) {
		case Pillar.News:
			return Pillar.News;
		case Pillar.Sport:
			return Pillar.Sport;
		case Pillar.Opinion:
			return Pillar.Opinion;
		case Pillar.Culture:
			return Pillar.Culture;
		case Pillar.Lifestyle:
			return Pillar.Lifestyle;
		default:
			return undefined;
	}
};
