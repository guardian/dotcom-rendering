import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { useState } from 'react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
import { discussion as discussionMock } from '../../../fixtures/manual/discussion';
import { discussionWithTwoComments } from '../../../fixtures/manual/discussionWithTwoComments';
import { legacyDiscussionWithoutThreading } from '../../../fixtures/manual/legacyDiscussionWithoutThreading';
import { ok } from '../../lib/result';
import type { FilterOptions, Reader } from '../../types/discussion';
import { Comments } from './Comments';

export default { component: Comments, title: 'Discussion/App' };

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
	isActive: false,
	userNameMissing: false,
	error: '',
	showPreview: false,
	previewBody: '',
	body: '',
};

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
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={3}
			setPage={() => {}}
			filters={filters}
			topLevelCommentCount={
				discussionMock.discussion.topLevelCommentCount
			}
			loading={false}
			comments={discussionMock.discussion.comments}
			setComment={() => {}}
			handleFilterChange={() => {}}
			setTopFormActive={() => {}}
			setReplyFormActive={() => {}}
			setBottomFormActive={() => {}}
			setTopFormUserMissing={() => {}}
			setReplyFormUserMissing={() => {}}
			setBottomFormUserMissing={() => {}}
			setTopFormError={() => {}}
			setReplyFormError={() => {}}
			setBottomFormError={() => {}}
			setTopFormShowPreview={() => {}}
			setReplyFormShowPreview={() => {}}
			setBottomFormShowPreview={() => {}}
			setTopFormPreviewBody={() => {}}
			setReplyFormPreviewBody={() => {}}
			setBottomFormPreviewBody={() => {}}
			setTopFormBody={() => {}}
			setReplyFormBody={() => {}}
			setBottomFormBody={() => {}}
			pickError=""
			setPickError={() => {}}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
			expandCommentReplies={() => {}}
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
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={true}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={1}
			setPage={() => {}}
			filters={filters}
			topLevelCommentCount={
				discussionMock.discussion.topLevelCommentCount
			}
			loading={false}
			comments={discussionMock.discussion.comments}
			setComment={() => {}}
			handleFilterChange={() => {}}
			setTopFormActive={() => {}}
			setReplyFormActive={() => {}}
			setBottomFormActive={() => {}}
			setTopFormUserMissing={() => {}}
			setReplyFormUserMissing={() => {}}
			setBottomFormUserMissing={() => {}}
			setTopFormError={() => {}}
			setReplyFormError={() => {}}
			setBottomFormError={() => {}}
			setTopFormShowPreview={() => {}}
			setReplyFormShowPreview={() => {}}
			setBottomFormShowPreview={() => {}}
			setTopFormPreviewBody={() => {}}
			setReplyFormPreviewBody={() => {}}
			setBottomFormPreviewBody={() => {}}
			setTopFormBody={() => {}}
			setReplyFormBody={() => {}}
			setBottomFormBody={() => {}}
			pickError=""
			setPickError={() => {}}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
			expandCommentReplies={() => {}}
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
	const [isActive, setActive] = useState(false);
	const [body, setBody] = useState('');

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
				setPage={() => {}}
				filters={filters}
				topLevelCommentCount={
					discussionMock.discussion.topLevelCommentCount
				}
				loading={false}
				comments={discussionMock.discussion.comments}
				setComment={() => {}}
				handleFilterChange={() => {}}
				setTopFormActive={() => {}}
				setReplyFormActive={setActive}
				setBottomFormActive={() => {}}
				setTopFormUserMissing={() => {}}
				setReplyFormUserMissing={() => {}}
				setBottomFormUserMissing={() => {}}
				setTopFormError={() => {}}
				setReplyFormError={() => {}}
				setBottomFormError={() => {}}
				setTopFormShowPreview={() => {}}
				setReplyFormShowPreview={() => {}}
				setBottomFormShowPreview={() => {}}
				setTopFormPreviewBody={() => {}}
				setReplyFormPreviewBody={() => {}}
				setBottomFormPreviewBody={() => {}}
				setTopFormBody={() => {}}
				setReplyFormBody={setBody}
				setBottomFormBody={() => {}}
				pickError=""
				setPickError={() => {}}
				topForm={defaultCommentForm}
				replyForm={{ ...defaultCommentForm, isActive, body }}
				bottomForm={defaultCommentForm}
				reportAbuse={() => Promise.resolve(ok(true))}
				expandCommentReplies={() => {}}
			/>
		</div>
	);
};
LoggedInHiddenNoPicks.storyName =
	'when logged in, with no picks and not expanded';
