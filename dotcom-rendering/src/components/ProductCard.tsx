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
	link: string;
};

const LinkSVG = () => (
	<svg
		viewBox="0 0 16 16"
		version="1.1"
		width="16"
		height="16"
		aria-hidden="true"
	>
		<path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
	</svg>
);

const sentenceToKebabCase = (str: string): string => {
	return str
		.toLowerCase() // Convert the string to lowercase
		.trim() // Remove leading and trailing spaces
		.replace(/[^a-z0-9]+/g, '-'); // Replace non-alphanumeric characters with hyphens
};

export const ProductCard = ({ image, title, price, link, stars }: Product) => {
	const productRow = css`
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
		display: flex;
		justify-content: center;
		overflow: hidden;
		width: 100%;
		img {
			height: 200px;
		}
	`;

	const productTitle = css`
		${textSansBold17};
		min-height: 70px;
		margin: ${space[3]}px 0 0;
		padding-bottom: ${space[3]}px;
		svg {
			display: none;
		}
		:hover {
			text-decoration: underline;
			svg {
				display: block;
			}
		}
	`;

	const starRating = css`
		${textSansBold17};
		colour: ${palette.neutral['46']};
	`;

	return (
		<div css={productRow}>
			<div css={productTitle}>
				<div
					css={css`
						width: 16px;
						height: 16px;
						display: inline-block;
						margin-right: ${space[1]}px;
					`}
				>
					<LinkSVG />
				</div>
				<a
					href={`#${sentenceToKebabCase(title)}`}
					css={css`
						text-decoration: none;
						color: ${palette.neutral[7]};
					`}
				>
					<strong>{title}</strong>
				</a>
			</div>
			<div css={productRowImage}>
				<img src={image} alt={title} />
			</div>
			<div css={productRowDetails}>
				<p css={starRating}>{stars}</p>
				<p> Reviewed at {price}</p>
				<div
					css={css`
						display: inline;
					`}
				>
					<a
						href={link}
						css={css`
							display: inline-block;
							text-decoration: none;
						`}
					>
						<img
							src="/static/frontend/logos/clippy_bouncing.gif"
							width="200"
							height="200"
							alt="a paper clip with big eyes and eyebrows on a white background"
							fetchPriority="high"
							css={css`
								max-width: 200px;
								background-color: unset;
							`}
						/>
					</a>
				</div>
			</div>
		</div>
	);
};
