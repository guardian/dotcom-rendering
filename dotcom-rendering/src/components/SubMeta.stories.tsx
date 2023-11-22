import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { getAllThemes } from '../lib/format';
import { SubMeta } from './SubMeta';

export default {
	component: SubMeta,
	title: 'Components/SubMeta',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

const subMetaKeywordLinks = [
	{
		url: '/world/eu',
		title: 'European Union',
	},
	{
		url: '/world/europe-news',
		title: 'Europe',
	},
	{
		url: '/environment/flooding',
		title: 'Flooding',
	},
	{
		url: '/world/wildfires',
		title: 'Wildfires',
	},
	{
		url: '/world/natural-disasters',
		title: 'Natural disasters and extreme weather',
	},
	{
		url: '/tone/news',
		title: 'news',
	},
];

const subMetaSectionLinks = [
	{
		url: '/environment/climate-change',
		title: 'Climate change',
	},
];

export const StandardStory = ({ format }: StoryProps) => {
	return (
		<Wrapper key={JSON.stringify(format)}>
			<SubMeta
				format={format}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Wrapper>
	);
};
StandardStory.storyName = 'Standard - All pillars';
StandardStory.decorators = [splitTheme()];

const allDeadBlogThemes = getAllThemes({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.DeadBlog,
});

export const DeadBlogStory = ({ format }: StoryProps) => {
	return (
		<Wrapper key={JSON.stringify(format)}>
			<SubMeta
				format={format}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Wrapper>
	);
};
DeadBlogStory.storyName = 'Deadblog - All pillars';
DeadBlogStory.decorators = [splitTheme(allDeadBlogThemes)];
