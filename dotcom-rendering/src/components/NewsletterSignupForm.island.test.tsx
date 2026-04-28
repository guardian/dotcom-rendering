import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { forwardRef, useImperativeHandle } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { lazyFetchEmailWithTimeout } from '../lib/fetchEmail';
import { clearSubscriptionCache } from '../lib/newsletterSubscriptionCache';
import { useAuthStatus, useIsSignedIn } from '../lib/useAuthStatus';
import { useBrowserId } from '../lib/useBrowserId';
import { ConfigProvider } from './ConfigContext';
import { NewsletterSignupForm } from './NewsletterSignupForm.island';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(),
}));

jest.mock('../lib/fetchEmail', () => ({
	lazyFetchEmailWithTimeout: jest.fn(),
}));

jest.mock('../lib/newsletterSubscriptionCache', () => ({
	clearSubscriptionCache: jest.fn(),
}));

jest.mock('../lib/useAuthStatus', () => ({
	useAuthStatus: jest.fn(),
	useIsSignedIn: jest.fn(),
}));

jest.mock('../lib/useBrowserId', () => ({
	useBrowserId: jest.fn(),
}));

type RecaptchaProps = {
	onChange?: (token: string | null) => void;
	onError?: () => void;
};

type RecaptchaHandle = { execute: () => void; reset: () => void };

// The default mock resolves the captcha immediately with a valid token.
// Individual tests can override this via mockRecaptcha().
let recaptchaBehaviour: (
	handle: RecaptchaHandle,
	props: RecaptchaProps,
) => void = (_handle, props) => props.onChange?.('test-recaptcha-token');

/** Override what happens when reCAPTCHA's execute() is called in a single test. */
const mockRecaptcha = (
	behaviour: (handle: RecaptchaHandle, props: RecaptchaProps) => void,
) => {
	recaptchaBehaviour = behaviour;
};

jest.mock('react-google-recaptcha', () => ({
	__esModule: true,
	default: forwardRef<RecaptchaHandle, RecaptchaProps>(
		function MockRecaptcha(props, ref) {
			useImperativeHandle(ref, () => ({
				execute: () =>
					recaptchaBehaviour(
						{ execute: () => undefined, reset: () => undefined },
						props,
					),
				reset: () => undefined,
			}));
			return null;
		},
	),
}));

const renderForm = (hidePrivacyMessage = false) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<NewsletterSignupForm
				newsletterId="morning-briefing"
				newsletterName="Morning Briefing"
				frequency="every day"
				hidePrivacyMessage={hidePrivacyMessage}
			/>
		</ConfigProvider>,
	);

const getTrackedEventDescription = (call: unknown[]): string => {
	const payload = call[0] as { value: string };
	const value = JSON.parse(payload.value) as { eventDescription: string };
	return value.eventDescription;
};

const getRequestBodyParams = (callIndex = 0): URLSearchParams => {
	const [, requestInit] = (global.fetch as jest.Mock).mock.calls[
		callIndex
	] as [string, RequestInit];
	return new URLSearchParams(requestInit.body?.toString() ?? '');
};

const expectTrackedEventDescriptions = (expected: string[]): void => {
	const eventDescriptions = (
		submitComponentEvent as jest.Mock
	).mock.calls.map(getTrackedEventDescription);
	expect(eventDescriptions).toEqual(expected);
};

const typeEmailAddress = async (
	testUser: ReturnType<typeof user.setup>,
	email = 'reader@example.com',
): Promise<void> => {
	await testUser.type(screen.getByLabelText('Enter your email'), email);
};

