import { css } from '@emotion/react';
import {
	from,
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

const card = css`
	background-color: ${palette('--product-card-background')};
	padding: ${space[4]}px;
	column-gap: ${space[2]}px;
	display: grid;
	max-width: 100%;
	min-width: 100%;
	row-gap: ${space[4]}px;
	grid-template-columns: 1fr 1fr;
	> * strong {
		font-weight: 700;
	}
	border-top: 1px solid ${palette('--section-border-lifestyle')};
	${from.wide} {
		display: none;
	}
`;

export type InlineProductCardProps = {
	brandName: string;
	productName: string;
	image: string;
	primaryCTA: string;
	primaryUrl: string;
	primaryPrice: string;
	primaryRetailer: string;
	secondaryCTA?: string;
	secondaryUrl?: string;
	statistics: Statistics[];
};

const productInfoContainer = css`
	white-space: normal;
	display: grid;
	height: 117px;
	min-height: fit-content;
`;

const primaryHeading = css`
	${headlineMedium20};
`;

const secondaryHeading = css`
	${textSans17};
`;

const priceRowStyle = css`
	${textSans17};
	padding-bottom: ${space[2]}px;
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
	primaryCTA,
	primaryUrl,
	primaryPrice,
	primaryRetailer,
	secondaryCTA,
	secondaryUrl,
	statistics,
}: InlineProductCardProps) => (
	<div css={card}>
		<div
			css={css`
				width: 165px;
			`}
		>
			{!!image && (
				<a
					href={primaryUrl}
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
						css={css`
							width: 165px;
							height: 165px;
						`}
					/>
				</a>
			)}
		</div>
		<div css={productInfoContainer}>
			<span css={primaryHeading}>{brandName}</span>
			<span css={secondaryHeading}>{productName}</span>
			<span css={priceRowStyle}>
				<strong>{primaryPrice}</strong> from{' '}
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
					href={primaryUrl}
				>
					{primaryRetailer}
				</a>
			</span>
		</div>
		<div
			css={css`
				grid-column: span 2;
			`}
		>
			<div
				css={css`
					padding-bottom: 10px;
					width: 100%;
				`}
			>
				<ProductLinkButton
					label={primaryCTA}
					url={primaryUrl}
					cssOverrides={css`
						width: 100%;
					`}
				></ProductLinkButton>
			</div>
			<div>
				{!!secondaryCTA && !!secondaryUrl && (
					<ProductLinkButton
						cssOverrides={css`
							width: 100%;
						`}
						label={secondaryCTA}
						url={secondaryUrl}
						priority={'tertiary'}
					/>
				)}
			</div>
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
