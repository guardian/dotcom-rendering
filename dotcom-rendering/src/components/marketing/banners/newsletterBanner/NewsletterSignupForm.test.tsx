import {
	fireEvent,
	render,
	screen as testingScreen,
} from '@testing-library/react';
import ReactGoogleRecaptcha from 'react-google-recaptcha';
import { NewsletterSignupForm } from './NewsletterSignupForm';

const mockHandleSubmit = jest.fn();
const mockHandleSubmitButtonClick = jest.fn();
const mockHandleEmailFocus = jest.fn();

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

describe('newsletter banner manual signup stub', () => {
	it('skips CAPTCHA and real submission, and calls onSuccess', () => {
		const onSuccess = jest.fn();
		render(
			<NewsletterSignupForm
				newsletterId="test-newsletter"
				newsletterName="Test newsletter"
				frequency="Weekly"
				componentId="test-banner"
				onSuccess={onSuccess}
			/>,
		);

		expect(ReactGoogleRecaptcha).not.toHaveBeenCalled();
		expect(onSuccess).not.toHaveBeenCalled();

		fireEvent.focus(testingScreen.getByRole('textbox'));
		fireEvent.click(testingScreen.getByRole('button', { name: 'Sign up' }));

		expect(mockHandleSubmit).not.toHaveBeenCalled();
		expect(mockHandleSubmitButtonClick).not.toHaveBeenCalled();
		expect(mockHandleEmailFocus).toHaveBeenCalledTimes(1);
		expect(onSuccess).toHaveBeenCalledTimes(1);
	});
});
