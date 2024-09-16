/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/ContributionsEpicButtons.tsx
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { OphanComponentEvent } from '@guardian/libs';
import { isUndefined } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import { SecondaryCtaType } from '@guardian/support-dotcom-components';
import type { EpicVariant } from '@guardian/support-dotcom-components/dist/shared/src/types/abTests/epic';
import type {
	Cta,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/src/types/props/shared';
import { useEffect } from 'react';
import { useIsInView } from '../../../lib/useIsInView';
import { hasSetReminder } from '../lib/reminders';
import {
	addChoiceCardsParams,
	addRegionIdAndTrackingParamsToSupportUrl,
	isSupportUrl,
} from '../lib/tracking';
import { EpicButton } from './EpicButton';
import {
	getReminderViewEvent,
	OPHAN_COMPONENT_EVENT_CTAS_VIEW,
	OPHAN_COMPONENT_EVENT_REMINDER_OPEN,
} from './utils/ophan';

//show choice cards amount if selected and show choice cards is true

const paymentImageStyles = css`
	display: inline-block;
	width: auto;
	height: 25px;
	margin: ${space[1]}px 0;
`;

const buttonWrapperStyles: SerializedStyles = css`
	margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	&.hidden {
		display: none;
	}
`;

const buttonMarginStyles: SerializedStyles = css`
	margin: ${space[1]}px ${space[2]}px ${space[1]}px 0;
`;

const PrimaryCtaButton = ({
	cta,
	tracking,
	countryCode,
	amountsTestName,
	amountsVariantName,
	numArticles,
	submitComponentEvent,
}: {
	cta?: Cta;
	tracking: Tracking;
	countryCode?: string;
	amountsTestName?: string;
	amountsVariantName?: string;
	numArticles: number;
	submitComponentEvent?: (event: OphanComponentEvent) => void;
}): JSX.Element | null => {
	if (!cta) {
		return null;
	}

	const buttonText = cta.text || 'Support The Guardian';
	const baseUrl = cta.baseUrl || 'https://support.theguardian.com/contribute';
	const urlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
		baseUrl,
		tracking,
		numArticles,
		countryCode,
		amountsTestName,
		amountsVariantName,
	);

	return (
		<div css={buttonMarginStyles}>
			<EpicButton
				onClickAction={urlWithRegionAndTracking}
				submitComponentEvent={submitComponentEvent}
				showArrow={true}
				data-ignore="global-link-styling"
			>
				{buttonText}
			</EpicButton>
		</div>
	);
};

const SecondaryCtaButton = ({
	cta,
	tracking,
	numArticles,
	countryCode,
	submitComponentEvent,
}: {
	cta: Cta;
	tracking: Tracking;
	countryCode?: string;
	numArticles: number;
	submitComponentEvent?: (event: OphanComponentEvent) => void;
}): JSX.Element | null => {
	const url = addRegionIdAndTrackingParamsToSupportUrl(
		cta.baseUrl,
		tracking,
		numArticles,
		countryCode,
	);
	return (
		<div css={buttonMarginStyles}>
			<EpicButton
				onClickAction={url}
				submitComponentEvent={submitComponentEvent}
				showArrow={true}
				priority="secondary"
			>
				{cta.text}
			</EpicButton>
		</div>
	);
};

interface ContributionsEpicButtonsProps {
	variant: EpicVariant;
	tracking: Tracking;
	countryCode?: string;
	onOpenReminderClick: () => void;
	submitComponentEvent?: (event: OphanComponentEvent) => void;
	isReminderActive: boolean;
	isSignedIn: boolean;
	showChoiceCards?: boolean;
	amountsTestName?: string;
	amountsVariantName?: string;
	//choiceCardSelection?: ChoiceCardSelection;
	//showThreeTierChoiceCards?: boolean;
	threeTierChoiceCardSelectedAmount?: number;
	numArticles: number;
	variantOfChoiceCard?: string;
}

