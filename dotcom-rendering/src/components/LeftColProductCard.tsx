import { css } from '@emotion/react';
import {
	headlineMedium17,
	palette,
	space,
	textSans17,
} from '@guardian/source/foundations';
import { ProductLinkButton } from './ProductLinkButton';

export type Statistics = {
	name: string;
	value: string;
};

export type InlineProductCardProps = {
	brandName: string;
	productName: string;
	image: string;
	url: string;
	price: string;
	retailer: string;
	statistics: Statistics[];
};

const card = css`
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: 220px;

	> * strong {
		font-weight: bold;
	}
	border-top: 1px solid ${palette.lifestyle[300]};
`;

const productInfoContainer = css`
	display: grid;
	gap: ${space[1]}px;
	padding-bottom: ${space[2]}px;
`;

const primaryHeading = css`
	${headlineMedium17};
`;

const secondaryHeading = css`
	${textSans17};
`;

const priceRowStyle = css`
	display: flex;
	align-items: baseline;
	${textSans17};
`;

const buttonOverride = css`
	button {
		background-color: ${palette.lifestyle[300]};
	}
	button:hover {
		background-color: ${palette.lifestyle[400]};
	}
	padding-bottom: ${space[4]}px;
	min-width: 100%;
`;

const statisticsContainer = css`
	border-top: 1px solid ${palette.neutral[86]};
	padding-top: ${space[3]}px;
	display: grid;
	gap: ${space[2]}px;
`;

const Statistic = ({ name, value }: Statistics) => (
	<div
		css={css`
			${textSans17};
			margin-top: 4px;
		`}
	>
		{name}: <br /> <strong>{value}</strong>
	</div>
);

export const LeftColProductCard = ({
	brandName,
	productName,
	image,
	url,
	price,
	retailer,
	statistics,
}: InlineProductCardProps) => (
	<div css={card}>
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
					alt={productName}
					css={{
						width: '100%',
						borderRadius: '6px',
						display: 'block',
					}}
				/>
			</a>
		)}
		<div css={productInfoContainer}>
			<div css={primaryHeading}>{brandName}</div>
			<div css={secondaryHeading}>{productName}</div>
			<div css={priceRowStyle}>
				<strong>{price}</strong>&nbsp;from&nbsp;
				<a
					css={css`
						color: ${palette.neutral[7]};
					`}
					href={url}
				>
					{retailer}
				</a>
			</div>
		</div>
		<div css={buttonOverride}>
			<ProductLinkButton
				label={'Show Now'}
				url={url}
				cssOverrides={css`
					min-width: 100%;
				`}
			></ProductLinkButton>
		</div>
		<div css={statisticsContainer}>
			{statistics.map((statistic) => (
				<Statistic
					key={statistic.name}
					name={statistic.name}
					value={statistic.value}
				/>
			))}
		</div>
	</div>
);
