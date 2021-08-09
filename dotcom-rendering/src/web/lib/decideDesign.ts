import { Design } from '@guardian/types';

export const decideDesign = (format: CAPIFormat): Design => {
	const designType: CAPIDesign = format.design;
	switch (designType) {
		case 'ArticleDesign':
			return Design.Article;
		case 'MediaDesign':
			return Design.Media;
		case 'ReviewDesign':
			return Design.Review;
		case 'AnalysisDesign':
			return Design.Analysis;
		case 'CommentDesign':
			// Temporary hack until we can handle Immersive Opinion pieces
			return format.display === 'ImmersiveDisplay'
				? Design.Article
				: Design.Comment;
		case 'LetterDesign':
			return Design.Letter;
		case 'FeatureDesign':
			return Design.Feature;
		case 'LiveBlogDesign':
			return Design.LiveBlog;
		case 'DeadBlogDesign':
			return Design.DeadBlog;
		case 'RecipeDesign':
			return Design.Recipe;
		case 'MatchReportDesign':
			return Design.MatchReport;
		case 'InterviewDesign':
			return Design.Interview;
		case 'EditorialDesign':
			return Design.Editorial;
		case 'QuizDesign':
			return Design.Quiz;
		case 'InteractiveDesign':
			return Design.Interactive;
		case 'PhotoEssayDesign':
			return Design.PhotoEssay;
		case 'PrintShopDesign':
			return Design.PrintShop;
		case 'ObituaryDesign':
			return Design.Obituary;
		default:
			return Design.Article;
	}
};
