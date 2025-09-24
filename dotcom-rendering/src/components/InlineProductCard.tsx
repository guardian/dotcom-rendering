import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	space,
	textSans14,
	textSans17,
} from '@guardian/source/foundations';
import type { ReactNode } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { Picture } from './Picture';
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
	strong {
		font-weight: 700;
	}
	border-top: 1px solid ${palette('--section-border-lifestyle')};
	${from.wide} {
		display: none;
	}
`;

export type InlineProductCardProps = {
	format: ArticleFormat;
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
	${textSans17};
	white-space: normal;
	display: grid;
	height: 117px;
	min-height: fit-content;
`;

const primaryHeading = css`
	${headlineMedium20};
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

const ButtonContainer = ({ children }: { children: ReactNode }) => (
	<div
		css={css`
			grid-column: span 2;
		`}
	>
		{children}
	</div>
);

const RetailerLink = ({ url, retailer }: { url: string; retailer: string }) => (
	<a
		css={css`
			color: ${palette('--article-text')};
			border-bottom: 1px solid ${palette('--article-link-border')};
			text-decoration: none;
			:hover,
			:active {
				border-bottom: 1px solid ${palette('--article-text')};
			}
		`}
		href={url}
	>
		{retailer}
	</a>
);
const ProductInfoContainer = ({ children }: { children: ReactNode }) => (
	<div css={productInfoContainer}>{children}</div>
);

export const InlineProductCard = ({
	format,
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
		{!!image && (
			<Picture
				role={'productCard'}
				format={format}
				master={image}
				alt={productName + brandName}
				height={1}
				width={1}
				loading={'eager'}
			/>
		)}
		<ProductInfoContainer>
			<div css={primaryHeading}>{brandName}</div>
			<div>{productName}</div>
			<div>
				<strong>{primaryPrice}</strong> from{' '}
				<RetailerLink url={primaryUrl} retailer={primaryRetailer} />
			</div>
		</ProductInfoContainer>
		<ButtonContainer>
			<ProductLinkButton
				label={primaryCTA}
				url={primaryUrl}
				cssOverrides={css`
					width: 100%;
					margin-bottom: 10px;
				`}
			/>
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
		</ButtonContainer>
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
