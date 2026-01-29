import { css } from '@emotion/react';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
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
import { useEffect } from 'react';
import sanitise from 'sanitize-html';
import { useIsInView } from '../../../lib/useIsInView';
import type { ChoiceCardSettings } from '../banners/designableBanner/settings';

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

const benefitsLabelStyles = (customColor?: string) => css`
	color: ${customColor ?? palette.neutral[0]};
	${textSans15};

	strong {
		${textSansBold15};
	}
`;

const supportingTextStyles = css`
	margin-top: ${space[4]}px;
`;

const SupportingBenefits = ({
	benefitsLabel,
	benefits,
	choiceCardSettings,
}: {
	benefitsLabel?: string;
	benefits: ChoiceCard['benefits'];
	choiceCardSettings?: ChoiceCardSettings;
}) => {
	const showTicks = benefits.length > 1;
	return (
		<div css={supportingTextStyles}>
			{!!benefitsLabel && (
				<span
					css={benefitsLabelStyles(
						choiceCardSettings?.buttonSelectTextColour,
					)}
					dangerouslySetInnerHTML={{
						__html: sanitise(benefitsLabel),
					}}
				/>
			)}
			<ul css={benefitsStyles}>
				{benefits.map((benefit) => (
					<li key={benefit.copy}>
						{showTicks && (
							<SvgTickRound
								size="xsmall"
								theme={{
									fill:
										choiceCardSettings?.buttonSelectMarkerColour ??
										palette.brand[400],
								}}
							/>
						)}
						<span
							css={benefitsLabelStyles(
								choiceCardSettings?.buttonSelectTextColour,
							)}
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

type ThreeTierChoiceCardsProps = {
	selectedChoiceCard: ChoiceCard;
	setSelectedChoiceCard: Dispatch<SetStateAction<ChoiceCard | undefined>>;
	choices: ChoiceCard[];
	id: 'epic' | 'banner'; // uniquely identify this choice cards component to avoid conflicting with others
	submitComponentEvent?: (componentEvent: ComponentEvent) => void;
	choiceCardDesignSettings?: ChoiceCardSettings;
};

export const ThreeTierChoiceCards = ({
	selectedChoiceCard,
	setSelectedChoiceCard,
	choices,
	id,
	submitComponentEvent,
	choiceCardDesignSettings,
}: ThreeTierChoiceCardsProps) => {
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	const supportTierChoiceCardStyles = (selected: boolean) => css`
		display: block;
		border: ${selected
			? `2px solid ${
					choiceCardDesignSettings?.buttonSelectBorderColour ??
					palette.brand['500']
			  }`
			: `1px solid ${
					choiceCardDesignSettings?.buttonBorderColour ??
					palette.neutral[46]
			  }`};
		background-color: ${selected
			? choiceCardDesignSettings?.buttonSelectColour ??
			  palette.neutral[100]
			: choiceCardDesignSettings?.buttonColour ?? palette.neutral[100]};
		color: ${selected
			? choiceCardDesignSettings?.buttonSelectTextColour ?? 'inherit'
			: choiceCardDesignSettings?.buttonTextColour ?? 'inherit'};
		border-radius: 10px;
		padding: ${selected
			? `6px ${space[5]}px 10px ${space[5]}px`
			: `6px ${space[5]}px`};
	`;

	const labelOverrideStyles = (isSelected: boolean) => css`
		+ label div {
			${isSelected ? 'font-weight: bold;' : ''}
			color: ${isSelected
				? choiceCardDesignSettings?.buttonSelectTextColour ?? 'inherit'
				: choiceCardDesignSettings?.buttonTextColour ?? 'inherit'};
			s {
				font-weight: normal;
			}
		}
	`;

	const customRadioTheme: ThemeRadio = {
		...themeRadio,
		borderSelected:
			choiceCardDesignSettings?.buttonSelectBorderColour ??
			palette.brandAlt[400],
		borderUnselected:
			choiceCardDesignSettings?.buttonBorderColour ?? palette.neutral[46],
		borderHover:
			choiceCardDesignSettings?.buttonSelectBorderColour ??
			palette.brandAlt[400],
		fillSelected:
			choiceCardDesignSettings?.buttonSelectMarkerColour ??
			palette.brand[400],
	};

	const pillStyles = (pill: NonNullable<ChoiceCard['pill']>) => {
		const buildBackgroundColour = (): string => {
			if (choiceCardDesignSettings?.pillBackgroundColour) {
				return choiceCardDesignSettings.pillBackgroundColour;
			}
			if (pill.backgroundColour) {
				return hexColourToString(pill.backgroundColour as HexColour);
			}
			return palette.brandAlt[400];
		};
		const buildTextColour = (): string => {
			if (choiceCardDesignSettings?.pillTextColour) {
				return choiceCardDesignSettings.pillTextColour;
			}
			if (pill.textColour) {
				return hexColourToString(pill.textColour as HexColour);
			}
			return palette.neutral[7];
		};

		return css`
			border-radius: 4px;
			padding: ${space[1]}px ${space[2]}px;
			background-color: ${buildBackgroundColour()};
			${textSansBold14};
			color: ${buildTextColour()};
			position: absolute;
			top: -${space[2]}px;
			${until.phablet} {
				right: ${space[3]}px;
			}
			right: ${space[5]}px;
		`;
	};

	const ChoiceCardPill = ({
		pill,
	}: {
		pill: NonNullable<ChoiceCard['pill']>;
	}) => {
		return <div css={pillStyles(pill)}>{pill.copy}</div>;
	};

	useEffect(() => {
		if (submitComponentEvent) {
			void submitComponentEvent({
				component: {
					componentType: 'ACQUISITIONS_OTHER',
					id: `${id}-choice-cards`,
				},
				action: 'INSERT',
			});
		}
	}, [id, submitComponentEvent]);

	useEffect(() => {
		if (hasBeenSeen && submitComponentEvent) {
			void submitComponentEvent({
				component: {
					componentType: 'ACQUISITIONS_OTHER',
					id: `${id}-choice-cards`,
				},
				action: 'VIEW',
			});
		}
	}, [hasBeenSeen, id, submitComponentEvent]);

	return (
		<div ref={setNode}>
			<RadioGroup
				cssOverrides={css`
					margin-top: ${space[6]}px;
				`}
			>
				<Stack space={3}>
					{choices.map((card) => {
						const {
							product,
							label,
							benefitsLabel,
							benefits,
							pill,
						} = card;
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
							supportTier !== 'OneOff'
								? `-${product.ratePlan}`
								: ''
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
										cssOverrides={labelOverrideStyles(
											selected,
										)}
										supporting={
											selected && (
												<SupportingBenefits
													benefitsLabel={
														benefitsLabel as
															| string
															| undefined
													}
													benefits={benefits}
													choiceCardSettings={
														choiceCardDesignSettings
													}
												/>
											)
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
		</div>
	);
};
