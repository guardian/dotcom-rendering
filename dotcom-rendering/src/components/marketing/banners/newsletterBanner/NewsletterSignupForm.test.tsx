import { brand, neutral } from '@guardian/source/foundations';
import {
	fireEvent,
	render,
	screen as testingScreen,
} from '@testing-library/react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
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
		render(
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#052962"
				errorColor="#C70000"
				headingColor="#FFFFFF"
				privacyTextColor="#707070"
				toggleTextColor="#333333"
				onSuccess={onSuccess}
			/>,
		);

		expect(ReactGoogleRecaptcha).toHaveBeenCalled();
		expect(onSuccess).not.toHaveBeenCalled();
		expect(testingScreen.getByText('Enter your email')).toHaveStyle({
			color: '#FFFFFF',
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
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#052962"
				emailInputBorderColor="#EDEDED"
				errorColor="#FF9081"
				headingColor="#FFFFFF"
				privacyTextColor="#707070"
				toggleTextColor="#333333"
			/>,
		);

		expect(testingScreen.getByRole('alert')).toHaveStyle({
			color: '#FF9081',
		});
		expect(testingScreen.getByRole('textbox')).toHaveStyle({
			borderColor: '#FF9081',
		});
		expect(testingScreen.getByText('Enter your email')).toHaveStyle({
			color: '#FFFFFF',
		});
	});

	it.each(['test@example.com', 'invalid-email'])(
		'keeps the input text color on validation error for %s',
		(userEmail) => {
			mockUserEmail = userEmail;
			mockIsValidationError = true;
			render(
				<NewsletterSignupForm
					newsletterId="test-newsletter"
					componentId="test-banner"
					actionColor="#EACCA0"
					emailInputTextColor="#EDEDED"
					emailInputBackgroundColor="#333333"
					errorColor="#FF9081"
					headingColor="#FFFFFF"
					privacyTextColor="#EDEDED"
					toggleTextColor="#DCDCDC"
				/>,
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
				<div data-color-scheme={scheme}>
					<NewsletterSignupForm
						newsletterId="test-newsletter"
						componentId="test-banner"
						actionColor="#052962"
						errorColor="#C70000"
						headingColor="#121212"
						privacyTextColor="#707070"
						toggleTextColor="#333333"
					/>
				</div>,
			);
			const palette = container.firstElementChild;
			palette?.setAttribute(
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
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#052962"
				emailInputTextColor="#123456"
				emailInputBackgroundColor="#FEDCBA"
				emailInputBorderColor="#AABBCC"
				errorColor="#C70000"
				headingColor="#121212"
				privacyTextColor="#707070"
				toggleTextColor="#333333"
			/>,
		);

		expect(testingScreen.getByRole('textbox')).toHaveStyle({
			color: '#123456',
			backgroundColor: '#FEDCBA',
			borderColor: '#AABBCC',
		});
	});

	it('uses the configured signup button colors', () => {
		render(
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#EACCA0"
				signupButtonBackgroundColor="#FFFFFF"
				signupButtonTextColor="#1A1A1A"
				errorColor="#FF9081"
				headingColor="#FFFFFF"
				privacyTextColor="#BABABA"
				toggleTextColor="#DCDCDC"
			/>,
		);

		expect(
			testingScreen.getByRole('button', { name: 'Sign up' }),
		).toHaveStyle({ backgroundColor: '#FFFFFF', color: '#1A1A1A' });
	});

	it('uses the configured error and action colors for the failure message', () => {
		mockResponseOk = false;
		render(
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#8F6A70"
				errorColor="#FF9081"
				headingColor="#FFFFFF"
				privacyTextColor="#BABABA"
				toggleTextColor="#DCDCDC"
			/>,
		);

		const alert = testingScreen.getByRole('alert');
		expect(alert).toHaveTextContent('Sign up failed.');
		expect(alert.parentElement?.parentElement).toHaveStyle({
			color: '#FF9081',
		});
		expect(
			testingScreen.getByRole('button', { name: 'Try again' }),
		).toHaveStyle({ backgroundColor: '#8F6A70' });
	});

	it('uses the signup button colors for the retry button', () => {
		mockResponseOk = false;
		render(
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#EACCA0"
				signupButtonBackgroundColor="#FFFFFF"
				signupButtonTextColor="#1A1A1A"
				errorColor="#FF9081"
				headingColor="#FFFFFF"
				privacyTextColor="#EDEDED"
				toggleTextColor="#DCDCDC"
			/>,
		);

		expect(
			testingScreen.getByRole('button', { name: 'Try again' }),
		).toHaveStyle({ backgroundColor: '#FFFFFF', color: '#1A1A1A' });
	});

	it.each(['#707070', '#EDEDED'])(
		'uses %s for privacy text, links and the bold label',
		(privacyTextColor) => {
			render(
				<NewsletterSignupForm
					newsletterId="test-newsletter"
					componentId="test-banner"
					actionColor="#052962"
					errorColor="#C70000"
					headingColor="#FFFFFF"
					privacyTextColor={privacyTextColor}
					toggleTextColor="#333333"
				/>,
			);

			const label = testingScreen.getByText('Privacy Notice:');
			expect(label).toHaveStyle({ color: privacyTextColor });
			expect(label.parentElement).toHaveStyle({
				color: privacyTextColor,
			});
		},
	);

	it.each(['#333333', '#DCDCDC'])(
		'uses %s for the marketing toggle label',
		(toggleTextColor) => {
			render(
				<NewsletterSignupForm
					newsletterId="test-newsletter"
					componentId="test-banner"
					actionColor="#052962"
					errorColor="#C70000"
					headingColor="#FFFFFF"
					privacyTextColor="#707070"
					toggleTextColor={toggleTextColor}
				/>,
			);

			expect(
				testingScreen.getByText(
					'Get updates about our journalism and ways to support and enjoy our work. Toggle to opt out.',
				),
			).toHaveStyle({ color: toggleTextColor });
		},
	);

	it.each(['#22874D', '#28A85F'])(
		'uses %s for the enabled toggle',
		(toggleActiveColor) => {
			mockShowMarketingToggle = true;
			mockMarketingOptIn = true;
			render(
				<NewsletterSignupForm
					newsletterId="test-newsletter"
					componentId="test-banner"
					actionColor="#052962"
					errorColor="#C70000"
					headingColor="#121212"
					privacyTextColor="#707070"
					toggleTextColor="#333333"
					toggleActiveColor={toggleActiveColor}
				/>,
			);

			expect(testingScreen.getByRole('switch')).toHaveStyle({
				backgroundColor: toggleActiveColor,
				borderColor: toggleActiveColor,
			});
		},
	);

	it('keeps the unchecked toggle colour unchanged', () => {
		mockShowMarketingToggle = true;
		render(
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#052962"
				errorColor="#C70000"
				headingColor="#121212"
				privacyTextColor="#707070"
				toggleTextColor="#333333"
				toggleActiveColor="#28A85F"
			/>,
		);

		expect(testingScreen.getByRole('switch')).toHaveStyle({
			backgroundColor: neutral[46],
			borderColor: neutral[46],
		});
	});

	it('calls onSuccess only after the signup hook reports success', () => {
		const onSuccess = jest.fn();
		const renderForm = () => (
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#052962"
				errorColor="#C70000"
				headingColor="#FFFFFF"
				privacyTextColor="#707070"
				toggleTextColor="#333333"
				onSuccess={onSuccess}
			/>
		);
		const { rerender } = render(renderForm());

		expect(onSuccess).not.toHaveBeenCalled();

		mockResponseOk = false;
		rerender(renderForm());
		expect(onSuccess).not.toHaveBeenCalled();

		mockResponseOk = true;
		rerender(renderForm());
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});
});
