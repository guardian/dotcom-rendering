import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { SignedInWithCookies } from '../../lib/identity';
import { palette as themePalette } from '../../palette';
import { RecommendationCount } from './RecommendationCount';

export default { title: 'Discussion/RecommendationCount' };

const signedInStatus: SignedInWithCookies = { kind: 'SignedInWithCookies' };

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
			authStatus={signedInStatus}
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
			authStatus={signedInStatus}
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
			authStatus={signedInStatus}
			userMadeComment={true}
		/>
	</Wrapper>
);
OwnPost.decorators = [splitTheme([defaultFormat])];
