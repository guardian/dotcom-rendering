import { render, waitFor } from '@testing-library/react';
import { FollowButton } from './FollowButton';

it('should show a follow button for a single contributor when rendering for apps', () => {
	const { getByText } = render(
		<FollowButton isFollowing={false} onClickHandler={() => undefined} />,
	);
	expect(getByText('Notifications off')).toBeInTheDocument();
});

it('should show a follow button for a single contributor when rendering for apps', async () => {
	const { getByText } = render(
		<FollowButton onClickHandler={() => undefined} isFollowing={true} />,
	);
	await waitFor(() =>
		expect(getByText('Notifications on')).toBeInTheDocument(),
	);
});
