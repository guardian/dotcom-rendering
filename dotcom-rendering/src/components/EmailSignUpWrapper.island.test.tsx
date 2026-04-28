import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { submitComponentEvent } from '../client/ophan/ophan';
import {
	AB_TEST_NAME,
	NEWSLETTER_SIGNUP_COMPONENT_ID,
} from '../lib/newsletterSignupTracking';
import { useBetaAB } from '../lib/useAB';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import { ConfigProvider } from './ConfigContext';
import { EmailSignUpWrapper } from './EmailSignUpWrapper.island';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(() => Promise.resolve()),
}));

jest.mock('../lib/useAB', () => ({
	useBetaAB: jest.fn(),
}));

jest.mock('../lib/useAuthStatus', () => ({
	useIsSignedIn: jest.fn(),
}));

jest.mock('../lib/useNewsletterSubscription', () => ({
	useNewsletterSubscription: jest.fn(),
}));

// Avoid rendering real island children in unit tests
jest.mock('./Island', () => ({
	Island: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('./NewsletterSignupForm.island', () => ({
	NewsletterSignupForm: () => (
		<div data-testid="newsletter-signup-form">NewsletterSignupForm</div>
	),
}));

jest.mock('./SecureSignup.island', () => ({
	SecureSignup: () => <div data-testid="secure-signup">SecureSignup</div>,
}));

jest.mock('./NewsletterSignupCardContainer', () => ({
	NewsletterSignupCardContainer: ({
		children,
	}: {
		children: (openPreview: (() => void) | undefined) => React.ReactNode;
	}) => (
		<div data-testid="newsletter-signup-card-container">
			{children(undefined)}
		</div>
	),
}));

jest.mock('./EmailSignup', () => ({
	EmailSignup: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="email-signup">{children}</div>
	),
}));

const defaultProps = {
	index: 0,
	listId: 4147,
	identityName: 'the-recap',
	name: 'The Recap',
	description: 'A weekly sports roundup',
	frequency: 'Weekly',
	successDescription: "We'll send you The Recap every week",
	theme: 'sport',
	idApiUrl: 'https://idapi.theguardian.com',
};

const renderWrapper = (props = {}) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<EmailSignUpWrapper {...defaultProps} {...props} />
		</ConfigProvider>,
	);

const mockAbTests = (isInVariant: boolean) => {
	(useBetaAB as jest.Mock).mockReturnValue({
		isUserInTestGroup: (_testName: string, group: string) =>
			group === 'variant' ? isInVariant : !isInVariant,
	});
};

describe('EmailSignUpWrapper', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		// Default: AB API not yet hydrated
		(useBetaAB as jest.Mock).mockReturnValue(undefined);
		(useIsSignedIn as jest.Mock).mockReturnValue(false);
		(useNewsletterSubscription as jest.Mock).mockReturnValue(false);
	});

	describe('flag off (showNewNewsletterSignupCard = false)', () => {
		it('shows a placeholder while subscription status is loading', () => {
			(useNewsletterSubscription as jest.Mock).mockReturnValue(undefined);
			renderWrapper();
			// The Placeholder component renders a div with specific heights
			expect(
				screen.queryByTestId('email-signup'),
			).not.toBeInTheDocument();
			expect(
				screen.queryByTestId('newsletter-signup-card-container'),
			).not.toBeInTheDocument();
		});

		it('renders nothing when the user is already subscribed', () => {
			mockAbTests(false);
			(useNewsletterSubscription as jest.Mock).mockReturnValue(true);
			const { container } = renderWrapper({
				hideNewsletterSignupComponentForSubscribers: true,
			});
			expect(container).toBeEmptyDOMElement();
		});

		it('renders the legacy EmailSignup when the user is not subscribed', () => {
			mockAbTests(false);
			renderWrapper();
			expect(screen.getByTestId('email-signup')).toBeInTheDocument();
			expect(screen.getByTestId('secure-signup')).toBeInTheDocument();
			expect(
				screen.queryByTestId('newsletter-signup-card-container'),
			).not.toBeInTheDocument();
		});
	});

	describe('flag on (showNewNewsletterSignupCard = true)', () => {
		it('shows a placeholder when AB API has not hydrated yet', () => {
			// useBetaAB returns undefined before hydration — component shows
			// Placeholder rather than committing to control or variant early.
			// (default set in outer beforeEach, no override needed)
			renderWrapper({ showNewNewsletterSignupCard: true });
			expect(
				screen.queryByTestId('email-signup'),
			).not.toBeInTheDocument();
			expect(
				screen.queryByTestId('newsletter-signup-card-container'),
			).not.toBeInTheDocument();
		});

		it('renders the legacy EmailSignup for users in the control group', () => {
			mockAbTests(false);
			renderWrapper({ showNewNewsletterSignupCard: true });
			expect(screen.getByTestId('email-signup')).toBeInTheDocument();
			expect(
				screen.queryByTestId('newsletter-signup-card-container'),
			).not.toBeInTheDocument();
		});

		it('renders NewsletterSignupCardContainer for users in the variant group', () => {
			mockAbTests(true);
			renderWrapper({ showNewNewsletterSignupCard: true });
			expect(
				screen.getByTestId('newsletter-signup-card-container'),
			).toBeInTheDocument();
			expect(
				screen.getByTestId('newsletter-signup-form'),
			).toBeInTheDocument();
			expect(
				screen.queryByTestId('email-signup'),
			).not.toBeInTheDocument();
		});

		it('does not hide the variant for already-subscribed users (subscription handled inside the card)', () => {
			mockAbTests(true);
			(useNewsletterSubscription as jest.Mock).mockReturnValue(true);
			renderWrapper({
				showNewNewsletterSignupCard: true,
				hideNewsletterSignupComponentForSubscribers: true,
			});
			expect(
				screen.getByTestId('newsletter-signup-card-container'),
			).toBeInTheDocument();
		});
	});

	describe('VIEW tracking', () => {
		it('fires a VIEW event with the correct control component id and ab metadata', () => {
			mockAbTests(false);
			renderWrapper({ showNewNewsletterSignupCard: true });

			expect(submitComponentEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					component: {
						componentType: 'NEWSLETTER_SUBSCRIPTION',
						id: NEWSLETTER_SIGNUP_COMPONENT_ID.control(
							defaultProps.identityName,
						),
					},
					action: 'VIEW',
					abTest: { name: AB_TEST_NAME, variant: 'control' },
				}),
				'Web',
			);
		});

		it('fires a VIEW event with the correct variant component id and ab metadata', () => {
			mockAbTests(true);
			renderWrapper({ showNewNewsletterSignupCard: true });

			expect(submitComponentEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					component: {
						componentType: 'NEWSLETTER_SUBSCRIPTION',
						id: NEWSLETTER_SIGNUP_COMPONENT_ID.variant(
							defaultProps.identityName,
						),
					},
					action: 'VIEW',
					abTest: { name: AB_TEST_NAME, variant: 'variant' },
				}),
				'Web',
			);
		});

		it('fires a VIEW event with the control component id when the flag is off', () => {
			mockAbTests(false);
			renderWrapper({ showNewNewsletterSignupCard: false });

			expect(submitComponentEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					component: expect.objectContaining({
						id: NEWSLETTER_SIGNUP_COMPONENT_ID.control(
							defaultProps.identityName,
						),
					}),
					action: 'VIEW',
				}),
				'Web',
			);
		});

		it('fires the VIEW event exactly once on mount', () => {
			mockAbTests(false);
			renderWrapper({ showNewNewsletterSignupCard: true });

			expect(submitComponentEvent).toHaveBeenCalledTimes(1);
		});

		it('does not fire a VIEW event while subscription status is loading', () => {
			mockAbTests(false);
			(useNewsletterSubscription as jest.Mock).mockReturnValue(undefined);
			renderWrapper({ showNewNewsletterSignupCard: true });

			expect(submitComponentEvent).not.toHaveBeenCalled();
		});

		it('does not fire a VIEW event while the AB client has not hydrated', () => {
			// useBetaAB returns undefined — default set in beforeEach
			renderWrapper({ showNewNewsletterSignupCard: true });

			expect(submitComponentEvent).not.toHaveBeenCalled();
		});

		it('does not fire a VIEW event for control users who are already subscribed', () => {
			mockAbTests(false);
			(useNewsletterSubscription as jest.Mock).mockReturnValue(true);
			renderWrapper({
				showNewNewsletterSignupCard: true,
				hideNewsletterSignupComponentForSubscribers: true,
			});

			expect(submitComponentEvent).not.toHaveBeenCalled();
		});

		it('does not fire a VIEW event for variant users who are already subscribed', () => {
			mockAbTests(true);
			(useNewsletterSubscription as jest.Mock).mockReturnValue(true);
			renderWrapper({
				showNewNewsletterSignupCard: true,
				hideNewsletterSignupComponentForSubscribers: true,
			});

			expect(submitComponentEvent).not.toHaveBeenCalled();
		});
	});
});
