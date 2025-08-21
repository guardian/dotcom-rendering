import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { RenderArticleElement } from '../lib/renderElement';
import type { FEElement } from '../types/content';
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

export const ProductElement = ({
	product,
	editionId,
	format,
}: {
	product: Product;
	editionId: EditionId;
	format: ArticleFormat;
}) => {
	return (
		<div
			css={css`
				position: relative;
			`}
		>
			{(!!product.primaryHeadline || !!product.secondaryHeadline) && (
				<h2 css={[subheadingStyles(format)]}>
					<em>{product.primaryHeadline}:</em>
					<br />
					{product.secondaryHeadline}
				</h2>
			)}
			<div
				css={css`
					position: absolute;
					left: -240px;
					height: 100%;
					display: none;
					${from.wide} {
						display: block;
					}
				`}
			>
				<LeftColProductCard
					brandName={product.brandName}
					productName={product.productName}
					image={product.image}
					url={product.url}
					price={product.price}
					retailer={product.retailer}
					statistics={product.statistics}
				/>
			</div>
			{product.content.map((element, index) => (
				<RenderArticleElement
					// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
					key={index}
					format={format}
					element={element}
					index={index}
					isMainMedia={false}
					pageId=""
					webTitle=""
					ajaxUrl=""
					isAdFreeUser={false}
					isSensitive={false}
					switches={{}}
					abTests={{}}
					editionId={editionId}
					shouldHideAds={false}
				/>
			))}
			<InlineProductCard
				brandName={product.brandName}
				productName={product.productName}
				image={product.image}
				primaryUrl={product.url}
				primaryPrice={product.price}
				primaryRetailer={product.retailer}
				primaryCTA={product.cta}
				secondaryCTA={product.secondaryCTA}
				secondaryUrl={product.secondaryUrl}
				statistics={product.statistics}
			/>
		</div>
	);
};
