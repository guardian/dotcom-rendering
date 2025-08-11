import { css } from '@emotion/react';
import {
	headlineBold24,
	palette,
	space,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { ProductLinkButton } from './ProductLinkButton';

export type Product = {
	name: string;
	reviewHeading: string;
	image?: string;
	description: string;
	url: string;
	cta: string;
};

const card = css`
	display: flex;
	flex-direction: column;
	background: #fff;
	padding: 10px;
	width: 260px;
	box-shadow: 0 2px 8px ${palette.neutral[86]}22;
`;

const overallHeadingStyle = css`
	${headlineBold24};
	color: ${palette.lifestyle[400]};
`;

const titleStyle = css`
	${textSansBold17};
`;

const descriptionStyle = css`
	${textSans17};
	color: ${palette.neutral[20]};
	margin-bottom: ${space[3]}px;
`;

export const ProductCard = ({
	name,
	reviewHeading,
	description,
	url,
	cta,
	image,
}: Product) => (
	<div css={card}>
		{reviewHeading.trim() && (
			<span css={overallHeadingStyle}>{reviewHeading}</span>
		)}
		<div css={titleStyle}>{name}</div>
		{!!image && (
			<img
				src={image}
				alt={name}
				css={{
					width: '100%',
					borderRadius: '6px',
					marginBottom: '12px',
				}}
			/>
		)}
		<div css={descriptionStyle}>{description}</div>
		<ProductLinkButton label={cta} url={url} />
	</div>
);
