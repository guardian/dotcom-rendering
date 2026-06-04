import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import {
	defaultCard,
	newsletterCard,
	trails,
} from '../../fixtures/manual/highlights-trails';
import { useAB } from '../lib/useAB';
import { ConfigProvider } from './ConfigContext';
import { ScrollableHighlights } from './ScrollableHighlights.island';

jest.mock('../lib/useAB', () => ({
	useAB: jest.fn(),
}));

jest.mock('../lib/newsletterSignupTracking', () => ({
	sendNewsletterSignupEvent: jest.fn(),
	NEWSLETTER_SIGNUP_COMPONENT_ID: {
		highlightsCard: (id: string) => `highlights-card-${id}`,
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

const mockABEnabled = () => {
	(useAB as jest.Mock).mockReturnValue({
		isUserInTestGroup: (testName: string, group: string) =>
			testName === 'newsletters-highlights-signup-card' &&
			group === 'enable',
	});
};

const mockABDisabled = () => {
	(useAB as jest.Mock).mockReturnValue({
		isUserInTestGroup: () => false,
	});
};

describe('ScrollableHighlights — newsletter card AB test', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('when user is in the "enable" group', () => {
		beforeEach(() => {
			mockABEnabled();
		});

		it('renders the HighlightsNewsletterCard for a newsletter trail', () => {
			renderHighlights([newsletterCard]);

			expect(
				screen.getByRole('link', {
					name: newsletterCard.headline,
				}),
			).toBeInTheDocument();
		});

		it('renders the "Free newsletter" kicker for a newsletter trail', () => {
			renderHighlights([newsletterCard]);

			expect(screen.getByText('Free newsletter')).toBeInTheDocument();
		});

		it('still renders regular cards alongside the newsletter card', () => {
			renderHighlights([newsletterCard, defaultCard]);

			expect(
				screen.getByRole('link', {
					name: `${newsletterCard.headline}`,
				}),
			).toBeInTheDocument();
			expect(screen.getByText(defaultCard.headline)).toBeInTheDocument();
		});
	});

	describe('when user is NOT in the "enable" group', () => {
		beforeEach(() => {
			mockABDisabled();
		});

		it('does not render a newsletter card at all', () => {
			renderHighlights([newsletterCard]);

			expect(
				screen.queryByRole('link', {
					name: newsletterCard.headline,
				}),
			).not.toBeInTheDocument();

			expect(
				screen.queryByText('Free newsletter'),
			).not.toBeInTheDocument();
		});

		it('does not render the newsletter trail as a regular card either', () => {
			renderHighlights([newsletterCard]);

			// The card should be completely absent — no headline rendered
			expect(
				screen.queryByText(newsletterCard.headline),
			).not.toBeInTheDocument();
		});

		it('still renders non-newsletter cards normally', () => {
			renderHighlights([newsletterCard, defaultCard]);

			expect(screen.getByText(defaultCard.headline)).toBeInTheDocument();
		});

		it('renders all regular trails unaffected', () => {
			renderHighlights(trails.slice(0, 3));

			expect(screen.getByText(trails[0]!.headline)).toBeInTheDocument();
			expect(screen.getByText(trails[1]!.headline)).toBeInTheDocument();
			expect(screen.getByText(trails[2]!.headline)).toBeInTheDocument();
		});
	});
});
