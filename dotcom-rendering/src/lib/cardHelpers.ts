import { ArticleDesign } from '@guardian/libs';

export const isUnsupportedFormatForCardWithoutBackground = (
	format: ArticleFormat,
): boolean =>
	[ArticleDesign.Video, ArticleDesign.Audio, ArticleDesign.Gallery].includes(
		format.design,
	);
