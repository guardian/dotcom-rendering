import type { ArticleFormat } from '../lib/articleFormat';
import type { ABTestVariant } from '../model/enhance-product-carousel';
import type { ProductBlockElement } from '../types/content';
import { Island } from './Island';
import { ScrollableProduct } from './ScrollableProduct.importable';
import { StackedProducts } from './StackedProducts.importable';

export const ProductSummary = ({
	products,
	format,
	variant,
}: {
	products: ProductBlockElement[];
	format: ArticleFormat;
	variant: ABTestVariant;
}) => {
	if (variant === 'carousel') {
		return (
			<Island priority="critical" defer={{ until: 'idle' }}>
				<ScrollableProduct products={products} format={format} />
			</Island>
		);
	}

	return (
		<Island priority="critical" defer={{ until: 'idle' }}>
			<StackedProducts
				products={products}
				heading={'At a glance'}
				format={format}
			/>
		</Island>
	);
};