export const ContributionsEpicButtons = ({
	variant,
	tracking,
	countryCode,
	onOpenReminderClick,
	submitComponentEvent,
	isReminderActive,
	isSignedIn,
	showChoiceCards,
	//choiceCardSelection,
	//showThreeTierChoiceCards,
	threeTierChoiceCardSelectedAmount,
	amountsTestName,
	amountsVariantName,
	numArticles,
	variantOfChoiceCard,
}: ContributionsEpicButtonsProps): JSX.Element | null => {
	const [hasBeenSeen, setNode] = useIsInView({
		debounce: true,
	});

	const { secondaryCta, showReminderFields } = variant;

	useEffect(() => {
		if (hasBeenSeen && submitComponentEvent) {
			submitComponentEvent(OPHAN_COMPONENT_EVENT_CTAS_VIEW);

			if (showReminderFields && !hasSetReminder()) {
				submitComponentEvent(getReminderViewEvent(isSignedIn));
			}
		}
	}, [hasBeenSeen, isSignedIn, showReminderFields, submitComponentEvent]);

	if (!variant.cta) {
		return null;
	}

	const getChoiceCardCta = (cta: Cta): Cta => {
		if (
			showChoiceCards &&
			variantOfChoiceCard === 'US_THREE_TIER_CHOICE_CARDS' &&
			!isUndefined(threeTierChoiceCardSelectedAmount)
		) {
			if (threeTierChoiceCardSelectedAmount === 0) {
				return {
					text: cta.text,
					baseUrl: addChoiceCardsParams(
						'https://support.theguardian.com/contribute/checkout?selected-contribution-type=one_off',
						'ONE_OFF',
						threeTierChoiceCardSelectedAmount,
					),
				};
			}
			return {
				text: cta.text,
				baseUrl: addChoiceCardsParams(
					'https://support.theguardian.com/contribute/checkout',
					'MONTHLY',
					threeTierChoiceCardSelectedAmount,
				),
			};
		}
		if (
			showChoiceCards &&
			variantOfChoiceCard === 'THREE_TIER_CHOICE_CARDS' &&
			!isUndefined(threeTierChoiceCardSelectedAmount)
		) {
			return {
				text: cta.text,
				baseUrl: addChoiceCardsParams(
					cta.baseUrl,
					'MONTHLY',
					threeTierChoiceCardSelectedAmount,
				),
			};
		}
		/*if (choiceCardSelection) {
			return {
				text: cta.text,
				baseUrl: addChoiceCardsParams(
					cta.baseUrl,
					choiceCardSelection.frequency,
					choiceCardSelection.amount,
				),
			};
		}*/

		return cta;
	};

	const getCta = (cta: Cta): Cta =>
		showChoiceCards ? getChoiceCardCta(cta) : cta;

	const openReminder = () => {
		if (submitComponentEvent) {
			submitComponentEvent(OPHAN_COMPONENT_EVENT_REMINDER_OPEN);
		}
		onOpenReminderClick();
	};

	const hasSupportCta =
		isSupportUrl(variant.cta.baseUrl) ||
		(secondaryCta?.type === SecondaryCtaType.Custom &&
			isSupportUrl(secondaryCta.cta.baseUrl));

	return (
		<div ref={setNode} css={buttonWrapperStyles} data-testid="epic=buttons">
			{!isReminderActive && (
				<>
					<>
						<PrimaryCtaButton
							cta={getCta(variant.cta)}
							tracking={tracking}
							numArticles={numArticles}
							amountsTestName={amountsTestName}
							amountsVariantName={amountsVariantName}
							countryCode={countryCode}
							submitComponentEvent={submitComponentEvent}
						/>
						{secondaryCta?.type === SecondaryCtaType.Custom &&
							!!secondaryCta.cta.baseUrl &&
							!!secondaryCta.cta.text && (
								<SecondaryCtaButton
									cta={secondaryCta.cta}
									tracking={tracking}
									countryCode={countryCode}
									numArticles={numArticles}
									submitComponentEvent={submitComponentEvent}
								/>
							)}
					</>

					{secondaryCta?.type ===
						SecondaryCtaType.ContributionsReminder &&
						showReminderFields &&
						!hasSetReminder() && (
							<div css={buttonMarginStyles}>
								<EpicButton
									onClickAction={openReminder}
									isTertiary={true}
								>
									{showReminderFields.reminderCta}
								</EpicButton>
							</div>
						)}

					{hasSupportCta && (
						<img
							width={422}
							height={60}
							src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
							alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
							css={paymentImageStyles}
						/>
					)}
				</>
			)}
		</div>
	);
};
