import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import {
	palette,
	space,
	textSans15,
	textSansBold14,
	textSansBold15,
	until,
} from '@guardian/source/foundations';
import {
	Radio,
	RadioGroup,
	Stack,
	SvgTickRound,
	type ThemeRadio,
	themeRadio,
} from '@guardian/source/react-components';
import type { CountryGroupId } from '@guardian/support-dotcom-components';
import {
	countryCodeToCountryGroupId,
	getLocalCurrencySymbol,
} from '@guardian/support-dotcom-components';
import type { Dispatch, SetStateAction } from 'react';
import type {
	SupportRatePlan,
	SupportTier,
} from './utils/threeTierChoiceCardAmounts';
import { threeTierChoiceCardAmounts } from './utils/threeTierChoiceCardAmounts';

const supportTierChoiceCardStyles = (selected: boolean) => css`
	display: block;
	border: ${selected
		? `2px solid ${palette.brand['500']}`
		: `1px solid ${palette.neutral[46]}`};
	background-color: ${palette.neutral[100]};
	border-radius: 10px;
	padding: ${selected
		? `6px ${space[5]}px 10px ${space[5]}px`
		: `6px ${space[5]}px`};
`;

const benefitsStyles = css`
	${textSans15};
	color: ${palette.neutral[7]};
	list-style: none;
	margin: 0 0 0 -4px;
	padding: 0;

	li + li {
		margin-top: ${space[2]}px;
	}

	li {
		display: flex;
		align-items: flex-start;
		margin-top: ${space[2]}px;
	}

	svg {
		flex-shrink: 0;
		margin-right: ${space[2]}px;
		fill: ${palette.brand[400]};
	}
`;

const benefitsLabelStyles = css`
	color: ${palette.neutral[0]};
	${textSans15};

	strong {
		${textSansBold15};
	}
`;

const labelOverrideStyles = (isSelected: boolean) => css`
	+ label div {
		${isSelected ? 'font-weight: bold;' : ''}
		s {
			font-weight: normal;
		}
	}
`;

const supportingTextStyles = css`
	margin-top: ${space[4]}px;
`;

const recommendedPillStyles = css`
	border-radius: 4px;
	padding: ${space[1]}px ${space[2]}px;
	background-color: ${palette.brandAlt[400]};
	${textSansBold14};
	color: ${palette.neutral[7]};
	position: absolute;
	top: -${space[2]}px;
	${until.phablet} {
		right: ${space[3]}px;
	}
	right: ${space[5]}px;
`;

const discountedPillStyles = css`
	border-radius: 4px;
	padding: ${space[1]}px ${space[2]}px;
	background-color: ${palette.error[400]};
	${textSansBold14};
	color: ${palette.neutral[100]};
	position: absolute;
	top: -${space[2]}px;
	${until.phablet} {
		right: ${space[3]}px;
	}
	right: ${space[5]}px;
`;

const customRadioTheme: ThemeRadio = {
	...themeRadio,
	borderSelected: palette.brandAlt[400],
	borderUnselected: palette.neutral[46],
	borderHover: palette.brandAlt[400],
	fillSelected: palette.brand[400],
};

export type ChoiceInfo = {
	supportTier: SupportTier;
	label: (
		amount: number,
		currencySymbol: string,
		discount?: number,
	) => JSX.Element | string;
	benefitsLabel?: string;
	benefits: (currencySymbol: string) => string[];
	recommended: boolean;
};

function getChoiceAmount(
	supportTier: SupportTier,
	ratePlan: SupportRatePlan,
	countryGroupId: CountryGroupId,
): number {
	return threeTierChoiceCardAmounts[ratePlan][countryGroupId][supportTier];
}

const SupportingBenefits = ({
	benefitsLabel,
	benefits,
}: {
	benefitsLabel: string | undefined;
	benefits: string[];
}) => {
	const isBenefit = !!benefitsLabel;
	return (
		<div css={supportingTextStyles}>
			{!!benefitsLabel && (
				<span css={benefitsLabelStyles}>
					Unlock <strong>{benefitsLabel}</strong> benefits:
				</span>
			)}
			<ul css={benefitsStyles}>
				{benefits.map((benefit) => (
					<li key={benefit}>
						{isBenefit && <SvgTickRound size="xsmall" />}
						{benefit}
					</li>
				))}
			</ul>
		</div>
	);
};

const RecommendedPill = () => {
	return <div css={recommendedPillStyles}>Recommended</div>;
};

const DiscountedPill = ({ discount }: { discount: number }) => {
	return <div css={discountedPillStyles}>{discount}% off</div>;
};

type ThreeTierChoiceCardsProps = {
	selectedProduct: SupportTier;
	setSelectedProduct: Dispatch<SetStateAction<SupportTier>>;
	countryCode?: string;
	choices: ChoiceInfo[];
	supporterPlusDiscount?: number;
	id: string; // uniquely identify this choice cards component to avoid conflicting with others
};

export const ThreeTierChoiceCards = ({
	countryCode,
	selectedProduct,
	setSelectedProduct,
	choices,
	supporterPlusDiscount,
	id,
}: ThreeTierChoiceCardsProps) => {
	const currencySymbol = getLocalCurrencySymbol(countryCode);
	const countryGroupId = countryCodeToCountryGroupId(countryCode);

	return (
		<RadioGroup
			cssOverrides={css`
				margin-top: ${space[6]}px;
			`}
		>
			<Stack space={3}>
				{choices.map(
					({
						supportTier,
						label,
						benefitsLabel,
						benefits,
						recommended,
					}) => {
						const choiceAmount = getChoiceAmount(
							supportTier,
							'Monthly',
							countryGroupId,
						);
						const selected = selectedProduct === supportTier;

						const hasDiscount =
							!isUndefined(supporterPlusDiscount) &&
							supportTier === 'SupporterPlus';

						const radioId = `choicecard-${id}-${supportTier}`;

						return (
							<div
								key={supportTier}
								css={css`
									position: relative;
								`}
							>
								{hasDiscount && (
									<DiscountedPill
										discount={supporterPlusDiscount * 100}
									/>
								)}
								{recommended && !hasDiscount && (
									<RecommendedPill />
								)}
								<label
									css={supportTierChoiceCardStyles(selected)}
									htmlFor={radioId}
								>
									<Radio
										label={label(
											choiceAmount,
											currencySymbol,
											supporterPlusDiscount,
										)}
										id={radioId}
										value={supportTier}
										cssOverrides={labelOverrideStyles(
											selected,
										)}
										supporting={
											selected ? (
												<SupportingBenefits
													benefitsLabel={
														benefitsLabel
													}
													benefits={benefits(
														currencySymbol,
													)}
												/>
											) : undefined
										}
										checked={selected}
										onChange={() => {
											setSelectedProduct(supportTier);
										}}
										theme={customRadioTheme}
									/>
								</label>
							</div>
						);
					},
				)}
			</Stack>
		</RadioGroup>
	);
};
