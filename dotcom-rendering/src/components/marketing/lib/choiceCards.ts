/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/shared/helpers/choiceCards.ts
 */
import type {
	ContributionFrequency,
	ContributionType,
} from '@guardian/support-dotcom-components/dist/shared/src/types';

export interface ChoiceCardSelection {
	frequency: ContributionFrequency;
	amount: number | 'other';
}

export const contributionType: ContributionType = {
	ONE_OFF: {
		label: 'One-time',
		suffix: '',
	},
	MONTHLY: {
		label: 'Monthly',
		suffix: 'per month',
	},
	ANNUAL: {
		label: 'Annual',
		suffix: 'per year',
	},
};
