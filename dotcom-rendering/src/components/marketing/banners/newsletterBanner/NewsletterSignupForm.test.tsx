import { brand, neutral } from '@guardian/source/foundations';
import {
	fireEvent,
	render,
	screen as testingScreen,
} from '@testing-library/react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { newsletterDesignDark, props } from '../utils/storybook';
import type {
	NewsletterBannerData,
	NewsletterBannerSettings,
} from './NewsletterBannerData';
import { buildNewsletterBannerSettings } from './NewsletterBannerData';
import { NewsletterSignupForm } from './NewsletterSignupForm';

const mockHandleSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) =>
	event.preventDefault(),
);
const mockHandleSubmitButtonClick = jest.fn();
const mockHandleEmailFocus = jest.fn();
let mockResponseOk: boolean | undefined;
let mockIsValidationError = false;
let mockUserEmail = 'test@example.com';
let mockMarketingOptIn = false;
let mockShowMarketingToggle = false;

jest.mock('../../../ConfigContext', () => ({
	useConfig: () => ({ renderingTarget: 'Web' }),
}));

jest.mock('../../../../lib/useHideMarketingToggleForCountry', () => ({
	useHideMarketingToggleForCountry: () => false,
}));

jest.mock('../../../../lib/useNewsletterSignupForm', () => ({
	useNewsletterSignupForm: jest.fn(() => ({
		userEmail: mockUserEmail,
		isSignedIn: false,
		isInteracted: false,
		showMarketingToggle: mockShowMarketingToggle,
		marketingOptIn: mockMarketingOptIn,
		isWaitingForResponse: false,
		captchaSiteKey: 'test-site-key',
		responseOk: mockResponseOk,
		isValidationError: mockIsValidationError,
		errorMessage: mockIsValidationError
			? 'Enter a valid email address'
			: undefined,
		handleSubmit: mockHandleSubmit,
		handleSubmitButtonClick: mockHandleSubmitButtonClick,
		handleEmailFocus: mockHandleEmailFocus,
	})),
}));

jest.mock('react-google-recaptcha', () => ({
	__esModule: true,
	default: jest.fn(() => null),
}));

const copy = {
	heading: null,
	paragraphs: [],
	primaryCta: null,
	secondaryCta: null,
};
const ctaSettings = {
	default: { textColour: '#FFFFFF', backgroundColour: '#052962' },
};
const bannerData: NewsletterBannerData = {
	bannerChannel: 'contributions',
	design: props.design,
	content: { mainContent: copy, mobileContent: copy },
	tracking: props.tracking,
	articleCounts: props.articleCounts,
	reminderTracking: {
		onReminderCtaClick: jest.fn(),
		onReminderSetClick: jest.fn(),
		onReminderCloseClick: jest.fn(),
	},
	newsletter: {
		listId: 6042,
		identityName: 'test-newsletter',
		name: 'Test newsletter',
		frequency: 'Weekly',
	},
	settings: {
		containerSettings: { backgroundColour: '#FFFFFF' },
		primaryCtaSettings: ctaSettings,
		secondaryCtaSettings: ctaSettings,
		closeButtonSettings: ctaSettings,
		highlightedTextSettings: { textColour: '#121212' },
		newsletterBanner: {
			...buildNewsletterBannerSettings(undefined),
		},
	},
	isCollapsed: false,
	isCollapsible: false,
	isTabletOrAbove: false,
	choices: undefined,
	selectedChoiceCard: undefined,
	actions: {
		onClose: jest.fn(),
		onToggleCollapse: jest.fn(),
		onCtaClick: jest.fn(),
		onSecondaryCtaClick: jest.fn(),
		onChoiceCardChange: jest.fn(),
		submitComponentEvent: jest.fn(),
	},
	selectors: {
		copyForViewport: copy,
		headingCopy: copy,
		showBody: true,
		showTicker: false,
		showArticleCount: false,
		showChoiceCardCtas: false,
		showChoiceCardSelector: false,
		showStandardCtas: false,
		showBodyVisual: false,
		showHeaderImage: false,
		customSecondaryCta: null,
		reminderCta: null,
	},
};

