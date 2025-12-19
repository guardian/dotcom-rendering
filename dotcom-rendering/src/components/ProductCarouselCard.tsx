import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
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

const headingFont = css`
	${headlineBold20};
	color: ${palette('--product-card-headline')};
`;

const headingArea = css`
	grid-row: 1;
`;
const readMoreArea = css`
	grid-row: 2;
	padding-bottom: ${space[2]}px;
`;
const imageArea = css`
	grid-row: 3;
	img {
		width: 100%;
		height: auto;
	}
`;
const belowImageArea = css`
	grid-row: 4;
`;

const brandNameFont = css`
	${headlineMedium17};
`;

const readMoreCta = css`
	${textSansBold15};
	text-decoration-line: underline;
	text-decoration-color: ${palette('--product-card-read-more-decoration')};
	color: ${palette('--product-card-read-more')};
	text-underline-offset: 20%;
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
	padding-bottom: ${space[4]}px;
`;

const brandAndProductNameFont = css`
	${headlineMedium17};
	line-height: 1.3;
`;

const productNameFont = css`
	${textSans17};
`;

export const ProductCarouselCard = ({
	product,
	format,
}: ProductCarouselCardProps) => {
	const hasHeading = !!product.primaryHeadingHtml;
	const firstCta = product.productCtas[0];
	const h2Id = product.h2Id;
	const productAndBrandName = [product.brandName, product.productName]
		.filter(Boolean)
		.join(' ');
	return (
		<>
			<div css={headingArea}>
				{hasHeading && (
					<>
						<div
							css={headingFont}
							dangerouslySetInnerHTML={{
								__html: product.primaryHeadingHtml,
							}}
						/>
						<div css={brandAndProductNameFont}>
							{productAndBrandName}
						</div>
					</>
				)}
			</div>
			<div css={readMoreArea}>
				{!isUndefined(h2Id) &&
					hasHeading &&
					product.displayType !== 'ProductCardOnly' && (
						<a
							href={`#${h2Id}`}
							onFocus={(event) => event.stopPropagation()}
							css={readMoreCta}
						>
							Read more
						</a>
					)}
			</div>
			<div css={imageArea}>
				<ProductCardImage format={format} image={product.image} />
			</div>
			<div css={belowImageArea}>
				{!hasHeading && (
					<div>
						<div css={brandNameFont}>{product.brandName}</div>
						<div css={productNameFont}>{product.productName}</div>
					</div>
				)}

				{firstCta && (
					<>
						<div css={priceStyle}>{firstCta.price}</div>
						<div css={buttonWrapper}>
							<ProductLinkButton
								label={`Buy at ${firstCta.retailer}`}
								url={firstCta.url}
								fullwidth={true}
								minimisePadding={true}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
};
