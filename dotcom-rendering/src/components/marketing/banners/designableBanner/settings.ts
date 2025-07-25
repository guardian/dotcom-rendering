/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/settings.ts
 */
import type { TickerSettings } from '@guardian/source-development-kitchen/react-components';
import type { Image } from '@guardian/support-dotcom-components/dist/shared/types';
import type { ReactNode } from 'react';
import type { BannerId } from '../common/types';

export type ContainerSettings = {
	backgroundColour: string;
	textColor?: string;
	paddingTop?: string;
};

export type CtaStateSettings = {
	textColour: string;
	backgroundColour: string;
	border?: string;
};

export interface CtaSettings {
	default: CtaStateSettings;
	mobile?: CtaStateSettings;
	desktop?: CtaStateSettings;
}

export interface HighlightedTextSettings {
	textColour: string;
	highlightColour?: string;
}

export interface HeaderSettings {
	textColour?: string;
	headerImage?: Image;
}

export interface ChoiceCardSettings {
	buttonColour?: string;
	buttonTextColour?: string;
	buttonBorderColour?: string;
	buttonSelectColour?: string;
	buttonSelectTextColour?: string;
	buttonSelectBorderColour?: string;
}

export interface BannerTemplateSettings {
	containerSettings: ContainerSettings;
	primaryCtaSettings: CtaSettings;
	secondaryCtaSettings: CtaSettings;
	closeButtonSettings: CtaSettings;
	highlightedTextSettings: HighlightedTextSettings;
	setReminderCtaSettings?: CtaSettings;
	articleCountTextColour?: string;
	imageSettings?: Image;
	alternativeVisual?: ReactNode;
	choiceCardSettings?: ChoiceCardSettings;
	bannerId?: BannerId;
	tickerStylingSettings?: TickerSettings['tickerStylingSettings'];
	headerSettings?: HeaderSettings;
}
