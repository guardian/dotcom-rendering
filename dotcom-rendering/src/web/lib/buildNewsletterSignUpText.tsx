const supportedFrequencyValues = ['daily', 'weekly', 'monthly', 'fortnightly'];
const specialCasedValues: Record<string, string> = {
	'every weekday': 'daily',
};
export const buildDetailText = (input: string) => {
	const normalisedInput = input.toLowerCase().trim();

	if (normalisedInput in specialCasedValues) {
		return `Free ${specialCasedValues[normalisedInput]} newsletter`;
	}

	if (supportedFrequencyValues.includes(normalisedInput)) {
		return `Free ${normalisedInput} newsletter`;
	}

	return 'Free newsletter';
};
