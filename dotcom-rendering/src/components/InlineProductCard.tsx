import { css } from '@emotion/react';
import {
	headlineMedium20,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import { palette } from '../palette';
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
	background-color: ${palette('--product-card-background')};
	padding: ${space[4]}px;
	column-gap: ${space[2]}px;
	display: grid;
	max-width: 100%;
	min-width: 100%;
	grid-template-columns: 117px 1fr;
	> * strong {
		font-weight: 700;
	}
	border-top: 1px solid ${palette('--section-border-lifestyle')};
`;

const productInfoContainer = css`
	white-space: normal;
	display: grid;
	gap: ${space[1]}px;
	padding-bottom: ${space[2]}px;
`;

const primaryHeading = css`
	${headlineMedium20};
`;

const secondaryHeading = css`
	${textSans17};
`;

const priceRowStyle = css`
	${textSans17};
`;
const statisticsContainer = css`
	grid-column: span 2;
	border-top: 1px solid ${palette('--section-border')};
	padding-top: ${space[3]}px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${space[2]}px;
`;

const Statistic = ({ name, value }: Statistics) => (
	<div
		css={css`
			${textSans14};
			margin-top: 4px;
		`}
	>
		{name}: <br /> <strong>{value}</strong>
	</div>
);

export const InlineProductCard = ({
	brandName,
	productName,
	image,
	url,
	price,
	retailer,
	statistics,
}: InlineProductCardProps) => (
	<div css={card}>
		<div>
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
		</div>
		<div css={productInfoContainer}>
			<span css={primaryHeading}>{brandName}</span>
			<span css={secondaryHeading}>{productName}</span>
			<span css={priceRowStyle}>
				<strong>{price}</strong> from{' '}
				<a
					css={css`
						color: ${palette('--article-text')};
						border-bottom: 1px solid
							${palette('--article-link-border')};
						text-decoration: none;
						:hover,
						:active {
							border-bottom: 1px solid
								${palette('--article-text')};
						}
					`}
					href={url}
				>
					{retailer}
				</a>
			</span>
			<ProductLinkButton
				label={'Shop Now'}
				size={'small'}
				url={url}
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
