import { render, waitFor } from '@testing-library/react';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

it('should show a Notifications Off button for a single contributor when rendering for apps', () => {
	const { getByText } = render(
		<FollowNotificationsButton
			isFollowing={false}
			onClickHandler={() => undefined}
		/>,
	);
	expect(getByText('Notifications! off')).toBeInTheDocument();
});

it('should show a Notifications On button for a single contributor when rendering for apps', async () => {
	const { getByText } = render(
		<FollowNotificationsButton
			onClickHandler={() => undefined}
			isFollowing={true}
		/>,
	);
	await waitFor(() =>
		expect(getByText('Notifications! on')).toBeInTheDocument(),
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
	expect(getByText('Follow Jon Doe')).toBeInTheDocument();
});

it('should show a follow contributor button for a single contributor when rendering for apps', async () => {
	const { getByText } = render(
		<FollowTagButton
			onClickHandler={() => undefined}
			isFollowing={true}
			displayName="Jon Doe"
		/>,
	);
	await waitFor(() =>
		expect(getByText('Following Jon Doe')).toBeInTheDocument(),
	);
});
