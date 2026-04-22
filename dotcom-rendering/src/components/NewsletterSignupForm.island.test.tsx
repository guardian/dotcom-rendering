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

// Mock reCAPTCHA: immediately call onChange with a fake token when execute() is called.
jest.mock('react-google-recaptcha', () => ({
	__esModule: true,
	default: forwardRef<
		{ execute: () => void; reset: () => void },
		{ onChange?: (token: string) => void }
	>(function MockRecaptcha({ onChange }, ref) {
		useImperativeHandle(ref, () => ({
			execute: () => onChange?.('test-recaptcha-token'),
			reset: () => undefined,
		}));
		return null;
	}),
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

const getDecodedRequestBody = (callIndex = 0): string => {
	const [, requestInit] = (global.fetch as jest.Mock).mock.calls[
		callIndex
	] as [string, RequestInit];
	return decodeURIComponent(requestInit.body?.toString() ?? '');
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

		const decodedBody = getDecodedRequestBody();

		expect(decodedBody).toContain('email=reader@example.com');
		expect(decodedBody).toContain('listName=morning-briefing');
		expect(decodedBody).toContain('marketing=true');
		expect(decodedBody).toContain('browserId=test-browser-id');

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

		const signUpButton = screen.queryByRole('button', { name: 'Sign up' });
		if (signUpButton) {
			await testUser.click(signUpButton);
		}

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalled();
		});

		const decodedBody = getDecodedRequestBody();
		expect(decodedBody).toContain('marketing=false');
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

		const decodedBody = getDecodedRequestBody();
		expect(decodedBody).toContain('marketing=false');
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

		const decodedBody = getDecodedRequestBody();
		expect(decodedBody).toContain('email=signed.in@example.com');
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
});
