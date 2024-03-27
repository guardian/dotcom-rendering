import { ArticleDesign, type ArticleFormat, Pillar } from '@guardian/libs';

/**
 * @file Making design decisions based on the tone-tag matrix that design introduced in 2023
 * The addition of these functions should simplify future work on these designs
 * See https://github.com/guardian/dotcom-rendering/milestone/174
 *                       ╔═════════════════════╗
 * ┌────────────────┬────╢ Design Group Matrix ╟──────┬────────────────┐
 * │                │    ╚═══════════╤═════════╝      │                │
 * │                │                │                │                │
 * │                │ Authoritative  │    Neutral     │     Soft       │
 * │                │                │                │                │
 * ├────────────────┼────────────────┼────────────────┼────────────────┤
 * │                │                │                │                │
 * │                │ Light/regular- │ Medium weight  │  Bold weight   │
 * │   Clear        │     weight     │                │                │
 * │                │                │                │                │
 * │                │ Neutral colour │ Neutral colour │ Neutral colour │
 * │                │                │                │                │
 * ├────────────────┼────────────────┼────────────────┼────────────────┤
 * │                │                │                │                │
 * │                │ Light/regular- │ Medium weight  │  Bold weight   │
 * │  Stand-out     │     weight     │                │                │
 * │                │                │                │                │
 * │                │ Pillar colour  │ Pillar colour  │ Pillar colour  │
 * │                │                │                │                │
 * └────────────────┴────────────────┴────────────────┴────────────────┘
/**
 * Helper function for deciding the font weighting style from the format design
 * Returns "authoritative" (light/regular), "clear" (medium), or "soft" (bold)
 */
export const decideDesignGroupWeighting = (
	format: ArticleFormat,
): 'weighting:authoritative' | 'weighting:neutral' | 'weighting:soft' => {
	switch (format.design) {
		case ArticleDesign.Obituary:
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			return 'weighting:authoritative';

		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		case ArticleDesign.Analysis:
			return 'weighting:neutral';

		case ArticleDesign.Feature: {
			// News features have "neutral" styles, other features are "soft"
			if (format.theme === Pillar.News) {
				return 'weighting:neutral';
			} else {
				return 'weighting:soft';
			}
		}
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			return 'weighting:soft';

		default:
			return 'weighting:neutral';
	}
};

/**
 * Helper function for deciding the colour from the format design
 * Returns either "stand-out" or "clear" to indicate the category of colour to be returned
 * Stand-out tends to use pillar palette colours whereas clear uses neutral colours.
 */
export const decideDesignGroupColourType = (
	design: ArticleDesign,
): 'colour:stand-out' | 'colour:clear' => {
	switch (design) {
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Recipe:
		case ArticleDesign.Review:
			// Stand-out tends to use pillar palette colours
			return 'colour:stand-out';

		case ArticleDesign.Obituary:
		case ArticleDesign.Standard:
		case ArticleDesign.Profile:
		case ArticleDesign.Explainer:
		case ArticleDesign.Timeline:
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
		default:
			// Clear tends to use neutral palette colours
			return 'colour:clear';
	}
};
