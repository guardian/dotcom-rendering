import { minHeaderHeightPx } from '../../components/Masthead/Titlepiece/constants';
import { getAgeWarning } from '../../lib/age-warning';
import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
	hasImmersiveGridTitleRule,
} from '../../lib/articleFormat';
import { getSoleContributor } from '../../lib/byline';
import { decideMainMediaCaption } from '../../lib/decide-caption';
import { LABS_HEADER_HEIGHT } from '../../lib/labs-constants';
import type { ArticleDeprecated } from '../../types/article';
import type { LayoutType } from '../lib/articleArrangements';

export const deriveArticleGridLayout = ({
	article,
	format,
	layoutType,
	mainMediaAspectRatio,
	hasPageSkin,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	layoutType: LayoutType;
	mainMediaAspectRatio: string | undefined;
	hasPageSkin: boolean;
}) => {
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
	const immersiveHeaderHeight =
		minHeaderHeightPx + (isLabs ? LABS_HEADER_HEIGHT : 0);
	const isImmersivePortrait = layoutType === 'immersivePortrait';
	const isImmersiveLandscape = layoutType === 'immersiveLandscape';

	return {
		hasPageSkin,
		ageWarning: getAgeWarning(
			article.tags,
			article.webPublicationDateDeprecated,
		),
		avatarUrl: getSoleContributor(article.tags, article.byline)
			?.bylineLargeImageUrl,
		captionText: decideMainMediaCaption(mainMedia),
		immersiveHeaderHeight,
		isImmersive: isImmersivePortrait || isImmersiveLandscape,
		isImmersiveLandscape,
		isImmersiveWeekendRead:
			isImmersivePortrait && format.design === ArticleDesign.WeekendEssay,
		isInteractiveTopHat: layoutType === 'interactiveTopHat',
		hasImmersivePortraitTitleRule:
			isImmersivePortrait &&
			hasImmersiveGridTitleRule(format, article.tags),
		isImmersivePortrait,
		isLabs,
		layoutType,
		mainMediaAspectRatio,
		usesImmersiveImageProportions,
	} as const;
};

export type ArticleGridLayout = ReturnType<typeof deriveArticleGridLayout>;
