import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { NestedArticleElement } from '../lib/renderElement';
import type { ProductBlockElement } from '../types/content';
import { ProductCardInline } from './ProductCardInline';
import { ProductCardLeftCol } from './ProductCardLeftCol';
import { Subheading } from './Subheading';

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

	return (
		<div>
			<ProductSubheading product={product} format={format} />
			<div css={contentContainer} data-spacefinder-role="nested">
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
						isMainMedia={false}
					/>
				))}
			</div>
		</div>
	);
};

const ProductSubheading = ({
	product,
	format,
}: {
	product: ProductBlockElement;
	format: ArticleFormat;
}) => {
	const subheadingHtml = `${
		product.primaryHeadingHtml ? `${product.primaryHeadingHtml}<br />` : ''
	} ${product.secondaryHeadingHtml || ''}`;

	const isSubheading =
		!!product.primaryHeadingText || !!product.secondaryHeadingText;

	if (!isSubheading) {
		return null;
	}

	return (
		<Subheading
			id={`${product.h2Id ?? product.elementId}`}
			format={format}
			topPadding={true}
		>
			<span dangerouslySetInnerHTML={{ __html: subheadingHtml }}></span>
		</Subheading>
	);
};
