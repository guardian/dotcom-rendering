import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { parseHtml } from '../lib/domUtils';
import type { NestedArticleElement } from '../lib/renderElement';
import type {
	FEElement,
	ProductBlockElement,
	ProductCta,
	ProductDisplayType,
	ProductImage,
} from '../types/content';
import { InlineProductCard } from './InlineProductCard';
import { LeftColProductCard } from './LeftColProductCard';
import { buildElementTree } from './SubheadingBlockComponent';

export type ProductCardCta = {
	label: string;
	url: string;
};

export type Product = {
	primaryHeadline: string;
	secondaryHeadline: string;
	brandName: string;
	productName: string;
	image: ProductImage;
	retailer: string;
	customAttributes: {
		name: string;
		value: string;
	}[];
	content: FEElement[];
	displayType: ProductDisplayType;
	productCtas: ProductCta[];
};

const contentContainer = css`
	position: relative;
`;

const getLowestPrice = (ctas: ProductCta[]): string | undefined => {
	if (ctas.length === 0) {
		return undefined;
	}

	let lowestCta: ProductCta | null = null;
	let lowestPrice: number | null = null;

	for (const cta of ctas) {
		const priceMatch = cta.price.match(/[\d,.]+/);
		if (priceMatch) {
			const priceNumber = parseFloat(priceMatch[0].replace(/,/g, ''));
			if (lowestPrice === null || priceNumber < lowestPrice) {
				lowestPrice = priceNumber;
				lowestCta = cta;
			}
		}
	}

	return lowestCta?.price;
};

const transformCtas = (ctas: ProductCta[]): ProductCardCta[] => {
	return ctas.map((cta) => {
		const overrideLabel = cta.text.trim().length > 0;
		return {
			label: overrideLabel ? cta.text : `${cta.price} at ${cta.retailer}`,
			url: cta.url,
		};
	});
};

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
		<div>
			{showContent && (
				<Content
					product={product}
					format={format}
					ArticleElementComponent={ArticleElementComponent}
					shouldShowLeftColCard={shouldShowLeftColCard}
				/>
			)}
			{showProductCard && (
				<InlineProductCard
					format={format}
					brandName={product.brandName}
					productName={product.productName}
					image={product.image}
					lowestPrice={getLowestPrice(product.productCtas)}
					productCtas={transformCtas(product.productCtas)}
					customAttributes={product.customAttributes}
					isCardOnly={product.displayType === 'ProductCardOnly'}
					shouldShowLeftColCard={shouldShowLeftColCard}
				/>
			)}
		</div>
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
			product.primaryHeading ? `${product.primaryHeading}</br>` : ''
		} ${product.secondaryHeading || ''}</h2>`,
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
						<LeftColProductCard
							brandName={product.brandName}
							productName={product.productName}
							image={product.image}
							lowestPrice={getLowestPrice(product.productCtas)}
							productCtas={transformCtas(product.productCtas)}
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
