const supportedFrequencyValues = ['daily', 'weekly', 'monthly', 'fortnightly'];
const specialCasedValues: Record<string, string> = {
	'every weekday': 'daily',
};
export const buildDetailText = (input: string) => {
	const normalisedInput = input.toLowerCase().trim();

	const specialCase = specialCasedValues[normalisedInput];
	if (specialCase) {
		return `Free ${specialCase} newsletter`;
	}

	if (supportedFrequencyValues.includes(normalisedInput)) {
		return `Free ${normalisedInput} newsletter`;
	}

	return 'Free newsletter';
};
