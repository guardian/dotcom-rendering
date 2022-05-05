import { ArticleDesign } from '@guardian/libs';

/**
 * NOTE: Immersive Opinion pieces are not supported,
 * i.e. when `CommentDesign` and `ImmersiveDisplay` are used jointly.
 */
export const decideDesign = ({
	design,
	display,
}: Partial<CAPIFormat>): ArticleDesign => {
	switch (design) {
		case 'ArticleDesign':
			return ArticleDesign.Standard;
		// Temporarily accept both the old MediaDesign and the new ones
		case 'MediaDesign':
		case 'GalleryDesign':
		case 'AudioDesign':
		case 'VideoDesign':
			return ArticleDesign.Media;
		case 'ReviewDesign':
			return ArticleDesign.Review;
		case 'AnalysisDesign':
			return ArticleDesign.Analysis;
		case 'CommentDesign':
			// Temporary hack until we can handle Immersive Opinion pieces
			return display === 'ImmersiveDisplay'
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
