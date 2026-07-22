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
		highlightsModal: (id: string) => `highlights-modal-${id}`,
	},
}));

const renderHighlights = (
	trailList: React.ComponentProps<typeof ScrollableHighlights>['trails'],
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
			<ScrollableHighlights trails={trailList} />
		</ConfigProvider>,
	);

/** A signup card where newsletterData is missing — should be hidden. */
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

describe('ScrollableHighlights', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the HighlightsNewsletterCard for a newsletter signup trail', () => {
		renderHighlights([newsletterSignupCard]);

		expect(
			screen.getByRole('link', {
				name: newsletterSignupCard.headline,
			}),
		).toBeInTheDocument();
	});

	it('does not render a newsletter signup card when newsletterData is missing', () => {
		renderHighlights([newsletterSignupCardWithoutData]);

		expect(
			screen.queryByRole('link', {
				name: newsletterSignupCardWithoutData.headline,
			}),
		).not.toBeInTheDocument();
	});

	it('renders a newsletter-tagged article (isNewsletter) even when newsletterData is missing', () => {
		renderHighlights([newsletterTaggedArticle]);

		expect(
			screen.getByRole('link', {
				name: newsletterTaggedArticle.headline,
			}),
		).toBeInTheDocument();
	});

	it('still renders regular cards alongside the newsletter card', () => {
		renderHighlights([newsletterSignupCard, defaultCard]);

		expect(
			screen.getByRole('link', {
				name: newsletterSignupCard.headline,
			}),
		).toBeInTheDocument();
		expect(screen.getByText(defaultCard.headline)).toBeInTheDocument();
	});

	it('renders all regular trails correctly', () => {
		renderHighlights(trails.slice(0, 3));

		expect(screen.getByText(trails[0]!.headline)).toBeInTheDocument();
		expect(screen.getByText(trails[1]!.headline)).toBeInTheDocument();
		expect(screen.getByText(trails[2]!.headline)).toBeInTheDocument();
	});
});
