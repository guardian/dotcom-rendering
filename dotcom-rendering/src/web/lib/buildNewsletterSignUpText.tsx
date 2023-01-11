const supportedFrequencyValues = ['daily', 'weekly', 'monthly', 'fortnightly'];
const specialCasedValues: Record<string, string> = {
	'every weekday': 'daily',
};
export const buildDetailText = (input: string) => {
	const normalisedInput = input.toLowerCase().trim();
	const specialCasedValue = specialCasedValues[normalisedInput];

	if (specialCasedValue) {
		return `Free ${specialCasedValue} newsletter`;
	}

	if (supportedFrequencyValues.includes(normalisedInput)) {
		return `Free ${normalisedInput} newsletter`;
	}

	return 'Free newsletter';
};
