import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { ProductCarouselCard } from './ProductCarouselCard';
import type { FixedSlideWidth } from './ScrollableCarousel';
import { CarouselKind, ScrollableCarousel } from './ScrollableCarousel';

export const ScrollableProduct = ({
	products,
	format,
}: {
	products: ProductBlockElement[];
	format: ArticleFormat;
}) => {
	const fixedCardWidth: FixedSlideWidth = {
		defaultWidth: 240,
		widthFromBreakpoints: [
			{ breakpoint: 'mobileMedium', width: 280 },
			{ breakpoint: 'tablet', width: 220 },
		],
	};
	return (
		<ScrollableCarousel
			isArticle={true}
			kind={CarouselKind.FixedWidthSlides}
			carouselLength={products.length}
			fixedSlideWidth={fixedCardWidth}
			gapSizes={{ row: 'none', column: 'large' }}
		>
			{products.map((product: ProductBlockElement) => (
				<ScrollableCarousel.SubgridItem
					key={product.productCtas[0]?.url ?? product.elementId}
					subgridRows={4}
				>
					<ProductCarouselCard product={product} format={format} />
				</ScrollableCarousel.SubgridItem>
			))}
		</ScrollableCarousel>
	);
};
