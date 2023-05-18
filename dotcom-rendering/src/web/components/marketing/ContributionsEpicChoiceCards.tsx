import React from 'react';
import { ChoiceCardGroup, ChoiceCard } from '@guardian/source-react-components';
import { css } from '@emotion/react';
import { until } from '@guardian/source-foundations';
import { visuallyHidden } from '@guardian/source-foundations';
import {
	countryCodeToCountryGroupId,
	getLocalCurrencySymbol,
} from './types/geolocation';
import {
	ChoiceCardAmounts,
	ContributionAmounts,
	ContributionFrequency,
} from './types/abTests/epic';
import { OphanComponentEvent } from '@guardian/libs';

// CSS Styling
// -------------------------------------------
const frequencyChoiceCardGroupOverrides = css`
	${until.mobileLandscape} {
		> div {
			display: flex !important;
		}

		> div label:nth-of-type(2) {
			margin-left: 4px !important;
			margin-right: 4px !important;
		}
	}
`;

const hideChoiceCardGroupLegend = css`
	legend {
		${visuallyHidden};
	}
`;

// This `position: relative` is necessary to stop it jumping to the top of the page when a button is clicked
const container = css`
	position: relative;
`;

// Static data + type defs
// -------------------------------------------
interface ContributionTypeItem {
	label: string;
	frequency: ContributionFrequency;
	suffix: string;
}
type ContributionType = {
	[key in ContributionFrequency]: ContributionTypeItem;
};

const contributionType: ContributionType = {
	ONE_OFF: {
		label: 'Single',
		frequency: 'ONE_OFF',
		suffix: '',
	},
	MONTHLY: {
		label: 'Monthly',
		frequency: 'MONTHLY',
		suffix: 'per month',
	},
	ANNUAL: {
		label: 'Annual',
		frequency: 'ANNUAL',
		suffix: 'per year',
	},
};

// ContributionsEpicChoiceCards - exported component
// -------------------------------------------
export interface ChoiceCardSelection {
	frequency: ContributionFrequency;
	amount: number | 'other';
}

interface EpicChoiceCardProps {
	selection?: ChoiceCardSelection;
	setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
	submitComponentEvent?: (event: OphanComponentEvent) => void;
	currencySymbol: string;
	amounts?: ContributionAmounts;
	amountsTestName?: string;
	amountsVariantName?: string;
}

export const ContributionsEpicChoiceCards: React.FC<EpicChoiceCardProps> = ({
	selection,
	setSelectionsCallback,
	submitComponentEvent,
	currencySymbol,
	amounts,
	amountsTestName = 'test_undefined',
	amountsVariantName = 'variant_undefined',
}: EpicChoiceCardProps) => {
	if (!selection || !amounts) {
		return <></>;
	}

	// const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;
	//
	// useEffect(() => {
	// 	if (hasBeenSeen) {
	// 		// For ophan
	// 		if (submitComponentEvent) {
	// 			submitComponentEvent({
	// 				component: {
	// 					componentType: 'ACQUISITIONS_OTHER',
	// 					id: 'contributions-epic-choice-cards',
	// 				},
	// 				action: 'VIEW',
	// 				abTest: {
	// 					name: amountsTestName,
	// 					variant: amountsVariantName,
	// 				},
	// 			});
	// 		}
	// 	}
	// }, [hasBeenSeen, submitComponentEvent]);

	const trackClick = (type: 'amount' | 'frequency'): void => {
		if (submitComponentEvent) {
			submitComponentEvent({
				component: {
					componentType: 'ACQUISITIONS_OTHER',
					id: `contributions-epic-choice-cards-change-${type}`,
				},
				action: 'CLICK',
			});
		}
	};

	const updateAmount = (amount: number | 'other') => {
		trackClick('amount');
		setSelectionsCallback({
			frequency: selection.frequency,
			amount: amount,
		});
	};

	const updateFrequency = (frequency: ContributionFrequency) => {
		trackClick('frequency');
		setSelectionsCallback({
			frequency: frequency,
			amount: amounts[frequency].defaultAmount,
		});
	};

	const ChoiceCardAmount = ({ amount }: { amount?: number }) => {
		if (amount) {
			return (
				<ChoiceCard
					value={`${amount}`}
					label={`${currencySymbol}${amount} ${
						contributionType[selection.frequency].suffix
					}`}
					id={`contributions-epic-${amount}`}
					checked={selection.amount === amount}
					onChange={() => updateAmount(amount)}
				/>
			);
		}
		return null;
	};

	const generateChoiceCardAmountsButtons = () => {
		const productData = amounts[selection.frequency];
		const requiredAmounts = productData.amounts;
		const hideChooseYourAmount = productData.hideChooseYourAmount ?? false;

		// Something is wrong with the data
		if (!Array.isArray(requiredAmounts) || !requiredAmounts.length) {
			return (
				<ChoiceCard
					value="third"
					label="Other"
					id="contributions-epic-third"
					checked={true}
				/>
			);
		}

		return (
			<>
				<ChoiceCardAmount amount={requiredAmounts[0]} />
				<ChoiceCardAmount amount={requiredAmounts[1]} />
				{hideChooseYourAmount ? (
					<ChoiceCardAmount amount={requiredAmounts[2]} />
				) : (
					<ChoiceCard
						value="other"
						label="Other"
						id="contributions-epic-other"
						checked={selection.amount == 'other'}
						onChange={() => updateAmount('other')}
					/>
				)}
			</>
		);
	};

	const generateChoiceCardFrequencyTab = (
		frequency: ContributionFrequency,
	) => {
		const frequencyVal = contributionType[frequency].frequency;
		return (
			<ChoiceCard
				label={contributionType[frequency].label}
				value={frequencyVal}
				id={`contributions-epic-${frequencyVal}`}
				checked={selection.frequency === frequencyVal}
				onChange={() => updateFrequency(frequencyVal)}
			/>
		);
	};

	return (
		<div css={container}>
			<br />
			<ChoiceCardGroup
				name="contribution-frequency"
				columns={3}
				css={[
					frequencyChoiceCardGroupOverrides,
					hideChoiceCardGroupLegend,
				]}
				label="Contribution frequency"
			>
				{generateChoiceCardFrequencyTab('ONE_OFF')}
				{generateChoiceCardFrequencyTab('MONTHLY')}
				{generateChoiceCardFrequencyTab('ANNUAL')}
			</ChoiceCardGroup>
			<br />
			<ChoiceCardGroup
				name="contribution-amount"
				label="Contribution amount"
				css={hideChoiceCardGroupLegend}
			>
				{generateChoiceCardAmountsButtons()}
			</ChoiceCardGroup>
		</div>
	);
};
