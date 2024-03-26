import { ArticleDesign, type ArticleFormat, Pillar } from '@guardian/libs';

/**
 * @file Making design decisions based on the tone-tag matrix that design introduced in 2023
 * The addition of these functions should simplify future work on these designs
 *
 */

/**
 * Helper function for deciding the font weighting style from the format design
 * Returns "authoritative" (light/regular), "clear" (medium), or "soft" (bold)
 * See https://github.com/guardian/dotcom-rendering/milestone/174
 */
export const decideDesignToneWeighting = (
	format: ArticleFormat,
): 'authoritative' | 'neutral' | 'soft' => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			return 'authoritative';

		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return 'neutral';

		case ArticleDesign.Feature: {
			// News features have "neutral" styles, other features are "soft"
			if (format.theme === Pillar.News) {
				return 'neutral';
			} else {
				return 'soft';
			}
		}
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return 'soft';

		default:
			return 'neutral';
	}
};

/**
 * Helper function for deciding the colour from the format design
 * Returns either "stand-out" or "clear" to indicate the category of colour to be returned
 * Stand-out tends to use pillar palette colours whereas clear uses neutral colours.
 * See https://github.com/guardian/dotcom-rendering/milestone/174
 */
export const decideDesignToneColourType = (
	design: ArticleDesign,
): 'stand-out' | 'clear' => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			// Stand-out tends to use pillar palette colours
			return 'stand-out';

		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:

		default:
			// Clear tends to use neutral palette colours
			return 'clear';
	}
};
