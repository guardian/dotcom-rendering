import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from './lib/articleFormat';
import type { RenderingTarget } from './types/renderingTarget';

export const hasPreferredSourceButton = (
	renderingTarget: RenderingTarget,
	format: ArticleFormat,
): boolean => {
	if (renderingTarget !== 'Web') {
		return false;
	}

	switch (format.design) {
		case ArticleDesign.Analysis:
		case ArticleDesign.Audio:
		case ArticleDesign.Comment:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Editorial:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.Gallery:
		case ArticleDesign.Interactive:
		case ArticleDesign.Letter:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Picture:
		case ArticleDesign.Video:
			return false;
		default:
			break;
	}

	switch (format.theme) {
		case ArticleSpecial.Labs:
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return false;
		default:
			break;
	}

	return true;
};
