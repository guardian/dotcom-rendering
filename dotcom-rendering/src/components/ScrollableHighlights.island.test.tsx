import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
	defaultCard,
	newsletterCard,
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

const newsletterCardWithoutData = {
	...newsletterCard,
	newsletterData: undefined,
};

describe('ScrollableHighlights — newsletter card AB test', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('when user is in the "enable" group', () => {
		it('renders the HighlightsNewsletterCard for a newsletter trail', () => {
			renderHighlights([newsletterCard], true);

			expect(
				screen.getByRole('link', {
					name: newsletterCard.headline,
				}),
			).toBeInTheDocument();
		});

		it('does not render a newsletter card when newsletterData is missing', () => {
			renderHighlights([newsletterCardWithoutData], true);

			expect(
				screen.queryByRole('link', {
					name: newsletterCardWithoutData.headline,
				}),
			).not.toBeInTheDocument();
		});

		it('still renders regular cards alongside the newsletter card', () => {
			renderHighlights([newsletterCard, defaultCard], true);

			expect(
				screen.getByRole('link', {
					name: `${newsletterCard.headline}`,
				}),
			).toBeInTheDocument();
			expect(screen.getByText(defaultCard.headline)).toBeInTheDocument();
		});
	});

	describe('when user is NOT in the "enable" group', () => {
		it('does not render a newsletter card when newsletterData is missing', () => {
			renderHighlights([newsletterCardWithoutData], false);

			expect(
				screen.queryByRole('link', {
					name: newsletterCardWithoutData.headline,
				}),
			).not.toBeInTheDocument();
		});

		it('does not render a newsletter card at all', () => {
			renderHighlights([newsletterCard], false);

			expect(
				screen.queryByRole('link', {
					name: newsletterCard.headline,
				}),
			).not.toBeInTheDocument();

			expect(
				screen.queryByText('Free newsletter'),
			).not.toBeInTheDocument();
		});

		it('does not render a newsletter trail when newsletterData is missing', () => {
			renderHighlights([newsletterCardWithoutData], false);

			expect(
				screen.queryByRole('link', {
					name: newsletterCardWithoutData.headline,
				}),
			).not.toBeInTheDocument();
			expect(
				screen.queryByText('Free newsletter'),
			).not.toBeInTheDocument();
		});

		it('still renders non-newsletter cards normally', () => {
			renderHighlights([newsletterCard, defaultCard], false);

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
