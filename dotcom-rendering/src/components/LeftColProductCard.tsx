import { css } from '@emotion/react';
import {
	from,
	headlineMedium17,
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
	display: none;
	${from.wide} {
		top: ${space[3]}px;
		position: sticky;
		display: block;
		margin-top: 10px;
		padding: 10px;
		width: 220px;
		border-top: 1px solid ${palette('--section-border-lifestyle')};
	}
	strong {
		font-weight: 700;
	}
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
		{name}:<br />
		<strong>{value}</strong>
	</div>
);

//todo -- make this a proper image generateSources() etc.

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
				<img
					src={image}
					alt={productName}
					css={{
						width: '200px',
						height: '200px',
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
