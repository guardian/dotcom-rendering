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
};

export const buildBannerSelectors = ({
	content,
	isTabletOrAbove,
	isCollapsed,
	choiceCards,
	selectedChoiceCard,
	settings,
	tickerSettings,
	separateArticleCount,
	separateArticleCountSettings,
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
	const hasSelectedChoiceCard = hasChoiceCards && !!selectedChoiceCard;
	const customSecondaryCta =
		copyForViewport.secondaryCta?.type === SecondaryCtaType.Custom
			? copyForViewport.secondaryCta
			: null;
	const reminderCta =
		copyForViewport.secondaryCta?.type ===
		SecondaryCtaType.ContributionsReminder
			? copyForViewport.secondaryCta
			: null;
	const showChoiceCardCtas = hasSelectedChoiceCard;
	const showChoiceCardSelector = showChoiceCardCtas && !isCollapsed;
	const showStandardCtas =
		!hasSelectedChoiceCard &&
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
		Boolean(separateArticleCountSettings ?? separateArticleCount);
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
