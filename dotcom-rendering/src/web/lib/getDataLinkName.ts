import { ArticleDesign, ArticleSpecial } from '@guardian/libs';

/**
 * TODO: missing "podcast" and "external"
 */
const getLinkType = ({ theme, design }: ArticleFormat): RichLinkCardType => {
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
	group: string | number,
	index: number,
) => [getLinkType(format), `group-${group}`, `card-@${index}`].join(' | ');
