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
import type { ChoiceCard as _ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import sanitise from 'sanitize-html';
import { useIsInView } from '../../../lib/useIsInView';
import type { ChoiceCardDesignSettings } from '../banners/designableBanner/settings';

export type ChoiceCard = _ChoiceCard & { defaultExpanded?: boolean };

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
	benefitsTickColour,
	choiceCardDesignSettings,
}: {
	benefitsLabel?: string;
	benefits: ChoiceCard['benefits'];
	benefitsTickColour?: string;
	choiceCardDesignSettings?: ChoiceCardDesignSettings;
}) => {
	const showTicks = benefits.length > 1;
	return (
		<div css={supportingTextStyles}>
			{!!benefitsLabel && (
				<span
					css={benefitsLabelStyles(
						choiceCardDesignSettings?.buttonSelectTextColour,
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
										benefitsTickColour ??
										choiceCardDesignSettings?.buttonSelectMarkerColour ??
										palette.brand[400],
								}}
							/>
						)}
						<span
							css={benefitsLabelStyles(
								choiceCardDesignSettings?.buttonSelectTextColour,
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
	selectedChoiceCard?: ChoiceCard;
	setSelectedChoiceCard: Dispatch<SetStateAction<ChoiceCard | undefined>>;
	choices: ChoiceCard[];
	id: 'epic' | 'banner'; // uniquely identify this choice cards component to avoid conflicting with others
	submitComponentEvent?: (componentEvent: ComponentEvent) => Promise<void>;
	choiceCardDesignSettings?: ChoiceCardDesignSettings;
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
					palette.brand['400']
				}`
			: `1px solid ${
					choiceCardDesignSettings?.buttonBorderColour ??
					palette.neutral[46]
				}`};
		background-color: ${selected
			? (choiceCardDesignSettings?.buttonSelectColour ??
				palette.neutral[100])
			: (choiceCardDesignSettings?.buttonColour ?? palette.neutral[100])};
		color: ${selected
			? (choiceCardDesignSettings?.buttonSelectTextColour ?? 'inherit')
			: (choiceCardDesignSettings?.buttonTextColour ?? 'inherit')};
		border-radius: 10px;
		padding: ${selected
			? `6px ${space[5]}px 10px ${space[5]}px`
			: `6px ${space[5]}px`};
	`;

	const labelOverrideStyles = (isSelected: boolean) => css`
		+ label div {
			${isSelected ? 'font-weight: bold;' : ''}
			color: ${isSelected
				? (choiceCardDesignSettings?.buttonSelectTextColour ??
					'inherit')
				: (choiceCardDesignSettings?.buttonTextColour ?? 'inherit')};
			s {
				font-weight: normal;
			}
		}
	`;

	const customRadioTheme: ThemeRadio = {
		...themeRadio,
		borderSelected:
			choiceCardDesignSettings?.buttonSelectBorderColour ??
			palette.brand[400],
		borderUnselected:
			choiceCardDesignSettings?.buttonBorderColour ?? palette.neutral[46],
		borderHover:
			choiceCardDesignSettings?.buttonSelectBorderColour ??
			palette.brand[400],
		fillSelected:
			choiceCardDesignSettings?.buttonSelectMarkerColour ??
			palette.brand[400],
	};

	const getPillBackgroundColour = (
		pill: NonNullable<ChoiceCard['pill']>,
	): string => {
		if (choiceCardDesignSettings?.pillBackgroundColour) {
			return choiceCardDesignSettings.pillBackgroundColour;
		}
		if (pill.backgroundColour) {
			return hexColourToString(pill.backgroundColour as HexColour);
		}
		return palette.brand[500];
	};

	const pillStyles = (pill: NonNullable<ChoiceCard['pill']>) => {
		const buildTextColour = (): string => {
			if (choiceCardDesignSettings?.pillTextColour) {
				return choiceCardDesignSettings.pillTextColour;
			}
			if (pill.textColour) {
				return hexColourToString(pill.textColour as HexColour);
			}
			return palette.neutral[100];
		};

		return css`
			border-radius: 4px;
			padding: ${space[1]}px ${space[2]}px;
			background-color: ${getPillBackgroundColour(pill)};
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
					{choices.map((card, index) => {
						const {
							product,
							label,
							benefitsLabel,
							benefits,
							pill,
						} = card;
						const { supportTier } = product;

						// Compare by reference: selectedChoiceCard is always a
						// stable object taken from this choices array (set via
						// setSelectedChoiceCard(card) / onChoiceCardChange), so
						// reference equality correctly identifies the chosen
						// card even when two cards share the same supportTier
						// (e.g. two OneOff cards). The previous
						// supportTier/ratePlan comparison returned true for both
						// duplicate cards.
						const selected = card === selectedChoiceCard;

						// Suffix with the array index so every radio gets a
						// unique id and value even when two cards share the
						// same supportTier (e.g. two OneOff cards). Without
						// this, both OneOff cards produced
						// id="choicecard-banner-OneOff", breaking <label
						// htmlFor> association and React keys.
						const radioId = `choicecard-${id}-${supportTier}${
							supportTier !== 'OneOff'
								? `-${product.ratePlan}`
								: ''
						}-${index}`;

						const isExpanded =
							selected ||
							(!selectedChoiceCard && card.defaultExpanded);

						return (
							<div
								key={radioId}
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
										name={`choice-cards-${id}`}
										cssOverrides={labelOverrideStyles(
											selected,
										)}
										supporting={
											isExpanded && (
												<SupportingBenefits
													benefitsLabel={
														benefitsLabel as
															| string
															| undefined
													}
													benefits={benefits}
													benefitsTickColour={
														pill
															? getPillBackgroundColour(
																	pill,
																)
															: undefined
													}
													choiceCardDesignSettings={
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
