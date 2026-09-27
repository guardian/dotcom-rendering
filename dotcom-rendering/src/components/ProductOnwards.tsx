import { css } from '@emotion/react';
import {
	from,
	space,
	textSansBold17,
	textSansBold20,
	until,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { SummaryProduct } from '../types/content';
import { ProductCarouselCard } from './ProductCarouselCard';
import { ScrollableCarousel } from './ScrollableCarousel';

type Props = {
	heading: string;
	products: SummaryProduct[];
	format: ArticleFormat;
};

const sectionId = 'filter-products';

const containerStyles = css`
	${grid.paddedContainer}
	background-color: ${palette('--onward-background')};
	padding-top: ${space[1]}px;
	padding-bottom: ${space[6]}px;
	${from.tablet} {
		padding-top: 0;
		border-left: 1px solid ${palette('--onward-content-border')};
		border-right: 1px solid ${palette('--onward-content-border')};
	}
`;

const headerContainerStyles = css`
	${grid.column.centre}
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
`;

const headerStyles = css`
	color: ${palette('--onward-text')};
	${textSansBold17};
	padding-bottom: ${space[3]}px;
	padding-top: ${space[1]}px;
	${from.tablet} {
		${textSansBold20};
	}
`;

const cardsContainerStyles = css`
	${grid.column.centre}
	position: relative;
	${from.desktop} {
		${grid.between('centre-column-start', 'right-column-end')}
	}
	${from.leftCol} {
		&::before {
			content: '';
			position: absolute;
			left: -11px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${palette('--onward-content-border')};
		}
		ul {
			padding-left: 0;
		}
	}
`;

/**
 * ProductCarouselCard renders a fragment of four row-pinned divs, so each
 * slide must be a 4-row subgrid. ScrollableCarousel.Item's li is display:
 * flex, which would break that layout, so we render our own li elements
 * (ScrollableCarousel passes children straight into its grid ul). Styles
 * copied from ScrollableProduct.
 */
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
		background-color: ${palette('--onward-content-border')};
		transform: translateX(-50%);
	}
`;

/**
 * An onwards-style, full-width section showing a Filter article's products
 * as a carousel, intended for the end of the article.
 */
export const ProductOnwards = ({ heading, products, format }: Props) => {
	return (
		<section data-component={sectionId} css={containerStyles}>
			<StraightLines
				cssOverrides={[
					css`
						${grid.column.all}
						padding-left: ${space[5]}px;
						padding-right: ${space[5]}px;
						margin-bottom: ${space[2]}px;
						${until.tablet} {
							display: none;
						}
					`,
				]}
				count={1}
				color={palette('--onward-content-top-border')}
			/>
			<div css={headerContainerStyles}>
				<h2 id={`${sectionId}-title`} css={headerStyles}>
					{heading}
				</h2>
				{/* Portal target for ScrollableCarousel's navigation buttons */}
				<div id={`${sectionId}-carousel-navigation`}></div>
			</div>
			<div css={cardsContainerStyles}>
				<ScrollableCarousel
					carouselLength={products.length}
					visibleCarouselSlidesOnMobile={1}
					visibleCarouselSlidesOnTablet={4}
					sectionId={sectionId}
					gapSizes={{ column: 'large', row: 'small' }}
				>
					{products.map((product) => (
						<li
							key={
								product.productBlock.productCtas[0]?.url ??
								product.productBlock.elementId
							}
							css={[subgridStyles, leftBorderStyles]}
						>
							<ProductCarouselCard
								product={product}
								format={format}
							/>
						</li>
					))}
				</ScrollableCarousel>
			</div>
		</section>
	);
};
