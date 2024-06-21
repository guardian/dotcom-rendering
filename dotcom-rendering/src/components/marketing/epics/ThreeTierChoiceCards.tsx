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
import type { SupportTier } from './utils/threeTierChoiceCardAmounts';
import { threeTierChoiceCardAmounts } from './utils/threeTierChoiceCardAmounts';

const supportTierChoiceCardStyles = (selected: boolean) => css`
	border: ${selected
		? `2px solid ${palette.brand['500']}`
		: `1px solid ${palette.neutral[46]}`};
	background-color: ${selected ? palette.sport[800] : ''};
	border-radius: 10px;
	padding: ${
		selected
			? `${space[4]}px ${space[5]}px ${space[2]}px ${space[5]}px`
			: `6px ${space[5]}px` // reduce vertical padding when Radio's min-height comes into effect
	};
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

type ChoiceInfo = {
	supportTier: SupportTier;
	label: (amount: number, currencySymbol: string) => string;
	benefitsLabel?: string;
	benefits: string[];
	recommended: boolean;
};

function getChoiceAmount(
	supportTier: SupportTier,
	countryGroupId: CountryGroupId,
): number {
	return threeTierChoiceCardAmounts[countryGroupId][supportTier];
}

const Choices = [
	{
		supportTier: 'support',
		label: (amount: number, currencySymbol: string) =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'Support',
		benefits: [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		supportTier: 'allAccess',
		label: (amount: number, currencySymbol: string) =>
			`Support ${currencySymbol}${amount}/month`,
		benefitsLabel: 'All-access digital',
		benefits: [
			'Unlimited access to the Guardian app',
			'Ad-free reading on all your devices',
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
			'Far fewer asks for support',
		],
		recommended: true,
	},
	{
		supportTier: 'other',
		label: () => 'Support with another amount',
		benefitsLabel: undefined,
		benefits: ['We welcome support of any size, any time'],
		recommended: false,
	},
] as const satisfies ReadonlyArray<ChoiceInfo>;

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

type ThreeTierChoiceCardsProps = {
	selectedAmount: number;
	setSelectedAmount: Dispatch<SetStateAction<number>>;
	countryCode?: string;
};

export const ThreeTierChoiceCards = ({
	countryCode,
	selectedAmount,
	setSelectedAmount,
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
							countryGroupId,
						);
						const selected = selectedAmount === choiceAmount;

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
										value={supportTier}
										css={labelOverrideStyles}
										supporting={
											selected ? (
												<SupportingBenefits
													benefitsLabel={
														benefitsLabel
													}
													benefits={benefits}
												/>
											) : undefined
										}
										checked={selected}
										onChange={() =>
											setSelectedAmount(choiceAmount)
										}
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
