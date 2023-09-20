import { ArticleSpecial, Pillar } from '@guardian/libs';

export const decideTheme = ({ theme }: Partial<FEFormat>): ArticleTheme => {
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
			return ArticleSpecial.SpecialReport;
		case 'SpecialReportAltTheme':
			return ArticleSpecial.SpecialReportAlt;
		case 'Labs':
			return ArticleSpecial.Labs;
		default:
			return Pillar.News;
	}
};
