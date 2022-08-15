const supportedFrequencyValues = ['daily', 'weekly', 'monthly', 'fortnightly'];
export const buildDetailText = (input: string) => {
	const normalisedInput = input.toLowerCase().trim();

	if (supportedFrequencyValues.includes(normalisedInput)) {
		return `Free ${normalisedInput} newsletter`;
	}

	return 'Free newsletter';
};
