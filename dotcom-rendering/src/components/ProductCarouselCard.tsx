import { css } from '@emotion/react';
import {
	headlineBold20,
	headlineMedium17,
	lifestyle,
	space,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import { ProductCardButtons } from './ProductCardButtons';
import { ProductBlockElement } from '../types/content';
import { Picture } from './Picture';
import { ArticleFormat } from '../lib/articleFormat';

export type ProductCarouselCardProps = {
	product: ProductBlockElement;
	format: ArticleFormat;
};

const baseCard = css`
	display: flex;
	width: 280px;
	flex-direction: column;
	align-items: flex-start;
	padding: 12px 10px 16px 10px;
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
	text-decoration-color: #dcdcdc; //TODO update this to use var(--Link-Pillar-color-link-underline-pillar, #DCDCDC);
	color: ${lifestyle[400]};
	padding-bottom: ${space[2]}px;
	text-underline-offset: 20%; /* 3px */
`;

const priceStyle = css`
	${textSansBold17};
	padding-top: ${space[1]}px;
	padding-bottom: ${space[2]}px;
`;

const buttonWrapper = css`
	grid-area: buttons;
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	justify-content: center;
	align-items: center;
	align-self: stretch;
`;

const imageArea = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-self: stretch;
	aspect-ratio: 1 / 1;
	height: 280px;

	img {
		width: 100%;
		height: 280px;
		object-fit: contain;
	}
`;

export const ProductCarouselCard = ({
	product,
	format,
}: ProductCarouselCardProps) => {
	return (
		<div css={baseCard}>
			<div css={productCarouselCardHeading}>
				{product.primaryHeadingHtml}
			</div>
			<div css={brandAndProductName}>
				{product.brandName} {product.productName}
			</div>
			<div css={readMoreCta}>Read more</div>
			<div css={imageArea}>
				<Picture
					role="productCard"
					master={product.image?.url ?? ''}
					alt={product.image?.alt ?? ''}
					width={product.image?.width ?? 0}
					height={product.image?.height ?? 0}
					loading="eager"
					format={format}
				/>
			</div>
			<div css={priceStyle}>
				{product.productCtas && product.productCtas.length > 0
					? product.productCtas[0]?.price ?? 'Price unavailable'
					: 'Price unavailable'}
			</div>
			<div css={buttonWrapper}>
				<ProductCardButtons
					productCtas={product.productCtas?.slice(0, 1) ?? []}
					buttonLabelOverride={
						product.productCtas && product.productCtas.length > 0
							? `Buy at ${
									product.productCtas[0]?.retailer ??
									'retailer'
							  }`
							: 'Buy'
					}
				/>
			</div>
		</div>
	);
};
