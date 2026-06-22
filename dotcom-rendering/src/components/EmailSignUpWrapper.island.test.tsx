import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { NEWSLETTER_SIGNUP_COMPONENT_ID } from '../lib/newsletterSignupTracking';
import { useIsSignedIn } from '../lib/useAuthStatus';
import { ConfigProvider } from './ConfigContext';
import { EmailSignUpWrapper } from './EmailSignUpWrapper.island';

jest.mock('../client/ophan/ophan', () => ({
	submitComponentEvent: jest.fn(() => Promise.resolve()),
}));

jest.mock('../lib/useAuthStatus', () => ({
	useIsSignedIn: jest.fn(),
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

const defaultProps = {
	index: 0,
	identityName: 'the-recap',
	name: 'The Recap',
	description: 'A weekly sports roundup',
	frequency: 'Weekly',
	theme: 'sport',
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
	});
});
