import { render, screen as rtlScreen, waitFor } from '@testing-library/react';
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
			<ManyNewsletterSignUp useReCaptcha={false} />
		</ConfigProvider>,
	);

/**
 * Adds a fake newsletter toggle button to the document body so that
 * ManyNewsletterSignUp can discover it via its DOM event listeners.
 * Must be added before renderComponent() so the useEffect attaches listeners.
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

		it('hides the marketing checkbox and passes marketing=true for US users', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('US');

			// Add button before render so the useEffect attaches the click listener
			const newsletterButton = addNewsletterButton(
				'morning-briefing',
				1234,
			);
			renderComponent();

			// Simulate the user selecting a newsletter via the toggle button
			await testUser.click(newsletterButton);

			// Wait for the form to become visible (count > 0 unhides it)
			await waitFor(() => {
				expect(
					rtlScreen.getByLabelText('Enter your email'),
				).toBeInTheDocument();
			});

			// Marketing checkbox should NOT be present for US hide marketing toggle
			expect(
				rtlScreen.queryByLabelText(/Get updates about our journalism/),
			).not.toBeInTheDocument();

			// Type email and submit
			await testUser.type(
				rtlScreen.getByLabelText('Enter your email'),
				'reader@example.com',
			);

			// Use the specific aria-label the component sets on the sign-up button
			await testUser.click(
				rtlScreen.getByRole('button', {
					name: 'Sign up for the newsletter you selected',
				}),
			);

			await waitFor(() => {
				expect(requestMultipleSignUps).toHaveBeenCalledWith({
					emailAddress: 'reader@example.com',
					newsletterIds: ['morning-briefing'],
					recaptchaToken: '',
					marketingOptIn: true, // hide marketing toggle forces marketing=true for US
					marketingOptInHidden: true,
					countryCode: 'US',
				});
			});
		});

		it('shows the marketing checkbox and respects opt-out for non-US users', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('GB');

			const newsletterButton = addNewsletterButton(
				'morning-briefing',
				1234,
			);
			renderComponent();

			await testUser.click(newsletterButton);

			await waitFor(() => {
				expect(
					rtlScreen.getByLabelText('Enter your email'),
				).toBeInTheDocument();
			});

			// Marketing checkbox SHOULD be visible for non-US users
			const marketingCheckbox = await rtlScreen.findByLabelText(
				/Get updates about our journalism/,
			);
			expect(marketingCheckbox).toBeInTheDocument();

			// Defaults to checked (true) for signed-out users — uncheck to opt out
			expect(marketingCheckbox).toBeChecked();
			await testUser.click(marketingCheckbox);
			expect(marketingCheckbox).not.toBeChecked();

			await testUser.type(
				rtlScreen.getByLabelText('Enter your email'),
				'reader@example.com',
			);

			await testUser.click(
				rtlScreen.getByRole('button', {
					name: 'Sign up for the newsletter you selected',
				}),
			);

			await waitFor(() => {
				expect(requestMultipleSignUps).toHaveBeenCalledWith({
					emailAddress: 'reader@example.com',
					newsletterIds: ['morning-briefing'],
					recaptchaToken: '',
					marketingOptIn: false, // user opted out
					marketingOptInHidden: undefined,
					countryCode: undefined,
				});
			});
		});

		it('sends similar-guardian-products-hidden-optin-us tracking for US users', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('US');

			const newsletterButton = addNewsletterButton(
				'morning-briefing',
				1234,
			);
			renderComponent();
			await testUser.click(newsletterButton);

			await waitFor(() => {
				expect(
					rtlScreen.getByLabelText('Enter your email'),
				).toBeInTheDocument();
			});

			await testUser.type(
				rtlScreen.getByLabelText('Enter your email'),
				'reader@example.com',
			);
			await testUser.click(
				rtlScreen.getByRole('button', {
					name: 'Sign up for the newsletter you selected',
				}),
			);

			await waitFor(() => {
				expect(reportTrackingEvent).toHaveBeenCalledWith(
					'ManyNewsletterSignUp',
					'success-response',
					expect.anything(),
					expect.objectContaining({
						marketingOptInType:
							'similar-guardian-products-hidden-optin-us',
					}),
				);
			});
		});

		it('sends similar-guardian-products-optin tracking for non-US users who leave the toggle on', async () => {
			const testUser = user.setup();
			(useCountryCode as jest.Mock).mockReturnValue('GB');

			const newsletterButton = addNewsletterButton(
				'morning-briefing',
				1234,
			);
			renderComponent();
			await testUser.click(newsletterButton);

			await waitFor(() => {
				expect(
					rtlScreen.getByLabelText('Enter your email'),
				).toBeInTheDocument();
			});

			await testUser.type(
				rtlScreen.getByLabelText('Enter your email'),
				'reader@example.com',
			);
			await testUser.click(
				rtlScreen.getByRole('button', {
					name: 'Sign up for the newsletter you selected',
				}),
			);

			await waitFor(() => {
				expect(reportTrackingEvent).toHaveBeenCalledWith(
					'ManyNewsletterSignUp',
					'success-response',
					expect.anything(),
					expect.objectContaining({
						marketingOptInType: 'similar-guardian-products-optin',
					}),
				);
			});
		});
	});
});
