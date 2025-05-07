import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans15,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';

export type Product = {
	image: string;
	title: string;
	price: string;
	stars: string;
	description: string;
};

export const ProductCard = ({
	image,
	title,
	price,
	description,
	stars,
}: Product) => {
	const productRow = css`
		display: table-column;

		padding: 16px;
		background-color: #f9f9f9;
		border: 1px solid #ddd;
		border-radius: 8px;
		width: 300px;
	`;
	const productRowDetails = css`
		margin-left: 16px;
		> * {
			margin: ${space[3]}px 0 0;
			${textSans15}
		}
		strong {
			${textSansBold15}
		}
	`;
	const productRowImage = css`
		display: table-cell;
		height: 200px;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 8px;
		}
	`;

	const productTitle = css`
		${textSansBold17};
		min-height: 50px;
		margin: ${space[3]}px 0 0;
	`;

	const starRating = css`
		${textSansBold17};
		color: ${palette.neutral['46']};
	`;

	return (
		<div css={productRow}>
			<p css={productTitle}>
				<strong>{title}</strong>
			</p>
			<div css={productRowImage}>
				<img src={image} alt={title} />
			</div>
			<div css={productRowDetails}>
				<p css={starRating}>{stars}</p>
				<p> Reviewed at {price}</p>
				<p>{description}</p>
			</div>
		</div>
	);
};
