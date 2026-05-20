import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { forwardRef, useImperativeHandle } from 'react';
import { sendNewsletterSignupEvent } from '../lib/newsletterSignupTracking';
import { useAuthStatus, useIsSignedIn } from '../lib/useAuthStatus';
import { useBrowserId } from '../lib/useBrowserId';
import { useCountryCode } from '../lib/useCountryCode';
import { ConfigProvider } from './ConfigContext';
import { SecureSignup } from './SecureSignup.island';

jest.mock('../lib/useAuthStatus', () => ({
	useAuthStatus: jest.fn(),
	useIsSignedIn: jest.fn(),
}));

jest.mock('../lib/useBrowserId', () => ({
	useBrowserId: jest.fn(),
}));

jest.mock('../lib/useCountryCode', () => ({
	useCountryCode: jest.fn(),
}));

jest.mock('../lib/fetchEmail', () => ({
	lazyFetchEmailWithTimeout: jest.fn(() => () => Promise.resolve(null)),
}));

jest.mock('../lib/newsletterSignupTracking', () => ({
	EVENT_DESCRIPTION_TO_ACTION: {},
	NEWSLETTER_SIGNUP_COMPONENT_ID: { control: () => 'test-id' },
	sendNewsletterSignupEvent: jest.fn(),
}));

type RecaptchaProps = {
	// eslint-disable-next-line react/no-unused-prop-types -- false positive
	onChange?: (token: string | null) => void;
	// eslint-disable-next-line react/no-unused-prop-types -- false positive
	onError?: () => void;
};
type RecaptchaHandle = { execute: () => void; reset: () => void };

// The default mock resolves the captcha immediately with a valid token.
let recaptchaBehaviour: (
	handle: RecaptchaHandle,
	props: RecaptchaProps,
) => void = (_handle, props) => props.onChange?.('test-recaptcha-token');

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

const secureSignupElement = () => (
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
			successDescription="You'll receive Morning Briefing every weekday."
		/>
	</ConfigProvider>
);

const renderSecureSignup = () => render(secureSignupElement());

const getRequestBodyParams = (callIndex = 0): URLSearchParams => {
	const [, requestInit] = (global.fetch as jest.Mock).mock.calls[
		callIndex
	] as [string, RequestInit];
	// eslint-disable-next-line @typescript-eslint/no-base-to-string -- just a test
	return new URLSearchParams(requestInit.body?.toString() ?? '');
};

const getTrackingPayloadForEvent = (eventDescription: string) => {
	const trackingCalls = (sendNewsletterSignupEvent as jest.Mock).mock
		.calls as Array<
		[
			{
				value: {
					eventDescription: string;
					marketingOptInType?: string;
				};
			},
		]
	>;

	for (const [payload] of trackingCalls) {
		if (payload.value.eventDescription === eventDescription) {
			return payload.value;
		}
	}

	return undefined;
};

