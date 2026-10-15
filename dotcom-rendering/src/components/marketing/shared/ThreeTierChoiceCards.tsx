import { css } from '@emotion/react';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import {
	palette,
	space,
	textSans15,
	textSansBold14,
	textSansBold15,
	transitions,
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

const choiceCardTransition = transitions.short;

const styles = {
	radioGroup: css`
		margin-top: ${space[6]}px;
	`,
	card: css`
		position: relative;
		background-color: inherit;
	`,
	label: css`
		display: grid;

		/* Stack children in the same grid cell. */
		& > span {
			grid-area: 1 / 1;
			transition: opacity ${choiceCardTransition};
		}
	`,
	boldLabel: css`
		font-weight: bold;
	`,
	labelOpacity: (isVisible: boolean) => css`
		/* Regular weight fades out when selected; bold weight fades in. */
		opacity: ${isVisible ? 1 : 0};
	`,
	benefitsContainer: (isExpanded: boolean | undefined) => css`
		display: grid;
		grid-template-rows: ${isExpanded === true ? '1fr' : '0fr'};
		transition: ${choiceCardTransition};
		transition-property: grid-template-rows;
	`,
	benefitsContent: css`
		overflow: hidden;
		/* Widen the hidden bounding box to prevent clipping negative margins. */
		padding: 0 8px;
		margin: 0 -8px;
	`,
};

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
	if (benefits.length === 0 && (benefitsLabel?.trim() ?? '') === '') {
		return null;
	}

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
	radioIdPrefix?: string;
	submitComponentEvent?: (componentEvent: ComponentEvent) => Promise<void>;
	choiceCardDesignSettings?: ChoiceCardDesignSettings;
};

/**
 * Structural equality for choice cards: same product (supportTier and, where
 * present, ratePlan) and same label. Used to re-resolve a stale
 * selectedChoiceCard reference — e.g. when useMatchMedia switches the
 * choices array between mobile and desktop configs after mount, the initial
 * default (captured via useState from the first array) no longer
 * reference-matches any card, but is still the same logical card.
 */
const isSameCard = (a: ChoiceCard, b: ChoiceCard): boolean =>
	a.label === b.label &&
	a.product.supportTier === b.product.supportTier &&
	('ratePlan' in a.product ? a.product.ratePlan : undefined) ===
		('ratePlan' in b.product ? b.product.ratePlan : undefined);

export const ThreeTierChoiceCards = ({
	selectedChoiceCard,
	setSelectedChoiceCard,
	choices,
	id,
	radioIdPrefix = id,
	submitComponentEvent,
	choiceCardDesignSettings,
}: ThreeTierChoiceCardsProps) => {
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
		threshold: 0,
	});

	const supportTierChoiceCardStyles = (selected: boolean) => css`
		display: block;
		position: relative;
		border: none;
		box-shadow: ${selected
			? `inset 0 0 0 2px ${
					choiceCardDesignSettings?.buttonSelectBorderColour ??
					palette.brand['400']
				}`
			: `inset 0 0 0 1px ${
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
		transition: ${choiceCardTransition};
		transition-property: color, background-color, box-shadow, padding;

		> div {
			position: static;
		}

		> div > label::before {
			content: '';
			position: absolute;
			inset: 0;
		}
	`;

	const labelOverrideStyles = (isSelected: boolean) => css`
		+ label div {
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
			pointer-events: none;
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
			<RadioGroup cssOverrides={styles.radioGroup}>
				<Stack space={3}>
					{(() => {
						// Identify the selected card by position so duplicate
						// cards (e.g. two OneOff cards) can be told apart.
						// Prefer reference equality — selectedChoiceCard is
						// normally a stable object from this choices array (set
						// via setSelectedChoiceCard(card)/onChoiceCardChange).
						// Fall back to structural equality when the reference
						// is stale, e.g. the array identity changes when
						// useMatchMedia switches between mobile and desktop
						// choice cards after mount.
						let selectedIndex = -1;
						if (selectedChoiceCard) {
							selectedIndex = choices.indexOf(selectedChoiceCard);
							if (selectedIndex === -1) {
								selectedIndex = choices.findIndex((choice) =>
									isSameCard(choice, selectedChoiceCard),
								);
							}
						}

						return choices.map((card, index) => {
							const {
								product,
								label,
								benefitsLabel,
								benefits,
								pill,
							} = card;
							const { supportTier } = product;

							const selected = index === selectedIndex;

							// Suffix with the array index so every radio gets a
							// unique id and value even when two cards share the
							// same supportTier (e.g. two OneOff cards). Without
							// this, both OneOff cards produced
							// id="choicecard-banner-OneOff", breaking <label
							// htmlFor> association and React keys.
							const radioId = `choicecard-${radioIdPrefix}-${supportTier}${
								supportTier !== 'OneOff'
									? `-${product.ratePlan}`
									: ''
							}-${index}`;

							const isExpanded =
								selected ||
								(!selectedChoiceCard && card.defaultExpanded);

							return (
								<div key={radioId} css={styles.card}>
									<div
										css={supportTierChoiceCardStyles(
											selected,
										)}
									>
										<Radio
											label={
												<span css={styles.label}>
													<span
														css={styles.labelOpacity(
															!selected,
														)}
														dangerouslySetInnerHTML={{
															__html: sanitise(
																label,
															),
														}}
													/>
													<span
														css={[
															styles.boldLabel,
															styles.labelOpacity(
																selected,
															),
														]}
														dangerouslySetInnerHTML={{
															__html: sanitise(
																label,
															),
														}}
													/>
												</span>
											}
											id={radioId}
											value={radioId}
											name={`choice-cards-${radioIdPrefix}`}
											cssOverrides={labelOverrideStyles(
												selected,
											)}
											supporting={
												<div
													css={styles.benefitsContainer(
														isExpanded,
													)}
												>
													<div
														css={
															styles.benefitsContent
														}
													>
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
													</div>
												</div>
											}
											checked={selected}
											onChange={() => {
												setSelectedChoiceCard(card);
											}}
											theme={customRadioTheme}
										/>
									</div>
									{pill && <ChoiceCardPill pill={pill} />}
								</div>
							);
						});
					})()}
				</Stack>
			</RadioGroup>
		</div>
	);
};
