import { minHeaderHeightPx } from '../../components/Masthead/Titlepiece/constants';
import { getAgeWarning } from '../../lib/age-warning';
import { type ArticleFormat, ArticleSpecial } from '../../lib/articleFormat';
import { getSoleContributor } from '../../lib/byline';
import { decideMainMediaCaption } from '../../lib/decide-caption';
import { LABS_HEADER_HEIGHT } from '../../lib/labs-constants';
import type { ArticleDeprecated } from '../../types/article';
import { getLayoutType, type LayoutType } from '../lib/articleArrangements';

export type ArticleGridLayout = {
	ageWarning: ReturnType<typeof getAgeWarning>;
	avatarUrl: string | undefined;
	captionText: ReturnType<typeof decideMainMediaCaption>;
	immersiveHeaderHeight: number;
	immersiveMediaRowHeight: string;
	isImmersive: boolean;
	isImmersiveLandscape: boolean;
	isImmersivePortrait: boolean;
	isInteractiveTopHat: boolean;
	isLabs: boolean;
	layoutType: LayoutType;
	mainMediaAspectRatio: string | undefined;
	usesImmersiveImageProportions: boolean;
};

const getImageOrientation = (
	aspectRatio: string,
): 'portrait' | 'landscape' | 'square' => {
	const [width, height] = aspectRatio.split(':').map(Number);
	if (width == null || height == null) return 'landscape';
	if (height > width) return 'portrait';
	if (width > height) return 'landscape';
	return 'square';
};

export const deriveArticleGridLayout = ({
	article,
	format,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
}): ArticleGridLayout => {
	const isLabs = format.theme === ArticleSpecial.Labs;
	const mainMedia = article.mainMediaElements[0];
	const mainMediaType = mainMedia?._type;
	const isMainMediaImage =
		mainMediaType ===
		'model.dotcomrendering.pageElements.ImageBlockElement';
	const isMainMediaAtom =
		mainMediaType ===
		'model.dotcomrendering.pageElements.MediaAtomBlockElement';
	const isMainMediaLoopOrCinemagraph =
		isMainMediaAtom &&
		(mainMedia.videoPlayerFormat === 'Loop' ||
			mainMedia.videoPlayerFormat === 'Cinemagraph');
	const usesImmersiveImageProportions =
		isMainMediaImage || isMainMediaLoopOrCinemagraph;
	const mainMediaAspectRatio = isMainMediaImage
		? mainMedia.media.allImages[0]?.fields.aspectRatio
		: isMainMediaAtom
			? mainMedia.assets[0]?.aspectRatio
			: undefined;
	const mainMediaOrientation =
		mainMediaAspectRatio != null
			? getImageOrientation(mainMediaAspectRatio)
			: 'landscape';
	const immersiveHeaderHeight =
		minHeaderHeightPx + (isLabs ? LABS_HEADER_HEIGHT : 0);
	const topHatTestingPage = '/p/x4zt8y';
	const layoutType =
		article.config.shortUrlId === topHatTestingPage
			? 'interactiveTopHat'
			: getLayoutType(format, mainMediaOrientation);
	const isImmersivePortrait = layoutType === 'immersivePortrait';
	const isImmersiveLandscape = layoutType === 'immersiveLandscape';

	return {
		ageWarning: getAgeWarning(
			article.tags,
			article.webPublicationDateDeprecated,
		),
		avatarUrl: getSoleContributor(article.tags, article.byline)
			?.bylineLargeImageUrl,
		captionText: decideMainMediaCaption(mainMedia),
		immersiveHeaderHeight,
		immersiveMediaRowHeight: usesImmersiveImageProportions
			? 'auto'
			: `max(calc(80vh - ${immersiveHeaderHeight}px), calc(25rem - ${immersiveHeaderHeight}px))`,
		isImmersive: isImmersivePortrait || isImmersiveLandscape,
		isImmersiveLandscape,
		isImmersivePortrait,
		isInteractiveTopHat: layoutType === 'interactiveTopHat',
		isLabs,
		layoutType,
		mainMediaAspectRatio,
		usesImmersiveImageProportions,
	} as const;
};
