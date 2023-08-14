import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { render, waitFor } from '@testing-library/react';
import { Follow } from './Follow.importable';

let isFollowingMock = false;
jest.mock('../lib/bridgetApi', () => ({
	notificationsClient: {
		isFollowing: jest.fn().mockResolvedValue(() => isFollowingMock),
	},
}));

it('should show a follow button for a single contributor when rendering for apps', () => {
	const { getByText } = render(
		<Follow
			id="profile/gwyntopham"
			displayName="Gwyn Topham"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>,
	);
	expect(getByText('Follow Gwyn Topham')).toBeInTheDocument();
});

it('should show a follow button for a single contributor when rendering for apps', async () => {
	isFollowingMock = true;
	const { getByText } = render(
		<Follow
			id="profile/gwyntopham"
			displayName="Gwyn Topham"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>,
	);
	await waitFor(() =>
		expect(getByText('Unfollow Gwyn Topham')).toBeInTheDocument(),
	);
});
