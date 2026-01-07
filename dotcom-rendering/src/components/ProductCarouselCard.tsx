import { css } from '@emotion/react';
import {
	headlineBold20,
	headlineMedium17,
	space,
	textSans17,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import { ProductCardImage } from './ProductCardImage';
import { ProductLinkButton } from './ProductLinkButton';

export type ProductCarouselCardProps = {
	product: ProductBlockElement;
	format: ArticleFormat;
};

const baseCard = css`
	display: flex;
	flex-direction: column;
`;

const productCarouselCardHeading = css`
	${headlineBold20};
	color: ${palette('--product-card-headline')};
`;

const brandAndProductName = css`
	${headlineMedium17};
`;

const readMoreCta = css`
	${textSansBold15};
	text-decoration-line: underline;
	text-decoration-color: ${palette('--product-card-read-more-decoration')};
	color: ${palette('--product-card-read-more')};
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
}: ProductCarouselCardProps) => {
	const hasHeading = !!product.primaryHeadingHtml;

	const firstCta = product.productCtas[0];

	return (
		<div css={baseCard}>
			{hasHeading && (
				<>
					<div css={productCarouselCardHeading}>
						{product.primaryHeadingText}
					</div>
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
			<div css={readMoreCta}>Read more</div>
			<div css={imageArea}>
				<ProductCardImage format={format} image={product.image} />
			</div>
			{!hasHeading && (
				<div>
					<div css={brandAndProductName}>{product.brandName}</div>
					<div css={productNameStyle}>{product.productName}</div>
				</div>
			)}
			<div css={priceStyle}>{firstCta?.price}</div>

			{firstCta && (
				<div css={buttonWrapper}>
					<ProductLinkButton
						label={`Buy at ${firstCta.retailer}`}
						url={firstCta.url}
						fullwidth={true}
						minimisePadding={true}
					/>
				</div>
			)}
		</div>
	);
};
