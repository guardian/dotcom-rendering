import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
} from '@guardian/libs';
import type { FEFrontCardStyle } from '../types/front';

/**
 * TODO: missing "podcast"
 */
const getLinkType = (
	{ theme, design }: ArticleFormat,
	cardStyle?: FEFrontCardStyle,
): RichLinkCardType => {
	if (cardStyle === 'ExternalLink') return 'external';
	if (cardStyle === 'Feature') return 'feature';

	switch (theme) {
		case ArticleSpecial.SpecialReport:
			return 'special-report';
		default:
			switch (design) {
				case ArticleDesign.Analysis:
					return 'analysis';
				case ArticleDesign.LiveBlog:
					return 'live';
				case ArticleDesign.DeadBlog:
					return 'dead';
				case ArticleDesign.Feature:
					return 'feature';
				case ArticleDesign.Editorial:
					return 'editorial';
				case ArticleDesign.Comment:
					return 'comment';
				case ArticleDesign.Gallery:
				case ArticleDesign.Audio:
				case ArticleDesign.Video:
					return 'media';
				case ArticleDesign.Review:
					return 'review';
				case ArticleDesign.Letter:
					return 'letters';

				default:
					return 'news';
			}
	}
};

export type Group = `${number}` | `${number}+`;

/**
 * Get the `data-link-name` attribute for a card.
 * Used by Ophan for understanding reader journeys. E.g:
 * - `feature | card-2+ | card-@1`
 * - `news | group-0 | card-@5`
 *
 * @see {JSX.IntrinsicAttributes}
 */
export const getDataLinkNameCard = (
	format: ArticleFormat,
	group: Group,
	index: number,
	cardStyle?: FEFrontCardStyle,
): string =>
	[
		getLinkType(format, cardStyle),
		`group-${group}`,
		`card-@${Math.max(index + 1, 1)}`,
	].join(' | ');
