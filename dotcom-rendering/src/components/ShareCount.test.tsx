import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { jest } from '@jest/globals';
import { render } from '@testing-library/react';

jest.unstable_mockModule('../../src/lib/useApi', () => ({
	useApi: jest.fn<typeof import('../lib/useApi').useApi>(),
}));

const { useApi } = (await import('../lib/useApi')) as jest.MockedObject<
	typeof import('../lib/useApi')
>;

const { ShareCount } = await import('./ShareCount.importable');

describe('ShareCount', () => {
	const ajaxUrl = 'https://api.nextgen.guardianapps.co.uk';
	const pageId =
		'/environment/2020/jan/25/court-probe-carrie-symonds-influence-boris-johnson-badger-cull';

	beforeEach(() => {
		useApi.mockReset();
	});

	it('It should render null if share_count is zero', () => {
		useApi.mockReturnValue({
			data: { share_count: 0 },
			loading: false,
		});

		const { container } = render(
			<ShareCount
				ajaxUrl={ajaxUrl}
				pageId={pageId}
				format={{
					theme: Pillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				}}
			/>,
		);

		expect(container.firstChild).toBeNull();
	});

	it('It should not render anything if there was a share count error', () => {
		useApi.mockReturnValue({
			error: { name: 'test', message: 'Bad' },
			loading: false,
		});

		const { container } = render(
			<ShareCount
				ajaxUrl={ajaxUrl}
				pageId={pageId}
				format={{
					theme: Pillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				}}
			/>,
		);

		expect(container.firstChild).toBeNull();
	});

	it('It should format long share counts correctly', () => {
		useApi.mockReturnValue({
			data: { share_count: 25001 },
			loading: false,
		});

		const { getByTestId } = render(
			<ShareCount
				ajaxUrl={ajaxUrl}
				pageId={pageId}
				format={{
					theme: Pillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				}}
			/>,
		);

		expect(getByTestId('long-share-count').innerHTML).toBe('25,001');
		expect(getByTestId('short-share-count').innerHTML).toBe('25k');
	});
});
