import { render, waitFor } from '@testing-library/react';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

it('should show a Notifications Off button for a single contributor when rendering for apps', () => {
	const { getByText } = render(
		<FollowNotificationsButton
			isFollowing={false}
			onClickHandler={() => undefined}
		/>,
	);
	expect(getByText('Notifications off')).toBeInTheDocument();
});

it('should show a Notifications On button for a single contributor when rendering for apps', async () => {
	const { getByText } = render(
		<FollowNotificationsButton
			onClickHandler={() => undefined}
			isFollowing={true}
		/>,
	);
	await waitFor(() =>
		expect(getByText('Notifications on')).toBeInTheDocument(),
	);
});

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
