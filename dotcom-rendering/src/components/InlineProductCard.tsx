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
import { Caption } from './Caption';
import { Picture } from './Picture';
import { ProductLinkButton } from './ProductLinkButton';

export type CustomAttributes = {
	name: string;
	value: string;
};

export type InlineProductCardProps = {
	format: ArticleFormat;
	brandName: string;
	productName: string;
	image: string;
	altText: string;
	credit: string;
	displayCredit: boolean;
	primaryCta: string;
	primaryUrl: string;
	primaryPrice: string;
	secondaryCta?: string;
	secondaryUrl?: string;
	customAttributes: CustomAttributes[];
	isCardOnly: boolean;
};

const baseCard = css`
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
	${from.wide} {
		display: none;
	}
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
	grid-column: 1 / span 2;
	${from.mobileLandscape} {
		display: none;
	}
`;

const desktopButtonWrapper = css`
	display: none;
	${from.mobileLandscape} {
		display: inline;
	}
`;

const customAttributesContainer = css`
	grid-column: 1 / span 2;
	border-top: 1px solid ${palette('--section-border')};
	padding-top: ${space[3]}px;
	display: grid;
	gap: ${space[2]}px;

	${from.mobileLandscape} {
		grid-template-columns: 1fr 1fr;
	}
`;

const customAttributeItem = css`
	${textSans15};
	${from.phablet} {
		${textSans17};
	}
	strong {
		font-weight: 700;
	}
`;

const CustomAttribute = ({ name, value }: CustomAttributes) => (
	<div css={customAttributeItem}>
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
	altText,
	credit,
	displayCredit,
	primaryCta,
	primaryUrl,
	primaryPrice,
	secondaryCta,
	secondaryUrl,
	customAttributes,
	isCardOnly = false,
}: InlineProductCardProps) => {
	return (
		<div css={[isCardOnly && productCard, !isCardOnly && showcaseCard]}>
			{!!image && (
				<div>
					<Picture
						role={'productCard'}
						format={format}
						master={image}
						alt={altText}
						height={165}
						width={165}
						loading={'eager'}
					/>
					<Caption
						shouldLimitWidth={true}
						format={format}
						isLeftCol={true}
						displayCredit={displayCredit}
						credit={credit}
						isOverlaid={false}
					/>
				</div>
			)}
			<div css={productInfoContainer}>
				<div css={primaryHeading}>{brandName}</div>
				<div css={productNameStyle}>{productName}</div>
				<div css={priceStyle}>{primaryPrice}</div>
				<div css={desktopButtonWrapper}>
					<ProductCardButtons
						primaryCta={primaryCta}
						primaryUrl={primaryUrl}
						secondaryCta={secondaryCta}
						secondaryUrl={secondaryUrl}
					/>
				</div>
			</div>
			<div css={mobileButtonWrapper}>
				<ProductCardButtons
					primaryCta={primaryCta}
					primaryUrl={primaryUrl}
					secondaryUrl={secondaryUrl}
					secondaryCta={secondaryCta}
				/>
			</div>
			{!isCardOnly && customAttributes.length > 0 && (
				<div css={customAttributesContainer}>
					{customAttributes.map((customAttribute) => (
						<CustomAttribute
							key={customAttribute.name}
							name={customAttribute.name}
							value={customAttribute.value}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const ProductCardButtons = ({
	primaryCta,
	primaryUrl,
	secondaryCta,
	secondaryUrl,
}: {
	primaryCta: string;
	primaryUrl: string;
	secondaryCta?: string;
	secondaryUrl?: string;
}) => {
	return (
		<>
			<ProductLinkButton
				dataComponent="inline-product-card-primary-button"
				label={primaryCta}
				url={primaryUrl}
				cssOverrides={css`
					width: 100%;
				`}
			/>
			{!!secondaryCta && !!secondaryUrl && (
				<ProductLinkButton
					dataComponent="inline-product-card-secondary-button"
					label={secondaryCta}
					url={secondaryUrl}
					priority="tertiary"
					cssOverrides={css`
						width: 100%;
						margin-top: ${space[1]}px;
					`}
				/>
			)}
		</>
	);
};
