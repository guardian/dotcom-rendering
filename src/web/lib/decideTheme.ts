import { Pillar, Special } from '@guardian/types';

export const decideTheme = (format: CAPIFormat): Theme => {
	const pillar: CAPITheme = format.theme;
	switch (pillar) {
		case 'NewsPillar':
			return Pillar.News;
		case 'OpinionPillar':
			return Pillar.Opinion;
		case 'SportPillar':
			return Pillar.Sport;
		case 'CulturePillar':
			return Pillar.Culture;
		case 'LifestylePillar':
			return Pillar.Lifestyle;
		case 'SpecialReportTheme':
			return Special.SpecialReport;
		case 'Labs':
			return Special.Labs;
		default:
			return Pillar.News;
	}
};

export const decideNavTheme = (pillar: LegacyPillar): Theme => {
	switch (pillar) {
		case 'news':
			return Pillar.News;
		case 'opinion':
			return Pillar.Opinion;
		case 'sport':
			return Pillar.Sport;
		case 'culture':
			return Pillar.Culture;
		case 'lifestyle':
			return Pillar.Lifestyle;
		case 'labs':
			return Special.Labs;
		default:
			return Pillar.News;
	}
};
