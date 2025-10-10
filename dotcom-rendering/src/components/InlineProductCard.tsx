import { css } from '@emotion/react';
import {
	from,
	headlineMedium20,
	headlineMedium24,
	space,
	textSans15,
	textSans17,
	textSans20,
	until,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { Picture } from './Picture';
import { ProductLinkButton } from './ProductLinkButton';
import { stripHtmlFromString } from './TextBlockComponent';

export type Statistics = {
	name: string;
	value: string;
};

export type InlineProductCardProps = {
	format: ArticleFormat;
	brandName: string;
	productName: string;
	image: string;
	primaryCTA: string;
	primaryUrl: string;
	primaryPrice: string;
	secondaryCTA?: string;
	secondaryUrl?: string;
	statistics: Statistics[];
};

const card = css`
	background-color: ${palette('--product-card-background')};
	padding: ${space[2]}px ${space[3]}px ${space[3]}px;
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 12px;
	row-gap: ${space[3]}px;
	border-top: 1px solid ${palette('--section-border-lifestyle')};
	max-width: 100%;

	img {
		height: 165px;
		width: 165px;
		object-fit: cover;
	}

	${from.phablet} {
		img {
			height: 288px;
			width: 288px;
		}
	}
`;

const productInfoContainer = css`
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	${textSans20};

	${until.phablet} {
		${textSans17};
	}
`;

const primaryHeading = css`
	${headlineMedium24};
	${until.phablet} {
		${headlineMedium20};
	}
`;

const productNameStyle = css`
	${textSans20};
	${until.phablet} {
		${textSans17};
	}
`;

const priceStyle = css`
	font-weight: 700;
`;

/* Mobile buttons below top row */
const mobileButtonWrapper = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	width: 100%;
	grid-column: 1 / span 2;
	margin-top: ${space[1]}px;

	${from.phablet} {
		display: none;
	}
`;

/* Phablet+ buttons directly under product info */
const desktopButtonWrapper = css`
	display: none;

	${from.phablet} {
		display: flex;
		flex-direction: column;
		gap: ${space[1]}px;
		margin-top: 8px;
	}
`;

const statisticsContainer = css`
	grid-column: 1 / span 2;
	border-top: 1px solid ${palette('--section-border')};
	padding-top: ${space[3]}px;
	display: grid;
	gap: ${space[2]}px;

	${from.phablet} {
		grid-template-columns: 1fr 1fr;
	}
`;

const statisticItem = css`
	${textSans15};
`;

const Statistic = ({ name, value }: Statistics) => (
	<div css={statisticItem}>
		<strong>{name}</strong>
		<br />
		{value}
	</div>
);

export const InlineProductCard = ({
	format,
	brandName,
	productName,
	image,
	primaryCTA,
	primaryUrl,
	primaryPrice,
	secondaryCTA,
	secondaryUrl,
	statistics,
}: InlineProductCardProps) => (
	<div css={card}>
		{/* Image */}
		{!!image && (
			<Picture
				role={'productCard'}
				format={format}
				master={image}
				alt={productName + brandName}
				height={165}
				width={165}
				loading={'eager'}
			/>
		)}

		{/* Product info column */}
		<div css={productInfoContainer}>
			<div css={primaryHeading}>{brandName}</div>
			<div css={productNameStyle}>{productName}</div>
			<div css={priceStyle}>{primaryPrice}</div>

			{/* Desktop buttons only */}
			<div css={desktopButtonWrapper}>
				<ProductLinkButton
					label={stripHtmlFromString(primaryCTA)}
					url={primaryUrl}
					cssOverrides={css`
						width: 100%;
					`}
				/>
				{!!secondaryCTA && !!secondaryUrl && (
					<ProductLinkButton
						label={stripHtmlFromString(secondaryCTA)}
						url={secondaryUrl}
						priority="tertiary"
						cssOverrides={css`
							width: 100%;
						`}
					/>
				)}
			</div>
		</div>

		{/* Mobile buttons only */}
		<div css={mobileButtonWrapper}>
			<ProductLinkButton
				label={stripHtmlFromString(primaryCTA)}
				url={primaryUrl}
				cssOverrides={css`
					width: 100%;
				`}
			/>
			{!!secondaryCTA && !!secondaryUrl && (
				<ProductLinkButton
					label={stripHtmlFromString(secondaryCTA)}
					url={secondaryUrl}
					priority="tertiary"
					cssOverrides={css`
						width: 100%;
					`}
				/>
			)}
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
