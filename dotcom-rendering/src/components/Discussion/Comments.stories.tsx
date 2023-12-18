import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
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

const format = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: Pillar.News,
};

export const LoggedOutHiddenPicks = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5z"
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
			shortUrl="p/39f5z"
			initialPage={3}
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
		/>
	</div>
);
InitialPage.storyName = 'with initial page set to 3';
InitialPage.decorators = [
	splitTheme([
		{
			...format,
			theme: Pillar.Lifestyle,
		},
	]),
];

export const Overrides = () => (
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
	splitTheme([
		{
			...format,
			theme: Pillar.Opinion,
		},
	]),
];

export const LoggedInHiddenNoPicks = () => (
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
		/>
	</div>
);
LoggedInHiddenNoPicks.storyName =
	'when logged in, with no picks and not expanded';
LoggedInHiddenNoPicks.decorators = [splitTheme([format])];

export const LoggedIn = () => (
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
		/>
	</div>
);
LoggedIn.storyName = 'when logged in and expanded';
LoggedIn.decorators = [lightDecorator([format])];

export const LoggedInShortDiscussion = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<Comments
			shortUrl="p/39f5a" // Two comments"
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
			shortUrl="p/39f5z"
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
			shortUrl="p/32255" // A 'legacy' discussion that doesn't allow threading
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