const form = (
	{
		bodyText = '#333333',
		...settings
	}: Partial<NewsletterBannerSettings> & { bodyText?: string } = {},
	onSuccess?: () => void,
) => (
	<NewsletterSignupForm
		bannerData={{
			...bannerData,
			settings: {
				...bannerData.settings,
				containerSettings: {
					...bannerData.settings.containerSettings,
					textColor: bodyText,
				},
				newsletterBanner: {
					...bannerData.settings.newsletterBanner,
					...settings,
				},
			},
		}}
		componentId="test-banner"
		onSuccess={onSuccess}
	/>
);

describe('newsletter banner signup form', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockResponseOk = undefined;
		mockIsValidationError = false;
		mockUserEmail = 'test@example.com';
		mockMarketingOptIn = false;
		mockShowMarketingToggle = false;
	});

	it('renders CAPTCHA and delegates submission to the signup hook', () => {
		const onSuccess = jest.fn();
		render(form({}, onSuccess));

		expect(ReactGoogleRecaptcha).toHaveBeenCalled();
		expect(onSuccess).not.toHaveBeenCalled();
		expect(testingScreen.getByText('Enter your email')).toHaveStyle({
			color: '#121212',
		});
		expect(
			testingScreen.getByRole('button', { name: 'Sign up' }),
		).toHaveStyle({ backgroundColor: '#052962' });

		fireEvent.focus(testingScreen.getByRole('textbox'));
		fireEvent.click(testingScreen.getByRole('button', { name: 'Sign up' }));

		expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
		expect(mockHandleSubmitButtonClick).toHaveBeenCalledTimes(1);
		expect(mockHandleEmailFocus).toHaveBeenCalledTimes(1);
		expect(onSuccess).not.toHaveBeenCalled();
	});

	it('uses the configured validation error color', () => {
		mockIsValidationError = true;
		render(
			form({ emailInputBorderColor: '#EDEDED', errorColor: '#FF9081' }),
		);

		expect(testingScreen.getByRole('alert')).toHaveStyle({
			color: '#FF9081',
		});
		expect(testingScreen.getByRole('textbox')).toHaveStyle({
			borderColor: '#FF9081',
		});
		expect(testingScreen.getByText('Enter your email')).toHaveStyle({
			color: '#121212',
		});
	});

	it.each([false, true])(
		'uses the dark design email label color with validation error %s',
		(isValidationError) => {
			mockIsValidationError = isValidationError;
			render(form(buildNewsletterBannerSettings(newsletterDesignDark)));

			expect(testingScreen.getByText('Enter your email')).toHaveStyle({
				color: '#EDEDED',
			});
		},
	);

	it.each(['test@example.com', 'invalid-email'])(
		'keeps the input text color on validation error for %s',
		(userEmail) => {
			mockUserEmail = userEmail;
			mockIsValidationError = true;
			render(
				form({
					emailInputTextColor: '#EDEDED',
					emailInputBackgroundColor: '#333333',
					errorColor: '#FF9081',
				}),
			);

			expect(testingScreen.getByRole('textbox')).toHaveStyle({
				color: '#EDEDED',
				backgroundColor: '#333333',
				borderColor: '#FF9081',
			});
			expect(testingScreen.getByRole('alert')).toHaveStyle({
				color: '#FF9081',
			});
		},
	);

	it.each([
		{ scheme: 'light', text: neutral[7], background: neutral[100] },
		{ scheme: 'dark', text: neutral[100], background: brand[300] },
	])(
		'keeps the email input light with the $scheme browser palette',
		({ scheme, text, background }) => {
			const { container } = render(
				<div data-color-scheme={scheme}>{form()}</div>,
			);
			container.firstElementChild?.setAttribute(
				'style',
				`--newsletter-signup-input-text: ${text}; --newsletter-signup-input-background: ${background}`,
			);

			expect(testingScreen.getByRole('textbox')).toHaveStyle({
				color: '#121212',
				backgroundColor: '#FFFFFF',
			});
		},
	);

	it('uses the configured email input colors', () => {
		render(
			form({
				emailInputTextColor: '#123456',
				emailInputBackgroundColor: '#FEDCBA',
				emailInputBorderColor: '#AABBCC',
			}),
		);

		expect(testingScreen.getByRole('textbox')).toHaveStyle({
			color: '#123456',
			backgroundColor: '#FEDCBA',
			borderColor: '#AABBCC',
		});
	});

	it('uses the configured signup button colors', () => {
		render(
			form({
				signupButtonBackgroundColor: '#FFFFFF',
				signupButtonTextColor: '#1A1A1A',
			}),
		);

		expect(
			testingScreen.getByRole('button', { name: 'Sign up' }),
		).toHaveStyle({ backgroundColor: '#FFFFFF', color: '#1A1A1A' });
	});

	it('uses the configured error and action colors for the failure message', () => {
		mockResponseOk = false;
		render(
			form({
				signupButtonBackgroundColor: '#8F6A70',
				errorColor: '#FF9081',
				borderColor: '#123456',
			}),
		);

		const alert = testingScreen.getByRole('alert');
		expect(alert).toHaveTextContent('Sign up failed.');
		expect(alert.parentElement?.parentElement).toHaveStyle({
			color: '#FF9081',
			border: '1px solid #123456',
		});
		expect(
			testingScreen.getByRole('button', { name: 'Try again' }),
		).toHaveStyle({ backgroundColor: '#8F6A70' });
	});

	it('uses the signup button colors for the retry button', () => {
		mockResponseOk = false;
		render(form(buildNewsletterBannerSettings(newsletterDesignDark)));

		expect(
			testingScreen.getByRole('button', { name: 'Try again' }),
		).toHaveStyle({ backgroundColor: '#FFFFFF', color: '#1A1A1A' });
		expect(
			testingScreen.getByRole('alert').parentElement?.parentElement,
		).toHaveStyle({ border: '1px solid #999999' });
	});

	it.each(['#707070', '#EDEDED'])(
		'uses %s for privacy text, links and the bold label',
		(privacyTextColor) => {
			render(form({ privacyTextColor }));
			const label = testingScreen.getByText('Privacy Notice:');
			expect(label).toHaveStyle({ color: privacyTextColor });
			expect(label.parentElement).toHaveStyle({
				color: privacyTextColor,
			});
			expect(
				testingScreen.getByRole('link', { name: 'Privacy Policy' }),
			).toHaveStyle({ color: privacyTextColor });
		},
	);

	it.each(['#333333', '#EDEDED'])(
		'uses body text color %s for the marketing toggle label',
		(bodyText) => {
			render(form({ bodyText }));
			expect(
				testingScreen.getByText(
					'Get updates about our journalism and ways to support and enjoy our work. Toggle to opt out.',
				),
			).toHaveStyle({ color: bodyText });
		},
	);

	it.each(['#22874D', '#28A85F'])(
		'uses %s for the enabled toggle',
		(toggleActiveColor) => {
			mockShowMarketingToggle = true;
			mockMarketingOptIn = true;
			render(form({ toggleActiveColor }));
			expect(testingScreen.getByRole('switch')).toHaveStyle({
				backgroundColor: toggleActiveColor,
				borderColor: toggleActiveColor,
			});
		},
	);

	it('keeps the unchecked toggle colour unchanged', () => {
		mockShowMarketingToggle = true;
		render(form({ toggleActiveColor: '#28A85F' }));
		expect(testingScreen.getByRole('switch')).toHaveStyle({
			backgroundColor: neutral[46],
			borderColor: neutral[46],
		});
	});

	it('calls onSuccess only after the signup hook reports success', () => {
		const onSuccess = jest.fn();
		const { rerender } = render(form({}, onSuccess));
		expect(onSuccess).not.toHaveBeenCalled();

		mockResponseOk = false;
		rerender(form({}, onSuccess));
		expect(onSuccess).not.toHaveBeenCalled();

		mockResponseOk = true;
		rerender(form({}, onSuccess));
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});
});
