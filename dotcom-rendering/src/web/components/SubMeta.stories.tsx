/* eslint-disable jsx-a11y/accessible-emoji */
import { Design, Display, Pillar, Special } from '@guardian/types';

import { css } from '@emotion/react';
import { decidePalette } from '../lib/decidePalette';

import { SubMeta } from './SubMeta';

export default {
	component: SubMeta,
	title: 'Components/SubMeta',
};

const Container = ({ children }: { children: React.ReactNode }) => (
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
		<Container>
			<SubMeta
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Container>
	);
};
News.story = { name: 'News' };

export const Sport = () => {
	return (
		<Container>
			<SubMeta
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Sport,
				})}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Sport,
				}}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Container>
	);
};
Sport.story = { name: 'Sport' };

export const Culture = () => {
	return (
		<Container>
			<SubMeta
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Culture,
				})}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Culture,
				}}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Container>
	);
};
Culture.story = { name: 'Culture' };

export const Lifestyle = () => {
	return (
		<Container>
			<SubMeta
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Lifestyle,
				})}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Lifestyle,
				}}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Container>
	);
};
Lifestyle.story = { name: 'Lifestyle' };

export const Opinion = () => {
	return (
		<Container>
			<SubMeta
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Opinion,
				})}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.Opinion,
				}}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Container>
	);
};
Opinion.story = { name: 'Opinion' };

export const Labs = () => {
	return (
		<Container>
			<SubMeta
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Special.Labs,
				})}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Special.Labs,
				}}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Container>
	);
};
Labs.story = { name: 'Labs' };

export const SpecialReport = () => {
	return (
		<Container>
			<SubMeta
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Special.SpecialReport,
				})}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Special.SpecialReport,
				}}
				subMetaKeywordLinks={subMetaKeywordLinks}
				subMetaSectionLinks={subMetaSectionLinks}
				pageId=""
				webUrl=""
				webTitle=""
				showBottomSocialButtons={true}
			/>
		</Container>
	);
};
SpecialReport.story = { name: 'SpecialReport' };
