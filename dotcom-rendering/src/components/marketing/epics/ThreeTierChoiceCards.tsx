import { css } from '@emotion/react';
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
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import type { Dispatch, SetStateAction } from 'react';
import sanitise from 'sanitize-html';

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

const customRadioTheme: ThemeRadio = {
	...themeRadio,
	borderSelected: palette.brandAlt[400],
	borderUnselected: palette.neutral[46],
	borderHover: palette.brandAlt[400],
	fillSelected: palette.brand[400],
};

const SupportingBenefits = ({
	benefitsLabel,
	benefits,
}: {
	benefitsLabel?: string;
	benefits: ChoiceCard['benefits'];
}) => {
	const showTicks = benefits.length > 1;
	return (
		<div css={supportingTextStyles}>
			{!!benefitsLabel && (
				<span
					css={benefitsLabelStyles}
					dangerouslySetInnerHTML={{
						__html: sanitise(benefitsLabel),
					}}
				/>
			)}
			<ul css={benefitsStyles}>
				{benefits.map((benefit) => (
					<li key={benefit.copy}>
						{showTicks && <SvgTickRound size="xsmall" />}
						<span
							dangerouslySetInnerHTML={{
								__html: sanitise(benefit.copy),
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

const ChoiceCardPill = ({ copy }: { copy: string }) => {
	return <div css={recommendedPillStyles}>{copy}</div>;
};

type ThreeTierChoiceCardsProps = {
	selectedProduct: ChoiceCard['product'];
	setSelectedProduct: Dispatch<
		SetStateAction<ChoiceCard['product'] | undefined>
	>;
	choices: ChoiceCard[];
	id: string; // uniquely identify this choice cards component to avoid conflicting with others
};

export const ThreeTierChoiceCards = ({
	selectedProduct,
	setSelectedProduct,
	choices,
	id,
}: ThreeTierChoiceCardsProps) => {
	return (
		<RadioGroup
			cssOverrides={css`
				margin-top: ${space[6]}px;
			`}
		>
			<Stack space={3}>
				{choices.map(
					({ product, label, benefitsLabel, benefits, pill }) => {
						const { supportTier } = product;

						const selected =
							selectedProduct.supportTier === supportTier;

						const radioId = `choicecard-${id}-${supportTier}`;

						return (
							<div
								key={supportTier}
								css={css`
									position: relative;
								`}
							>
								{pill && <ChoiceCardPill copy={pill.copy} />}
								<label
									css={supportTierChoiceCardStyles(selected)}
									htmlFor={radioId}
								>
									<Radio
										label={
											<span
												dangerouslySetInnerHTML={{
													__html: sanitise(label),
												}}
											/>
										}
										id={radioId}
										value={supportTier}
										cssOverrides={labelOverrideStyles(
											selected,
										)}
										supporting={
											selected ? (
												<SupportingBenefits
													benefitsLabel={
														benefitsLabel as
															| string
															| undefined
													}
													benefits={benefits}
												/>
											) : undefined
										}
										checked={selected}
										onChange={() => {
											setSelectedProduct(product);
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
