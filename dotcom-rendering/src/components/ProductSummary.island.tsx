import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { Island } from './Island';
import { ScrollableProduct } from './ScrollableProduct.island';
import { StackedProducts } from './StackedProducts.island';

export const ProductSummary = ({
	title,
	products,
	format,
	displayType,
}: {
	title: string;
	products: ProductBlockElement[];
	format: ArticleFormat;
	displayType: string; // ToDo: type this
}) => {
	if (displayType === 'CAROUSEL') {
		return (
			<Island priority="feature" defer={{ until: 'idle' }}>
				<ScrollableProduct
					title={title}
					products={products}
					format={format}
				/>
			</Island>
		);
	}

	if (displayType === 'STACKED_CARD') {
		return (
			<Island priority="feature" defer={{ until: 'idle' }}>
				<StackedProducts
					products={products}
					title={title}
					format={format}
					showAllProducts={false}
				/>
			</Island>
		);
	}

	return (
		<Island priority="feature" defer={{ until: 'idle' }}>
			<StackedProducts
				products={products}
				title={title}
				format={format}
				showAllProducts={true}
			/>
		</Island>
	);
};
