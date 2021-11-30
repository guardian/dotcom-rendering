import { ArticleDesign } from '@guardian/libs';

export const decideDesign = (format: CAPIFormat): ArticleDesign => {
	const designType: CAPIDesign = format.design;
	switch (designType) {
		case 'ArticleDesign':
			return ArticleDesign.Standard;
		case 'MediaDesign':
			return ArticleDesign.Media;
		case 'ReviewDesign':
			return ArticleDesign.Review;
		case 'AnalysisDesign':
			return ArticleDesign.Analysis;
		case 'CommentDesign':
			// Temporary hack until we can handle Immersive Opinion pieces
			return format.display === 'ImmersiveDisplay'
				? ArticleDesign.Standard
				: ArticleDesign.Comment;
		case 'LetterDesign':
			return ArticleDesign.Letter;
		case 'FeatureDesign':
			return ArticleDesign.Feature;
		case 'LiveBlogDesign':
			return ArticleDesign.LiveBlog;
		case 'DeadBlogDesign':
			return ArticleDesign.DeadBlog;
		case 'RecipeDesign':
			return ArticleDesign.Recipe;
		case 'MatchReportDesign':
			return ArticleDesign.MatchReport;
		case 'InterviewDesign':
			return ArticleDesign.Interview;
		case 'EditorialDesign':
			return ArticleDesign.Editorial;
		case 'QuizDesign':
			return ArticleDesign.Quiz;
		case 'InteractiveDesign':
			return ArticleDesign.Interactive;
		case 'PhotoEssayDesign':
			return ArticleDesign.PhotoEssay;
		case 'PrintShopDesign':
			return ArticleDesign.PrintShop;
		case 'ObituaryDesign':
			return ArticleDesign.Obituary;
		case 'FullPageInteractiveDesign':
			return ArticleDesign.FullPageInteractive;
		default:
			return ArticleDesign.Standard;
	}
};
