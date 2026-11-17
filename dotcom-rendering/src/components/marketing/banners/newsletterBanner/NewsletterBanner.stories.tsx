import { createRef, useState } from 'react';
import type ReactGoogleRecaptcha from 'react-google-recaptcha';
import { fn, mocked } from 'storybook/test';
import preview from '../../../../../.storybook/preview';
import { useIsSignedIn } from '../../../../lib/useAuthStatus';
import { useCountryCode } from '../../../../lib/useCountryCode';
import { useNewsletterSignupForm } from '../../../../lib/useNewsletterSignupForm';
import type { NewsletterSignupFormState } from '../../../../lib/useNewsletterSignupForm';
import { useNewsletterSubscription } from '../../../../lib/useNewsletterSubscription';
import {
	newsletterDesign,
	newsletterDesignDark,
	props,
} from '../utils/storybook';
import { NewsletterBanner } from './NewsletterBanner';

const headerImage = {
	mobileUrl:
		'https://uploads.guim.co.uk/2026/10/30/The_Stakes_image_Mobile.png',
	tabletUrl: 'https://uploads.guim.co.uk/2026/10/30/The_Stakes_image.png',
	desktopUrl: 'https://uploads.guim.co.uk/2026/10/30/The_Stakes_image.png',
	altText: 'The Stakes newsletter',
};

const designs = {
	Light: { ...newsletterDesign, headerImage },
	Dark: {
		...newsletterDesignDark,
		headerImage: {
			mobileUrl:
				'https://i.guim.co.uk/img/media/3e54a72ccdf78508b8af96645b1ddbeb3907ffad/0_0_360_360/360.png?width=90&quality=100&s=4eb720cd36be529e66a20b6c7ed08640',
			tabletUrl:
				'https://i.guim.co.uk/img/media/1ffc36c9f7bb070eb67efcc74dd8f74d8c52cf9a/0_0_1968_1484/1968.jpg?width=1000&quality=100&s=7256eabe674d825b55abb14af6c62887',
			desktopUrl:
				'https://i.guim.co.uk/img/media/7688239a7cc28f7f95cb8f13b3073dba277db0dd/0_0_1840_1244/1840.jpg?width=460&quality=100&s=f79da6483ae56e30aae6e04f84b135c2',
			altText: '',
		},
	},
};

const meta = preview.meta({
	title: 'Components/marketing/NewsletterBanner',
	component: NewsletterBanner,
	argTypes: {
		design: {
			control: { type: 'select' },
			options: Object.keys(designs),
			mapping: designs,
		},
	},
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
				'From the races and candidates to watch to the issues shaping American politics, The Stakes 2026 brings you expert analysis of what really matters in the US midterms.',
			],
		},
		mobileContent: {
			heading: 'Sign up to The Stakes 2026',
			paragraphs: [
				'From the races and candidates to watch to the issues shaping American politics, The Stakes 2026 brings you expert analysis of what really matters in the US midterms.',
			],
		},
		isCollapsible: false,
		promotedNewsletter: {
			listId: 6042,
			identityName: 'the-stakes-us-election-edition',
			name: 'The Stakes 2026',
			frequency: 'Weekly, plus breaking news alerts',
		},
		design: designs.Light,
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

export const InvalidEmail = meta.story({
	beforeEach() {
		mocked(useNewsletterSignupForm).mockReturnValue({
			...signedOutFormState,
			userEmail: 'invalid-email',
			isInteracted: true,
			showMarketingToggle: true,
			marketingOptIn: true,
			errorMessage: 'Incorrect email format. Please check.',
			isValidationError: true,
		});
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

export const TabletBackgroundImage = meta.story({
	parameters: {
		viewport: {
			options: {
				phablet: {
					name: 'phablet',
					styles: {
						width: '660px',
						height: '1200px',
					},
				},
			},
		},
	},
	globals: {
		viewport: { value: 'phablet', isRotated: false },
	},
	args: {
		design: {
			...designs.Dark,
			tabletImageAsBackground: true,
		},
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