LoggedInHiddenNoPicks.decorators = [splitTheme([format])];

export const LoggedIn = () => {
	const [isTopFormActive, setTopFormActive] = useState(false);
	const [isReplyFormActive, setReplyFormActive] = useState(false);
	const [isBottomFormActive, setBottomFormActive] = useState(false);
	const [topFormBody, setTopFormBody] = useState('');
	const [replyFormBody, setReplyFormBody] = useState('');
	const [bottomFormBody, setBottomFormBody] = useState('');

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
				setPage={() => {}}
				filters={filters}
				topLevelCommentCount={
					discussionMock.discussion.topLevelCommentCount
				}
				loading={false}
				comments={discussionMock.discussion.comments}
				setComment={() => {}}
				handleFilterChange={() => {}}
				setTopFormActive={setTopFormActive}
				setReplyFormActive={setReplyFormActive}
				setBottomFormActive={setBottomFormActive}
				setTopFormUserMissing={() => {}}
				setReplyFormUserMissing={() => {}}
				setBottomFormUserMissing={() => {}}
				setTopFormError={() => {}}
				setReplyFormError={() => {}}
				setBottomFormError={() => {}}
				setTopFormShowPreview={() => {}}
				setReplyFormShowPreview={() => {}}
				setBottomFormShowPreview={() => {}}
				setTopFormPreviewBody={() => {}}
				setReplyFormPreviewBody={() => {}}
				setBottomFormPreviewBody={() => {}}
				pickError=""
				setPickError={() => {}}
				setTopFormBody={setTopFormBody}
				setReplyFormBody={setReplyFormBody}
				setBottomFormBody={setBottomFormBody}
				topForm={{
					...defaultCommentForm,
					isActive: isTopFormActive,
					body: topFormBody,
				}}
				replyForm={{
					...defaultCommentForm,
					isActive: isReplyFormActive,
					body: replyFormBody,
				}}
				bottomForm={{
					...defaultCommentForm,
					isActive: isBottomFormActive,
					body: bottomFormBody,
				}}
				reportAbuse={() => Promise.resolve(ok(true))}
				expandCommentReplies={() => {}}
			/>
		</div>
	);
};
LoggedIn.storyName = 'when logged in and expanded';
LoggedIn.decorators = [lightDecorator([format])];

