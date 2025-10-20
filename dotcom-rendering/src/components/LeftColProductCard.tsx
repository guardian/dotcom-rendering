import { css } from '@emotion/react';
import {
	from,
	headlineMedium17,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { Caption } from './Caption';
import { ProductCardButtons } from './InlineProductCard';
import { Picture } from './Picture';
import type { ProductCardCta } from './ProductElement';

export type CustomAttributes = {
	name: string;
	value: string;
};

export type LeftColProductCardProps = {
	brandName: string;
	productName: string;
	image: string;
	altText: string;
	displayCredit: boolean;
	credit: string;
	customAttributes: CustomAttributes[];
	format: ArticleFormat;
	productCtas: ProductCardCta[];
	primaryPrice?: string;
};

const card = css`
	display: none;
	${from.wide} {
		top: ${space[3]}px;
		position: sticky;
		display: block;
		width: 220px;
		border-top: 1px solid ${palette('--section-border-lifestyle')};
	}
	img {
		height: 220px;
		width: 220px;
	}
	strong {
		font-weight: 700;
	}
`;

const productInfoContainer = css`
	display: grid;
	row-gap: ${space[1]}px;
	padding: ${space[1]}px 10px ${space[2]}px 0;
`;

const brandNameFont = css`
	${headlineMedium17};
`;

const productNameFont = css`
	${textSans17};
`;

const priceFont = css`
	${textSans17};
`;

const buttonContainer = css`
	padding-bottom: ${space[4]}px;
	min-width: 100%;
`;

const customAttributesContainer = css`
	border-top: 1px solid ${palette('--section-border')};
	padding-top: ${space[3]}px;
	padding-bottom: ${space[4]}px;
	display: grid;
	row-gap: ${space[3]}px;
`;

const CustomAttribute = ({ name, value }: CustomAttributes) => (
	<div
		css={css`
			${textSans15};
			margin-top: 4px;
		`}
	>
		<strong>{name}</strong>
		<br />
		{value}
	</div>
);

export const LeftColProductCard = ({
	brandName,
	productName,
	image,
	altText,
	displayCredit,
	credit,
	customAttributes,
	format,
	primaryPrice,
	productCtas,
}: LeftColProductCardProps) => {
	const imageElement = (
		<Picture
			role={'productCard'}
			format={format}
			master={image}
			alt={altText}
			height={220}
			width={220}
			loading={'eager'}
		/>
	);
	return (
		<div css={card}>
			{!!image && (
				<div
					css={css`
						figcaption {
							position: static;
						}
					`}
				>
					{productCtas[0]?.url ? (
						<a
							href={productCtas[0].url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{imageElement}
						</a>
					) : (
						imageElement
					)}
					<Caption
						shouldLimitWidth={true}
						format={format}
						isLeftCol={true}
						displayCredit={displayCredit}
						credit={credit}
						isOverlaid={false}
					/>
				</div>
			)}
			<div css={productInfoContainer}>
				<div css={brandNameFont}>{brandName}</div>
				<div css={productNameFont}>{productName}</div>
				<div css={priceFont}>
					<strong>{primaryPrice}</strong>
				</div>
			</div>
			<div css={buttonContainer}>
				<ProductCardButtons
					productCtas={productCtas}
					dataComponent={'left-col-product-card-buttons'}
				/>
			</div>
			{customAttributes.length > 0 && (
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
