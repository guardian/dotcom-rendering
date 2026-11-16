import { brand, neutral, palette } from '@guardian/source/foundations';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type { HexColour } from '@guardian/support-dotcom-components/dist/shared/types';
import type { PromotedNewsletter } from '@guardian/support-dotcom-components/dist/shared/types/props/banner';
import { palette as themePalette } from '../../../../palette';
import type { NewsletterBannerDesign } from '../common/types';
import type { BannerData } from '../designableBanner/BannerProps';

export interface NewsletterBannerSettings {
	divider: string;
	actionColor: string;
	frequencyIconColor: string;
	headingColor: string;
	emailInputTextColor: string;
	emailInputBackgroundColor: string;
	emailInputBorderColor?: string;
	signupButtonBackgroundColor: string;
	signupButtonTextColor?: string;
	errorColor: string;
	privacyTextColor: string;
	toggleTextColor: string;
	toggleActiveColor?: string;
	successTextColor: string;
	successIconColor: string;
	browseButtonTextColor: string;
	browseButtonBorderColor: string;
}

export interface NewsletterBannerData extends BannerData {
	newsletter: PromotedNewsletter;
	settings: BannerData['settings'] & {
		newsletterBanner: NewsletterBannerSettings;
	};
}

const resolveColour = (colour: HexColour | undefined, fallback: string) =>
	colour === undefined ? fallback : hexColourToString(colour);

/** Resolve newsletter colours once, including defaults for pre-theme designs. */
export const buildNewsletterBannerSettings = (
	design: NewsletterBannerDesign | undefined,
): NewsletterBannerSettings => {
	const colours = design?.colours.newsletterBanner;
	const actionColor = resolveColour(colours?.actionColor, brand[400]);

	return {
		divider: resolveColour(colours?.divider, neutral[86]),
		actionColor,
		frequencyIconColor: resolveColour(
			colours?.frequencyIconColor,
			themePalette('--newsletter-card-badge-icon'),
		),
		headingColor: resolveColour(
			design?.colours.basic.headerText,
			neutral[7],
		),
		emailInputTextColor: resolveColour(
			colours?.emailInputTextColor,
			neutral[7],
		),
		emailInputBackgroundColor: resolveColour(
			colours?.emailInputBackgroundColor,
			neutral[100],
		),
		emailInputBorderColor:
			colours?.emailInputBorderColor &&
			hexColourToString(colours.emailInputBorderColor),
		signupButtonBackgroundColor: resolveColour(
			colours?.signupButtonBackgroundColor,
			actionColor,
		),
		signupButtonTextColor:
			colours?.signupButtonTextColor &&
			hexColourToString(colours.signupButtonTextColor),
		errorColor: resolveColour(colours?.errorColor, palette.error[400]),
		privacyTextColor: resolveColour(colours?.privacyTextColor, neutral[46]),
		toggleTextColor: resolveColour(colours?.toggleTextColor, neutral[20]),
		toggleActiveColor:
			colours?.toggleActiveColor &&
			hexColourToString(colours.toggleActiveColor),
		successTextColor: resolveColour(colours?.successTextColor, neutral[20]),
		successIconColor: resolveColour(
			colours?.successIconColor,
			palette.success[400],
		),
		browseButtonTextColor: resolveColour(
			colours?.browseButtonTextColor,
			brand[400],
		),
		browseButtonBorderColor: resolveColour(
			colours?.browseButtonBorderColor,
			brand[400],
		),
	};
};
