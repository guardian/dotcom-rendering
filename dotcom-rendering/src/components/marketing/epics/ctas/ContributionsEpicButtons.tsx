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
import type { EpicVariant } from '@guardian/support-dotcom-components/dist/shared/types/abTests/epic';
import type {
	Cta,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types/props/shared';
import { useEffect } from 'react';
import { useIsInView } from '../../../../lib/useIsInView';
import { hasSetReminder } from '../../lib/reminders';
import {
	addChoiceCardsOneTimeParams,
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
	isDiscountActive?: boolean;
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
	isDiscountActive,
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
		const countryGroupId = countryCodeToCountryGroupId(countryCode);
		if (showChoiceCards) {
			if (threeTierChoiceCardSelectedProduct === 'OneOff') {
				return {
					text: cta.text,
					baseUrl: addChoiceCardsOneTimeParams(cta.baseUrl),
				};
			}
			if (isDiscountActive) {
				const contributionAmount =
					threeTierChoiceCardSelectedProduct === 'SupporterPlus'
						? threeTierChoiceCardAmounts['Annual'][countryGroupId]
								.SupporterPlus
						: undefined;

				return {
					text: cta.text,
					baseUrl: addChoiceCardsProductParams(
						cta.baseUrl,
						threeTierChoiceCardSelectedProduct,
						'Annual',
						contributionAmount,
					),
				};
			}

			/** Contribution amount is variable, unlike the SupporterPlus amount which is fixed */
			const contributionAmount =
				threeTierChoiceCardSelectedProduct === 'Contribution'
					? threeTierChoiceCardAmounts['Monthly'][countryGroupId]
							.Contribution
					: undefined;

			return {
				text: cta.text,
				baseUrl: addChoiceCardsProductParams(
					cta.baseUrl,
					threeTierChoiceCardSelectedProduct,
					'Monthly',
					contributionAmount,
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
