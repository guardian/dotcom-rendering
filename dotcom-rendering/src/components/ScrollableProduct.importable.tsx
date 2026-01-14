import { css } from '@emotion/react';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import type { FixedSlideWidth } from './ProductCarousel';
import { ProductCarousel } from './ProductCarousel';
import { ProductCarouselCard } from './ProductCarouselCard';

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

const leftBorderStyles = css`
	:not(:first-child)::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -10px;
		width: 1px;
		background-color: ${palette('--card-border-top')};
		transform: translateX(-50%);
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
		<ProductCarousel
			carouselLength={products.length}
			fixedSlideWidth={fixedCardWidth}
		>
			{products.map((product: ProductBlockElement) => (
				<li
					key={product.productCtas[0]?.url ?? product.elementId}
					css={[subgridStyles, leftBorderStyles]}
				>
					<ProductCarouselCard product={product} format={format} />
				</li>
			))}
		</ProductCarousel>
	);
};
