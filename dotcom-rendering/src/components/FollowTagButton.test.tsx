import { render, waitFor } from '@testing-library/react';
import { FollowTagButton } from './FollowTagButton';

it('should show a follow contributor button for a single contributor when rendering for apps', () => {
	const { getByText } = render(
		<FollowTagButton
			isFollowing={false}
			onClickHandler={() => undefined}
			displayName="Jon Doe"
		/>,
	);
	expect(getByText('Follow Jon Doe in My Guardian')).toBeInTheDocument();
});

it('should not include the in My Guardian when the display name is longer than 21 characters in the follow action', () => {
	const { getByText } = render(
		<FollowTagButton
			isFollowing={false}
			onClickHandler={() => undefined}
			displayName="abcdefghijklmnopqrstuv"
		/>,
	);
	expect(getByText('Follow abcdefghijklmnopqrstuv')).toBeInTheDocument();
});

it('should not include the in My Guardian when the display name is longer than 21 characters in the following action', async () => {
	const { getByText } = render(
		<FollowTagButton
			onClickHandler={() => undefined}
			isFollowing={true}
			displayName="abcdefghijklmnopqrstuv"
		/>,
	);
	await waitFor(() =>
		expect(
			getByText('Following abcdefghijklmnopqrstuv'),
		).toBeInTheDocument(),
	);
});
