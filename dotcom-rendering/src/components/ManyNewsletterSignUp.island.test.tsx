import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import {
	reportTrackingEvent,
	requestMultipleSignUps,
} from '../lib/newsletter-sign-up-requests';
import { useAuthStatus, useIsSignedIn } from '../lib/useAuthStatus';
import { useCountryCode } from '../lib/useCountryCode';
import { ConfigProvider } from './ConfigContext';
import { ManyNewsletterSignUp } from './ManyNewsletterSignUp.island';
import { BUTTON_ROLE } from './NewsletterCard';

const NEWSLETTER_IDENTITY_NAME = 'morning-briefing';
const NEWSLETTER_LIST_ID = 1234;
const TEST_EMAIL = 'reader@example.com';
const SIGN_UP_BUTTON_NAME = 'Sign up for the newsletter you selected';

jest.mock('../lib/useAuthStatus', () => ({
	useAuthStatus: jest.fn().mockReturnValue({ kind: 'SignedOut' }),
	useIsSignedIn: jest.fn(),
}));

jest.mock('../lib/useCountryCode', () => ({
	useCountryCode: jest.fn(),
}));

jest.mock('../lib/newsletterSubscriptionCache', () => ({
	clearSubscriptionCache: jest.fn(),
}));

jest.mock('../lib/newsletter-sign-up-requests', () => ({
	reportTrackingEvent: jest.fn().mockResolvedValue(undefined),
	requestMultipleSignUps: jest.fn(),
}));

jest.mock('react-google-recaptcha', () => ({
	__esModule: true,
	default: jest.fn().mockImplementation(() => null),
}));

const renderSignupForm = () =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<ManyNewsletterSignUp useReCaptcha={false} />
		</ConfigProvider>,
	);

/**
 * Adds a fake newsletter toggle button to the document body so that
 * ManyNewsletterSignUp can discover it via its DOM event listeners.
 * Must be added before renderSignupForm() so the useEffect attaches listeners.
 */
const addNewsletterButton = (
	identityName: string,
	listId: number,
): HTMLButtonElement => {
	const button = document.createElement('button');
	button.setAttribute('data-role', BUTTON_ROLE);
	button.setAttribute('data-identity-name', identityName);
	button.setAttribute('data-list-id', String(listId));
	document.body.appendChild(button);
	return button;
};

const openSignupForm = async (
	testUser: ReturnType<typeof user.setup>,
): Promise<void> => {
	const newsletterButton = addNewsletterButton(
		NEWSLETTER_IDENTITY_NAME,
		NEWSLETTER_LIST_ID,
	);
	renderSignupForm();
	await testUser.click(newsletterButton);

	await waitFor(() => {
		expect(screen.getByLabelText('Enter your email')).toBeInTheDocument();
	});
};

const submitForm = async (
	testUser: ReturnType<typeof user.setup>,
	email = TEST_EMAIL,
): Promise<void> => {
	await testUser.type(screen.getByLabelText('Enter your email'), email);
	await testUser.click(
		screen.getByRole('button', { name: SIGN_UP_BUTTON_NAME }),
	);
};

describe('ManyNewsletterSignUp', () => {
	const pageConfig = window.guardian.config
		.page as typeof window.guardian.config.page & {
		ajaxUrl?: string;
	};

	beforeEach(() => {
		jest.clearAllMocks();

		(useIsSignedIn as jest.Mock).mockReturnValue(false);
		(useAuthStatus as jest.Mock).mockReturnValue({ kind: 'SignedOut' });
		(useCountryCode as jest.Mock).mockReturnValue(undefined);

		pageConfig.ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';
		window.guardian.config.switches['us-signup-hide-marketing-toggle'] =
			false;

		(requestMultipleSignUps as jest.Mock).mockResolvedValue({ ok: true });
	});

	afterEach(() => {
		for (const el of document.querySelectorAll(
			`[data-role=${BUTTON_ROLE}]`,
		)) {
			el.remove();
		}
	});

	describe('US hide marketing toggle (us-signup-hide-marketing-toggle switch)', () => {
		beforeEach(() => {
			window.guardian.config.switches['us-signup-hide-marketing-toggle'] =
				true;
		});

		it('switch on + US + signed out: hides marketing checkbox, sends marketingOptInHidden=true', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('US');
			await openSignupForm(testUser);

			expect(
				screen.queryByLabelText(/Get updates about our journalism/),
			).not.toBeInTheDocument();

			await submitForm(testUser);

			await waitFor(() => {
				expect(requestMultipleSignUps).toHaveBeenCalledWith(
					TEST_EMAIL,
					[NEWSLETTER_IDENTITY_NAME],
					'',
					true,
					true,
				);
			});
		});

		it('switch on + US + signed out: tracking uses similar-guardian-products-optin-hidden-us', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('US');
			await openSignupForm(testUser);
			await submitForm(testUser);

			await waitFor(() => {
				expect(reportTrackingEvent).toHaveBeenCalledWith(
					'ManyNewsletterSignUp',
					'success-response',
					expect.anything(),
					expect.objectContaining({
						marketingOptInType:
							'similar-guardian-products-optin-hidden-us',
					}),
				);
			});
		});

		it('switch on + non-US + signed out: shows checkbox, no marketingOptInHidden', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('GB');
			await openSignupForm(testUser);

			expect(
				await screen.findByLabelText(
					/Get updates about our journalism/,
				),
			).toBeInTheDocument();

			await submitForm(testUser);

			await waitFor(() => {
				expect(requestMultipleSignUps).toHaveBeenCalledWith(
					TEST_EMAIL,
					[NEWSLETTER_IDENTITY_NAME],
					'',
					true,
					undefined,
				);
			});
		});

		it('switch on + pending country (undefined) + signed out: shows checkbox', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue(undefined);
			await openSignupForm(testUser);

			expect(
				await screen.findByLabelText(
					/Get updates about our journalism/,
				),
			).toBeInTheDocument();
		});

		it('switch on + US + signed in: checkbox not shown (signed-in), no marketingOptInHidden', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('US');
			(useIsSignedIn as jest.Mock).mockReturnValue(true);
			(useAuthStatus as jest.Mock).mockReturnValue({ kind: 'SignedIn' });
			await openSignupForm(testUser);

			expect(
				screen.queryByLabelText(/Get updates about our journalism/),
			).not.toBeInTheDocument();

			await submitForm(testUser);

			await waitFor(() => {
				expect(requestMultipleSignUps).toHaveBeenCalledWith(
					TEST_EMAIL,
					[NEWSLETTER_IDENTITY_NAME],
					'',
					undefined,
					undefined,
				);
			});
		});

		it('switch off + US + signed out: shows checkbox', async () => {
			window.guardian.config.switches['us-signup-hide-marketing-toggle'] =
				false;
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('US');
			await openSignupForm(testUser);

			expect(
				await screen.findByLabelText(
					/Get updates about our journalism/,
				),
			).toBeInTheDocument();
		});
	});
});
