import type { ArticleFormat } from '../lib/articleFormat';
import { useBetaAB } from '../lib/useAB';
import type { ProductBlockElement } from '../types/content';
import { Island } from './Island';
import { ScrollableProduct } from './ScrollableProduct.importable';
import { StackedProducts } from './StackedProducts.importable';

export const ProductSummary = ({
	products,
	format,
}: {
	products: ProductBlockElement[];
	format: ArticleFormat;
}) => {
	const abTests = useBetaAB();

	const isInVariantGroup1 =
		abTests?.isUserInTestGroup(
			'thefilter-at-a-glance-redesign',
			'variant1',
		) ?? false;
	const isInVariantGroup2 =
		abTests?.isUserInTestGroup(
			'thefilter-at-a-glance-redesign',
			'variant2',
		) ?? false;

	if (isInVariantGroup1) {
		return (
			<Island priority="critical" defer={{ until: 'idle' }}>
				<ScrollableProduct products={products} format={format} />
			</Island>
		);
	}
	if (isInVariantGroup2) {
		return (
			<Island priority="critical" defer={{ until: 'idle' }}>
				<StackedProducts
					products={products}
					heading={'At a glance'}
					format={format}
				/>
			</Island>
		);
	}
	return null;
};
