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
