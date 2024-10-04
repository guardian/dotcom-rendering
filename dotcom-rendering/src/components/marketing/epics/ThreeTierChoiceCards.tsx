import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans15,
	textSansBold15,
	until,
} from '@guardian/source/foundations';
import {
	Radio,
	RadioGroup,
	Stack,
	SvgTickRound,
} from '@guardian/source/react-components';
import type { CountryGroupId } from '@guardian/support-dotcom-components';
import {
	countryCodeToCountryGroupId,
	getLocalCurrencySymbol,
} from '@guardian/support-dotcom-components';
import type { Dispatch, SetStateAction } from 'react';
import {
	ChoiceCardTestData_REGULAR,
	ChoiceCardTestData_US,
} from './ThreeTierChoiceCardData';
import type {
	SupportRatePlan,
	SupportTier,
} from './utils/threeTierChoiceCardAmounts';
import { threeTierChoiceCardAmounts } from './utils/threeTierChoiceCardAmounts';

const supportTierChoiceCardStyles = (selected: boolean) => css`
	border: ${selected
		? `2px solid ${palette.brand['500']}`
		: `1px solid ${palette.neutral[46]}`};
	background-color: ${selected ? palette.sport[800] : palette.neutral[100]};
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

const labelOverrideStyles = css`
	+ label div {
		font-weight: bold;
	}
`;

const supportingTextStyles = css`
	margin-top: ${space[4]}px;
`;

const recommendedPillStyles = css`
	border-radius: 4px;
	padding: ${space[1]}px ${space[2]}px;
	background-color: ${palette.brand[400]};
	${textSansBold15};
	color: ${palette.neutral[100]};
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
	${textSansBold15};
	color: ${palette.neutral[100]};
	position: absolute;
	top: -${space[2]}px;
	${until.phablet} {
		right: ${space[3]}px;
	}
	right: ${space[5]}px;
`;

export type ChoiceInfo = {
	supportTier: SupportTier;
	label: (
		amount: number,
		currencySymbol: string,
		discount?: string,
	) => string;
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

const DiscountedPill = () => {
	return <div css={discountedPillStyles}>50% off</div>; //TODO confirm wording on button
};

type ThreeTierChoiceCardsProps = {
	selectedProduct: SupportTier;
	setSelectedProduct: Dispatch<SetStateAction<SupportTier>>;
	countryCode?: string;
	variantOfChoiceCard: string;
};

const getChoiceCardData = (choiceCardVariant: string): ChoiceInfo[] => {
	switch (choiceCardVariant) {
		case 'US_THREE_TIER_CHOICE_CARDS':
			return ChoiceCardTestData_US;
		case 'US_CHECKOUT_THREE_TIER_CHOICE_CARDS':
			return ChoiceCardTestData_US;
		default:
			return ChoiceCardTestData_REGULAR;
	}
};

export const ThreeTierChoiceCards = ({
	countryCode,
	selectedProduct,
	setSelectedProduct,
	variantOfChoiceCard,
}: ThreeTierChoiceCardsProps) => {
	const currencySymbol = getLocalCurrencySymbol(countryCode);
	const countryGroupId = countryCodeToCountryGroupId(countryCode);

	const Choices = getChoiceCardData(variantOfChoiceCard);

	return (
		<RadioGroup
			cssOverrides={css`
				margin-top: ${space[6]}px;
			`}
		>
			<Stack space={3}>
				{Choices.map(
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

						return (
							<div
								key={supportTier}
								css={css`
									position: relative;
								`}
							>
								{recommended && <RecommendedPill />}
								<div
									css={supportTierChoiceCardStyles(selected)}
								>
									<Radio
										label={label(
											choiceAmount,
											currencySymbol,
										)}
										id={`choicecard-${supportTier}`}
										value={supportTier}
										cssOverrides={labelOverrideStyles}
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
									/>
								</div>
							</div>
						);
					},
				)}
			</Stack>
		</RadioGroup>
	);
};
