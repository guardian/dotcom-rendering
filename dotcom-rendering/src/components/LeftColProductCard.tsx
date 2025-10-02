import { css } from '@emotion/react';
import {
	from,
	headlineMedium17,
	space,
	textSans15,
	textSans17,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { Picture } from './Picture';
import { ProductLinkButton } from './ProductLinkButton';

export type Statistics = {
	name: string;
	value: string;
};

export type LeftColProductCardProps = {
	brandName: string;
	productName: string;
	image: string;
	primaryCta: string;
	primaryUrl: string;
	primaryPrice: string;
	statistics: Statistics[];
	format: ArticleFormat;
};

const card = css`
	display: none;
	${from.wide} {
		position: sticky;
		display: block;
		margin-top: ${space[3]}px;
		width: 220px;
		border-top: 1px solid ${palette('--section-border-lifestyle')};
	}
	img {
		height: 220px;
		width: 220px;
	}
	strong {
		font-weight: 700;
	}
`;

const productInfoContainer = css`
	display: grid;
	row-gap: ${space[1]}px;
	padding: 0 10px 8px 0;
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
	padding-bottom: ${space[4]}px;
	display: grid;
	row-gap: ${space[3]}px;
`;

const Statistic = ({ name, value }: Statistics) => (
	<div
		css={css`
			${textSans15};
			margin-top: 4px;
		`}
	>
		<strong>{name}</strong>
		<br />
		{value}
	</div>
);

//todo -- make this a proper image generateSources() etc.

export const LeftColProductCard = ({
	brandName,
	productName,
	image,
	primaryCta,
	primaryUrl,
	primaryPrice,
	statistics,
	format,
}: LeftColProductCardProps) => (
	<div css={card}>
		{!!image && (
			<Picture
				role={'productCard'}
				format={format}
				master={image}
				alt={productName + brandName}
				height={220}
				width={220}
				loading={'eager'}
			/>
		)}
		<div css={productInfoContainer}>
			<div css={primaryHeading}>{brandName}</div>
			<div css={secondaryHeading}>{productName}</div>
			<div css={priceRowStyle}>
				<strong>{primaryPrice}</strong>
			</div>
		</div>
		<div css={buttonOverride}>
			<ProductLinkButton
				label={primaryCta}
				url={primaryUrl}
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
