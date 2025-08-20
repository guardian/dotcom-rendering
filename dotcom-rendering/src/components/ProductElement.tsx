import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { grid } from '../grid';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import { RenderArticleElement } from '../lib/renderElement';
import { palette } from '../palette';
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
	statistics: {
		name: string;
		value: string;
	}[];
	content: FEElement[];
};

const borderStyles = css`
	${from.tablet} {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			left: -20px;
			top: 0;
			bottom: 0;
			width: 1px;
			background: ${palette('--article-border')};
		}
		&::after {
			content: '';
			position: absolute;
			right: -20px;
			top: 0;
			bottom: 0;
			width: 1px;
			background: ${palette('--article-border')};
		}
	}
`;

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
				${grid.paddedContainer}
				position: relative;
			`}
		>
			<h2
				css={[
					subheadingStyles(format),
					css`
						padding-left: 10px;
						${grid.column.centre};
					`,
					borderStyles,
				]}
			>
				<em>{product.primaryHeadline}:</em>
				<br />
				{product.secondaryHeadline}
			</h2>
			<div
				css={css`
					//make full height of the container
					${grid.column.left}
					display:none;
					${from.leftCol} {
						display: block;
						height: 100%;
						min-height: fit-content;
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
			<div
				css={css`
					${grid.column.centre};
					${from.tablet} {
						padding-right: 80px;
						position: relative;
						&::before {
							content: '';
							position: absolute;
							left: -20px;
							top: 0;
							bottom: 0;
							width: 1px;
							background: ${palette('--article-border')};
						}
						&::after {
							content: '';
							position: absolute;
							right: -20px;
							top: 0;
							bottom: 0;
							width: 1px;
							background: ${palette('--article-border')};
						}
					}
					${from.leftCol} {
						padding-right: 0;
					}
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
				<InlineProductCard
					brandName={product.brandName}
					productName={product.productName}
					image={product.image}
					primaryUrl={product.url}
					primaryPrice={product.price}
					primaryRetailer={product.retailer}
					primaryCTA={product.cta}
					statistics={product.statistics}
				/>
			</div>
		</div>
	);
};
