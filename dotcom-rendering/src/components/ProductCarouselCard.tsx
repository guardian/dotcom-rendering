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
import { Link } from '@guardian/source/react-components';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import { ProductLinkButton } from './Button/ProductLinkButton';
import { ProductCardImage } from './ProductCardImage';

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
	text-decoration-color: ${palette('--product-card-read-more-decoration')};
	color: ${palette('--product-card-read-more')};
	:hover {
		color: ${palette('--product-card-read-more')};
		text-decoration-color: ${palette('--product-card-read-more')};
	}
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
	const headingId = product.h2Id;
	const productAndBrandName = [product.brandName, product.productName]
		.filter(Boolean)
		.join(' ');
	return (
		<>
			<div css={headingArea}>
				{hasHeading && (
					<>
						<div css={headingFont}>
							{product.primaryHeadingText}
						</div>
						<div css={brandAndProductNameFont}>
							{productAndBrandName}
						</div>
					</>
				)}
			</div>
			<div css={readMoreArea}>
				{!isUndefined(headingId) &&
					hasHeading &&
					product.displayType !== 'ProductCardOnly' && (
						<Link
							href={`#${headingId}`}
							cssOverrides={readMoreCta}
							data-component="at-a-glance-carousel-card-read-more"
							data-link-name="product read more link"
						>
							Read more
						</Link>
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
