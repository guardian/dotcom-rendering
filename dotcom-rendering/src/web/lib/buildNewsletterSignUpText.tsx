export const buildTitleText = (displayName: string) => {
	const opening = displayName.toLowerCase().startsWith('the')
		? 'Sign up to '
		: 'Sign up to the ';

	const closing = ' newsletter';

	return (
		<>
			{opening}
			<span>{displayName}</span>
			{closing}
		</>
	);
};

const supportedFrequencyValues = ['daily', 'weekly', 'monthly', 'fortnightly'];
export const buildDetailText = (input: string) => {
	const normalisedInput = input.toLowerCase().trim();

	if (supportedFrequencyValues.includes(normalisedInput)) {
		return `Free ${normalisedInput} newsletter`;
	}

	return 'Free newsletter';
};
