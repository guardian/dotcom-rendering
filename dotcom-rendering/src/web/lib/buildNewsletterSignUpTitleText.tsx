export const buildTitleText = (displayName: string) => {
	const startsWithThe = displayName.toLowerCase().startsWith('the');

	return (
		<>
			Sign up to {!startsWithThe && 'the'} <span>{displayName}</span>{' '}
			newsletter
		</>
	);
};
