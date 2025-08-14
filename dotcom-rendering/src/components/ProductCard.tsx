import { css } from '@emotion/react';
import {
	headlineBold24,
	headlineMedium17,
	palette,
	space,
	textSans17,
	textSansBold15,
	textSansBold17,
} from '@guardian/source/foundations';
import { SvgArrowRightStraight } from '@guardian/source/react-components';
import { PillarButton } from './Discussion/PillarButton';

export type Product = {
	name: string;
	reviewHeading: string;
	image?: string;
	url: string;
	//need to consider the price, currency symbol and the retailer being passed through
	price: string;
	retailer: string;
};

const card = css`
	display: flex;
	flex-direction: column;
	background: #fff;
	padding: 10px;
	width: 260px; //not accurate as one in situ width will be determined by ratio
`;

const overallHeadingStyle = css`
	${headlineBold24};
	color: ${palette.lifestyle[300]};
`;

const titleStyle = css`
	${headlineMedium17};
`;

const priceRowStyle = css`
	display: flex;
	align-items: baseline;
	gap: 4px;
`;

const descriptionStyle = css`
	${textSans17};
	color: ${palette.neutral[20]};
	margin-bottom: ${space[3]}px;
`;

const priceStyle = css`
	${textSansBold17};
	color: ${palette.neutral[20]};
	margin-bottom: ${space[3]}px;
`;

const retailerLinkStyle = css`
	${textSans17};
	color: ${palette.neutral[20]};
	margin-bottom: ${space[3]}px;
	text-decoration: underline;
	text-decoration-color: ${palette.neutral[20]};
	&:hover {
		color: ${palette.lifestyle[400]};
		text-decoration-color: ${palette.lifestyle[400]};
	}
`;

const buttonOverride = css`
	button {
		background-color: ${palette.lifestyle[300]} !important;
	}
	button:hover {
		background-color: ${palette.lifestyle[400]} !important;
	}
`;

const readMoreStyle = css`
	${textSansBold15};
	color: ${palette.lifestyle[400]};
	text-decoration: underline;
	text-decoration-color: #dcdcdc; //todo find actual import
`;

export const ProductCard = ({
	name,
	reviewHeading,
	url,
	image,
	price,
	retailer,
}: Product) => (
	<div css={card}>
		{reviewHeading.trim() && (
			<span css={overallHeadingStyle}>{reviewHeading}</span>
		)}
		<div css={titleStyle}>{name}</div>
		<div css={readMoreStyle}>Read more</div>
		{!!image && (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				style={{
					display: 'block',
					marginBottom: '12px',
					borderRadius: '6px',
				}}
			>
				<img
					src={image}
					alt={name}
					css={{
						width: '100%',
						borderRadius: '6px',
						display: 'block',
					}}
				/>
			</a>
		)}
		<div css={priceRowStyle}>
			<div css={priceStyle}>{price} </div>
			<div css={descriptionStyle}> from </div>
			<a
				css={retailerLinkStyle}
				href={url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{retailer}
			</a>
		</div>
		<div css={buttonOverride}>
			<PillarButton
				priority="primary"
				icon={<SvgArrowRightStraight />}
				iconSide="right"
				linkName="product-card-cta"
				onClick={() => void window.open(url, '_blank', 'noopener')}
				size="small"
			>
				Shop Now
			</PillarButton>
		</div>
	</div>
);
