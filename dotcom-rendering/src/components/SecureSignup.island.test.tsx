import { render, screen as rtlScreen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { forwardRef, useImperativeHandle } from 'react';
import { sendNewsletterSignupEvent } from '../lib/newsletterSignupTracking';
import { useAuthStatus, useIsSignedIn } from '../lib/useAuthStatus';
import { useBrowserId } from '../lib/useBrowserId';
import { useNewsletterShowMarketingToggle } from '../lib/useNewsletterShowMarketingToggle';
import { ConfigProvider } from './ConfigContext';
import { SecureSignup } from './SecureSignup.island';

jest.mock('../lib/newsletterSignupTracking', () => ({
	sendNewsletterSignupEvent: jest.fn(),
	EVENT_DESCRIPTION_TO_ACTION: {
		'click-button': 'CLICK',
		'open-captcha': 'EXPAND',
		'captcha-passed': 'ANSWER',
		'form-submission': 'CLICK',
		'submission-confirmed': 'SUBSCRIBE',
		'submission-failed': 'RETURN',
		'captcha-load-error': 'CLOSE',
		'captcha-not-passed': 'ANSWER',
		'form-submit-error': 'RETURN',
	},
	NEWSLETTER_SIGNUP_COMPONENT_ID: {
		control: (newsletterId: string) => newsletterId,
	},
}));

jest.mock('../lib/useAuthStatus', () => ({
	useAuthStatus: jest.fn(),
	useIsSignedIn: jest.fn(),
}));

jest.mock('../lib/useBrowserId', () => ({
	useBrowserId: jest.fn(),
}));

jest.mock('../lib/useNewsletterShowMarketingToggle', () => ({
	useNewsletterShowMarketingToggle: jest.fn(),
}));

jest.mock('../lib/fetchEmail', () => ({
	lazyFetchEmailWithTimeout: jest
		.fn()
		.mockReturnValue(() => Promise.resolve(null)),
}));

type RecaptchaProps = {
	onChange?: (token: string | null) => void;
};

type RecaptchaHandle = { execute: () => void; reset: () => void };

jest.mock('react-google-recaptcha', () => ({
	__esModule: true,
	default: forwardRef<RecaptchaHandle, RecaptchaProps>(
		function MockRecaptcha(props, ref) {
			useImperativeHandle(ref, () => ({
				execute: () => props.onChange?.('test-recaptcha-token'),
				reset: () => undefined,
			}));
			return null;
		},
	),
}));

const renderComponent = () =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<SecureSignup
				newsletterId="morning-briefing"
				successDescription="You will receive Morning Briefing every day."
			/>
		</ConfigProvider>,
	);

const getRequestBodyParams = (): URLSearchParams => {
	const [, requestInit] = (global.fetch as jest.Mock).mock.calls[0] as [
		string,
		RequestInit,
	];
	// eslint-disable-next-line @typescript-eslint/no-base-to-string -- test helper
	return new URLSearchParams(requestInit.body?.toString() ?? '');
};

const getTrackedEventValueByDescription = (
	eventDescription: string,
): Record<string, unknown> | undefined =>
	(
		(sendNewsletterSignupEvent as jest.Mock).mock.calls as Array<
			[{ value?: Record<string, unknown> }]
		>
	)
		.map((call) => call[0].value)
		.find((value) => value?.eventDescription === eventDescription);

describe('SecureSignup', () => {
	const pageConfig = window.guardian.config
		.page as typeof window.guardian.config.page & {
		ajaxUrl?: string;
		googleRecaptchaSiteKey?: string;
		idApiUrl?: string;
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useIsSignedIn as jest.Mock).mockReturnValue(false);
		(useAuthStatus as jest.Mock).mockReturnValue({ kind: 'SignedOut' });
		(useBrowserId as jest.Mock).mockReturnValue('test-browser-id');
		(useNewsletterShowMarketingToggle as jest.Mock).mockReturnValue({
			showMarketingToggle: true,
			countryCode: undefined,
		});

		pageConfig.ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';
		pageConfig.idApiUrl = 'https://idapi.nextgen.guardianapps.co.uk';
		pageConfig.googleRecaptchaSiteKey = 'test-site-key';
		window.guardian.config.switches.emailSignupRecaptcha = true;

		global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
	});

	it('hides marketing checkbox and submits hidden-opt-in payload for US soft opt-in', async () => {
		const testUser = user.setup();
		(useNewsletterShowMarketingToggle as jest.Mock).mockReturnValue({
			showMarketingToggle: false,
			countryCode: 'US',
		});

		renderComponent();

		await testUser.type(
			rtlScreen.getByLabelText('Enter your email address'),
			'reader@example.com',
		);

		expect(
			rtlScreen.queryByLabelText(/Get updates about our journalism/),
		).not.toBeInTheDocument();

		await testUser.click(
			rtlScreen.getByRole('button', { name: 'Sign up' }),
		);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalled();
		});

		const params = getRequestBodyParams();
		expect(params.get('marketing')).toBe('true');
		expect(params.get('marketingOptInHidden')).toBe('true');
		expect(params.get('countryCode')).toBe('US');
		expect(params.get('browserId')).toBe('test-browser-id');

		expect(
			getTrackedEventValueByDescription('submission-confirmed')
				?.marketingOptInType,
		).toBe('similar-guardian-products-hidden-optin-us');
	});

	it('shows marketing checkbox and honours user opt-out for non-US users', async () => {
		const testUser = user.setup();
		(useNewsletterShowMarketingToggle as jest.Mock).mockReturnValue({
			showMarketingToggle: true,
			countryCode: 'GB',
		});

		renderComponent();

		await testUser.type(
			rtlScreen.getByLabelText('Enter your email address'),
			'reader@example.com',
		);

		const marketingCheckbox = rtlScreen.getByLabelText(
			/Get updates about our journalism/,
		);
		expect(marketingCheckbox).toBeChecked();
		await testUser.click(marketingCheckbox);
		expect(marketingCheckbox).not.toBeChecked();

		await testUser.click(
			rtlScreen.getByRole('button', { name: 'Sign up' }),
		);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalled();
		});

		const params = getRequestBodyParams();
		expect(params.get('marketing')).toBe('false');
		expect(params.get('marketingOptInHidden')).toBeNull();
		expect(params.get('countryCode')).toBeNull();

		expect(
			getTrackedEventValueByDescription('submission-confirmed')
				?.marketingOptInType,
		).toBe('similar-guardian-products-optout');
	});

	it('does not send marketingOptInHidden when the toggle is hidden only because the user is signed in', async () => {
		const testUser = user.setup();
		(useIsSignedIn as jest.Mock).mockReturnValue(true);
		(useNewsletterShowMarketingToggle as jest.Mock).mockReturnValue({
			showMarketingToggle: true,
			countryCode: 'GB',
		});

		renderComponent();

		await testUser.type(
			rtlScreen.getByLabelText('Enter your email address'),
			'reader@example.com',
		);

		expect(
			rtlScreen.queryByLabelText(/Get updates about our journalism/),
		).not.toBeInTheDocument();

		await testUser.click(
			rtlScreen.getByRole('button', { name: 'Sign up' }),
		);

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalled();
		});

		const params = getRequestBodyParams();
		expect(params.get('marketing')).toBeNull();
		expect(params.get('marketingOptInHidden')).toBeNull();
		expect(params.get('countryCode')).toBeNull();
	});
});
