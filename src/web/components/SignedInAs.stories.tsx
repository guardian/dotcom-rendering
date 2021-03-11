import React from 'react';

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

export default {
	component: SignedInAs,
	title: 'Components/SignedInAs',
};

export const SignedIn = () => {
	return (
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
	);
};
SignedIn.story = { name: 'signed in' };

export const Image = () => {
	return (
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
	);
};
Image.story = { name: 'with image' };

export const Banned = () => {
	return (
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
	);
};
Banned.story = { name: 'when banned' };

export const NoDisplayName = () => {
	return (
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
	);
};
NoDisplayName.story = { name: 'before a display name has been set' };

export const NotSignedIn = () => {
	return (
		<SignedInAs
			palette={decidePalette({
				theme: Pillar.Lifestyle,
				display: Display.Standard,
				design: Design.Article,
			})}
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
NotSignedIn.story = { name: 'not signed in' };

export const Culture = () => {
	return (
		<SignedInAs
			palette={decidePalette({
				theme: Pillar.Culture,
				display: Display.Standard,
				design: Design.Article,
			})}
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
Culture.story = { name: 'with culture pillar' };

export const Opinion = () => {
	return (
		<SignedInAs
			palette={decidePalette({
				theme: Pillar.Opinion,
				display: Display.Standard,
				design: Design.Article,
			})}
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
Opinion.story = { name: 'with opinion pillar' };

export const news = () => {
	return (
		<SignedInAs
			palette={decidePalette({
				theme: Pillar.News,
				display: Display.Standard,
				design: Design.Article,
			})}
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
news.story = { name: 'with news pillar' };

export const Sport = () => {
	return (
		<SignedInAs
			palette={decidePalette({
				theme: Pillar.Sport,
				display: Display.Standard,
				design: Design.Article,
			})}
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
Sport.story = { name: 'with sport pillar' };

export const DiscussionClosed = () => {
	return (
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
	);
};
DiscussionClosed.story = { name: 'discussion closed, user signed in' };

export const DiscussionClosedSignedOut = () => {
	return (
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
	);
};
DiscussionClosedSignedOut.story = {
	name: 'discussion closed, user not signed in',
};

export const DiscussionDisabled = () => {
	return (
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
	);
};
DiscussionDisabled.story = {
	name: 'discussion disabled sitewide, user signed in',
};

export const DiscussionDisabledSignedOut = () => {
	return (
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
	);
};
DiscussionDisabledSignedOut.story = {
	name: 'discussion disabled sitewide, user signed out',
};
