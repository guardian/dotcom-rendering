import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { StoryProps } from '../../../.storybook/decorators/splitThemeDecorator';
import type { SignedInUser } from '../../types/discussion';
import { Comments } from './Comments';

export default { component: Comments, title: 'Discussion/App' };

const aUser: SignedInUser = {
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
	authStatus: { kind: 'SignedInWithCookies' },
};

const defaultFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export const LoggedOutHiddenPicks: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5z"
			baseUrl="https://discussion.theguardian.com/discussion-api"
			format={{
				...format,
				theme: Pillar.Culture,
			}}
			isClosedForComments={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
		/>
	</div>
);
LoggedOutHiddenPicks.storyName = 'when logged out, unexpanded and with picks';
LoggedOutHiddenPicks.decorators = [
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

export const InitialPage: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5z"
			initialPage={3}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			format={format}
			isClosedForComments={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={true}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
		/>
	</div>
);
InitialPage.storyName = 'with initial page set to 3';
InitialPage.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const Overrides: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5z"
			initialPage={3}
			pageSizeOverride={50}
			orderByOverride="recommendations"
			baseUrl="https://discussion.theguardian.com/discussion-api"
			format={format}
			isClosedForComments={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={true}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
		/>
	</div>
);
Overrides.storyName = 'with page size overridden to 50';
Overrides.decorators = [
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

export const LoggedInHiddenNoPicks: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/abc123"
			format={format}
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
		/>
	</div>
);
LoggedInHiddenNoPicks.storyName =
	'when logged in, with no picks and not expanded';
LoggedOutHiddenPicks.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const LoggedIn: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/abc123"
			format={format}
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
		/>
	</div>
);
LoggedIn.storyName = 'when logged in and expanded';
LoggedIn.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const LoggedInShortDiscussion: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5a" // Two comments"
			format={format}
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
		/>
	</div>
);
LoggedInShortDiscussion.storyName = 'when logged in but only two comments made';
LoggedInShortDiscussion.decorators = [
	splitTheme([defaultFormat], { orientation: 'vertical' }),
];

export const LoggedOutHiddenNoPicks: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/abc123"
			format={format}
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
		/>
	</div>
);
LoggedOutHiddenNoPicks.storyName =
	'when logged out, with no picks and not expanded';
LoggedOutHiddenNoPicks.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Sport,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const Closed: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5z"
			baseUrl="https://discussion.theguardian.com/discussion-api"
			format={format}
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
		/>
	</div>
);
Closed.storyName = 'Logged in but closed for comments';
Closed.decorators = [
	splitTheme(
		[
			{
				...defaultFormat,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const NoComments: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5x" // A discussion with zero comments
			baseUrl="https://discussion.theguardian.com/discussion-api"
			format={format}
			isClosedForComments={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
		/>
	</div>
);
NoComments.storyName = 'when no comments have been made';
NoComments.decorators = [
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

export const LegacyDiscussion: StoryObj = ({ format }: StoryProps) => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/32255" // A 'legacy' discussion that doesn't allow threading
			baseUrl="https://discussion.theguardian.com/discussion-api"
			format={format}
			isClosedForComments={false}
			additionalHeaders={{
				'D2-X-UID': 'testD2Header',
				'GU-Client': 'testClientHeader',
			}}
			expanded={false}
			onPermalinkClick={() => {}}
			apiKey=""
			idApiUrl="https://idapi.theguardian.com"
		/>
	</div>
);
LegacyDiscussion.storyName = "a legacy discussion that doesn't allow threading";
LegacyDiscussion.decorators = [
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
