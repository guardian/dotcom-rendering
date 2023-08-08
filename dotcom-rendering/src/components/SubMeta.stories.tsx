import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { getAllThemes, getThemeNameAsString } from '../lib/format';
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

export const News = () => {
	return (
		<Wrapper>
			<SubMeta
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
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
News.storyName = 'News';

export const Sport = () => {
	return (
		<Wrapper>
			<SubMeta
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.Sport,
				}}
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
Sport.storyName = 'Sport';

export const Culture = () => {
	return (
		<Wrapper>
			<SubMeta
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.Culture,
				}}
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
Culture.storyName = 'Culture';

export const Lifestyle = () => {
	return (
		<Wrapper>
			<SubMeta
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.Lifestyle,
				}}
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
Lifestyle.storyName = 'Lifestyle';

export const Opinion = () => {
	return (
		<Wrapper>
			<SubMeta
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.Opinion,
				}}
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
Opinion.storyName = 'Opinion';

export const Labs = () => {
	return (
		<Wrapper>
			<SubMeta
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.Labs,
				}}
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
Labs.storyName = 'Labs';

export const SpecialReport = () => {
	return (
		<Wrapper>
			<SubMeta
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticleSpecial.SpecialReport,
				}}
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
SpecialReport.storyName = 'SpecialReport';

export const DeadBlogStory = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<Wrapper key={JSON.stringify(format)}>
					<p>{getThemeNameAsString(format)}</p>
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
			))}
		</>
	);
};
DeadBlogStory.storyName = 'Deadblog - All pillars';
