import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	headlineMedium24,
	space,
	textSans15,
	textSans17,
	textSans20,
	until,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type { ProductImage } from '../types/content';
import { ProductCardImage } from './ProductCardImage';
import type { ProductCardCta } from './ProductElement';
import { ProductLinkButton } from './ProductLinkButton';

export type CustomAttributes = {
	name: string;
	value: string;
};

export type InlineProductCardProps = {
	format: ArticleFormat;
	brandName: string;
	productName: string;
	image?: ProductImage;
	primaryPrice?: string;
	productCtas: ProductCardCta[];
	customAttributes: CustomAttributes[];
	isCardOnly: boolean;
	shouldShowLeftColCard?: boolean;
};

const baseCard = css`
	padding: ${space[2]}px ${space[3]}px ${space[3]}px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
	row-gap: ${space[3]}px;
	max-width: 100%;
	img {
		width: 100%;
		height: auto;
	}
	${from.mobileLandscape} {
		column-gap: 20px;
	}
	${from.tablet} {
		img {
			height: 328px;
			width: 328px;
		}
	}
	${from.desktop} {
		img {
			height: 288px;
			width: 288px;
		}
	}
`;

const showLeftColCard = css`
	${from.wide} {
		display: none;
	}
`;

const showcaseCard = css`
	${baseCard};
	background-color: ${palette('--product-card-background')};
	border-top: 1px solid ${palette('--section-border-lifestyle')};
`;

const productCard = css`
	${baseCard};
	background-color: transparent;
	border-top: 1px solid ${palette('--section-border')};
`;

const productInfoContainer = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	${textSans20};

	${until.mobileLandscape} {
		${textSans17};
	}
`;

const primaryHeading = css`
	${headlineMedium24};
	${until.mobileLandscape} {
		${headlineMedium20};
	}
`;

const productNameStyle = css`
	${textSans20};
	${until.mobileLandscape} {
		${textSans17};
	}
`;

const priceStyle = css`
	font-weight: 700;
`;

const mobileButtonWrapper = css`
	grid-column: 1 / span 2;
	${from.mobileLandscape} {
		display: none;
	}
`;

const desktopButtonWrapper = css`
	display: none;
	${from.mobileLandscape} {
		display: inline;
	}
`;

const customAttributesContainer = css`
	grid-column: 1 / span 2;
	border-top: 1px solid ${palette('--section-border')};
	padding-top: ${space[3]}px;
	display: grid;
	gap: ${space[2]}px;

	${from.mobileLandscape} {
		grid-template-columns: 1fr 1fr;
	}
`;

const customAttributeItem = css`
	${textSans15};
	${from.phablet} {
		${textSans17};
	}
	strong {
		font-weight: 700;
	}
`;

const CustomAttribute = ({ name, value }: CustomAttributes) => (
	<div css={customAttributeItem}>
		<strong>{name}</strong>
		<br />
		{value}
	</div>
);

export const InlineProductCard = ({
	format,
	brandName,
	productName,
	primaryPrice,
	image,
	customAttributes,
	productCtas,
	isCardOnly = false,
	shouldShowLeftColCard = false,
}: InlineProductCardProps) => {
	return (
		<div
			css={[
				isCardOnly && productCard,
				!isCardOnly && showcaseCard,
				shouldShowLeftColCard && showLeftColCard,
			]}
		>
			<ProductCardImage
				format={format}
				image={image}
				url={productCtas[0]?.url}
			/>
			<div css={productInfoContainer}>
				<div css={primaryHeading}>{brandName}</div>
				<div css={productNameStyle}>{productName}</div>
				<div css={priceStyle}>{primaryPrice}</div>
				<div css={desktopButtonWrapper}>
					<ProductCardButtons
						productCtas={productCtas}
						dataComponent={'inline-product-card-buttons-desktop'}
					/>
				</div>
			</div>
			<div css={mobileButtonWrapper}>
				<ProductCardButtons
					productCtas={productCtas}
					dataComponent={'inline-product-card-buttons-mobile'}
				/>
			</div>
			{!isCardOnly && customAttributes.length > 0 && (
				<div css={customAttributesContainer}>
					{customAttributes.map((customAttribute) => (
						<CustomAttribute
							key={customAttribute.name}
							name={customAttribute.name}
							value={customAttribute.value}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export const ProductCardButtons = ({
	productCtas,
	dataComponent,
}: {
	productCtas: ProductCardCta[];
	dataComponent?: string;
}) => {
	return (
		<>
			{productCtas.map((productCta, index) => (
				<ProductLinkButton
					key={productCta.label}
					label={productCta.label}
					url={productCta.url}
					priority={index === 0 ? 'primary' : 'tertiary'}
					cssOverrides={
						index === 0
							? css`
									width: 100%;
							  `
							: css`
									width: 100%;
									margin-top: ${space[1]}px;
							  `
					}
					data-component={`${
						dataComponent ?? 'product-card-button'
					}-${index}`}
				/>
			))}
		</>
	);
};
