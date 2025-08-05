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
import { hexColourToString } from '@guardian/support-dotcom-components';
import type { HexColour } from '@guardian/support-dotcom-components/dist/shared/types';
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

const pillStyles = (pill: NonNullable<ChoiceCard['pill']>) => css`
	border-radius: 4px;
	padding: ${space[1]}px ${space[2]}px;
	background-color: ${pill.backgroundColour
		? hexColourToString(pill.backgroundColour as HexColour)
		: palette.brandAlt[400]};
	${textSansBold14};
	color: ${pill.textColour
		? hexColourToString(pill.textColour as HexColour)
		: palette.neutral[7]};
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

const ChoiceCardPill = ({
	pill,
}: {
	pill: NonNullable<ChoiceCard['pill']>;
}) => {
	return <div css={pillStyles(pill)}>{pill.copy}</div>;
};

type ThreeTierChoiceCardsProps = {
	selectedChoiceCard: ChoiceCard;
	setSelectedChoiceCard: Dispatch<SetStateAction<ChoiceCard | undefined>>;
	choices: ChoiceCard[];
	id: string; // uniquely identify this choice cards component to avoid conflicting with others
};

export const ThreeTierChoiceCards = ({
	selectedChoiceCard,
	setSelectedChoiceCard,
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
				{choices.map((card) => {
					const { product, label, benefitsLabel, benefits, pill } =
						card;
					const { supportTier } = product;

					const isSelected = (): boolean => {
						if (
							product.supportTier ===
							selectedChoiceCard.product.supportTier
						) {
							if (
								product.supportTier !== 'OneOff' &&
								selectedChoiceCard.product.supportTier !==
									'OneOff'
							) {
								return (
									product.ratePlan ===
									selectedChoiceCard.product.ratePlan
								);
							} else {
								return true;
							}
						} else {
							return false;
						}
					};
					const selected = isSelected();

					// Each radioId must be unique to the component and choice, e.g. "choicecard-epic-Contribution-Monthly"
					const radioId = `choicecard-${id}-${supportTier}${
						supportTier !== 'OneOff' ? `-${product.ratePlan}` : ''
					}`;

					return (
						<div
							key={supportTier}
							css={css`
								position: relative;
								background-color: inherit;
							`}
						>
							{pill && <ChoiceCardPill pill={pill} />}
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
									value={radioId}
									cssOverrides={labelOverrideStyles(selected)}
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
										setSelectedChoiceCard(card);
									}}
									theme={customRadioTheme}
								/>
							</label>
						</div>
					);
				})}
			</Stack>
		</RadioGroup>
	);
};
