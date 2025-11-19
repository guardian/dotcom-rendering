import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	headlineMedium24,
	space,
	textSans15,
	textSans17,
	textSans20,
	textSansBold17,
	textSansBold20,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import type {
	ProductCta,
	ProductCustomAttribute,
	ProductImage,
} from '../types/content';
import { ProductCardButtons } from './ProductCardButtons';
import { ProductCardImage } from './ProductCardImage';

export type InlineProductCardProps = {
	format: ArticleFormat;
	brandName: string;
	productName: string;
	image?: ProductImage;
	productCtas: ProductCta[];
	customAttributes: ProductCustomAttribute[];
	isCardOnly: boolean;
	shouldShowLeftColCard?: boolean;
	lowestPrice?: string;
};

const defaultGrid = css`
	grid-template:
		'image info'
		'buttons buttons'
		'custom-attributes custom-attributes' / 1fr 1fr;
	${from.mobileLandscape} {
		grid-template:
			'image info' auto
			'image buttons' 1fr
			'custom-attributes custom-attributes' / 1fr 1fr;
	}
`;

const noCustomAttributesGrid = css`
	grid-template:
		'image info'
		'buttons buttons' / 1fr 1fr;
	${from.mobileLandscape} {
		grid-template:
			'image info' auto
			'image buttons' 1fr / 1fr 1fr;
	}
`;

const baseCard = css`
	padding: ${space[2]}px ${space[3]}px ${space[3]}px;
	display: grid;
	column-gap: 10px;
	row-gap: ${space[4]}px;
	max-width: 100%;
	${from.mobileLandscape} {
		column-gap: 20px;
		row-gap: ${space[2]}px;
	}
`;

const hideFromWide = css`
	${from.wide} {
		display: none;
	}
`;

const showcaseCard = css`
	${baseCard};
	background-color: ${palette('--product-card-background')};
	border-top: 1px solid ${palette('--product-card-border')};
`;

const productCard = css`
	${baseCard};
	padding: ${space[2]}px 0 0;
	background-color: transparent;
	border-top: 1px solid ${palette('--section-border')};
`;

const productInfoContainer = css`
	grid-area: info;
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	${textSans17};

	${from.mobileLandscape} {
		${textSans20};
	}
`;

const primaryHeading = css`
	${headlineMedium20};
	${from.mobileLandscape} {
		${headlineMedium24};
	}
`;

const productNameStyle = css`
	${textSans17};
	> strong {
		${textSansBold17}
	}

	${from.mobileLandscape} {
		${textSans20};
		> strong {
			${textSansBold20}
		}
	}
`;

const buttonWrapper = css`
	grid-area: buttons;
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
`;

const customAttributesContainer = css`
	grid-area: custom-attributes;
	border-top: 1px solid ${palette('--product-card-border-neutral')};
	padding-top: ${space[2]}px;
	display: grid;
	gap: ${space[3]}px;
	margin-top: ${space[2]}px;

	${from.mobileLandscape} {
		grid-template-columns: 1fr 1fr;
		gap: ${space[5]}px;
	}
`;

const imageGridArea = css`
	grid-area: image;
	img {
		width: 100%;
		height: auto;
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

const CustomAttribute = ({ name, value }: ProductCustomAttribute) => (
	<div css={customAttributeItem}>
		<strong>{name}</strong>
		<br />
		{value}
	</div>
);

export const ProductCardInline = ({
	format,
	brandName,
	productName,
	image,
	customAttributes,
	productCtas,
	isCardOnly = false,
	shouldShowLeftColCard = false,
	lowestPrice,
}: InlineProductCardProps) => {
	const hasCustomAttributes = customAttributes.length > 0 && !isCardOnly;

	return (
		<div
			css={[
				isCardOnly ? productCard : showcaseCard,
				shouldShowLeftColCard && !isCardOnly && hideFromWide,
				hasCustomAttributes ? defaultGrid : noCustomAttributesGrid,
			]}
		>
			<div css={imageGridArea}>
				<ProductCardImage
					format={format}
					image={image}
					url={productCtas[0]?.url}
				/>
			</div>
			<div css={productInfoContainer}>
				<div css={primaryHeading}>{brandName}</div>
				<div css={productNameStyle}>{productName}</div>
				{!!lowestPrice && (
					<div css={productNameStyle}>
						{productCtas.length > 1 ? (
							<>
								from <strong>{lowestPrice}</strong>
							</>
						) : (
							<strong>{lowestPrice}</strong>
						)}
					</div>
				)}
			</div>
			<div css={buttonWrapper}>
				<ProductCardButtons
					productCtas={productCtas}
					dataComponent={'inline-product-card-buttons'}
				/>
			</div>
			{hasCustomAttributes && (
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
