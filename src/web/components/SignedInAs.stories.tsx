import { css } from '@emotion/react';

import { Design, Display, Pillar } from '@guardian/types';
import { decidePalette } from '@root/src/web/lib/decidePalette';

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

const Container = ({ children }: { children: React.ReactNode }) => (
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
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.News,
					display: Display.Standard,
					design: Design.Article,
				})}
				enableDiscussionSwitch={true}
				commentCount={3}
				user={aUser}
			/>
		</Container>
	);
};
SignedIn.story = { name: 'when signed in' };

export const Image = () => {
	return (
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Culture,
					display: Display.Standard,
					design: Design.Article,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				user={{
					...aUser,
					secureAvatarUrl: 'https://avatar.guim.co.uk/user/101885881',
				}}
			/>
		</Container>
	);
};
Image.story = { name: 'when signed in with an avatar set' };

export const Banned = () => {
	return (
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Culture,
					display: Display.Standard,
					design: Design.Article,
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
		</Container>
	);
};
Banned.story = { name: 'when user is banned' };

export const NoDisplayName = () => {
	return (
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.News,
					display: Display.Standard,
					design: Design.Article,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				user={{
					...aUser,
					displayName: '',
				}}
			/>
		</Container>
	);
};
NoDisplayName.story = { name: 'before a display name has been set' };

export const NotSignedIn = () => {
	return (
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Lifestyle,
					display: Display.Standard,
					design: Design.Article,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
			/>
		</Container>
	);
};
NotSignedIn.story = {
	name: 'when the discussion is open but user is not signed in',
};

export const DiscussionClosed = () => {
	return (
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: Display.Standard,
					design: Design.Article,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				isClosedForComments={true}
				user={aUser}
			/>
		</Container>
	);
};
DiscussionClosed.story = {
	name: 'when the discussion is closed and the user is signed in',
};

export const DiscussionClosedSignedOut = () => {
	return (
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Sport,
					display: Display.Standard,
					design: Design.Article,
				})}
				enableDiscussionSwitch={true}
				commentCount={32}
				isClosedForComments={true}
			/>
		</Container>
	);
};
DiscussionClosedSignedOut.story = {
	name: 'when the discussion is closed and the user is signed out',
};

export const DiscussionDisabled = () => {
	return (
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: Display.Standard,
					design: Design.Article,
				})}
				enableDiscussionSwitch={false}
				commentCount={32}
				isClosedForComments={false}
				user={aUser}
			/>
		</Container>
	);
};
DiscussionDisabled.story = {
	name: 'with discussion disabled sitewide and the user signed in',
};

export const DiscussionDisabledSignedOut = () => {
	return (
		<Container>
			<SignedInAs
				palette={decidePalette({
					theme: Pillar.Opinion,
					display: Display.Standard,
					design: Design.Article,
				})}
				enableDiscussionSwitch={false}
				commentCount={32}
				isClosedForComments={false}
			/>
		</Container>
	);
};
DiscussionDisabledSignedOut.story = {
	name: 'with discussion disabled sitewide and the user signed out',
};
