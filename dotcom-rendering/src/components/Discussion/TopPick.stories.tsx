import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { CommentType, SignedInUser } from '../../types/discussion';
import { TopPick } from './TopPick';

export default { component: TopPick, title: 'Discussion/TopPick' };

const format = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

const comment: CommentType = {
	id: 25488498,
	body: '<p>Lorem ipsum dolor sit amet, <a href="https://www.theguardian.com">consectetur adipiscing elit</a>. Cras sodales metus magna, et molestie diam gravida quis. Ut ligula libero, condimentum quis elit at</p> <p>dignissim pulvinar enim. Phasellus mattis felis in mi facilisis, ut vulputate ipsum rhoncus. Proin elit sem, venenatis vitae molestie id, posuere non justo. Morbi ac felis quis diam elementum tempus. Suspendisse efficitur consectetur sapien eleifend rhoncus. Aenean tempor leo pharetra, venenatis elit non, porta arcu. Maecenas tempus tellus sit amet iaculis molestie. Praesent id lobortis dolor. Nullam et ipsum ut leo accumsan vehicula vitae a augue. Integer vitae massa a tellus porta tincidunt ac sed tellus. Etiam ac semper lectus. Quisque et dui libero. Maecenas et lobortis nulla. Ut elementum egestas hendrerit.</p>',
	date: '26 July 2013 4:35pm',
	isoDateTime: '2013-07-26T15:13:20Z',
	status: 'visible',
	webUrl: 'https://discussion.theguardian.com/comment-permalink/25488498',
	apiUrl: 'https://discussion.guardianapis.com/discussion-api/comment/25488498',
	numRecommends: 0,
	isHighlighted: false,
	responseTo: {
		displayName: 'FrankDeFord',
		commentApiUrl:
			'https://discussion.guardianapis.com/discussion-api/comment/25487686',
		isoDateTime: '2013-07-26T15:13:20Z',
		date: '26 July 2013 4:13pm',
		commentId: '25487686',
		commentWebUrl:
			'https://discussion.theguardian.com/comment-permalink/25487686',
	},
	userProfile: {
		userId: '3150446',
		displayName: 'AndyPietrasik',
		webUrl: 'https://profile.theguardian.com/user/id/3150446',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/3150446',
		avatar: 'https://avatar.guim.co.uk/user/3150446',
		secureAvatarUrl: 'https://avatar.guim.co.uk/user/3150446',
		badge: [
			{
				name: 'Staff',
			},
		],
	},
};

const commentContributor: CommentType = {
	...comment,
	userProfile: {
		...comment.userProfile,
		badge: [
			{
				name: 'Contributor',
			},
		],
	},
};

const commentWithShortBody: CommentType = {
	...comment,
	body: "<p>It's still there FrankDeFord - and thanks, I will pass that on</p>",
};

const contributorCommentWithShortBody: CommentType = {
	...comment,
	userProfile: {
		...comment.userProfile,
		badge: [
			{
				name: 'Contributor',
			},
		],
	},
	body: "<p>It's still there FrankDeFord - and thanks, I will pass that on</p>",
};

const commentResponseError = {
	kind: 'error',
	error: { code: 'NetworkError', message: 'Mocked' },
} as const;

const aUser = {
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
	authStatus: { kind: 'SignedInWithCookies' },
} satisfies SignedInUser;

export const LongPick = () => (
	<div
		css={css`
			width: 100%;
			max-width: 300px;
		`}
	>
		<TopPick
			comment={comment}
			userMadeComment={false}
			onPermalinkClick={() => {}}
		/>
	</div>
);
LongPick.storyName = 'Long - Staff';
LongPick.decorators = [splitTheme([format])];

export const ShortPick = () => (
	<div
		css={css`
			width: 100%;
			max-width: 300px;
		`}
	>
		<TopPick
			comment={commentWithShortBody}
			user={aUser}
			userMadeComment={false}
			onPermalinkClick={() => {}}
		/>
	</div>
);
ShortPick.storyName = 'Short - Staff';
ShortPick.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Opinion,
		},
	]),
];

export const LongPickContributor = () => (
	<div
		css={css`
			width: 100%;
			max-width: 300px;
		`}
	>
		<TopPick
			comment={commentContributor}
			userMadeComment={false}
			onPermalinkClick={() => {}}
		/>
	</div>
);
LongPickContributor.storyName = 'Long - Contributor';
LongPickContributor.decorators = [splitTheme([format])];

export const ShortPickContributor = () => (
	<div
		css={css`
			width: 100%;
			max-width: 300px;
		`}
	>
		<TopPick
			comment={contributorCommentWithShortBody}
			user={aUser}
			userMadeComment={false}
			onPermalinkClick={() => {}}
		/>
	</div>
);
ShortPickContributor.storyName = 'Short - Contributor';
ShortPickContributor.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Opinion,
		},
	]),
];
