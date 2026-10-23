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
	});

	it('renders CAPTCHA and delegates submission to the signup hook', () => {
		const onSuccess = jest.fn();
		render(
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				onSuccess={onSuccess}
			/>,
		);

		expect(ReactGoogleRecaptcha).toHaveBeenCalled();
		expect(onSuccess).not.toHaveBeenCalled();

		fireEvent.focus(testingScreen.getByRole('textbox'));
		fireEvent.click(testingScreen.getByRole('button', { name: 'Sign up' }));

		expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
		expect(mockHandleSubmitButtonClick).toHaveBeenCalledTimes(1);
		expect(mockHandleEmailFocus).toHaveBeenCalledTimes(1);
		expect(onSuccess).not.toHaveBeenCalled();
	});

	it('calls onSuccess only after the signup hook reports success', () => {
		const onSuccess = jest.fn();
		const form = (
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				componentId="test-banner"
				onSuccess={onSuccess}
			/>
		);
		const { rerender } = render(form);

		expect(onSuccess).not.toHaveBeenCalled();

		mockResponseOk = false;
		rerender(<>{form}</>);
		expect(onSuccess).not.toHaveBeenCalled();

		mockResponseOk = true;
		rerender(form);
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});
});
