import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { parseHtml } from '../lib/domUtils';
import type { NestedArticleElement } from '../lib/renderElement';
import type { ProductBlockElement } from '../types/content';
import { ProductCardInline } from './ProductCardInline';
import { ProductCardLeftCol } from './ProductCardLeftCol';
import { buildElementTree } from './SubheadingBlockComponent';

const contentContainer = css`
	position: relative;
`;

const LeftColProductCardContainer = ({ children }: { children: ReactNode }) => (
	<div
		css={css`
			display: none;
			${from.wide} {
				position: absolute;
				left: -240px;
				height: 100%;
				display: block;
			}
		`}
	>
		{children}
	</div>
);
export const ProductElement = ({
	product,
	ArticleElementComponent,
	format,
	shouldShowLeftColCard,
}: {
	product: ProductBlockElement;
	ArticleElementComponent: NestedArticleElement;
	format: ArticleFormat;
	shouldShowLeftColCard: boolean;
}) => {
	const showContent =
		product.displayType === 'InlineOnly' ||
		product.displayType === 'InlineWithProductCard';
	const showProductCard =
		product.displayType === 'ProductCardOnly' ||
		product.displayType === 'InlineWithProductCard';
	return (
		<>
			{showContent && (
				<Content
					product={product}
					format={format}
					ArticleElementComponent={ArticleElementComponent}
					shouldShowLeftColCard={shouldShowLeftColCard}
				/>
			)}
			{showProductCard && (
				<ProductCardInline
					format={format}
					brandName={product.brandName}
					productName={product.productName}
					image={product.image}
					lowestPrice={product.lowestPrice}
					productCtas={product.productCtas}
					customAttributes={product.customAttributes}
					isCardOnly={product.displayType === 'ProductCardOnly'}
					shouldShowLeftColCard={shouldShowLeftColCard}
				/>
			)}
		</>
	);
};

const Content = ({
	product,
	ArticleElementComponent,
	format,
	shouldShowLeftColCard,
}: {
	product: ProductBlockElement;
	ArticleElementComponent: NestedArticleElement;
	format: ArticleFormat;
	shouldShowLeftColCard: boolean;
}) => {
	const showLeftCol =
		product.displayType === 'InlineWithProductCard' &&
		shouldShowLeftColCard;
	const subheadingHtml = parseHtml(
		`<h2 id="${product.h2Id ?? product.elementId}">${
			product.primaryHeadingHtml
				? `${product.primaryHeadingHtml}<br />`
				: ''
		} ${product.secondaryHeadingHtml || ''}</h2>`,
	);

	const isSubheading = subheadingHtml.textContent
		? subheadingHtml.textContent.trim().length > 0
		: false;
	return (
		<div data-spacefinder-role="nested">
			{isSubheading &&
				Array.from(subheadingHtml.childNodes).map(
					buildElementTree(format),
				)}
			<div css={contentContainer}>
				{showLeftCol && (
					<LeftColProductCardContainer>
						<ProductCardLeftCol
							brandName={product.brandName}
							productName={product.productName}
							image={product.image}
							lowestPrice={product.lowestPrice}
							productCtas={product.productCtas}
							customAttributes={product.customAttributes}
							format={format}
						/>
					</LeftColProductCardContainer>
				)}
				{product.content.map((element, index) => (
					<ArticleElementComponent
						element={element}
						// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
						key={index}
						index={index}
						format={format}
						isProduct={true}
						isMainMedia={false}
					/>
				))}
			</div>
		</div>
	);
};
