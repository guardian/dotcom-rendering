import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import type { BannerRenderProps } from '../../common/types';
import type { BannerTemplateSettings } from '../settings';
import type { BannerSelectors } from './BannerProps';

type BuildBannerSelectorsArgs = {
	content: BannerRenderProps['content'];
	isTabletOrAbove: boolean;
	isCollapsed: boolean;
	choiceCards: ChoiceCard[] | undefined;
	selectedChoiceCard: ChoiceCard | undefined;
	settings: BannerTemplateSettings;
	tickerSettings?: BannerRenderProps['tickerSettings'];
	separateArticleCount?: boolean;
	separateArticleCountSettings?: BannerRenderProps['separateArticleCountSettings'];
	articleCounts: BannerRenderProps['articleCounts'];
};

export const buildBannerSelectors = ({
	content,
	isTabletOrAbove,
	isCollapsed,
	choiceCards,
	settings,
	tickerSettings,
	separateArticleCount,
	separateArticleCountSettings,
	articleCounts,
}: BuildBannerSelectorsArgs): BannerSelectors => {
	const copyForViewport = isTabletOrAbove
		? content.mainContent
		: content.mobileContent;
	const headingCopy =
		isTabletOrAbove && !isCollapsed
			? content.mainContent
			: content.mobileContent;
	const hasChoiceCards =
		!!settings.choiceCardSettings && (choiceCards?.length ?? 0) > 0;
	const customSecondaryCta =
		copyForViewport.secondaryCta?.type === SecondaryCtaType.Custom
			? copyForViewport.secondaryCta
			: null;
	const reminderCta =
		copyForViewport.secondaryCta?.type ===
		SecondaryCtaType.ContributionsReminder
			? copyForViewport.secondaryCta
			: null;
	const showChoiceCardCtas = hasChoiceCards;
	const showChoiceCardSelector = showChoiceCardCtas && !isCollapsed;
	const showStandardCtas =
		!hasChoiceCards &&
		(!!copyForViewport.primaryCta ||
			!!copyForViewport.secondaryCta ||
			isCollapsed);
	const showBody = !isCollapsed;
	const showTicker =
		!!tickerSettings?.tickerData &&
		!isCollapsed &&
		!!settings.tickerStylingSettings;
	const showArticleCount =
		!isCollapsed &&
		Boolean(separateArticleCountSettings ?? separateArticleCount) &&
		articleCounts.forTargetedWeeks >= 5;
	const showBodyVisual = !!settings.imageSettings && !isCollapsed;
	const showHeaderImage = !!settings.headerSettings?.headerImage;

	return {
		copyForViewport,
		headingCopy,
		showBody,
		showTicker,
		showArticleCount,
		showChoiceCardCtas,
		showChoiceCardSelector,
		showStandardCtas,
		showBodyVisual,
		showHeaderImage,
		customSecondaryCta,
		reminderCta,
	};
};
