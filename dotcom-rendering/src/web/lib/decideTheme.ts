import { ArticlePillar, ArticleSpecial } from '@guardian/libs';

export const decideTheme = ({ theme }: Partial<CAPIFormat>): ArticleTheme => {
	switch (theme) {
		case 'NewsPillar':
			return ArticlePillar.News;
		case 'OpinionPillar':
			return ArticlePillar.Opinion;
		case 'SportPillar':
			return ArticlePillar.Sport;
		case 'CulturePillar':
			return ArticlePillar.Culture;
		case 'LifestylePillar':
			return ArticlePillar.Lifestyle;
		case 'SpecialReportTheme':
			return ArticleSpecial.SpecialReport;
		case 'SpecialReportAltTheme':
			return ArticleSpecial.SpecialReportAlt;
		case 'Labs':
			return ArticleSpecial.Labs;
		default:
			return ArticlePillar.News;
	}
};
