import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { parse } from 'valibot';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { discussion } from '../../../fixtures/manual/discussion';
import { discussionWithTwoComments as discussionWithTwoCommentsMock } from '../../../fixtures/manual/discussionWithTwoComments';
import { legacyDiscussionWithoutThreading } from '../../../fixtures/manual/legacyDiscussionWithoutThreading';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import type {
	CommentFormProps,
	FilterOptions,
	Reader,
} from '../../lib/discussion';
import { discussionApiResponseSchema } from '../../lib/discussion';
import { ok } from '../../lib/result';
import { Comments } from './Comments';

const meta = {
	component: Comments,
	title: 'Discussion/App',
	decorators: [
		(Story) => (
			<div
				css={css`
					max-width: 1240px;
					padding: 20px;
				`}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Comments>;

export default meta;

type Story = StoryObj<typeof meta>;

const discussionMock = parse(discussionApiResponseSchema, discussion);
if (discussionMock.status !== 'ok') throw new Error('Invalid mock');
const discussionWithTwoComments = parse(
	discussionApiResponseSchema,
	discussionWithTwoCommentsMock,
);
if (discussionWithTwoComments.status !== 'ok') throw new Error('Invalid mock');

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

const format = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

const filters: FilterOptions = {
	threads: 'collapsed',
	pageSize: 25,
	orderBy: 'newest',
};

const defaultCommentForm = {
	userNameMissing: false,
	error: '',
	previewBody: '',
} satisfies CommentFormProps;

export const LoggedOutHiddenPicks = {
	name: 'When logged out, unexpanded and with picks',
	args: {
		shortUrl: discussionMock.discussion.key,
		baseUrl: 'https://discussion.theguardian.com/discussion-api',
		isClosedForComments: false,
		isClosedForRecommendations: false,
		additionalHeaders: {
			'D2-X-UID': 'testD2Header',
			'GU-Client': 'testClientHeader',
		},
		expanded: false,
		onPermalinkClick: () => {},
		apiKey: '',
		idApiUrl: 'https://idapi.theguardian.com',
		page: 3,
		filters,
		topLevelCommentCount: discussionMock.discussion.topLevelCommentCount,
		loading: false,
		comments: discussionMock.discussion.comments,
		topForm: defaultCommentForm,
		replyForm: defaultCommentForm,
		bottomForm: defaultCommentForm,
		reportAbuse: () => Promise.resolve(ok(true)),
	},
	decorators: [
		splitTheme([
			{
				...format,
				theme: Pillar.Culture,
			},
		]),
	],
} satisfies Story;

export const InitialPage = {
	...LoggedOutHiddenPicks,
	name: 'With initial page set to 1',
	args: {
		...LoggedOutHiddenPicks.args,
		expanded: true,
		page: 1,
	},
	decorators: [
		splitTheme([
			{
				...format,
				theme: Pillar.Lifestyle,
			},
		]),
	],
} satisfies Story;

export const LoggedInHiddenNoPicks = {
	...LoggedOutHiddenPicks,
	name: 'When logged in, with no picks and not expanded',
	args: {
		...LoggedOutHiddenPicks.args,
		shortUrl: 'p/abc123',
		user: aUser,
	},
	decorators: [splitTheme([format])],
} satisfies Story;

export const LoggedIn = {
	...LoggedInHiddenNoPicks,
	name: 'When logged in and expanded',
	args: {
		...LoggedOutHiddenPicks.args,
		expanded: true,
	},
	decorators: [splitTheme([format])],
} satisfies Story;

export const LoggedInShortDiscussion = {
	...LoggedInHiddenNoPicks,
	args: {
		...LoggedInHiddenNoPicks.args,
		shortUrl: discussionWithTwoComments.discussion.key,
		expanded: true,
		topLevelCommentCount:
			discussionWithTwoComments.discussion.topLevelCommentCount,
		comments: discussionWithTwoComments.discussion.comments,
	},
	decorators: [splitTheme([format])],
} satisfies Story;

export const LoggedOutHiddenNoPicks = {
	...LoggedOutHiddenPicks,
	args: {
		...LoggedOutHiddenPicks.args,
		shortUrl: 'p/abc123',
	},
	name: 'When logged out, with no picks and not expanded',
	decorators: [
		splitTheme([
			{
				...format,
				theme: Pillar.Sport,
			},
		]),
	],
} satisfies Story;

export const Closed = {
	...LoggedOutHiddenPicks,
	args: {
		...LoggedOutHiddenPicks.args,
		isClosedForComments: true,
		user: aUser,
		expanded: true,
	},
	name: 'Logged in but closed for comments',
	decorators: [
		splitTheme([
			{
				...format,
				theme: Pillar.Lifestyle,
			},
		]),
	],
} satisfies Story;

export const NoComments = {
	...LoggedOutHiddenPicks,
	args: {
		...LoggedOutHiddenPicks.args,
		shortUrl: 'p/39f5x',
		topLevelCommentCount: 0,
		comments: [],
	},
	decorators: [
		splitTheme([
			{
				...format,
				theme: Pillar.Culture,
			},
		]),
	],
} satisfies Story;

export const LegacyDiscussion = {
	...LoggedOutHiddenPicks,
	args: {
		...LoggedOutHiddenPicks.args,
		shortUrl: legacyDiscussionWithoutThreading.discussion.key,
		page: 2,
		topLevelCommentCount:
			legacyDiscussionWithoutThreading.discussion.commentCount,
		comments: legacyDiscussionWithoutThreading.discussion.comments,
	},
	name: "A legacy discussion that doesn't allow threading",
	decorators: [
		splitTheme([
			{
				...format,
				theme: Pillar.Culture,
			},
		]),
	],
} satisfies Story;
