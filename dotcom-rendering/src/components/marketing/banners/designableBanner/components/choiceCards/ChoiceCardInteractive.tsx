import { css } from '@emotion/react';
import type { OphanComponentEvent } from '@guardian/libs';
import { isUndefined } from '@guardian/libs';
import { from, space, until } from '@guardian/source/foundations';
import { ChoiceCard, ChoiceCardGroup } from '@guardian/source/react-components';
import type {
	ContributionFrequency,
	SelectedAmountsVariant,
} from '@guardian/support-dotcom-components/dist/shared/src/types';
import React from 'react';
import type { ChoiceCardSelection } from '../../../../lib/choiceCards';
import { contributionType } from '../../../../lib/choiceCards';
import type { ReactComponent } from '../../../../lib/ReactComponent';
import type { ChoiceCardSettings } from './ChoiceCards';

interface ChoiceCardInteractiveProps {
	selection?: ChoiceCardSelection;
	setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
	submitComponentEvent?: (event: OphanComponentEvent) => void;
	currencySymbol: string;
	amountsTest?: SelectedAmountsVariant;
	componentId: string;
	design?: ChoiceCardSettings;
}

const buildStyles = (
	design: ChoiceCardSettings | undefined,
	frequencyColumns: number,
) => {
	const {
		buttonColour,
		buttonTextColour,
		buttonBorderColour,
		buttonSelectColour,
		buttonSelectTextColour,
		buttonSelectBorderColour,
	} = design ?? {};

	return {
		buttonOverride: css`
			& + label {
				${buttonTextColour && `color: ${buttonTextColour};`}
				${buttonColour && `background-color: ${buttonColour};`}
    ${buttonBorderColour &&
				`box-shadow: inset 0 0 0 2px ${buttonBorderColour};`}
			}

			&:hover + label {
				${buttonTextColour && `color: ${buttonTextColour};`}
				${buttonColour && `background-color: ${buttonColour};`}
    ${buttonSelectBorderColour &&
				`box-shadow: inset 0 0 0 4px ${buttonSelectBorderColour};`}
			}

			&:checked + label {
				${buttonSelectColour &&
				`background-color: ${buttonSelectColour};`}
				${buttonSelectBorderColour &&
				`box-shadow: inset 0 0 0 4px ${buttonSelectBorderColour};`}
			}
			&:checked + label > * {
				${buttonSelectTextColour && `color: ${buttonSelectTextColour};`}
			}
		`,
		cardPaddingOverride: css`
			> div > label > div {
				padding-left: 0 !important;
				padding-right: 0 !important;
			}
		`,
		frequencyGroupOverride: css`
			margin-bottom: ${space[1]}px;

			${from.mobileLandscape} {
				margin-bottom: ${space[3]}px;
			}

			> div {
				${until.mobileLandscape} {
					display: grid;
					column-gap: ${space[2]}px;
					grid-template-columns: repeat(${frequencyColumns}, 1fr);
				}
			}
		`,
		amountsOverride: css`
			> div > label:last-of-type {
				grid-column-start: 1;
				grid-column-end: 3;
			}
			> div {
				${until.mobileLandscape} {
					display: grid;
					column-gap: ${space[2]}px;
				}
			}
		`,
	};
};

export const ChoiceCardInteractive: ReactComponent<
	ChoiceCardInteractiveProps
> = ({
	selection,
	setSelectionsCallback,
	submitComponentEvent,
	currencySymbol,
	amountsTest,
	componentId,
	design,
}: ChoiceCardInteractiveProps) => {
	if (!selection || !amountsTest) {
		return <></>;
	}

	const { displayContributionType, amountsCardData } = amountsTest;

	const contributionTypeTabOrder: ContributionFrequency[] = [
		'ONE_OFF',
		'MONTHLY',
		'ANNUAL',
	];

	const noOfContributionTabs = displayContributionType.length > 2 ? 3 : 2;
	const hideChooseYourAmount =
		!!amountsCardData[selection.frequency].hideChooseYourAmount;

	const style = buildStyles(design, noOfContributionTabs);

	const trackClick = (type: 'amount' | 'frequency'): void => {
		if (submitComponentEvent) {
			submitComponentEvent({
				component: {
					componentType: 'ACQUISITIONS_OTHER',
					id: `${componentId}-change-${type}`,
				},
				action: 'CLICK',
			});
		}
	};

	const updateAmount = (amount: number | 'other') => {
		trackClick('amount');
		setSelectionsCallback({
			frequency: selection.frequency,
			amount,
		});
	};

	const updateFrequency = (frequency: ContributionFrequency) => {
		trackClick('frequency');
		setSelectionsCallback({
			frequency,
			amount: amountsCardData[frequency].defaultAmount,
		});
	};

	const choiceCardAmount = (amount?: number) => {
		if (!isUndefined(amount)) {
			return (
				<ChoiceCard
					key={amount}
					value={`${amount}`}
					label={`${currencySymbol}${amount} ${
						contributionType[selection.frequency].suffix
					}`}
					id={`contributions-banner-${amount}`}
					checked={selection.amount === amount}
					onChange={() => updateAmount(amount)}
					cssOverrides={style.buttonOverride}
				/>
			);
		}
		return <></>;
	};

	const generateChoiceCardAmountsButtons = () => {
		const productData = amountsCardData[selection.frequency];
		const requiredAmounts = productData.amounts;

		// Something is wrong with the data
		if (!Array.isArray(requiredAmounts) || !requiredAmounts.length) {
			return (
				<ChoiceCard
					value="third"
					label="Other"
					id="contributions-banner-third"
					checked={true}
					cssOverrides={style.buttonOverride}
				/>
			);
		}

		return [
			choiceCardAmount(requiredAmounts[0]),
			choiceCardAmount(requiredAmounts[1]),

			hideChooseYourAmount ? (
				choiceCardAmount(requiredAmounts[2])
			) : (
				<ChoiceCard
					key={2}
					value="other"
					label="Other"
					id="contributions-banner-other"
					checked={selection.amount === 'other'}
					onChange={() => updateAmount('other')}
					cssOverrides={style.buttonOverride}
				/>
			),
		];
	};

	const generateChoiceCardFrequencyTab = (
		frequency: ContributionFrequency,
	) => {
		const label = contributionType[frequency].label;
		return (
			<ChoiceCard
				key={label}
				label={label}
				value={frequency}
				id={`contributions-banner-${frequency}`}
				checked={selection.frequency === frequency}
				onChange={() => updateFrequency(frequency)}
				cssOverrides={style.buttonOverride}
			/>
		);
	};

	return (
		<>
			<ChoiceCardGroup
				name="contribution-frequency"
				label="Contribution frequency"
				columns={noOfContributionTabs}
				hideLabel={true}
				cssOverrides={[
					style.cardPaddingOverride,
					style.frequencyGroupOverride,
				]}
			>
				{contributionTypeTabOrder.map((f) =>
					displayContributionType.includes(f) ? (
						generateChoiceCardFrequencyTab(f)
					) : (
						<></>
					),
				)}
			</ChoiceCardGroup>
			<ChoiceCardGroup
				name="contribution-amount"
				label="Contribution amount"
				columns={2}
				hideLabel={true}
				aria-labelledby={selection.frequency}
				cssOverrides={[
					style.cardPaddingOverride,
					style.amountsOverride,
				]}
			>
				{generateChoiceCardAmountsButtons()}
			</ChoiceCardGroup>
		</>
	);
};
