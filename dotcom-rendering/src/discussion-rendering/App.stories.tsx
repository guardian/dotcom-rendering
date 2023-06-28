import { css } from '@emotion/react';
import { ArticlePillar } from '@guardian/libs';
import { App } from './App';
import type { UserProfile } from './discussionTypes';

export default { component: App, title: 'App' };

const aUser: UserProfile = {
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

export const LoggedOutHiddenPicks = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5z"
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={ArticlePillar.Culture}
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

export const InitialPage = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5z"
			initialPage={3}
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={ArticlePillar.Lifestyle}
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

export const Overrides = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5z"
			initialPage={3}
			pageSizeOverride={50}
			orderByOverride="recommendations"
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={ArticlePillar.Opinion}
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

export const LoggedInHiddenNoPicks = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/abc123"
			pillar={ArticlePillar.News}
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

export const LoggedIn = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/abc123"
			pillar={ArticlePillar.News}
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

export const LoggedInShortDiscussion = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5a" // Two comments"
			pillar={ArticlePillar.News}
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
LoggedInShortDiscussion.storyName = 'when logged in but only wo comments made';

export const LoggedOutHiddenNoPicks = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/abc123"
			pillar={ArticlePillar.Sport}
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

export const Closed = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5z"
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={ArticlePillar.Lifestyle}
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

export const NoComments = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/39f5x" // A discussion with zero comments
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={ArticlePillar.Culture}
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

export const LegacyDiscussion = () => (
	<div
		css={css`
			width: 100%;
			max-width: 620px;
		`}
	>
		<App
			shortUrl="p/32255" // A 'legacy' discussion that doesn't allow threading
			baseUrl="https://discussion.theguardian.com/discussion-api"
			pillar={ArticlePillar.Culture}
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
