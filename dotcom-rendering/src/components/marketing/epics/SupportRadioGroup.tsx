import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import {
	Radio,
	RadioGroup,
	Stack,
	SvgTickRound,
} from '@guardian/source/react-components';
import { useState } from 'react';

const paymentTypeChoiceCardStyles = (selected: boolean) => css`
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
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
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
	color: ${palette.neutral[46]};
	${textSansBold15};
`;

const labelOverrideStyles = css`
	+ label div {
		font-weight: bold;
	}
`;

const supportingTextStyles = css`
	margin-top: ${space[4]}px;
`;

const recommendedPillStyles = (selected: boolean) => css`
	border-radius: 4px;
	padding: ${space[1]}px ${space[2]}px;
	background-color: ${palette.brand[400]};
	${textSansBold15};
	color: ${palette.neutral[100]};
	${
		selected ? '' : 'margin-top: 10px;' // increase margin when Radio's min-height comes into effect
	}
`;

type PaymentType = 'LowMonthly' | 'HighMonthly' | 'Single';

type ChoiceInfo = {
	id: PaymentType;
	label: string;
	benefitsLabel?: string;
	benefits: string[];
	recommended: boolean;
};

const Choices = [
	{
		id: 'HighMonthly',
		label: 'Support £10/month',
		benefitsLabel: 'Unlock Support benefits',
		benefits: [
			'Unlimited access to the Guardian app',
			'Ad-free reading on all your devices',
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
			'Far fewer asks for support',
		],
		recommended: true,
	},
	{
		id: 'LowMonthly',
		label: 'Support £4/month',
		benefitsLabel: 'Unlock All-access digital benefits',
		benefits: [
			'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
		],
		recommended: false,
	},
	{
		id: 'Single',
		label: 'Support just once',
		benefitsLabel: undefined,
		benefits: [
			'We welcome support of any size, any time - whether you choose to give £1 or more',
		],
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
				<span css={benefitsLabelStyles}>{benefitsLabel}</span>
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

const RecommendedPill = ({ selected }: { selected: boolean }) => {
	return <div css={recommendedPillStyles(selected)}>Recommended</div>;
};

export const SupportRadioGroup = () => {
	const [selectedPaymentType, setSelectedPaymentType] =
		useState<PaymentType>('HighMonthly');

	return (
		<RadioGroup
			cssOverrides={css`
				margin-top: ${space[6]}px;
			`}
		>
			<Stack space={2}>
				{Choices.map(
					({ id, label, benefitsLabel, benefits, recommended }) => {
						const selected = selectedPaymentType === id;
						return (
							<div
								key={id}
								css={paymentTypeChoiceCardStyles(selected)}
							>
								<Radio
									label={label}
									value={id}
									css={labelOverrideStyles}
									supporting={
										selected ? (
											<SupportingBenefits
												benefitsLabel={benefitsLabel}
												benefits={benefits}
											/>
										) : (
											''
										)
									}
									checked={selected}
									onChange={() => setSelectedPaymentType(id)}
								/>
								{recommended && (
									<RecommendedPill selected={selected} />
								)}
							</div>
						);
					},
				)}
			</Stack>
		</RadioGroup>
	);
};
