import type { ArticleFormat } from '../lib/articleFormat';
import type {
	EnhancedProductSummaryMap,
	ProductSummaryDisplayType,
} from '../types/content';
import { Island } from './Island';
import { ProductCtaList } from './ProductCtaList';
import { ScrollableProduct } from './ScrollableProduct.island';
import { StackedProducts } from './StackedProducts.island';

export const ProductSummary = ({
	title,
	products,
	format,
	displayType,
}: {
	title: string;
	products: EnhancedProductSummaryMap[];
	format: ArticleFormat;
	displayType: ProductSummaryDisplayType;
}) => {
	switch (displayType) {
		case 'Carousel':
			return (
				<Island priority="feature" defer={{ until: 'idle' }}>
					<ScrollableProduct
						title={title}
						products={products}
						format={format}
					/>
				</Island>
			);
		case 'StackedCard':
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
		case 'StackedCardExpanded':
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
		case 'CtaList':
			return (
				<ProductCtaList
					products={products}
					title={title}
					format={format}
				/>
			);
	}
};
