import { css } from '@emotion/react';
import {
	from,
	headlineBold20,
	headlineMedium17,
	space,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { EnhancedProductSummaryMap } from '../types/content';
import { ProductLinkButton } from './Button/ProductLinkButton';
import { ProductCardImage } from './ProductCardImage';

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
	text-decoration-color: ${palette('--product-card-read-more-decoration')};
	color: ${palette('--product-card-read-more')};
	:hover {
		color: ${palette('--product-card-read-more')};
		text-decoration-color: ${palette('--product-card-read-more')};
	}
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
	product: EnhancedProductSummaryMap;
	format: ArticleFormat;
}) => {
	const { productBlock, ctaIndex } = product;
	const cardCta = productBlock.productCtas[ctaIndex];
	if (!cardCta) {
		return null;
	}

	return (
		<div css={horizontalCard}>
			<div css={imageContainer}>
				<ProductCardImage
					xCustComponentId={'horizontal-summary-card'}
					format={format}
					image={productBlock.image}
					url={cardCta.url}
				/>
			</div>
			<div css={informationContainer}>
				<div css={productCardHeading}>
					{productBlock.primaryHeadingText}
				</div>
				<div css={secondaryHeading}>
					{productBlock.secondaryHeadingText}
				</div>
				<Link
					href={`#${productBlock.h2Id}`}
					onFocus={(event) => event.stopPropagation()}
					cssOverrides={readMore}
					data-component="at-a-glance-stacked-card-read-more"
					data-link-name="product read more link"
					data-ignore="global-link-styling"
				>
					Read more
				</Link>
				<div css={price}>{cardCta.price}</div>
			</div>
			<div css={buttonContainer}>
				<ProductLinkButton
					size="small"
					xCustComponentId="horizontal-summary-card"
					fullwidth={true}
					minimisePadding={true}
					label={'Buy at ' + cardCta.retailer}
					url={cardCta.url}
				/>
			</div>
		</div>
	);
};
