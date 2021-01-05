import React from 'react';

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
			pillar="news"
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
			pillar="culture"
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
			pillar="culture"
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
			pillar="labs"
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
			pillar="lifestyle"
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
NotSignedIn.story = { name: 'not signed in' };

export const Culture = () => {
	return (
		<SignedInAs
			pillar="culture"
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
Culture.story = { name: 'with culture pillar' };

export const Opinion = () => {
	return (
		<SignedInAs
			pillar="opinion"
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
Opinion.story = { name: 'with opinion pillar' };

export const news = () => {
	return (
		<SignedInAs
			pillar="news"
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
news.story = { name: 'with news pillar' };

export const Sport = () => {
	return (
		<SignedInAs
			pillar="sport"
			enableDiscussionSwitch={true}
			commentCount={32}
		/>
	);
};
Sport.story = { name: 'with sport pillar' };

export const DiscussionClosed = () => {
	return (
		<SignedInAs
			pillar="opinion"
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
			pillar="sport"
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
			pillar="opinion"
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
			pillar="opinion"
			enableDiscussionSwitch={false}
			commentCount={32}
			isClosedForComments={false}
		/>
	);
};
DiscussionDisabledSignedOut.story = {
	name: 'discussion disabled sitewide, user signed out',
};
