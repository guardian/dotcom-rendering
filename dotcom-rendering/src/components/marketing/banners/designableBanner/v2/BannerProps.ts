import type { BannerChannel } from '@guardian/support-dotcom-components/dist/shared/types';
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import type { Dispatch, SetStateAction } from 'react';
import type {
	BannerEnrichedCustomCta,
	BannerEnrichedReminderCta,
	BannerRenderProps,
	ContributionsReminderTracking,
} from '../../common/types';
import type { BannerTemplateSettings } from '../settings';

export interface BannerSelectors {
	copyForViewport: BannerRenderProps['content']['mainContent'];
	headingCopy: BannerRenderProps['content']['mainContent'];
	showBody: boolean;
	showTicker: boolean;
	showArticleCount: boolean;
	showChoiceCardCtas: boolean;
	showChoiceCardSelector: boolean;
	showStandardCtas: boolean;
	showBodyVisual: boolean;
	showHeaderImage: boolean;
	customSecondaryCta: BannerEnrichedCustomCta | null;
	reminderCta: BannerEnrichedReminderCta | null;
}

export interface BannerData {
	// --- Raw Data ---
	bannerChannel: BannerChannel;
	content: BannerRenderProps['content'];
	design: BannerRenderProps['design'];
	tracking: BannerRenderProps['tracking'];
	articleCounts: BannerRenderProps['articleCounts'];
	tickerSettings?: BannerRenderProps['tickerSettings'];
	separateArticleCount?: boolean;
	separateArticleCountSettings?: BannerRenderProps['separateArticleCountSettings'];
	promoCodes?: BannerRenderProps['promoCodes'];
	countryCode?: BannerRenderProps['countryCode'];
	reminderTracking: ContributionsReminderTracking;

	// --- Derived Settings ---
	settings: BannerTemplateSettings;

	// --- UI State ---
	isCollapsed: boolean;
	isCollapsible: boolean;
	isTabletOrAbove: boolean;
	choices: ChoiceCard[] | undefined;
	selectedChoiceCard: ChoiceCard | undefined;

	// --- Actions ---
	actions: {
		onClose: () => void;
		onToggleCollapse: () => void;
		onCtaClick: () => void;
		onSecondaryCtaClick: () => void;
		onChoiceCardChange: Dispatch<SetStateAction<ChoiceCard | undefined>>;
		submitComponentEvent: BannerRenderProps['submitComponentEvent'];
	};

	// --- Selectors ---
	selectors: BannerSelectors;
}
