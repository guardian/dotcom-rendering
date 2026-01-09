import { css } from '@emotion/react';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import { ProductCarouselCard } from './ProductCarouselCard';
import type { FixedSlideWidth } from './ScrollableCarousel';
import {
	CarouselKind,
	ScrollableCarousel,
	singleRowLeftBorderStyles,
} from './ScrollableCarousel';

const subgridStyles = css`
	scroll-snap-align: start;
	position: relative;
	display: grid;
	@supports (grid-template-rows: subgrid) {
		grid-column: span 1;
		grid-row: span 4;
		grid-template-rows: subgrid;
	}
`;

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
			kind={CarouselKind.ProductCarousel}
			carouselLength={products.length}
			fixedSlideWidth={fixedCardWidth}
			gapSizes={{ row: 'none', column: 'large' }}
		>
			{products.map((product: ProductBlockElement) => (
				<li
					key={product.productCtas[0]?.url ?? product.elementId}
					css={[
						subgridStyles,
						singleRowLeftBorderStyles(palette('--card-border-top')),
					]}
				>
					<ProductCarouselCard product={product} format={format} />
				</li>
			))}
		</ScrollableCarousel>
	);
};
