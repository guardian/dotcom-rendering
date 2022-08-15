import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';
import { SignedInAs } from './SignedInAs';

const aUser = {
	userId: 'abc123',
	displayName: 'Jane Smith',
	webUrl: '',
	apiUrl: '',
	avatar: '',
	secureAvatarUrl: '',
	badge: [],
	privateFields: {
		canPostComment: true,
		isPremoderated: false,
		hasCommented: true,
	},
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 220px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export default {
	component: SignedInAs,
	title: 'Components/SignedInAs',
};

export const SignedIn = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={3}
				user={aUser}
			/>
		</Wrapper>
	);
};
SignedIn.story = { name: 'when signed in' };

export const Image = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.Culture,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				user={{
					...aUser,
					secureAvatarUrl: 'https://avatar.guim.co.uk/user/101885881',
				}}
			/>
		</Wrapper>
	);
};
Image.story = { name: 'when signed in with an avatar set' };

export const Banned = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.Culture,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				user={{
					...aUser,
					privateFields: {
						...aUser.privateFields,
						canPostComment: false,
					},
				}}
			/>
		</Wrapper>
	);
};
Banned.story = { name: 'when user is banned' };

export const NoDisplayName = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				user={{
					...aUser,
					displayName: '',
				}}
			/>
		</Wrapper>
	);
};
NoDisplayName.story = { name: 'before a display name has been set' };

export const NotSignedIn = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.Lifestyle,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
			/>
		</Wrapper>
	);
};
NotSignedIn.story = {
	name: 'when the discussion is open but user is not signed in',
};

export const DiscussionClosed = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				isClosedForComments={true}
				user={aUser}
			/>
		</Wrapper>
	);
};
DiscussionClosed.story = {
	name: 'when the discussion is closed and the user is signed in',
};

export const DiscussionClosedSignedOut = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.Sport,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				isClosedForComments={true}
			/>
		</Wrapper>
	);
};
DiscussionClosedSignedOut.story = {
	name: 'when the discussion is closed and the user is signed out',
};

export const DiscussionDisabled = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={false}
				commentCount={32}
				isClosedForComments={false}
				user={aUser}
			/>
		</Wrapper>
	);
};
DiscussionDisabled.story = {
	name: 'with discussion disabled sitewide and the user signed in',
};

export const DiscussionDisabledSignedOut = () => {
	return (
		<Wrapper>
			<SignedInAs
				palette={decidePalette({
					theme: ArticlePillar.Opinion,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				enableDiscussionSwitch={false}
				commentCount={32}
				isClosedForComments={false}
			/>
		</Wrapper>
	);
};
DiscussionDisabledSignedOut.story = {
	name: 'with discussion disabled sitewide and the user signed out',
};
