import { css } from '@emotion/react';
import {
	headlineBold20,
	headlineMedium17,
	lifestyle,
	space,
	textSans17,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import type { ProductBlockElement } from '../types/content';
import { ProductCardButtons } from './ProductCardButtons';
import { ProductCardImage } from './ProductCardImage';

export type ProductCarouselCardProps = {
	product: ProductBlockElement;
	format: ArticleFormat;
	showReadMore?: boolean;
};

const baseCard = css`
	display: flex;
	flex-direction: column;
`;

const productCarouselCardHeading = css`
	${headlineBold20};
	color: ${lifestyle[300]};
`;

const brandAndProductName = css`
	${headlineMedium17};
`;

const readMoreCta = css`
	${textSansBold15};
	text-decoration-line: underline;
	text-decoration-color: #dcdcdc; /* stylelint-disable-line */
	color: ${lifestyle[400]};
	text-underline-offset: 20%;
	padding-bottom: ${space[2]}px;
`;

const priceStyle = css`
	${textSansBold17};
	padding-top: ${space[1]}px;
	padding-bottom: ${space[2]}px;
`;

const buttonWrapper = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
`;

const imageArea = css`
	img {
		width: 100%;
		height: auto;
	}
`;

const brandAndProductNameRow = css`
	line-height: 1.3;
`;

const brandAndProductNameInline = css`
	${headlineMedium17};
`;

const productNameStyle = css`
	${textSans17};
`;

export const ProductCarouselCard = ({
	product,
	format,
	showReadMore,
}: ProductCarouselCardProps) => {
	const hasHeading = !!product.primaryHeadingHtml;

	const firstCta = product.productCtas[0];

	return (
		<div css={baseCard}>
			{hasHeading && (
				<>
					<div
						css={productCarouselCardHeading}
						dangerouslySetInnerHTML={{
							__html: product.primaryHeadingHtml,
						}}
					/>
					<div css={brandAndProductNameRow}>
						<span css={brandAndProductNameInline}>
							{product.brandName}{' '}
						</span>
						<span css={brandAndProductNameInline}>
							{product.productName}
						</span>
					</div>
				</>
			)}
			{showReadMore && <div css={readMoreCta}>Read more</div>}
			<div css={imageArea}>
				<ProductCardImage
					format={format}
					image={product.image}
					url={undefined}
				/>
			</div>
			{!hasHeading && (
				<div>
					<div css={brandAndProductName}>{product.brandName}</div>
					<div css={productNameStyle}>{product.productName}</div>
				</div>
			)}
			<div css={priceStyle}>{firstCta?.price ?? 'Price unavailable'}</div>

			<div css={buttonWrapper}>
				<ProductCardButtons
					productCtas={firstCta ? [firstCta] : []}
					buttonLabelOverride={
						firstCta ? `Buy at ${firstCta.retailer}` : 'Buy'
					}
				/>
			</div>
		</div>
	);
};
