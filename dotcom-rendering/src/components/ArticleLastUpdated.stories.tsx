import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { palette as themePalette } from '../palette';
import { ArticleLastUpdated } from './ArticleLastUpdated';

export default {
	component: ArticleLastUpdated,
	title: 'Components/ArticleLastUpdated',
};

const liveBlogFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.LiveBlog,
	theme: Pillar.News,
};

export const LiveBlog = () => (
	<div
		css={css`
			background: ${themePalette('--standfirst-background')};
		`}
	>
		<ArticleLastUpdated
			format={liveBlogFormat}
			lastUpdated={1641038370000}
		/>
	</div>
);

LiveBlog.decorators = [
	splitTheme([liveBlogFormat], { orientation: 'vertical' }),
];

const deadBlogFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.DeadBlog,
	theme: Pillar.News,
};
export const DeadBlog = () => (
	<div
		css={css`
			background: ${themePalette('--standfirst-background')};
		`}
	>
		<ArticleLastUpdated
			format={deadBlogFormat}
			lastUpdated={1641038370000}
		/>
	</div>
);

DeadBlog.decorators = [
	splitTheme([deadBlogFormat], { orientation: 'vertical' }),
];
