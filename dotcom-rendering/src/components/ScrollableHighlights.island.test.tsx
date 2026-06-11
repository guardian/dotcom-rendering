import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
	defaultCard,
	newsletterSignupCard,
	trails,
} from '../../fixtures/manual/highlights-trails';
import { ConfigProvider } from './ConfigContext';
import { ScrollableHighlights } from './ScrollableHighlights.island';

jest.mock('../lib/newsletterSignupTracking', () => ({
	sendNewsletterSignupEvent: jest.fn(),
	NEWSLETTER_SIGNUP_COMPONENT_ID: {
		highlightsCard: (id: string) => `highlights-card-${id}`,
	},
}));

const renderHighlights = (
	trailList: React.ComponentProps<typeof ScrollableHighlights>['trails'],
	isNewsletterSignupCardEnabled: boolean,
) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<ScrollableHighlights
				trails={trailList}
				isNewsletterSignupCardEnabled={isNewsletterSignupCardEnabled}
			/>
		</ConfigProvider>,
	);

/** A signup card where newsletterData is missing — should still be hidden when the switch is off. */
const newsletterSignupCardWithoutData = {
	...newsletterSignupCard,
	newsletterData: undefined,
};

/** An article tagged with a newsletter topic but NOT a signup card — should always be shown. */
const newsletterTaggedArticle = {
	...newsletterSignupCard,
	isNewsletter: true,
	isNewsletterSignup: false,
	newsletterData: undefined,
};

describe('ScrollableHighlights — newsletter card AB test', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('when user is in the "enable" group', () => {
		it('renders the HighlightsNewsletterCard for a newsletter trail', () => {
			renderHighlights([newsletterSignupCard], true);

			expect(
				screen.getByRole('link', {
					name: newsletterSignupCard.headline,
				}),
			).toBeInTheDocument();
		});

		it('does not render a newsletter signup card when newsletterData is missing', () => {
			renderHighlights([newsletterSignupCardWithoutData], true);

			expect(
				screen.queryByRole('link', {
					name: newsletterSignupCardWithoutData.headline,
				}),
			).not.toBeInTheDocument();
		});

		it('renders a newsletter-tagged article (isNewsletter) even when newsletterData is missing', () => {
			renderHighlights([newsletterTaggedArticle], true);

			expect(
				screen.getByRole('link', {
					name: newsletterTaggedArticle.headline,
				}),
			).toBeInTheDocument();
		});

		it('still renders regular cards alongside the newsletter card', () => {
			renderHighlights([newsletterSignupCard, defaultCard], true);

			expect(
				screen.getByRole('link', {
					name: `${newsletterSignupCard.headline}`,
				}),
			).toBeInTheDocument();
			expect(screen.getByText(defaultCard.headline)).toBeInTheDocument();
		});
	});

	describe('when user is NOT in the "enable" group', () => {
		it('does not render a newsletter signup card when newsletterData is missing', () => {
			renderHighlights([newsletterSignupCardWithoutData], false);

			expect(
				screen.queryByRole('link', {
					name: newsletterSignupCardWithoutData.headline,
				}),
			).not.toBeInTheDocument();
		});

		it('renders a newsletter-tagged article (isNewsletter) even when newsletterData is missing', () => {
			renderHighlights([newsletterTaggedArticle], false);

			expect(
				screen.getByRole('link', {
					name: newsletterTaggedArticle.headline,
				}),
			).toBeInTheDocument();
		});

		it('does not render a newsletter card at all', () => {
			renderHighlights([newsletterSignupCard], false);

			expect(
				screen.queryByRole('link', {
					name: newsletterSignupCard.headline,
				}),
			).not.toBeInTheDocument();

			expect(
				screen.queryByText('Free newsletter'),
			).not.toBeInTheDocument();
		});

		it('does not render a newsletter trail when newsletterData is missing', () => {
			renderHighlights([newsletterSignupCardWithoutData], false);

			expect(
				screen.queryByRole('link', {
					name: newsletterSignupCardWithoutData.headline,
				}),
			).not.toBeInTheDocument();
			expect(
				screen.queryByText('Free newsletter'),
			).not.toBeInTheDocument();
		});

		it('still renders non-newsletter cards normally', () => {
			renderHighlights([newsletterSignupCard, defaultCard], false);

			expect(screen.getByText(defaultCard.headline)).toBeInTheDocument();
		});

		it('renders all regular trails unaffected', () => {
			renderHighlights(trails.slice(0, 3), false);

			expect(screen.getByText(trails[0]!.headline)).toBeInTheDocument();
			expect(screen.getByText(trails[1]!.headline)).toBeInTheDocument();
			expect(screen.getByText(trails[2]!.headline)).toBeInTheDocument();
		});
	});
});
