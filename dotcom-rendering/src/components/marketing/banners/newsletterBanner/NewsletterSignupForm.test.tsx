import {
	fireEvent,
	render,
	screen as testingScreen,
} from '@testing-library/react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { props } from '../utils/storybook';
import type { NewsletterBannerData } from './NewsletterBannerData';
import { buildNewsletterBannerSettings } from './NewsletterBannerData';
import { NewsletterSignupForm } from './NewsletterSignupForm';

const mockHandleSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) =>
	event.preventDefault(),
);
const mockHandleSubmitButtonClick = jest.fn();
const mockHandleEmailFocus = jest.fn();
let mockResponseOk: boolean | undefined;
let mockIsValidationError = false;

jest.mock('../../../ConfigContext', () => ({
	useConfig: () => ({ renderingTarget: 'Web' }),
}));

jest.mock('../../../../lib/useHideMarketingToggleForCountry', () => ({
	useHideMarketingToggleForCountry: () => false,
}));

jest.mock('../../../../lib/useNewsletterSignupForm', () => ({
	useNewsletterSignupForm: jest.fn(() => ({
		userEmail: 'test@example.com',
		isSignedIn: false,
		isInteracted: false,
		showMarketingToggle: false,
		marketingOptIn: false,
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

const form = (onSuccess?: () => void) => (
	<NewsletterSignupForm
		bannerData={bannerData}
		componentId="test-banner"
		onSuccess={onSuccess}
	/>
);

describe('newsletter banner signup form', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockResponseOk = undefined;
		mockIsValidationError = false;
	});

	it('renders CAPTCHA and delegates submission to the signup hook', () => {
		const onSuccess = jest.fn();
		render(form(onSuccess));

		expect(ReactGoogleRecaptcha).toHaveBeenCalled();
		expect(onSuccess).not.toHaveBeenCalled();

		fireEvent.focus(testingScreen.getByRole('textbox'));
		fireEvent.click(testingScreen.getByRole('button', { name: 'Sign up' }));

		expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
		expect(mockHandleSubmitButtonClick).toHaveBeenCalledTimes(1);
		expect(mockHandleEmailFocus).toHaveBeenCalledTimes(1);
		expect(onSuccess).not.toHaveBeenCalled();
	});

	it('shows the inline validation error', () => {
		mockIsValidationError = true;
		render(form());

		expect(testingScreen.getByRole('alert')).toHaveTextContent(
			'Enter a valid email address',
		);
	});

	it('shows the failure message and retry button when signup fails', () => {
		mockResponseOk = false;
		render(form());

		const alert = testingScreen.getByRole('alert');
		expect(alert).toHaveTextContent('Sign up failed.');
		expect(
			testingScreen.getByRole('button', { name: 'Try again' }),
		).toBeInTheDocument();
	});

	it('calls onSuccess only after the signup hook reports success', () => {
		const onSuccess = jest.fn();
		const { rerender } = render(form(onSuccess));
		expect(onSuccess).not.toHaveBeenCalled();

		mockResponseOk = false;
		rerender(form(onSuccess));
		expect(onSuccess).not.toHaveBeenCalled();

		mockResponseOk = true;
		rerender(form(onSuccess));
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});
});
