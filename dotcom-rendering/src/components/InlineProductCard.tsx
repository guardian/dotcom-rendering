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
import type { ProductDisplayType } from '../types/content';
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
	displayType: ProductDisplayType;
};

const baseCard = css`
	${from.wide} {
		display: none;
	}
	padding: ${space[2]}px ${space[3]}px ${space[3]}px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 10px;
	row-gap: ${space[3]}px;
	max-width: 100%;
	img {
		width: 100%;
		height: auto;
	}
	${from.mobileLandscape} {
		column-gap: 20px;
	}
	${from.tablet} {
		img {
			height: 328px;
			width: 328px;
		}
	}
	${from.desktop} {
		img {
			height: 288px;
			width: 288px;
		}
	}
`;

const showcaseCard = css`
	${baseCard};
	background-color: ${palette('--product-card-background')};
	border-top: 1px solid ${palette('--section-border-lifestyle')};
`;

const productCard = css`
	${baseCard};
	background-color: transparent;
	border-top: 1px solid ${palette('--section-border')};
`;

const productInfoContainer = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	${textSans20};

	${until.mobileLandscape} {
		${textSans17};
	}
`;

const primaryHeading = css`
	${headlineMedium24};
	${until.mobileLandscape} {
		${headlineMedium20};
	}
`;

const productNameStyle = css`
	${textSans20};
	${until.mobileLandscape} {
		${textSans17};
	}
`;

const priceStyle = css`
	font-weight: 700;
`;

const mobileButtonWrapper = css`
	display: flex;
	flex-direction: column;
	gap: ${space[1]}px;
	width: 100%;
	grid-column: 1 / span 2;
	margin-top: ${space[1]}px;

	${from.mobileLandscape} {
		display: none;
	}
`;

const desktopButtonWrapper = css`
	display: none;

	${from.mobileLandscape} {
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

	${from.mobileLandscape} {
		grid-template-columns: 1fr 1fr;
	}
`;

const statisticItem = css`
	${textSans15};
	${from.phablet} {
		${textSans17};
	}
	strong {
		font-weight: 700;
	}
`;

const Statistic = ({ name, value }: Statistics) => (
	<div css={statisticItem}>
		<strong>{name}</strong>
		<br />
		{value}
	</div>
);

const getCardStyle = (displayType: ProductDisplayType) => {
	switch (displayType) {
		case 'product-card-only':
			return productCard;
		case 'inline-and-product-card':
		default:
			return showcaseCard;
	}
};

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
	displayType,
}: InlineProductCardProps) => (
	<div css={getCardStyle(displayType)}>
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
		<div css={productInfoContainer}>
			<div css={primaryHeading}>{brandName}</div>
			<div css={productNameStyle}>{productName}</div>
			<div css={priceStyle}>{primaryPrice}</div>
			<div css={desktopButtonWrapper}>
				<ProductLinkButton
					dataComponent="inline-product-card-primary-button"
					label={stripHtmlFromString(primaryCTA)}
					url={primaryUrl}
					cssOverrides={css`
						width: 100%;
					`}
				/>
				{!!secondaryCTA && !!secondaryUrl && (
					<ProductLinkButton
						dataComponent="inline-product-card-secondary-button"
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
		{displayType === 'inline-and-product-card' && statistics.length > 0 && (
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
