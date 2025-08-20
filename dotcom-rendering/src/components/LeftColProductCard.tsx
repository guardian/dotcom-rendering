import { css } from '@emotion/react';
import {
	from,
	headlineMedium17,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import { grid } from '../grid';
import { palette } from '../palette';
import { ProductLinkButton } from './ProductLinkButton';

export type Statistics = {
	name: string;
	value: string;
};

export type LeftColProductCardProps = {
	brandName: string;
	productName: string;
	image: string;
	url: string;
	price: string;
	retailer: string;
	statistics: Statistics[];
};

const card = css`
	top: ${space[3]}px;
	position: sticky;
	display: none;
	${from.wide} {
		display: block;
	}
	${grid.column.left}
	grid-template-columns: 1fr;
	padding: 10px;
	width: 220px;

	> * strong {
		font-weight: 700;
	}
	border-top: 1px solid ${palette('--section-border-lifestyle')};
`;

const productInfoContainer = css`
	display: grid;
	row-gap: ${space[1]}px;
	padding-bottom: ${space[2]}px;
`;

const primaryHeading = css`
	${headlineMedium17};
`;

const secondaryHeading = css`
	${textSans17};
`;

const priceRowStyle = css`
	${textSans17};
`;

const buttonOverride = css`
	padding-bottom: ${space[4]}px;
	min-width: 100%;
`;

const statisticsContainer = css`
	border-top: 1px solid ${palette('--section-border')};
	padding-top: ${space[3]}px;
	display: grid;
	row-gap: ${space[2]}px;
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

export const LeftColProductCard = ({
	brandName,
	productName,
	image,
	url,
	price,
	retailer,
	statistics,
}: LeftColProductCardProps) => (
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
				//todo -- make this a proper image generateSources() etc.
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
			</div>
		</div>
		<div css={buttonOverride}>
			<ProductLinkButton
				label={'Shop Now'}
				url={url}
				size={'small'}
				cssOverrides={css`
					min-width: 100%;
				`}
			></ProductLinkButton>
		</div>
		{statistics.length > 0 && (
			<div css={statisticsContainer}>
				{statistics.map((statistic) => (
					<Statistic
						key={statistic.name}
						name={statistic.name}
						value={statistic.value}
					/>
				))}
			</div>
		)}
	</div>
);
