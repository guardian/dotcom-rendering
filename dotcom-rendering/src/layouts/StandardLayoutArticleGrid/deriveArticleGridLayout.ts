import { minHeaderHeightPx } from '../../components/Masthead/Titlepiece/constants';
import { getAgeWarning } from '../../lib/age-warning';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	hasImmersiveGridTitleRule,
} from '../../lib/articleFormat';
import { getSoleContributor } from '../../lib/byline';
import { getContributionsServiceUrl } from '../../lib/contributions';
import { decideMainMediaCaption } from '../../lib/decide-caption';
import { LABS_HEADER_HEIGHT } from '../../lib/labs-constants';
import { parse } from '../../lib/slot-machine-flags';
import { hasFilterTag } from '../../lib/theFilter';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import type { LayoutType } from '../lib/articleArrangements';

export const deriveArticleGridLayout = ({
	article,
	format,
	renderingTarget,
	layoutType,
	mainMediaAspectRatio,
	hasPageSkin,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
	layoutType: LayoutType;
	mainMediaAspectRatio: string | undefined;
	hasPageSkin: boolean;
}) => {
	const isWeb = renderingTarget === 'Web';
	const isApps = renderingTarget === 'Apps';
	const renderAds = isWeb && !article.shouldHideAds;
	const contributionsServiceUrl = getContributionsServiceUrl(article);
	const showBodyEndSlot =
		isWeb &&
		(parse(article.slotMachineFlags ?? '').showBodyEnd ||
			article.config.switches.slotBodyEnd);
	const footballMatchStatsUrl =
		article.matchType === 'FootballMatchType'
			? article.matchStatsUrl
			: undefined;
	const isLabs = format.theme === ArticleSpecial.Labs;
	const isFootballMatchReport =
		format.design === ArticleDesign.MatchReport && !!footballMatchStatsUrl;

	const mainMedia = article.mainMediaElements[0];
	const mainMediaType = mainMedia?._type;
	const captionText = decideMainMediaCaption(mainMedia);
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
	const immersiveMediaRowHeight = usesImmersiveImageProportions
		? 'auto'
		: `max(calc(80vh - ${immersiveHeaderHeight}px), calc(25rem - ${immersiveHeaderHeight}px))`;
	const isImmersivePortrait = layoutType === 'immersivePortrait';
	const isImmersiveLandscape = layoutType === 'immersiveLandscape';
	const isImmersive = isImmersivePortrait || isImmersiveLandscape;
	const isImmersiveWeekendRead =
		isImmersivePortrait && format.design === ArticleDesign.WeekendEssay;
	const isFilterArticle = hasFilterTag(article.tags);
	const ageWarning = getAgeWarning(
		article.tags,
		article.webPublicationDateDeprecated,
	);
	const avatarUrl = getSoleContributor(
		article.tags,
		article.byline,
	)?.bylineLargeImageUrl;

	return {
		hasPageSkin,
		isWeb,
		isApps,
		renderAds,
		contributionsServiceUrl,
		showBodyEndSlot,
		footballMatchStatsUrl,
		isLabs,
		isFootballMatchReport,
		captionText,
		usesImmersiveImageProportions,
		mainMediaAspectRatio,
		immersiveHeaderHeight,
		immersiveMediaRowHeight,
		layoutType,
		contentLayoutName: `${ArticleDisplay[format.display]}Layout`,
		isImmersivePortrait,
		isImmersiveLandscape,
		isImmersive,
		isImmersiveWeekendRead,
		isInteractiveTopHat: layoutType === 'interactiveTopHat',
		hasImmersivePortraitTitleRule:
			isImmersivePortrait &&
			hasImmersiveGridTitleRule(format, article.tags),
		tableOfContentsStyle:
			isImmersive && isFilterArticle ? 'horizontal' : 'default',
		hasLabsPortraitImage:
			isLabs && isImmersivePortrait && usesImmersiveImageProportions,
		ageWarning,
		avatarUrl,
		displayAvatarUrl: avatarUrl != null,
		hasImmersiveAffiliateDisclaimer:
			isImmersive && article.affiliateLinksDisclaimerRequired,
		hideCaptionBeneathMainMedia:
			layoutType === 'media' ||
			layoutType === 'interactiveTopHat' ||
			isImmersiveLandscape ||
			isImmersivePortrait,
	} as const;
};

export type ArticleGridLayout = ReturnType<typeof deriveArticleGridLayout>;
