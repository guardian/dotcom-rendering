import { minHeaderHeightPx } from '../../components/Masthead/Titlepiece/constants';
import { getAgeWarning } from '../../lib/age-warning';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../../lib/articleFormat';
import { getSoleContributor } from '../../lib/byline';
import { getContributionsServiceUrl } from '../../lib/contributions';
import { decideMainMediaCaption } from '../../lib/decide-caption';
import { LABS_HEADER_HEIGHT } from '../../lib/labs-constants';
import { parse } from '../../lib/slot-machine-flags';
import { hasFilterTag } from '../../lib/theFilter';
import type { ArticleDeprecated } from '../../types/article';
import type { RenderingTarget } from '../../types/renderingTarget';
import { getLayoutType } from '../lib/articleArrangements';

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
	renderingTarget,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
	renderingTarget: RenderingTarget;
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
	const immersiveMediaRowHeight = usesImmersiveImageProportions
		? 'auto'
		: `max(calc(80vh - ${immersiveHeaderHeight}px), calc(25rem - ${immersiveHeaderHeight}px))`;
	const layoutType = getLayoutType(format, mainMediaOrientation);
	const isImmersivePortrait = layoutType === 'immersivePortrait';
	const isImmersiveLandscape = layoutType === 'immersiveLandscape';
	const isImmersive = isImmersivePortrait || isImmersiveLandscape;
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
			isImmersiveLandscape ||
			isImmersivePortrait,
	} as const;
};

export type ArticleGridLayout = ReturnType<typeof deriveArticleGridLayout>;
