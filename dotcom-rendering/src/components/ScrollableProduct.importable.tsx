import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { ProductCarouselCard } from './ProductCarouselCard';
import type { FixedWidthOverride } from './ScrollableCarousel';
import { ScrollableCarousel } from './ScrollableCarousel';

export const ScrollableProduct = ({
	products,
	format,
}: {
	products: ProductBlockElement[];
	format: ArticleFormat;
}) => {
	const fixedWidthOverrides: FixedWidthOverride[] = [
		{ breakpoint: 'mobile', width: 240 },
		{ breakpoint: 'mobileMedium', width: 280 },
		{ breakpoint: 'tablet', width: 220 },
	];
	return (
		<ScrollableCarousel
			carouselLength={products.length}
			visibleCarouselSlidesOnMobile={1.2}
			visibleCarouselSlidesOnTablet={2.666666}
			fixedCardWidthOverrides={fixedWidthOverrides}
		>
			{products.map((product: ProductBlockElement) => (
				<ScrollableCarousel.Item
					key={product.productCtas[0]?.url ?? product.elementId}
				>
					<ProductCarouselCard product={product} format={format} />
				</ScrollableCarousel.Item>
			))}
		</ScrollableCarousel>
	);
};
