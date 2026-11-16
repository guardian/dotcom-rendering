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
		'https://i.guim.co.uk/img/media/630a3735c02e195be89ab06fd1b8192959e282ab/0_0_1172_560/500.png?width=500&quality=75&s=937595b3f471d6591475955335c7c023',
	tabletUrl:
		'https://i.guim.co.uk/img/media/20cc6e0fa146574bb9c4ed410ac1a089fab02ce0/0_0_1428_1344/500.png?width=500&quality=75&s=fe64f647f74a3cb671f8035a473b895f',
	desktopUrl:
		'https://i.guim.co.uk/img/media/6c933a058d1ce37a5ad17f79895906150812dfee/0_0_1768_1420/500.png?width=500&quality=75&s=9277532ddf184a308e14218e3576543b',
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
				'https://i.guim.co.uk/img/media/1ffc36c9f7bb070eb67efcc74dd8f74d8c52cf9a/0_0_1968_1484/500.jpg?width=492&quality=100&s=459906ef0aca89a4020f144f23593f56',
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
