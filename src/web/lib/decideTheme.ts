import { Pillar, Special } from '@guardian/types';

export const decideTheme = (format: CAPIFormat): Theme => {
	const { theme, design } = format;

	if ((design === "CommentDesign" || design === "LetterDesign") && theme === 'NewsPillar') return Pillar.Opinion;
	switch (theme) {
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
