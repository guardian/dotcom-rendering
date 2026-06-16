import { css } from '@emotion/react';
import { article17, palette, remSpace } from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EnhancedProductSummaryMap } from '../types/content';
import { ProductLinkButton } from './Button/ProductLinkButton';
import { Subheading } from './Subheading';

const listStyles = css`
	li {
		${article17}
		margin-bottom: ${remSpace[1]};
		padding-left: ${remSpace[5]};

		p {
			margin: -1.5rem 0 0 0;
		}
	}

	li::before {
		display: inline-block;
		content: '';
		border-radius: 50%;
		height: ${remSpace[3]};
		width: ${remSpace[3]};
		background-color: ${palette.neutral[86]};
		margin-left: -${remSpace[5]};
		margin-right: ${remSpace[2]};
	}

	strong {
		font-weight: bold;
	}

	a {
		margin-top: ${remSpace[3]};
		margin-bottom: ${remSpace[3]};
		margin-left: -${remSpace[5]};
	}
`;

const ListItem = ({ product }: { product: EnhancedProductSummaryMap }) => {
	const { productBlock, ctaIndex } = product;
	const cta = productBlock.productCtas[ctaIndex];
	return (
		<li key={product.productBlock.brandName}>
			<p>
				<strong>{productBlock.primaryHeadingText}</strong>
				<br />
				{productBlock.brandName}
			</p>
			{cta && (
				<ProductLinkButton
					xCustComponentId={'cta-list'}
					label={`Buy at ${cta.retailer}`}
					url={cta.url}
					minimisePadding={true}
				/>
			)}
		</li>
	);
};

export const ProductCtaList = ({
	products,
	format,
	title,
}: {
	products: EnhancedProductSummaryMap[];
	format: ArticleFormat;
	title: string;
}) => {
	return (
		<>
			<Subheading topPadding={true} format={format}>
				{title}
			</Subheading>
			<ul css={listStyles}>
				{products.map((product) => (
					<ListItem
						key={product.productBlock.elementId}
						product={product}
					/>
				))}
			</ul>
		</>
	);
};
