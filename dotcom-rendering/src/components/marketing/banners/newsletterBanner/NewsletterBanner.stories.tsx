import { createRef, useState } from 'react';
import type ReactGoogleRecaptcha from 'react-google-recaptcha';
import { fn, mocked } from 'storybook/test';
import preview from '../../../../../.storybook/preview';
import { useIsSignedIn } from '../../../../lib/useAuthStatus';
import { useCountryCode } from '../../../../lib/useCountryCode';
import { useNewsletterSignupForm } from '../../../../lib/useNewsletterSignupForm';
import type { NewsletterSignupFormState } from '../../../../lib/useNewsletterSignupForm';
import { useNewsletterSubscription } from '../../../../lib/useNewsletterSubscription';
import { design, props } from '../utils/storybook';
import { NewsletterBanner } from './NewsletterBanner';

const meta = preview.meta({
	title: 'Components/marketing/NewsletterBanner',
	component: NewsletterBanner,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(Story) => (
			<div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
				<Story />
			</div>
		),
	],
	args: {
		...props,
		content: {
			heading: 'Sign up to The Stakes 2026',
			paragraphs: [
				'From the races and candidates to watch to the issues shaping American politics.',
			],
		},
		isCollapsible: false,
		promotedNewsletter: {
			listId: 6042,
			identityName: 'the-stakes-us-election-edition',
			name: 'The Stakes 2026',
			frequency: 'Weekly',
		},
		design: {
			...design,
			headerImage: {
				mobileUrl:
					'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
				tabletUrl:
					'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
				desktopUrl:
					'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
				altText: 'The Stakes newsletter',
			},
		},
		submitComponentEvent: async () => Promise.resolve(),
		idApiUrl: 'https://idapi.theguardian.com',
	},
	beforeEach() {
		mocked(useIsSignedIn).mockReturnValue(false);
		mocked(useNewsletterSubscription).mockReturnValue(false);
		mocked(useNewsletterSignupForm).mockReturnValue(signedOutFormState);
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

const useInteractiveSignedOutForm = (): NewsletterSignupFormState => {
	const [userEmail, setUserEmail] = useState('');
	const [isInteracted, setIsInteracted] = useState(false);
	const [marketingOptIn, setMarketingOptIn] = useState(true);

	return {
		...signedOutFormState,
		userEmail,
		isInteracted,
		showMarketingToggle: isInteracted,
		marketingOptIn,
		handleEmailFocus: () => setIsInteracted(true),
		handleEmailChange: (value) => {
			setUserEmail(value);
			setIsInteracted(true);
		},
		handleMarketingToggle: () => setMarketingOptIn((current) => !current),
	};
};

export const SignedOut = meta.story({
	beforeEach() {
		mocked(useNewsletterSignupForm).mockImplementation(
			useInteractiveSignedOutForm,
		);
	},
});

export const SignedIn = meta.story({
	beforeEach() {
		mocked(useIsSignedIn).mockReturnValue(true);
		mocked(useNewsletterSignupForm).mockReturnValue({
			...signedOutFormState,
			userEmail: 'reader@example.com',
			isSignedIn: true,
			isInteracted: true,
		});
	},
});

export const USHideMarketingToggle = meta.story({
	beforeEach() {
		mocked(useCountryCode).mockReturnValue('US');
		const previousSwitch =
			window.guardian.config.switches['usSignupHideMarketingToggle'];
		window.guardian.config.switches['usSignupHideMarketingToggle'] = true;
		mocked(useNewsletterSignupForm).mockReturnValue({
			...signedOutFormState,
			userEmail: 'reader@example.com',
			isInteracted: true,
			marketingOptIn: true,
			marketingOptInHiddenForCountry: true,
		});

		return () => {
			mocked(useCountryCode).mockReset();
			window.guardian.config.switches['usSignupHideMarketingToggle'] =
				previousSwitch;
		};
	},
});

export const SubmissionFailed = meta.story({
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue({
			...signedOutFormState,
			responseOk: false,
		});
	},
});

export const Success = meta.story({
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue({
			...signedOutFormState,
			responseOk: true,
		});
	},
});

const useSuccessfulForm = (): NewsletterSignupFormState => {
	const form = useInteractiveSignedOutForm();
	const [responseOk, setResponseOk] = useState<boolean>();

	return {
		...form,
		responseOk,
		handleSubmit: (event) => {
			event.preventDefault();
			setResponseOk(true);
		},
	};
};

export const SuccessTransition = meta.story({
	beforeEach() {
		mocked(useNewsletterSignupForm).mockImplementation(useSuccessfulForm);
	},
});
