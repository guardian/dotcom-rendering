import { render, screen } from '@testing-library/react';
import { isPlacementStale } from '../lib/braze/BrazeBannersSystem';
import type { BrazeInstance } from '../lib/braze/initialiseBraze';
import { useAB } from '../lib/useAB';
import { useBraze } from '../lib/useBraze';
import type { RecipeBlockElement } from '../types/content';
import { ConfigProvider } from './ConfigContext';
import { FeastContextualNudge } from './FeastContextualNudge.island';

jest.mock('../lib/useAB');
jest.mock('../lib/useBraze');
jest.mock('../lib/braze/BrazeBannersSystem', () => ({
	BrazeBannersSystemPlacementId: {
		FeastContextualNudge1: 'dotcom-rendering_feast-contextual-nudge-1',
		FeastContextualNudge2: 'dotcom-rendering_feast-contextual-nudge-2',
		FeastContextualNudge3: 'dotcom-rendering_feast-contextual-nudge-3',
		FeastContextualNudge4: 'dotcom-rendering_feast-contextual-nudge-4',
		FeastContextualNudge5: 'dotcom-rendering_feast-contextual-nudge-5',
	},
	isPlacementStale: jest.fn(),
	BrazeBannersSystemDisplay: ({ meta }: { meta: { id: string } }) => (
		<div data-testid="braze-feast-banner" data-banner-id={meta.id} />
	),
}));

const recipe: RecipeBlockElement = {
	_type: 'model.dotcomrendering.pageElements.RecipeBlockElement',
	id: 'recipe-id',
	title: 'Test recipe',
};

const braze = {
	getBanner: jest.fn(),
} as unknown as BrazeInstance;

const renderNudge = (idApiUrl: string | undefined) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<FeastContextualNudge
				recipe={recipe}
				recipeArticleTitle="Fallback title"
				pageId="food/test"
				isDev={false}
				nudgeIndex={1}
				idApiUrl={idApiUrl}
			/>
		</ConfigProvider>,
	);

describe('FeastContextualNudge Braze fallback', () => {
	beforeEach(() => {
		jest.mocked(useAB).mockReturnValue({
			isUserInTestGroup: () => true,
			isUserInTest: () => true,
			getParticipations: () => ({}),
			trackABTests: () => ({}),
		});
		jest.mocked(useBraze).mockReturnValue({
			braze,
			brazeCards: undefined,
			brazeMessages: undefined,
		});
		jest.mocked(isPlacementStale).mockReturnValue(false);
		jest.mocked(braze.getBanner).mockReset();
	});

	it('renders the Braze banner for a fresh eligible placement', () => {
		jest.mocked(braze.getBanner).mockReturnValue({} as never);

		renderNudge('https://id.test');

		expect(screen.getByTestId('braze-feast-banner')).toHaveAttribute(
			'data-banner-id',
			'feast-contextual-nudge-1',
		);
		expect(screen.queryByText('Download the app')).not.toBeInTheDocument();
	});

	it('uses the native Feast card instead of a cached banner when stale', () => {
		jest.mocked(isPlacementStale).mockReturnValue(true);
		jest.mocked(braze.getBanner).mockReturnValue({} as never);

		renderNudge('https://id.test');

		expect(screen.getByText('Download the app')).toBeInTheDocument();
		expect(
			screen.queryByTestId('braze-feast-banner'),
		).not.toBeInTheDocument();
		expect(braze.getBanner).not.toHaveBeenCalled();
	});

	it('uses the native Feast card when no banner is eligible', () => {
		jest.mocked(braze.getBanner).mockReturnValue(null);

		renderNudge('https://id.test');

		expect(screen.getByText('Download the app')).toBeInTheDocument();
	});

	it('does not query Braze when the identity API URL is unavailable', () => {
		renderNudge(undefined);

		expect(screen.getByText('Download the app')).toBeInTheDocument();
		expect(braze.getBanner).not.toHaveBeenCalled();
	});
});
