import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { submitComponentEvent } from '../client/ophan/ophan';
import {
	NEWSLETTER_PREVIEW_AB_TEST_NAME,
	NEWSLETTER_PREVIEW_VARIANT,
} from '../lib/newsletterSignupAbTest';
import { NEWSLETTER_SIGNUP_COMPONENT_ID } from '../lib/newsletterSignupTracking';
import { useAB } from '../lib/useAB';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { useNewsletterSubscription } from '../lib/useNewsletterSubscription';
import { ConfigProvider } from './ConfigContext';
import { EmailSignUpWrapper } from './EmailSignUpWrapper.island';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(() => Promise.resolve()),
}));

jest.mock('../lib/useAuthStatus', () => ({
	useIsSignedIn: jest.fn(),
}));

jest.mock('../lib/useNewsletterSubscription', () => ({
	useNewsletterSubscription: jest.fn(),
}));

jest.mock('../lib/useAB', () => ({
	useAB: jest.fn(),
}));

// Avoid rendering real island children in unit tests
jest.mock('./Island', () => ({
	Island: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockNewsletterSignupForm = jest.fn();

jest.mock('./NewsletterSignupForm.island', () => ({
	NewsletterSignupForm: (props: unknown) => {
		mockNewsletterSignupForm(props);
		return (
			<div data-testid="newsletter-signup-form">NewsletterSignupForm</div>
		);
	},
}));

const mockNewsletterSignupCardContainer = jest.fn();

jest.mock('./NewsletterSignupCardContainer', () => ({
	NewsletterSignupCardContainer: ({
		children,
		...props
	}: {
		children: (openPreview: (() => void) | undefined) => React.ReactNode;
	}) => {
		mockNewsletterSignupCardContainer(props);
		return (
			<div data-testid="newsletter-signup-card-container">
				{children(undefined)}
			</div>
		);
	},
}));

const defaultProps = {
	index: 0,
	listId: 4147,
	identityName: 'the-recap',
	name: 'The Recap',
	description: 'A weekly sports roundup',
	frequency: 'Weekly',
	theme: 'sport',
	idApiUrl: 'https://idapi.theguardian.com',
};

const renderWrapper = (props = {}, renderingTarget: 'Web' | 'Apps' = 'Web') =>
	render(
		<ConfigProvider
			value={{
				renderingTarget,
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<EmailSignUpWrapper {...defaultProps} {...props} />
		</ConfigProvider>,
	);

describe('EmailSignUpWrapper', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		(useIsSignedIn as jest.Mock).mockReturnValue(false);
		(useNewsletterSubscription as jest.Mock).mockReturnValue(false);
		(useAB as jest.Mock).mockReturnValue({
			getParticipations: () => ({
				[NEWSLETTER_PREVIEW_AB_TEST_NAME]:
					NEWSLETTER_PREVIEW_VARIANT.illustrated,
			}),
		});
	});

	describe('rendering', () => {
		it('renders the NewsletterSignupCardContainer', () => {
			renderWrapper();
			expect(
				screen.getByTestId('newsletter-signup-card-container'),
			).toBeInTheDocument();
			expect(
				screen.getByTestId('newsletter-signup-form'),
			).toBeInTheDocument();
		});

		it('renders the NewsletterSignupCardContainer on Apps as well as Web', () => {
			renderWrapper({}, 'Apps');
			expect(
				screen.getByTestId('newsletter-signup-card-container'),
			).toBeInTheDocument();
		});

		it('still renders the card when the user is already subscribed', () => {
			(useNewsletterSubscription as jest.Mock).mockReturnValue(true);
			renderWrapper();
			expect(
				screen.getByTestId('newsletter-signup-card-container'),
			).toBeInTheDocument();
		});
	});

	describe('VIEW tracking', () => {
		it('fires a VIEW event with the in-article signup form component id', () => {
			renderWrapper();

			expect(submitComponentEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					component: {
						componentType: 'NEWSLETTER_SUBSCRIPTION',
						id: NEWSLETTER_SIGNUP_COMPONENT_ID.inArticleSignupForm(
							'the-recap',
						),
					},
					action: 'VIEW',
				}),
				'Web',
			);
		});

		it('fires the VIEW event exactly once on mount', () => {
			renderWrapper();

			expect(submitComponentEvent).toHaveBeenCalledTimes(1);
		});

		it('passes AB metadata and keeps preview enabled in the illustrated arm', () => {
			renderWrapper();

			expect(mockNewsletterSignupCardContainer).toHaveBeenCalledWith(
				expect.objectContaining({
					enablePreview: true,
					abTest: {
						name: NEWSLETTER_PREVIEW_AB_TEST_NAME,
						variant: NEWSLETTER_PREVIEW_VARIANT.illustrated,
					},
				}),
			);
			expect(mockNewsletterSignupForm).toHaveBeenCalledWith(
				expect.objectContaining({
					abTest: {
						name: NEWSLETTER_PREVIEW_AB_TEST_NAME,
						variant: NEWSLETTER_PREVIEW_VARIANT.illustrated,
					},
				}),
			);
			expect(submitComponentEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					abTest: {
						name: NEWSLETTER_PREVIEW_AB_TEST_NAME,
						variant: NEWSLETTER_PREVIEW_VARIANT.illustrated,
					},
				}),
				'Web',
			);
		});

		it('disables preview in the without-preview arm', () => {
			(useAB as jest.Mock).mockReturnValue({
				getParticipations: () => ({
					[NEWSLETTER_PREVIEW_AB_TEST_NAME]:
						NEWSLETTER_PREVIEW_VARIANT.withoutPreview,
				}),
			});

			renderWrapper();

			expect(mockNewsletterSignupCardContainer).toHaveBeenCalledWith(
				expect.objectContaining({
					enablePreview: false,
					abTest: {
						name: NEWSLETTER_PREVIEW_AB_TEST_NAME,
						variant: NEWSLETTER_PREVIEW_VARIANT.withoutPreview,
					},
				}),
			);
		});

		it('does not fire a VIEW event while subscription status is loading', () => {
			(useNewsletterSubscription as jest.Mock).mockReturnValue(undefined);
			renderWrapper();

			expect(submitComponentEvent).not.toHaveBeenCalled();
		});

		it('does not fire a VIEW event when the user is already subscribed', () => {
			(useNewsletterSubscription as jest.Mock).mockReturnValue(true);
			renderWrapper();

			expect(submitComponentEvent).not.toHaveBeenCalled();
		});

		it('still fires the VIEW event without AB metadata if the AB framework never resolves', () => {
			jest.useFakeTimers();

			try {
				(useAB as jest.Mock).mockReturnValue(undefined);

				renderWrapper();

				// The VIEW event is deferred while waiting for the AB framework.
				expect(submitComponentEvent).not.toHaveBeenCalled();

				jest.advanceTimersByTime(2000);

				expect(submitComponentEvent).toHaveBeenCalledTimes(1);
				expect(submitComponentEvent).toHaveBeenCalledWith(
					expect.objectContaining({
						action: 'VIEW',
						abTest: undefined,
					}),
					'Web',
				);
			} finally {
				jest.useRealTimers();
			}
		});
	});
});