describe('NewsletterSignupForm', () => {
	const pageConfig = window.guardian.config
		.page as typeof window.guardian.config.page & {
		ajaxUrl?: string;
		idApiUrl?: string;
		googleRecaptchaSiteKey?: string;
	};

	beforeEach(() => {
		jest.clearAllMocks();

		// Reset reCAPTCHA to the default happy-path behaviour.
		mockRecaptcha(
			(_handle, props) => props.onChange?.('test-recaptcha-token'),
		);

		(useIsSignedIn as jest.Mock).mockReturnValue(false);
		(useAuthStatus as jest.Mock).mockReturnValue({ kind: 'SignedOut' });
		(useBrowserId as jest.Mock).mockReturnValue('test-browser-id');
		(lazyFetchEmailWithTimeout as jest.Mock).mockReturnValue(() =>
			Promise.resolve(null),
		);
		(submitComponentEvent as jest.Mock).mockResolvedValue(undefined);

		pageConfig.ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';
		pageConfig.idApiUrl = 'https://idapi.nextgen.guardianapps.co.uk';
		pageConfig.googleRecaptchaSiteKey = 'test-site-key';
		if (window.guardian.ophan) {
			window.guardian.ophan.pageViewId = 'test-page-view-id';
		}
		global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
	});

	it('submits for a signed-out user and includes marketing/browser fields', async () => {
		const testUser = user.setup();

		renderForm();

		await typeEmailAddress(testUser);
		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		await waitFor(() => {
			expect(screen.getByText("You're signed up!")).toBeInTheDocument();
			expect(
				screen.getByText(
					'You will receive Morning Briefing every day.',
				),
			).toBeInTheDocument();
		});

		expect(global.fetch).toHaveBeenCalledWith(
			'https://api.nextgen.guardianapps.co.uk/email',
			expect.objectContaining({
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}),
		);

		const params = getRequestBodyParams();

		expect(params.get('email')).toBe('reader@example.com');
		expect(params.get('listName')).toBe('morning-briefing');
		expect(params.get('marketing')).toBe('true');
		expect(params.get('browserId')).toBe('test-browser-id');

		expectTrackedEventDescriptions([
			'click-button',
			'open-captcha',
			'captcha-passed',
			'form-submission',
			'submission-confirmed',
		]);
	});

	it('supports tab order from email input to marketing toggle to sign up', async () => {
		const testUser = user.setup();

		renderForm(true);

		await testUser.tab();
		expect(screen.getByLabelText('Enter your email')).toHaveFocus();

		await testUser.tab();
		expect(screen.getByRole('switch')).toHaveFocus();

		await testUser.tab();
		const signUpButton = screen.getByRole('button', { name: 'Sign up' });
		expect(signUpButton).toHaveFocus();
	});

	it('allows signed-out users to opt out of marketing before submit', async () => {
		const testUser = user.setup();

		renderForm();

		await typeEmailAddress(testUser);
		const marketingSwitch = screen.getByRole('switch');
		expect(marketingSwitch).toHaveAttribute('aria-checked', 'true');

		await testUser.click(marketingSwitch);
		expect(marketingSwitch).toHaveAttribute('aria-checked', 'false');

		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalled();
		});

		const params = getRequestBodyParams();
		expect(params.get('marketing')).toBe('false');
	});

	it('supports keyboard interaction for marketing toggle and submit button', async () => {
		const testUser = user.setup();

		renderForm(true);

		await testUser.tab();
		const emailInput = screen.getByLabelText('Enter your email');
		expect(emailInput).toHaveFocus();
		await testUser.type(emailInput, 'reader@example.com');

		await testUser.tab();
		const marketingSwitch = screen.getByRole('switch');
		expect(marketingSwitch).toHaveFocus();

		await testUser.keyboard('{Enter}');
		expect(marketingSwitch).toHaveAttribute('aria-checked', 'false');

		await testUser.tab();
		const signUpButton = screen.getByRole('button', { name: 'Sign up' });
		expect(signUpButton).toHaveFocus();
		await testUser.keyboard('{Enter}');

		await waitFor(() => {
			expect(screen.getByText("You're signed up!")).toBeInTheDocument();
			expect(
				screen.getByText(
					'You will receive Morning Briefing every day.',
				),
			).toBeInTheDocument();
		});

		const params = getRequestBodyParams();
		expect(params.get('marketing')).toBe('false');
	});

	it('uses prefilled email for signed-in users and clears cached subscriptions on success', async () => {
		const testUser = user.setup();
		(useIsSignedIn as jest.Mock).mockReturnValue(true);
		(useAuthStatus as jest.Mock).mockReturnValue({
			kind: 'SignedIn',
			accessToken: { accessToken: 'token' },
			idToken: { claims: { email: 'signed.in@example.com' } },
		});
		(lazyFetchEmailWithTimeout as jest.Mock).mockReturnValue(() =>
			Promise.resolve('signed.in@example.com'),
		);

		renderForm();

		await waitFor(() => {
			expect(
				screen.getByRole('button', { name: 'Sign up' }),
			).toBeInTheDocument();
		});
		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		await waitFor(() => {
			expect(screen.getByText("You're signed up!")).toBeInTheDocument();
			expect(
				screen.getByText(
					'You will receive Morning Briefing every day.',
				),
			).toBeInTheDocument();
		});

		expect(clearSubscriptionCache).toHaveBeenCalledTimes(1);

		const params = getRequestBodyParams();
		expect(params.get('email')).toBe('signed.in@example.com');
	});

	it('shows an inline validation error when submitting with an empty email', async () => {
		const testUser = user.setup();

		renderForm();

		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		expect(
			screen.getByText('Please enter your email address.'),
		).toBeInTheDocument();
		expect(global.fetch).not.toHaveBeenCalled();
	});

	it('shows an inline validation error when submitting with an invalid email format', async () => {
		const testUser = user.setup();

		renderForm();

		await typeEmailAddress(testUser, 'not-an-email');
		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		expect(
			screen.getByText('Incorrect email format. Please check.'),
		).toBeInTheDocument();
		expect(global.fetch).not.toHaveBeenCalled();
	});

	it('clears the validation error as the user corrects their email', async () => {
		const testUser = user.setup();

		renderForm();

		await typeEmailAddress(testUser, 'not-an-email');
		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		expect(
			screen.getByText('Incorrect email format. Please check.'),
		).toBeInTheDocument();

		// Typing clears the error immediately
		await testUser.type(
			screen.getByLabelText('Enter your email', { exact: false }),
			'{Backspace}',
		);

		expect(
			screen.queryByText('Incorrect email format. Please check.'),
		).not.toBeInTheDocument();
	});

	it('shows failure UI with retry and supports hiding the privacy message', async () => {
		const testUser = user.setup();
		global.fetch = jest.fn().mockResolvedValue({ ok: false } as Response);

		renderForm(true);

		expect(screen.queryByText('Privacy Notice:')).not.toBeInTheDocument();
		await typeEmailAddress(testUser);
		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		await waitFor(() => {
			expect(screen.getByText(/Sign up failed\./)).toBeInTheDocument();
		});

		expectTrackedEventDescriptions([
			'click-button',
			'open-captcha',
			'captcha-passed',
			'form-submission',
			'submission-failed',
		]);

		await testUser.click(screen.getByRole('button', { name: 'Try again' }));

		expect(
			screen.getByRole('button', { name: 'Sign up' }),
		).toBeInTheDocument();
	});

	it('shows failure UI when reCAPTCHA returns a null token (expired/dismissed)', async () => {
		const testUser = user.setup();
		mockRecaptcha((_handle, props) => props.onChange?.(null));

		renderForm();

		await typeEmailAddress(testUser);
		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		await waitFor(() => {
			expect(
				screen.getByText(/The reCAPTCHA check did not complete\./),
			).toBeInTheDocument();
		});

		// Form is replaced by the failure box — the email input is not visible.
		expect(screen.queryByLabelText('Enter your email')).not.toBeVisible();
		expect(global.fetch).not.toHaveBeenCalled();

		expectTrackedEventDescriptions([
			'click-button',
			'open-captcha',
			'captcha-not-passed',
		]);

		// "Try again" resets back to the form.
		await testUser.click(screen.getByRole('button', { name: 'Try again' }));
		expect(
			screen.getByRole('button', { name: 'Sign up' }),
		).toBeInTheDocument();
	});

	it('shows failure UI when reCAPTCHA fires its onError callback', async () => {
		const testUser = user.setup();
		mockRecaptcha((_handle, props) => props.onError?.());

		renderForm();

		await typeEmailAddress(testUser);
		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));

		await waitFor(() => {
			expect(
				screen.getByText(/the reCAPTCHA failed to load\./),
			).toBeInTheDocument();
		});

		expect(screen.queryByLabelText('Enter your email')).not.toBeVisible();
		expect(global.fetch).not.toHaveBeenCalled();

		expectTrackedEventDescriptions([
			'click-button',
			'open-captcha',
			'captcha-load-error',
		]);

		await testUser.click(screen.getByRole('button', { name: 'Try again' }));

		expect(
			screen.getByRole('button', { name: 'Sign up' }),
		).toBeInTheDocument();
	});
});
