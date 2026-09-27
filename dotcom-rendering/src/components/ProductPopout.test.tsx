import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider } from './ConfigContext';
import { examplePopoutProducts } from '../../fixtures/manual/productBlockElement';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ProductPopout } from './ProductPopout.island';

const format = {
	design: ArticleDesign.Review,
	display: ArticleDisplay.Standard,
	theme: Pillar.Lifestyle,
};

describe('ProductPopout', () => {
	it('opens the popout and lists every product', async () => {
		render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<ProductPopout
					products={examplePopoutProducts}
					format={format}
					title="Everything we recommend"
					triggerLabel="See all our picks"
				/>
			</ConfigProvider>,
		);

		await userEvent.click(
			screen.getByRole('button', { name: /See all our picks/ }),
		);

		expect(screen.getByRole('dialog')).toBeInTheDocument();
		expect(screen.getByText('Everything we recommend')).toBeInTheDocument();
		expect(screen.getAllByText('Jump to our review')).toHaveLength(
			examplePopoutProducts.length,
		);
	});
});
