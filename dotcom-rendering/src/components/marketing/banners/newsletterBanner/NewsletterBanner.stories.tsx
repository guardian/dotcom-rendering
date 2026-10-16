import { createRef } from 'react';
import type ReactGoogleRecaptcha from 'react-google-recaptcha';
import { fn, mocked } from 'storybook/test';
import preview from '../../../../../.storybook/preview';
import { useIsSignedIn } from '../../../../lib/useAuthStatus';
import { useNewsletterSignupForm } from '../../../../lib/useNewsletterSignupForm';
import type { NewsletterSignupFormState } from '../../../../lib/useNewsletterSignupForm';
import { useNewsletterSubscription } from '../../../../lib/useNewsletterSubscription';
import {
	DEFAULT_PROMOTED_NEWSLETTER,
	prototypeNewsletterImage,
} from '../../../StickyBottomBanner/newsletterBannerDetails';
import { props } from '../utils/storybook';
import { NewsletterBanner } from './NewsletterBanner';

const meta = preview.meta({
	title: 'Components/marketing/NewsletterBanner',
	component: NewsletterBanner,
	args: {
		...props,
		submitComponentEvent: async () => Promise.resolve(),
		idApiUrl: 'https://idapi.theguardian.com',
		promotedNewsletter: {
			...DEFAULT_PROMOTED_NEWSLETTER,
			illustrationSquare: prototypeNewsletterImage.mobileUrl,
		},
	},
});

export default meta;

const noopHandlers: Pick<
	NewsletterSignupFormState,
	| 'handleEmailChange'
	| 'handleEmailFocus'
	| 'handleEmailInvalid'
	| 'handleMarketingToggle'
	| 'handleSubmit'
	| 'handleSubmitButtonClick'
	| 'handleReset'
	| 'handleCaptchaComplete'
	| 'handleCaptchaLoadError'
> = {
	handleEmailChange: fn(),
	handleEmailFocus: fn(),
	handleEmailInvalid: fn(),
	handleMarketingToggle: fn(),
	handleSubmit: fn(),
	handleSubmitButtonClick: fn(),
	handleReset: fn(),
	handleCaptchaComplete: fn(),
	handleCaptchaLoadError: fn(),
};

const signedOutFormState: NewsletterSignupFormState = {
	userEmail: undefined,
	isSignedIn: false,
	isInteracted: false,
	showMarketingToggle: false,
	marketingOptIn: undefined,
	marketingOptInHiddenForCountry: false,
	isWaitingForResponse: false,
	responseOk: undefined,
	errorMessage: undefined,
	isValidationError: false,
	recaptchaRef: createRef<ReactGoogleRecaptcha>(),
	captchaSiteKey: undefined,
	...noopHandlers,
};

export const SignedOut = meta.story({
	beforeEach() {
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useNewsletterSignupForm).mockReturnValue(signedOutFormState);
	},
});