export const LoggedInShortDiscussion = () => {
	const [isTopFormActive, setTopFormActive] = useState(false);
	const [isReplyFormActive, setReplyFormActive] = useState(false);
	const [topFormBody, setTopFormBody] = useState('');
	const [replyFormBody, setReplyFormBody] = useState('');

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
				setPage={() => {}}
				filters={filters}
				topLevelCommentCount={
					discussionWithTwoComments.discussion.topLevelCommentCount
				}
				loading={false}
				comments={discussionWithTwoComments.discussion.comments}
				setComment={() => {}}
				handleFilterChange={() => {}}
				setTopFormActive={setTopFormActive}
				setReplyFormActive={setReplyFormActive}
				setBottomFormActive={() => {}}
				setTopFormUserMissing={() => {}}
				setReplyFormUserMissing={() => {}}
				setBottomFormUserMissing={() => {}}
				setTopFormError={() => {}}
				setReplyFormError={() => {}}
				setBottomFormError={() => {}}
				setTopFormShowPreview={() => {}}
				setReplyFormShowPreview={() => {}}
				setBottomFormShowPreview={() => {}}
				setTopFormPreviewBody={() => {}}
				setReplyFormPreviewBody={() => {}}
				setBottomFormPreviewBody={() => {}}
				setTopFormBody={setTopFormBody}
				setReplyFormBody={setReplyFormBody}
				setBottomFormBody={() => {}}
				pickError=""
				setPickError={() => {}}
				topForm={{
					...defaultCommentForm,
					isActive: isTopFormActive,
					body: topFormBody,
				}}
				replyForm={{
					...defaultCommentForm,
					isActive: isReplyFormActive,
					body: replyFormBody,
				}}
				bottomForm={defaultCommentForm}
				reportAbuse={() => Promise.resolve(ok(true))}
				expandCommentReplies={() => {}}
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
			setPage={() => {}}
			filters={filters}
			topLevelCommentCount={
				discussionMock.discussion.topLevelCommentCount
			}
			loading={false}
			comments={discussionMock.discussion.comments}
			setComment={() => {}}
			handleFilterChange={() => {}}
			setTopFormActive={() => {}}
			setReplyFormActive={() => {}}
			setBottomFormActive={() => {}}
			setTopFormUserMissing={() => {}}
			setReplyFormUserMissing={() => {}}
			setBottomFormUserMissing={() => {}}
			setTopFormError={() => {}}
			setReplyFormError={() => {}}
			setBottomFormError={() => {}}
			setTopFormShowPreview={() => {}}
			setReplyFormShowPreview={() => {}}
			setBottomFormShowPreview={() => {}}
			setTopFormPreviewBody={() => {}}
			setReplyFormPreviewBody={() => {}}
			setBottomFormPreviewBody={() => {}}
			setTopFormBody={() => {}}
			setReplyFormBody={() => {}}
			setBottomFormBody={() => {}}
			pickError=""
			setPickError={() => {}}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
			expandCommentReplies={() => {}}
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
			setPage={() => {}}
			filters={filters}
			topLevelCommentCount={
				discussionMock.discussion.topLevelCommentCount
			}
			loading={false}
			comments={discussionMock.discussion.comments}
			setComment={() => {}}
			handleFilterChange={() => {}}
			setTopFormActive={() => {}}
			setReplyFormActive={() => {}}
			setBottomFormActive={() => {}}
			setTopFormUserMissing={() => {}}
			setReplyFormUserMissing={() => {}}
			setBottomFormUserMissing={() => {}}
			setTopFormError={() => {}}
			setReplyFormError={() => {}}
			setBottomFormError={() => {}}
			setTopFormShowPreview={() => {}}
			setReplyFormShowPreview={() => {}}
			setBottomFormShowPreview={() => {}}
			setTopFormPreviewBody={() => {}}
			setReplyFormPreviewBody={() => {}}
			setBottomFormPreviewBody={() => {}}
			setTopFormBody={() => {}}
			setReplyFormBody={() => {}}
			setBottomFormBody={() => {}}
			pickError=""
			setPickError={() => {}}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
			expandCommentReplies={() => {}}
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
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={3}
			setPage={() => {}}
			filters={filters}
			topLevelCommentCount={0}
			loading={false}
			comments={[]}
			setComment={() => {}}
			handleFilterChange={() => {}}
			setTopFormActive={() => {}}
			setReplyFormActive={() => {}}
			setBottomFormActive={() => {}}
			setTopFormUserMissing={() => {}}
			setReplyFormUserMissing={() => {}}
			setBottomFormUserMissing={() => {}}
			setTopFormError={() => {}}
			setReplyFormError={() => {}}
			setBottomFormError={() => {}}
			setTopFormShowPreview={() => {}}
			setReplyFormShowPreview={() => {}}
			setBottomFormShowPreview={() => {}}
			setTopFormPreviewBody={() => {}}
			setReplyFormPreviewBody={() => {}}
			setBottomFormPreviewBody={() => {}}
			setTopFormBody={() => {}}
			setReplyFormBody={() => {}}
			setBottomFormBody={() => {}}
			pickError=""
			setPickError={() => {}}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
			expandCommentReplies={() => {}}
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
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
			page={2}
			setPage={() => {}}
			filters={filters}
			topLevelCommentCount={
				legacyDiscussionWithoutThreading.discussion.commentCount
			}
			loading={false}
			comments={legacyDiscussionWithoutThreading.discussion.comments}
			setComment={() => {}}
			handleFilterChange={() => {}}
			setTopFormActive={() => {}}
			setReplyFormActive={() => {}}
			setBottomFormActive={() => {}}
			setTopFormUserMissing={() => {}}
			setReplyFormUserMissing={() => {}}
			setBottomFormUserMissing={() => {}}
			setTopFormError={() => {}}
			setReplyFormError={() => {}}
			setBottomFormError={() => {}}
			setTopFormShowPreview={() => {}}
			setReplyFormShowPreview={() => {}}
			setBottomFormShowPreview={() => {}}
			setTopFormPreviewBody={() => {}}
			setReplyFormPreviewBody={() => {}}
			setBottomFormPreviewBody={() => {}}
			setTopFormBody={() => {}}
			setReplyFormBody={() => {}}
			setBottomFormBody={() => {}}
			pickError=""
			setPickError={() => {}}
			topForm={defaultCommentForm}
			replyForm={defaultCommentForm}
			bottomForm={defaultCommentForm}
			reportAbuse={() => Promise.resolve(ok(true))}
			expandCommentReplies={() => {}}
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