describe('SecureSignup — US marketing toggle hiding', () => {
	const pageConfig = window.guardian.config
		.page as typeof window.guardian.config.page & {
		ajaxUrl?: string;
		idApiUrl?: string;
		googleRecaptchaSiteKey?: string;
	};

	beforeEach(() => {
		jest.clearAllMocks();

		recaptchaBehaviour = (_handle, props) =>
			props.onChange?.('test-recaptcha-token');

		(useIsSignedIn as jest.Mock).mockReturnValue(false);
		(useAuthStatus as jest.Mock).mockReturnValue({ kind: 'SignedOut' });
		(useBrowserId as jest.Mock).mockReturnValue('test-browser-id');
		(useCountryCode as jest.Mock).mockReturnValue(undefined);

		pageConfig.ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';
		pageConfig.idApiUrl = 'https://idapi.nextgen.guardianapps.co.uk';
		pageConfig.googleRecaptchaSiteKey = 'test-site-key';
		window.guardian.config.switches['us-signup-hide-marketing-toggle'] =
			false;
		if (window.guardian.ophan) {
			window.guardian.ophan.pageViewId = 'test-page-view-id';
		}
		global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
	});

	// captchaSiteKey is set in a useEffect — wait for the reCAPTCHA widget
	// to mount before typing and submitting.
	const typeEmailAndSubmit = async (
		testUser: ReturnType<typeof user.setup>,
	) => {
		await waitFor(() =>
			expect(
				screen.getByRole('button', { name: 'Sign up' }),
			).toBeInTheDocument(),
		);
		await testUser.type(
			screen.getByLabelText('Enter your email address'),
			'reader@example.com',
		);
		await testUser.click(screen.getByRole('button', { name: 'Sign up' }));
	};

	describe('US hide marketing toggle (us-signup-hide-marketing-toggle switch)', () => {
		beforeEach(() => {
			window.guardian.config.switches['us-signup-hide-marketing-toggle'] =
				true;
		});

		it('switch on + US + signed out: hides marketing checkbox, sends marketing=true and marketingOptInHidden=true', async () => {
			(useCountryCode as jest.Mock).mockReturnValue('US');
			const testUser = user.setup();

			renderSecureSignup();

			expect(
				screen.queryByLabelText(
					'Get updates about our journalism and ways to support and enjoy our work.',
				),
			).not.toBeInTheDocument();

			await typeEmailAndSubmit(testUser);
			await waitFor(() => {
				expect(global.fetch).toHaveBeenCalled();
			});

			const params = getRequestBodyParams();
			expect(params.get('marketing')).toBe('true');
			expect(params.get('marketingOptInHidden')).toBe('true');
			expect(
				getTrackingPayloadForEvent('form-submission')
					?.marketingOptInType,
			).toBe('similar-guardian-products-optin-hidden-us');
			expect(
				getTrackingPayloadForEvent('submission-confirmed')
					?.marketingOptInType,
			).toBe('similar-guardian-products-optin-hidden-us');
		});

		it('switch on + non-US + signed out: shows marketing checkbox, no marketingOptInHidden', async () => {
			(useCountryCode as jest.Mock).mockReturnValue('GB');
			const testUser = user.setup();

			renderSecureSignup();

			expect(
				screen.getByLabelText(
					'Get updates about our journalism and ways to support and enjoy our work.',
				),
			).toBeInTheDocument();

			await typeEmailAndSubmit(testUser);
			await waitFor(() => {
				expect(global.fetch).toHaveBeenCalled();
			});

			expect(
				getRequestBodyParams().get('marketingOptInHidden'),
			).toBeNull();
		});

		it('switch on + pending country (undefined) + signed out: shows marketing checkbox', () => {
			(useCountryCode as jest.Mock).mockReturnValue(undefined);
			renderSecureSignup();

			expect(
				screen.getByLabelText(
					'Get updates about our journalism and ways to support and enjoy our work.',
				),
			).toBeInTheDocument();
		});

		it('switch on + US + signed in: checkbox hidden by signed-in, no marketingOptInHidden', async () => {
			(useCountryCode as jest.Mock).mockReturnValue('US');
			(useIsSignedIn as jest.Mock).mockReturnValue(true);
			(useAuthStatus as jest.Mock).mockReturnValue({ kind: 'SignedIn' });
			const testUser = user.setup();

			renderSecureSignup();

			expect(
				screen.queryByLabelText(
					'Get updates about our journalism and ways to support and enjoy our work.',
				),
			).not.toBeInTheDocument();

			await typeEmailAndSubmit(testUser);
			await waitFor(() => {
				expect(global.fetch).toHaveBeenCalled();
			});

			expect(
				getRequestBodyParams().get('marketingOptInHidden'),
			).toBeNull();
			expect(
				getTrackingPayloadForEvent('form-submission')
					?.marketingOptInType,
			).toBeUndefined();
			expect(
				getTrackingPayloadForEvent('submission-confirmed')
					?.marketingOptInType,
			).toBeUndefined();
		});

		it('switch off + US + signed out: shows marketing checkbox', () => {
			window.guardian.config.switches['us-signup-hide-marketing-toggle'] =
				false;
			(useCountryCode as jest.Mock).mockReturnValue('US');
			renderSecureSignup();

			expect(
				screen.getByLabelText(
					'Get updates about our journalism and ways to support and enjoy our work.',
				),
			).toBeInTheDocument();
		});
	});
});
