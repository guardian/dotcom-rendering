import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineMedium17,
	space,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductBlockElement } from '../types/content';
import { ProductCardImage } from './ProductCardImage';
import { ProductLinkButton } from './ProductLinkButton';

const horizontalCard = css`
	position: relative;
	border-top: 1px solid ${palette('--section-border')};
	padding-top: ${space[2]}px;
	display: grid;
	grid-template-columns: 118px 1fr;
	grid-column-gap: 10px;
	grid-row-gap: ${space[2]}px;
	grid-template-areas:
		'image information'
		'button button';
	${from.phablet} {
		grid-template-areas: 'image information';
	}
`;
const imageContainer = css`
	img {
		width: 100%;
		height: auto;
	}
	grid-area: image;
`;
const informationContainer = css`
	display: flex;
	flex-direction: column;
	grid-area: information;
`;

const buttonContainer = css`
	grid-area: button;
	${from.phablet} {
		grid-area: information;
		position: absolute;
		width: 220px;
		bottom: 0;
		right: 0;
	}
`;

const readMore = css`
	${textSansBold15};
	text-decoration-line: underline;
	text-decoration-color: ${palette('--product-card-read-more-decoration')};
	color: ${palette('--product-card-read-more')};
	text-underline-offset: 20%;
`;

const productCardHeading = css`
	${headlineBold20};
	color: ${palette('--product-card-headline')};
`;

const secondaryHeading = css`
	${headlineMedium17};
`;

const price = css`
	margin-top: auto;
	${textSansBold17};
`;

export const HorizontalSummaryProductCard = ({
	product,
	format,
}: {
	product: ProductBlockElement;
	format: ArticleFormat;
}) => {
	const cardCta = product.productCtas[0];
	if (!cardCta) return null;

	return (
		<div css={horizontalCard}>
			<div css={imageContainer}>
				<ProductCardImage
					format={format}
					image={product.image}
					url={cardCta.url}
				/>
			</div>
			<div css={informationContainer}>
				<div css={productCardHeading}>{product.primaryHeadingText}</div>
				<div css={secondaryHeading}>{product.secondaryHeadingHtml}</div>
				<a href={`#${product.h2Id}`} css={readMore}>
					Read more
				</a>
				<div css={price}>{cardCta.price}</div>
			</div>
			<div css={buttonContainer}>
				<ProductLinkButton
					size="small"
					fullwidth={true}
					minimisePadding={true}
					label={'Buy at ' + cardCta.retailer}
					url={cardCta.url}
				/>
			</div>
		</div>
	);
};
