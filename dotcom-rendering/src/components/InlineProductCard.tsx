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
import type { ReactNode } from 'react';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { Picture } from './Picture';
import { ProductLinkButton } from './ProductLinkButton';
import { stripHtmlFromString } from './TextBlockComponent';

export type Statistics = {
	name: string;
	value: string;
};

const card = css`
	background-color: ${palette('--product-card-background')};
	padding: ${space[2]}px ${space[3]}px ${space[3]}px ${space[3]}px;
	column-gap: 10px;
	display: grid;
	max-width: 100%;
	min-width: 100%;
	row-gap: ${space[4]}px;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;

	strong {
		font-weight: 700;
	}
	img {
		height: 165px;
		width: 165px;
	}
	border-top: 1px solid ${palette('--section-border-lifestyle')};

	${from.phablet} {
		column-gap: 10px;
		row-gap: ${space[4]}px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		strong {
			font-weight: 700;
		}
		img {
			height: 288px;
			width: 288px;
		}
	}

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
	${textSans20}
	${until.phablet} {
		${textSans17};
	}
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
`;

const primaryHeading = css`
	${headlineMedium24};
	${until.phablet} {
		${headlineMedium20};
	}
`;

const statisticsContainer = css`
	grid-column: span 2;
	border-top: 1px solid ${palette('--section-border')};
	display: grid;
	grid-template-columns: 1fr;
	gap: 2px;
	align-self: start;

	${from.phablet} {
		grid-template-columns: 1fr 1fr;
	}
`;

const Statistic = ({ name, value }: Statistics) => (
	<div
		css={css`
			${textSans15};
			margin-top: ${space[2]}px;
		`}
	>
		<strong>{name}</strong> <br /> {value}
	</div>
);

const ButtonContainer = ({ children }: { children: ReactNode }) => (
	<div
		css={css`
			grid-column: span 2;
			margin-top: 8px;

			${from.phablet} {
				grid-column: span 2;
				margin-top: 8px;
			}

			display: flex;
			flex-direction: column;
			gap: ${space[1]}px;
			padding-bottom: ${space[2]}px;
		`}
	>
		{children}
	</div>
);

const InfoAndButtons = ({ children }: { children: ReactNode }) => (
	<div
		css={css`
			${from.phablet} {
				grid-column: 2;
				display: flex;
				flex-direction: column;
				gap: 8px;
			}
		`}
	>
		{children}
	</div>
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
				height={165}
				width={165}
				loading={'eager'}
			/>
		)}
		<InfoAndButtons>
			<ProductInfoContainer>
				<div css={primaryHeading}>{brandName}</div>
				<div>{productName}</div>
				<strong>{primaryPrice}</strong>
			</ProductInfoContainer>
			<ButtonContainer>
				<ProductLinkButton
					label={stripHtmlFromString(primaryCTA)}
					url={primaryUrl}
					cssOverrides={css`
						width: 100%;
					`}
				/>
				{!!secondaryCTA && !!secondaryUrl && (
					<ProductLinkButton
						cssOverrides={css`
							width: 100%;
						`}
						label={stripHtmlFromString(secondaryCTA)}
						url={secondaryUrl}
						priority={'tertiary'}
					/>
				)}
			</ButtonContainer>
		</InfoAndButtons>
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
