import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { parseHtml } from '../lib/domUtils';
import type { NestedArticleElement } from '../lib/renderElement';
import type {
	FEElement,
	ProductBlockElement,
	ProductDisplayType,
} from '../types/content';
import { InlineProductCard } from './InlineProductCard';
import { LeftColProductCard } from './LeftColProductCard';
import { buildElementTree } from './SubheadingBlockComponent';

export type Product = {
	primaryHeadline: string;
	secondaryHeadline: string;
	brandName: string;
	productName: string;
	image: string;
	url: string;
	price: string;
	retailer: string;
	cta: string;
	secondaryCTA?: string;
	secondaryUrl?: string;
	statistics: {
		name: string;
		value: string;
	}[];
	content: FEElement[];
	displayType: ProductDisplayType;
};

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
}: {
	product: ProductBlockElement;
	ArticleElementComponent: NestedArticleElement;
	format: ArticleFormat;
}) => {
	const showContent =
		product.displayType === 'inline-only' ||
		product.displayType === 'inline-and-product-card';
	const showProductCard =
		product.displayType === 'product-card-only' ||
		product.displayType === 'inline-and-product-card';

	return (
		<div data-spacefinder-role="nested">
			{showContent && (
				<Content
					product={product}
					format={format}
					ArticleElementComponent={ArticleElementComponent}
				/>
			)}
			{showProductCard && (
				<InlineProductCard
					format={format}
					brandName={product.brandName}
					productName={product.productName}
					image={product.image.url}
					primaryUrl={product.primaryProductUrl}
					primaryPrice={product.primaryPrice}
					primaryCTA={product.primaryCta}
					secondaryCTA={product.secondaryCta}
					secondaryUrl={product.secondaryProductUrl}
					statistics={product.statistics}
					isCardOnly={product.displayType === 'product-card-only'}
				/>
			)}
		</div>
	);
};

const Content = ({
	product,
	ArticleElementComponent,
	format,
}: {
	product: ProductBlockElement;
	ArticleElementComponent: NestedArticleElement;
	format: ArticleFormat;
}) => {
	const showLeftCol = product.displayType === 'inline-and-product-card';
	const subheadingHtml = parseHtml(
		`<h2 id="${product.h2Id ?? product.elementId}">${
			product.primaryHeading ? `${product.primaryHeading}</br>` : ''
		} ${product.secondaryHeading || ''}</h2>`,
	);

	const isSubheading = subheadingHtml.textContent
		? subheadingHtml.textContent.trim().length > 0
		: false;
	return (
		<>
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
							image={product.image.url}
							altText={product.altText}
							credit={product.credit}
							displayCredit={product.displayCredit}
							primaryUrl={product.primaryProductUrl}
							primaryPrice={product.primaryPrice}
							primaryCta={product.primaryCta}
							statistics={product.statistics}
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
		</>
	);
};
