import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { render, waitFor } from '@testing-library/react';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

it('should show a follow tag button not following for a single contributor when rendering for apps', () => {
	const { getByText } = render(
		<FollowTagButton
			isFollowing={false}
			onClickHandler={() => undefined}
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

it('should show a follow tag button following for a single contributor when rendering for apps', async () => {
	const { getByText } = render(
		<FollowTagButton
			onClickHandler={() => undefined}
			displayName="Gwyn Topham"
			isFollowing={true}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>,
	);

	await waitFor(() =>
		expect(getByText('Following Gwyn Topham')).toBeInTheDocument(),
	);
});
it('should show a follow notifications button "off" for a single contributor when rendering for apps', () => {
	const { getByText } = render(
		<FollowNotificationsButton
			isFollowing={false}
			onClickHandler={() => undefined}
			displayName="Gwyn Topham"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>,
	);
	expect(getByText('Notifications off')).toBeInTheDocument();
});

it('should show a follow notifications button "on" for a single contributor when rendering for apps', async () => {
	const { getByText } = render(
		<FollowNotificationsButton
			onClickHandler={() => undefined}
			displayName="Gwyn Topham"
			isFollowing={true}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>,
	);
	await waitFor(() =>
		expect(getByText('Notifications on')).toBeInTheDocument(),
	);
});
