import type { ArticleFormat } from '../../lib/format';

export interface SharedEditorialButtonProps {
	/**
	 * A format object denoting the style of the button.
	 *
	 * For example:
	 *
	 * ```ts
	 * {
	 *   display: Display.Standard,
	 *   design: Design.Article,
	 *   theme: Pillar.News,
	 * }
	 * ```
	 */
	format?: ArticleFormat;
}
