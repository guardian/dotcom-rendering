import { css } from '@emotion/react';
import { from, palette, space, textSans14 } from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { ProductCarouselCard } from './ProductCarouselCard';
import type { FixedSlideWidth } from './ScrollableCarousel';
import { CarouselKind, ScrollableCarousel } from './ScrollableCarousel';
import { Subheading } from './Subheading';

const carouselHeader = css`
	padding-bottom: 10px;
	padding-top: ${space[6]}px;
	border-bottom: 1px solid ${palette.neutral[86]};
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const navigation = css`
	display: none;
	${from.phablet} {
		display: block;
	}
`;
const count = css`
	${textSans14};
	color: ${palette.neutral[46]};
	display: block;
	${from.phablet} {
		display: none;
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
		<>
			<div css={carouselHeader}>
				<Subheading
					format={format}
					id={'at-a-glance'}
					topPadding={false}
				>
					At a glance
				</Subheading>
				<div
					css={navigation}
					id={'at-a-glance-carousel-navigation'}
				></div>
				<div css={count} id={'at-a-glance-carousel-count'}></div>
			</div>
			<ScrollableCarousel
				isArticle={true}
				kind={CarouselKind.FixedWidthSlides}
				carouselLength={products.length}
				fixedSlideWidth={fixedCardWidth}
				gapSizes={{ row: 'none', column: 'large' }}
				sectionId={'at-a-glance'}
			>
				{products.map((product: ProductBlockElement) => (
					<ScrollableCarousel.SubgridItem
						key={product.productCtas[0]?.url ?? product.elementId}
						subgridRows={4}
					>
						<ProductCarouselCard
							product={product}
							format={format}
						/>
					</ScrollableCarousel.SubgridItem>
				))}
			</ScrollableCarousel>
		</>
	);
};
