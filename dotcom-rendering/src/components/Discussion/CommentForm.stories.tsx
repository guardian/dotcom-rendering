import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { useState } from 'react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { CommentType, Reader } from '../../lib/discussion';
import { ok } from '../../lib/result';
import { CommentForm } from './CommentForm';

export default { component: CommentForm, title: 'Discussion/CommentForm' };

const shortUrl = '/p/39f5z';

const defaultFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const commentResponseError = {
	kind: 'error',
	error: 'NetworkError',
} as const;

const aUser: Reader = {
	kind: 'Reader',
	profile: {
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
	},
	onComment: () => Promise.resolve(commentResponseError),
	onReply: () => Promise.resolve(commentResponseError),
	onRecommend: () => Promise.resolve(true),
	addUsername: () => Promise.resolve(ok(true)),
	reportAbuse: () => Promise.resolve(ok(true)),
};

const aComment: CommentType = {
	id: '25487686',
	body: "<p>Beau Jos pizza in Idaho Springs is a great place for mountain pizza pies. Order one with extra thick crust and drizzle it with honey. Y'all can try the Challenge if you fancy, and sketch on your napkins so your art can join their walls. This was 15 years ago, but I hope it's still there! As for music, anything from Boulder's own Big Head Todd &amp; the Monsters - 'Broken Hearted Savior' is a good start, with 'Bittersweet' a good road track. I'm jealous!!!</p>",
	date: '26 July 2013 4:13pm',
	isoDateTime: '2013-07-26T15:13:20Z',
	status: 'visible',
	webUrl: 'https://discussion.theguardian.com/comment-permalink/25487686',
	apiUrl: 'https://discussion.guardianapis.com/discussion-api/comment/25487686',
	numRecommends: 0,
	isHighlighted: false,
	userProfile: {
		userId: '2762428',
		displayName: 'FrankDeFord',
		webUrl: 'https://profile.theguardian.com/user/id/2762428',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/2762428',
		avatar: 'https://avatar.guim.co.uk/user/2762428',
		secureAvatarUrl: 'https://avatar.guim.co.uk/user/2762428',
		badge: [],
	},
	responses: [],
	metaData: {
		commentCount: 2,
		staffCommenterCount: 1,
		editorsPickCount: 0,
		blockedCount: 0,
		responseCount: 1,
	},
};

export const Default = () => {
	return (
		<CommentForm
			shortUrl={shortUrl}
			user={aUser}
			onAddComment={() => {}}
			userNameMissing={false}
			setUserNameMissing={() => {}}
			error={''}
			setError={() => {}}
			previewBody=""
			setPreviewBody={() => {}}
		/>
	);
};
Default.storyName = 'default';
Default.decorators = [splitTheme([defaultFormat], { orientation: 'vertical' })];

// This story has a mocked post endpoint that returns an error, see 97d6eab4a98917f63bc96a7ac64f7ca7

export const Error = () => {
	const [userNameMissing, setUserNameMissing] = useState(true);

	return (
		<CommentForm
			shortUrl={'/p/g8g7v'}
			user={aUser}
			onAddComment={() => {}}
			userNameMissing={userNameMissing}
			setUserNameMissing={setUserNameMissing}
			error={'Username field cannot be empty'}
			setError={() => {}}
			previewBody=""
			setPreviewBody={() => {}}
		/>
	);
};

Error.storyName = 'form with errors';
Error.decorators = [splitTheme([defaultFormat], { orientation: 'vertical' })];

export const Active = () => {
	return (
		<CommentForm
			shortUrl={shortUrl}
			user={aUser}
			onAddComment={() => {}}
			commentBeingRepliedTo={aComment}
			error={''}
			setError={() => {}}
			userNameMissing={false}
			setUserNameMissing={() => {}}
			previewBody=""
			setPreviewBody={() => {}}
		/>
	);
};
Active.storyName = 'form is active';
Active.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Culture,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const Premoderated = () => {
	return (
		<CommentForm
			shortUrl={shortUrl}
			user={{
				...aUser,
				profile: {
					...aUser.profile,
					privateFields: {
						canPostComment: true,
						isPremoderated: true,
						hasCommented: true,
					},
				},
			}}
			onAddComment={() => {}}
			commentBeingRepliedTo={aComment}
			error={''}
			setError={() => {}}
			userNameMissing={false}
			setUserNameMissing={() => {}}
			previewBody=""
			setPreviewBody={() => {}}
		/>
	);
};
Premoderated.storyName = 'user is premoderated';
Premoderated.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Opinion,
			},
		],
		{ orientation: 'vertical' },
	),
];
