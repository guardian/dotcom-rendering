import { css } from '@emotion/react';
import { parse } from 'valibot';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
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

export default { component: Comments, title: 'Discussion/App' };

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

export const LoggedOutHiddenPicks = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl={discussionMock.discussion.key}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			isClosedForComments={false}
			isClosedForRecommendations={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={3}
			filters={filters}
			topLevelCommentCount={
				discussionMock.discussion.topLevelCommentCount
			}
			loading={false}
			comments={discussionMock.discussion.comments}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
		/>
	</div>
);
LoggedOutHiddenPicks.storyName = 'when logged out, unexpanded and with picks';
LoggedOutHiddenPicks.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Culture,
		},
	]),
];

export const InitialPage = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl={discussionMock.discussion.key}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			isClosedForComments={false}
			isClosedForRecommendations={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={true}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={1}
			filters={filters}
			topLevelCommentCount={
				discussionMock.discussion.topLevelCommentCount
			}
			loading={false}
			comments={discussionMock.discussion.comments}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
		/>
	</div>
);
InitialPage.storyName = 'with initial page set to 1';
InitialPage.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const LoggedInHiddenNoPicks = () => {
	return (
		<div
			css={css`
				width: 100%;
				max-width: 620px;
			`}
		>
			<Comments
				shortUrl="p/abc123"
				isClosedForComments={false}
				isClosedForRecommendations={false}
				user={aUser}
				baseUrl="https://discussion.theguardian.com/discussion-api"
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				expanded={false}
				onPermalinkClick={() => {}}
				apiKey=""
				idApiUrl="https://idapi.theguardian.com"
				page={3}
				filters={filters}
				topLevelCommentCount={
					discussionMock.discussion.topLevelCommentCount
				}
				loading={false}
				comments={discussionMock.discussion.comments}
				topForm={defaultCommentForm}
				replyForm={{ ...defaultCommentForm }}
				bottomForm={defaultCommentForm}
				reportAbuse={() => Promise.resolve(ok(true))}
			/>
		</div>
	);
};
LoggedInHiddenNoPicks.storyName =
	'when logged in, with no picks and not expanded';
LoggedInHiddenNoPicks.decorators = [splitTheme([format])];

export const LoggedIn = () => {
	return (
		<div
			css={css`
				width: 100%;
				max-width: 620px;
			`}
		>
			<Comments
				shortUrl="p/abc123"
				isClosedForComments={false}
				isClosedForRecommendations={false}
				user={aUser}
				baseUrl="https://discussion.theguardian.com/discussion-api"
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				expanded={true}
				onPermalinkClick={() => {}}
				apiKey=""
				idApiUrl="https://idapi.theguardian.com"
				page={3}
				filters={filters}
				topLevelCommentCount={
					discussionMock.discussion.topLevelCommentCount
				}
				loading={false}
				comments={discussionMock.discussion.comments}
				topForm={defaultCommentForm}
				replyForm={defaultCommentForm}
				bottomForm={defaultCommentForm}
				reportAbuse={() => Promise.resolve(ok(true))}
			/>
		</div>
	);
};
LoggedIn.storyName = 'when logged in and expanded';
LoggedIn.decorators = [lightDecorator([format])];

export const LoggedInShortDiscussion = () => {
	return (
		<div
			css={css`
				width: 100%;
				max-width: 620px;
			`}
		>
			<Comments
				shortUrl={discussionWithTwoComments.discussion.key} // Two comments"
				isClosedForComments={false}
				isClosedForRecommendations={false}
				user={aUser}
				baseUrl="https://discussion.theguardian.com/discussion-api"
				additionalHeaders={{
					'D2-X-UID': 'testD2Header',
					'GU-Client': 'testClientHeader',
				}}
				expanded={true}
				onPermalinkClick={() => {}}
				apiKey=""
				idApiUrl="https://idapi.theguardian.com"
				page={3}
				filters={filters}
				topLevelCommentCount={
					discussionWithTwoComments.discussion.topLevelCommentCount
				}
				loading={false}
				comments={discussionWithTwoComments.discussion.comments}
				topForm={defaultCommentForm}
				replyForm={defaultCommentForm}
				bottomForm={defaultCommentForm}
				reportAbuse={() => Promise.resolve(ok(true))}
			/>
		</div>
	);
};
LoggedInShortDiscussion.decorators = [splitTheme([format])];

export const LoggedOutHiddenNoPicks = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/abc123"
			isClosedForComments={false}
			isClosedForRecommendations={false}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={3}
			filters={filters}
			topLevelCommentCount={
				discussionMock.discussion.topLevelCommentCount
			}
			loading={false}
			comments={discussionMock.discussion.comments}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
		/>
	</div>
);

LoggedOutHiddenNoPicks.storyName =
	'when logged out, with no picks and not expanded';
LoggedOutHiddenNoPicks.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Sport,
		},
	]),
];

export const Closed = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl={discussionMock.discussion.key}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			isClosedForComments={true}
			isClosedForRecommendations={false}
			user={aUser}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={true}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={3}
			filters={filters}
			topLevelCommentCount={
				discussionMock.discussion.topLevelCommentCount
			}
			loading={false}
			comments={discussionMock.discussion.comments}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
		/>
	</div>
);
Closed.storyName = 'Logged in but closed for comments';
Closed.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const NoComments = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5x" // A discussion with zero comments
			baseUrl="https://discussion.theguardian.com/discussion-api"
			isClosedForComments={false}
			isClosedForRecommendations={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={3}
			filters={filters}
			topLevelCommentCount={0}
			loading={false}
			comments={[]}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
		/>
	</div>
);
NoComments.storyName = 'when no comments have been made';
NoComments.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Culture,
		},
	]),
];

export const LegacyDiscussion = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl={legacyDiscussionWithoutThreading.discussion.key} // A 'legacy' discussion that doesn't allow threading
			baseUrl="https://discussion.theguardian.com/discussion-api"
			isClosedForComments={false}
			isClosedForRecommendations={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={2}
			filters={filters}
			topLevelCommentCount={
				legacyDiscussionWithoutThreading.discussion.commentCount
			}
			loading={false}
			comments={legacyDiscussionWithoutThreading.discussion.comments}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
		/>
	</div>
);
LegacyDiscussion.storyName = "a legacy discussion that doesn't allow threading";
LegacyDiscussion.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Culture,
		},
	]),
];
