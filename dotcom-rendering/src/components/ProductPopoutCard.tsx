import { css } from '@emotion/react';
import {
	headlineBold17,
	headlineMedium15,
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import { Link } from '@guardian/source/react-components';
import { SKIMLINK_REL } from '../lib/affiliateLinksUtils';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { PopoutProduct } from '../types/content';
import {
	createAccessibleProductLabel,
	createStrikeThroughProductLabel,
	getProductLinkLabelWithPrice,
} from './Button/productUtils';
import { getPropsForLinkUrl } from './Button/utils';
import { ProductCardImage } from './ProductCardImage';

const cardStyles = css`
	display: flex;
	flex-direction: column;
`;

const imageStyles = css`
	figure {
		margin: 0;
	}
	img {
		width: 100%;
		height: auto;
	}
	margin-bottom: ${space[2]}px;
`;

const primaryHeadingStyles = css`
	${headlineBold17};
	color: ${palette('--product-card-headline')};
`;

const secondaryHeadingStyles = css`
	${headlineMedium15};
	color: ${palette('--product-card-headline')};
	margin-bottom: ${space[2]}px;
`;

const ctaListStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[1]}px;
	/* Pushes the jump link to the bottom so it lines up across a row of cards */
	margin-bottom: ${space[2]}px;
	margin-top: auto;
`;

const ctaLinkStyles = css`
	${textSansBold15};
	color: ${palette('--product-card-headline')};
	text-decoration-color: ${palette('--product-card-headline')};
	s {
		font-weight: normal;
	}
`;

const jumpLinkStyles = css`
	${textSans15};
	color: ${palette('--product-card-read-more')};
	text-decoration-color: ${palette('--product-card-read-more-decoration')};
	:hover {
		color: ${palette('--product-card-read-more')};
		text-decoration-color: ${palette('--product-card-read-more')};
	}
`;

type Props = {
	product: PopoutProduct;
	format: ArticleFormat;
	/** Called when the reader follows the in-article anchor, so the popout can close behind them. */
	onJumpToProduct: () => void;
};

export const ProductPopoutCard = ({
	product,
	format,
	onJumpToProduct,
}: Props) => {
	const leadCta = product.productCtas[0];

	return (
		<div css={cardStyles} data-component="product-popout-card">
			<div css={imageStyles}>
				<ProductCardImage
					xCustComponentId="product-popout-card"
					format={format}
					elementId={product.elementId}
					image={product.image}
					/**
					 * Linking the image to the retailer matches the in-article
					 * summary cards, and stops `ProductCardImage` offering a
					 * lightbox, which would open behind the popout.
					 */
					url={leadCta?.url}
				/>
			</div>
			<div css={primaryHeadingStyles}>{product.primaryHeadingText}</div>
			<div css={secondaryHeadingStyles}>
				{product.secondaryHeadingText ?? product.productName}
			</div>
			<div css={ctaListStyles}>
				{product.productCtas.map((cta) => {
					const label = getProductLinkLabelWithPrice(cta);
					return (
						<Link
							key={cta.url}
							{...getPropsForLinkUrl(
								createAccessibleProductLabel(label),
							)}
							/* The arrow icon is for buttons; these are links in a list */
							icon={undefined}
							href={cta.url}
							rel={SKIMLINK_REL}
							cssOverrides={ctaLinkStyles}
							data-component="product-popout-card"
							data-link-name="product popout cta"
							data-x-cust-component-id="product-popout-card"
							data-ignore="global-link-styling"
						>
							{createStrikeThroughProductLabel(label)}
						</Link>
					);
				})}
			</div>
			<Link
				href={`#${product.anchorId}`}
				onClick={onJumpToProduct}
				cssOverrides={jumpLinkStyles}
				data-component="product-popout-card"
				data-link-name="product popout jump to product"
				data-ignore="global-link-styling"
			>
				Jump to our review
			</Link>
		</div>
	);
};
