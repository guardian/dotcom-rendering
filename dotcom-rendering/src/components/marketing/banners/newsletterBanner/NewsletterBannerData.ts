import { brand, neutral, palette } from '@guardian/source/foundations';
import { hexColourToString } from '@guardian/support-dotcom-components';
import type {
	ConfigurableDesign,
	HexColour,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { PromotedNewsletter } from '@guardian/support-dotcom-components/dist/shared/types/props/banner';
import { palette as themePalette } from '../../../../palette';
import type { BannerData } from '../designableBanner/BannerProps';

export interface NewsletterBannerSettings {
	divider: string;
	actionColor: string;
	frequencyIconColor: string;
	emailInputTextColor: string;
	emailInputBackgroundColor: string;
	emailInputBorderColor?: string;
	signupButtonBackgroundColor: string;
	signupButtonTextColor?: string;
	errorColor: string;
	privacyTextColor: string;
	borderColor: string;
	toggleActiveColor?: string;
	successIconColor: string;
	browseButtonColor: string;
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
	design: ConfigurableDesign | undefined,
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
		borderColor: resolveColour(
			colours?.borderColor,
			themePalette('--card-border-supporting'),
		),
		toggleActiveColor:
			colours?.toggleActiveColor &&
			hexColourToString(colours.toggleActiveColor),
		successIconColor: resolveColour(
			colours?.successIconColor,
			palette.success[400],
		),
		browseButtonColor: resolveColour(
			colours?.browseButtonColor,
			brand[400],
		),
	};
};
