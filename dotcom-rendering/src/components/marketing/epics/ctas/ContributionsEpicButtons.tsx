/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/epics/ContributionsEpicButtons.tsx
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { OphanComponentEvent } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import {
	countryCodeToCountryGroupId,
	SecondaryCtaType,
} from '@guardian/support-dotcom-components';
import type { EpicVariant } from '@guardian/support-dotcom-components/dist/shared/src/types/abTests/epic';
import type {
	Cta,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/src/types/props/shared';
import { useEffect } from 'react';
import { useIsInView } from '../../../../lib/useIsInView';
import { hasSetReminder } from '../../lib/reminders';
import {
	addChoiceCardsOneTimeParams,
	addChoiceCardsParams,
	addChoiceCardsProductParams,
	addRegionIdAndTrackingParamsToSupportUrl,
	isSupportUrl,
} from '../../lib/tracking';
import {
	getReminderViewEvent,
	OPHAN_COMPONENT_EVENT_CTAS_VIEW,
	OPHAN_COMPONENT_EVENT_REMINDER_OPEN,
} from '../utils/ophan';
import {
	type SupportTier,
	threeTierChoiceCardAmounts,
} from '../utils/threeTierChoiceCardAmounts';
import { EpicButton } from './EpicButton';

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
	threeTierChoiceCardSelectedProduct: SupportTier;
	showChoiceCards?: boolean;
	amountsTestName?: string;
	amountsVariantName?: string;
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
	threeTierChoiceCardSelectedProduct,
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
		/** In the US - direct 50 % traffic to the checkout page and 50 % traffic to the landing page for the AB test  */

		if (showChoiceCards && countryCode === 'US') {
			if (threeTierChoiceCardSelectedProduct === 'OneOff') {
				if (
					variantOfChoiceCard ===
					'US_CHECKOUT_THREE_TIER_CHOICE_CARDS'
				) {
					return {
						text: cta.text,
						baseUrl: addChoiceCardsParams(
							'https://support.theguardian.com/contribute/checkout',
							'ONE_OFF',
						),
					};
				}
				return {
					text: cta.text,
					baseUrl: addChoiceCardsOneTimeParams(cta.baseUrl),
				};
			}

			/** Contribution amount is variable, unlike the SupporterPlus amount which is fixed */
			const countryGroupId = countryCodeToCountryGroupId(countryCode);
			const contributionAmount =
				threeTierChoiceCardSelectedProduct === 'Contribution'
					? threeTierChoiceCardAmounts['Monthly'][countryGroupId]
							.Contribution
					: undefined;
			const url =
				variantOfChoiceCard === 'US_CHECKOUT_THREE_TIER_CHOICE_CARDS'
					? 'https://support.theguardian.com/checkout'
					: cta.baseUrl;

			return {
				text: cta.text,
				baseUrl: addChoiceCardsProductParams(
					url,
					threeTierChoiceCardSelectedProduct,
					'Monthly',
					contributionAmount,
				),
			};
		}

		/** Not in the US - direct taffic to the landing page */
		if (
			showChoiceCards &&
			variantOfChoiceCard === 'THREE_TIER_CHOICE_CARDS'
		) {
			if (threeTierChoiceCardSelectedProduct === 'OneOff') {
				/**
				 * OneOff payments are not supported by the generic checkout yet.
				 * We also have no way of highlighting to a contributor that "OneOff"
				 * was selected, so we just send them to the homepage.
				 */
				return {
					text: cta.text,
					baseUrl: 'https://support.theguardian.com/contribute',
				};
			}

			return {
				text: cta.text,
				baseUrl: addChoiceCardsProductParams(
					cta.baseUrl,
					threeTierChoiceCardSelectedProduct,
					'Monthly',
				),
			};
		}

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
