import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import type { RenderingTarget } from '../types/renderingTarget';
import type { BetaABTestAPI } from './lib/beta-ab-tests';

type PreferredSourceExperiment =
	| {
			hasButton: true;
			copy: string;
	  }
	| {
			hasButton: false;
	  };

export const preferredSourceExperiment = (
	renderingTarget: RenderingTarget,
	format: ArticleFormat,
	abTests: BetaABTestAPI | undefined,
): PreferredSourceExperiment => {
	if (renderingTarget !== 'Web') {
		return { hasButton: false };
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
			return { hasButton: false };
		default:
			break;
	}

	switch (format.theme) {
		case ArticleSpecial.Labs:
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
			return { hasButton: false };
		default:
			break;
	}

	const group = abTests?.getParticipations()['webex-preferred-source'];

	switch (group) {
		case 'prefer':
			return {
				hasButton: true,
				copy: 'Prefer the Guardian on Google',
			};
		case 'add':
			return {
				hasButton: true,
				copy: 'Add the Guardian on Google',
			};
		case 'control':
		default:
			return { hasButton: false };
	}
};
