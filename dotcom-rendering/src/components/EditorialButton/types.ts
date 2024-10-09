import type { ArticleFormat } from '@guardian/libs';

export interface SharedEditorialButtonProps {
	/**
	 * A format object denoting the style of the button using the enums
	 * available from [@guardian/libs](https://github.com/guardian/libs/blob/main/src/format.ts).
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
