import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { ok } from '../../lib/result';
import { palette as themePalette } from '../../palette';
import type { SignedInUser } from '../../types/discussion';
import { RecommendationCount } from './RecommendationCount';

export default { title: 'Discussion/RecommendationCount' };

const commentResponseError = {
	kind: 'error',
	error: 'NetworkError',
} as const;

const aUser = {
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
} satisfies SignedInUser;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			backgroundColor: themePalette('--article-section-background'),
			padding: '20px',
		}}
	>
		{children}
	</div>
);

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const NeverRecommended = () => (
	<Wrapper>
		<RecommendationCount
			commentId={123}
			initialCount={383}
			alreadyRecommended={false}
			user={aUser}
			userMadeComment={false}
		/>
	</Wrapper>
);
NeverRecommended.decorators = [splitTheme([defaultFormat])];

export const AlreadyRecommended = () => (
	<Wrapper>
		<RecommendationCount
			commentId={123}
			initialCount={83}
			alreadyRecommended={true}
			user={aUser}
			userMadeComment={false}
		/>
	</Wrapper>
);
AlreadyRecommended.decorators = [splitTheme([defaultFormat])];

export const NotSignedIn = () => (
	<Wrapper>
		<RecommendationCount
			commentId={123}
			initialCount={83}
			alreadyRecommended={false}
			userMadeComment={false}
		/>
	</Wrapper>
);
NotSignedIn.decorators = [splitTheme([defaultFormat])];

export const OwnPost = () => (
	<Wrapper>
		<RecommendationCount
			commentId={123}
			initialCount={83}
			alreadyRecommended={false}
			user={aUser}
			userMadeComment={true}
		/>
	</Wrapper>
);
OwnPost.decorators = [splitTheme([defaultFormat])];
