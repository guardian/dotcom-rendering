import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { NestedArticleElement } from '../lib/renderElement';
import type { FEElement, ProductBlockElement } from '../types/content';
import { InlineProductCard } from './InlineProductCard';
import { LeftColProductCard } from './LeftColProductCard';
import { subheadingStyles } from './Subheading';

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
}: {
	product: ProductBlockElement;
	ArticleElementComponent: NestedArticleElement;
	format: ArticleFormat;
}) => {
	return (
		<div
			css={css`
				position: relative;
			`}
		>
			{(!!product.primaryHeading || !!product.secondaryHeading) && (
				<h2 css={[subheadingStyles(format)]}>
					<span
						dangerouslySetInnerHTML={{
							__html:
								product.primaryHeading &&
								product.secondaryHeading,
						}}
					></span>
				</h2>
			)}
			<LeftColProductCardContainer>
				<LeftColProductCard
					brandName={product.brandName}
					productName={product.productName}
					image={product.image.url}
					url={product.primaryProductUrl}
					price={product.primaryPrice}
					retailer={product.primaryRetailer}
					statistics={product.statistics}
				/>
			</LeftColProductCardContainer>
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
			<InlineProductCard
				format={format}
				brandName={product.brandName}
				productName={product.productName}
				image={product.image.url}
				primaryUrl={product.primaryProductUrl}
				primaryPrice={product.primaryPrice}
				primaryRetailer={product.primaryRetailer}
				primaryCTA={product.primaryCta}
				secondaryCTA={product.secondaryCta}
				secondaryUrl={product.secondaryProductUrl}
				statistics={product.statistics}
			/>
		</div>
	);
};
