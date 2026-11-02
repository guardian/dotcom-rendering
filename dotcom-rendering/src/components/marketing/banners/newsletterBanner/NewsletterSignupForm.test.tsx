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

jest.mock('../../../NewsletterPrivacyMessage', () => ({
	NewsletterPrivacyMessage: () => null,
}));

describe('newsletter banner signup form', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockResponseOk = undefined;
		mockIsValidationError = false;
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
				errorColor="#FF9081"
				headingColor="#FFFFFF"
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

	it('uses the configured error and action colors for the failure message', () => {
		mockResponseOk = false;
		render(
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#8F6A70"
				errorColor="#FF9081"
				headingColor="#FFFFFF"
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

	it('calls onSuccess only after the signup hook reports success', () => {
		const onSuccess = jest.fn();
		const renderForm = () => (
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				actionColor="#052962"
				errorColor="#C70000"
				headingColor="#FFFFFF"
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
