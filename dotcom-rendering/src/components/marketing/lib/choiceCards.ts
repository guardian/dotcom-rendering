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
