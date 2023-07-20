import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { render } from '@testing-library/react';
import { useApi as useApi_ } from '../lib/useApi';
import { ShareCount } from './ShareCount.importable';

const useApi: { [key: string]: any } = useApi_;

jest.mock('../lib/useApi', () => ({
	useApi: jest.fn(),
}));

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
		useApi.mockReturnValue({ error: { message: 'Bad' } });

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
		useApi.mockReturnValue({ data: { share_count: 25001 } });

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
