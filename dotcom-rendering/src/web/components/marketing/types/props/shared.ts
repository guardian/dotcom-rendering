import {TestTracking} from "@guardian/support-dotcom-components/dist/shared/src/types/abTests/shared";
import {PageTracking} from "@guardian/support-dotcom-components/dist/shared/src/types/targeting";

export type Stage = 'PROD' | 'CODE' | 'DEV';

export interface Cta {
	text: string;
	baseUrl: string;
}

export enum SecondaryCtaType {
	Custom = 'CustomSecondaryCta',
	ContributionsReminder = 'ContributionsReminderSecondaryCta',
}

interface CustomSecondaryCta {
	type: SecondaryCtaType.Custom;
	cta: Cta;
}

interface ContributionsReminderSecondaryCta {
	type: SecondaryCtaType.ContributionsReminder;
}

export type SecondaryCta = CustomSecondaryCta | ContributionsReminderSecondaryCta;

export enum TickerEndType {
	unlimited = 'unlimited',
	hardstop = 'hardstop', // currently unsupported
}

export enum TickerCountType {
	money = 'money',
}

interface TickerCopy {
	countLabel: string;
	goalReachedPrimary: string;
	goalReachedSecondary: string;
}

export interface TickerData {
	total: number;
	goal: number;
}

// Corresponds to .json file names in S3
export type TickerName = 'US_2022' | 'AU_2022';

export interface TickerSettings {
	endType: TickerEndType;
	countType: TickerCountType;
	currencySymbol: string;
	copy: TickerCopy;
	name: TickerName;
	tickerData?: TickerData;
}

export type Tracking = TestTracking & PageTracking;

export interface Image {
	mainUrl: string;
	mobileUrl?: string;
	tabletUrl?: string;
	desktopUrl?: string;
	leftColUrl?: string;
	wideUrl?: string;
	altText: string;
}

export interface BylineWithImage {
	name: string;
	description?: string;
	headshot?: Image;
}
