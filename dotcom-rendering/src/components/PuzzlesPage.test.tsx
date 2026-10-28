import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { puzzlesBranding } from '../../fixtures/manual/puzzlesBranding';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import type { EditionId } from '../lib/edition';
import { ConfigProvider } from './ConfigContext';
import { PuzzlesPage } from './PuzzlesPage';

const layoutBranding = jest.fn();

jest.mock('../layouts/PuzzlesLayout', () => ({
	PuzzlesLayout: ({ branding }: { branding?: unknown }) => {
		layoutBranding(branding);
		return null;
	},
}));
jest.mock('./Island', () => ({ Island: () => null }));

const renderPage = (editionId: EditionId, isAdFreeUser = false) =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId,
			}}
		>
			<PuzzlesPage
				NAV={{} as never}
				puzzlesPage={createPuzzlesPage({
					editionId,
					isAdFreeUser,
					commercialProperties: {
						AU: { adTargeting: [], branding: puzzlesBranding },
						UK: { adTargeting: [] },
					},
				})}
			/>
		</ConfigProvider>,
	);

describe('PuzzlesPage', () => {
	beforeEach(() => layoutBranding.mockClear());

	it('passes the branding for the reader’s edition to the layout', () => {
		renderPage('AU');
		expect(layoutBranding).toHaveBeenLastCalledWith(puzzlesBranding);
	});

	it('still passes branding to ad-free readers', () => {
		renderPage('AU', true);
		expect(layoutBranding).toHaveBeenLastCalledWith(puzzlesBranding);
	});

	it.each<EditionId>(['UK', 'US'])(
		'passes no branding when the %s edition has no sponsor',
		(editionId) => {
			renderPage(editionId);
			expect(layoutBranding).toHaveBeenLastCalledWith(undefined);
		},
	);
});
