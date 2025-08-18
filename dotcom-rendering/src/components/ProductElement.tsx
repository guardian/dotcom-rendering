import { css } from '@emotion/react';
import { headlineBold20 } from '@guardian/source/foundations';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { RenderArticleElement } from '../lib/renderElement';
import type { FEElement } from '../types/content';
import { InlineProductCard } from './InlineProductCard';
import { LeftColProductCard } from './LeftColProductCard';
import { palette } from '../palette';

export type Product = {
	primaryHeadline: string;
	secondaryHeadline: string;
	brandName: string;
	productName: string;
	image: string;
	url: string;
	price: string;
	retailer: string;
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
				${grid.container}
				position: relative;
			`}
		>
			<h2
				css={css`
					color: ${palette('--headline-colour')};
					${headlineBold20};
					${grid.column.centre};
				`}
				dangerouslySetInnerHTML={{
					__html: product.primaryHeadline + product.secondaryHeadline,
				}}
			/>
			<div
				css={css`
					//make full height of the container
					${grid.column.left}
					height: 100%;
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
			<div
				css={css`
					${grid.column.centre}
				`}
			>
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
			</div>
			<InlineProductCard
				brandName={product.brandName}
				productName={product.productName}
				image={product.image}
				url={product.url}
				price={product.price}
				retailer={product.retailer}
				statistics={product.statistics}
			/>
		</div>
	);
};
