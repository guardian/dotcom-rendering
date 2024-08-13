import type { OphanComponentEvent } from '@guardian/libs';
import type { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { ReminderFields } from '@guardian/support-dotcom-components/dist/shared/src/lib';
import type {
	ArticleCounts,
	ArticleCountType,
	ConfigurableDesign,
	SelectedAmountsVariant,
	SeparateArticleCount,
	TickerSettings,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import type { Tracking } from '@guardian/support-dotcom-components/dist/shared/src/types/props/shared';

export type BannerId = 'designable-banner' | 'sign-in-prompt-banner';

export interface BannerEnrichedCta {
	ctaUrl: string;
	ctaText: string;
}

export interface BannerEnrichedCustomCta {
	type: SecondaryCtaType.Custom;
	cta: BannerEnrichedCta;
}

export interface BannerEnrichedReminderCta {
	type: SecondaryCtaType.ContributionsReminder;
	reminderFields: ReminderFields;
}

export type BannerEnrichedSecondaryCta =
	| BannerEnrichedCustomCta
	| BannerEnrichedReminderCta;

export interface ContributionsReminderTracking {
	onReminderCtaClick: () => void;
	onReminderSetClick: () => void;
	onReminderCloseClick: () => void;
}

export interface BannerRenderedContent {
	heading: JSX.Element | JSX.Element[] | null;
	paragraphs: (JSX.Element | JSX.Element[])[];
	highlightedText?: JSX.Element | JSX.Element[] | null;
	primaryCta: BannerEnrichedCta | null;
	secondaryCta: BannerEnrichedSecondaryCta | null;
}

export interface BannerTextContent {
	mainContent: BannerRenderedContent;
	mobileContent: BannerRenderedContent;
}

export interface BannerRenderProps {
	onCtaClick: () => void;
	onSecondaryCtaClick: () => void;
	onNotNowClick: () => void;
	onCloseClick: () => void;
	onSignInClick?: () => void;
	reminderTracking: ContributionsReminderTracking;
	content: BannerTextContent;
	countryCode?: string;
	fetchEmail?: () => Promise<string | null>;
	tickerSettings?: TickerSettings;
	isSupporter?: boolean;
	articleCounts: ArticleCounts; // TODO - export
	countType?: ArticleCountType;
	separateArticleCount?: boolean;
	separateArticleCountSettings?: SeparateArticleCount;
	choiceCardAmounts?: SelectedAmountsVariant;
	tracking: Tracking;
	submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
	design?: ConfigurableDesign;
}
