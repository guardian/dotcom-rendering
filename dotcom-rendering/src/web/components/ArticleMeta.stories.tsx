import { css } from '@emotion/react';

import { Display, Design, Pillar, Special } from '@guardian/types';
import { ArticleMeta } from './ArticleMeta';
import { decidePalette } from '../lib/decidePalette';

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 220px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

const tagsWithBylineImage = [
	{
		id: 'profile/lanre-bakare',
		type: 'Contributor',
		title: 'Lanre Bakare',
		twitterHandle: 'lanre_bakare',
		bylineImageUrl:
			'https://i.guim.co.uk/img/uploads/2017/10/06/Lanre-Bakare,-L.png?width=300&quality=85&auto=format&fit=max&s=afa36cd9b80bea5e98f10280aea4d0e4',
	},
];

const tagsWithByTwoContributors = [
	{
		id: 'profile/lanre-bakare',
		type: 'Contributor',
		title: 'Lanre Bakare',
		twitterHandle: 'lanre_bakare',
		bylineImageUrl:
			'https://i.guim.co.uk/img/uploads/2017/10/06/Lanre-Bakare,-L.png?width=300&quality=85&auto=format&fit=max&s=afa36cd9b80bea5e98f10280aea4d0e4',
	},
	{
		id: 'profile/another-author',
		type: 'Contributor',
		title: 'Another Author',
	},
];

export default {
	component: ArticleMeta,
	title: 'Components/ArticleMeta',
};

export const ArticleStory = () => {
	return (
		<Container>
			<ArticleMeta
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				pageId=""
				webTitle=""
				author={{
					byline: 'Lanre Bakare',
					twitterHandle: 'lanre_bakare',
				}}
				tags={tagsWithBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Sun 12 Jan 2020 21.00 GMT"
			/>
		</Container>
	);
};

export const BrandingStory = () => {
	return (
		<Container>
			<ArticleMeta
				branding={{
					sponsorName: 'Humanity United',
					logo: {
						src:
							'https://static.theguardian.com/commercial/sponsor/14/May/2018/533d381b-ac99-4e10-83be-8b64a1da9710-hu.png',
						dimensions: { width: 140, height: 90 },
						link: 'http://www.humanityunited.org/ ',
						label: 'Supported by',
					},
					logoForDarkBackground: {
						src:
							'https://static.theguardian.com/commercial/sponsor/14/May/2018/4192d462-d794-4f07-a43c-6b546f4dcd93-hu-white.png',
						dimensions: { width: 140, height: 39 },
						link: 'http://www.humanityunited.org/ ',
						label: 'Supported by',
					},
					aboutThisLink:
						'https://www.theguardian.com/info/2016/jan/25/content-funding',
				}}
				format={{
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
				pageId=""
				webTitle=""
				author={{
					byline: 'Lanre Bakare',
					twitterHandle: 'lanre_bakare',
				}}
				tags={tagsWithBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Sun 12 Jan 2020 21.00 GMT"
			/>
		</Container>
	);
};

ArticleStory.story = { name: 'Article' };

export const FeatureStory = () => {
	return (
		<Container>
			<ArticleMeta
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Culture,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Culture,
				})}
				pageId=""
				webTitle=""
				author={{
					byline: 'Lanre Bakare',
					twitterHandle: 'lanre_bakare',
				}}
				tags={tagsWithBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Sun 12 Jan 2020 21.00 GMT"
			/>
		</Container>
	);
};
FeatureStory.story = { name: 'Feature' };

export const SpecialReportStory = () => {
	return (
		<Container>
			<ArticleMeta
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Special.SpecialReport,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Special.SpecialReport,
				})}
				pageId=""
				webTitle=""
				author={{
					byline: 'Lanre Bakare',
					twitterHandle: 'lanre_bakare',
				}}
				tags={tagsWithBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Sun 12 Jan 2020 21.00 GMT"
			/>
		</Container>
	);
};
SpecialReportStory.story = { name: 'SpecialReport' };

export const CommentStory = () => {
	return (
		<Container>
			<ArticleMeta
				format={{
					display: Display.Standard,
					design: Design.Comment,
					theme: Pillar.Opinion,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Comment,
					theme: Pillar.Opinion,
				})}
				pageId=""
				webTitle=""
				author={{
					byline: 'Lanre Bakare',
					twitterHandle: 'lanre_bakare',
				}}
				tags={tagsWithBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Sun 12 Jan 2020 21.00 GMT"
			/>
		</Container>
	);
};
CommentStory.story = { name: 'Comment' };

export const InterviewStory = () => {
	return (
		<Container>
			<ArticleMeta
				format={{
					display: Display.Standard,
					design: Design.Interview,
					theme: Pillar.Lifestyle,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Interview,
					theme: Pillar.Lifestyle,
				})}
				pageId=""
				webTitle=""
				author={{
					byline: 'Lanre Bakare',
					twitterHandle: 'lanre_bakare',
				}}
				tags={tagsWithBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Sun 12 Jan 2020 21.00 GMT"
			/>
		</Container>
	);
};
InterviewStory.story = { name: 'Interview' };

export const ImmersiveStory = () => {
	return (
		<Container>
			<ArticleMeta
				format={{
					display: Display.Immersive,
					design: Design.Article,
					theme: Pillar.News,
				}}
				palette={decidePalette({
					display: Display.Immersive,
					design: Design.Article,
					theme: Pillar.News,
				})}
				pageId=""
				webTitle=""
				author={{
					byline: 'Lanre Bakare',
					twitterHandle: 'lanre_bakare',
				}}
				tags={tagsWithBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Sun 12 Jan 2020 21.00 GMT"
			/>
		</Container>
	);
};
ImmersiveStory.story = { name: 'Immersive' };

export const TwoContributorsStory = () => {
	return (
		<Container>
			<ArticleMeta
				format={{
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Sport,
				}}
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Feature,
					theme: Pillar.Sport,
				})}
				pageId=""
				webTitle=""
				author={{
					byline: 'Lanre Bakare',
					twitterHandle: 'lanre_bakare',
				}}
				tags={tagsWithByTwoContributors}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Sun 12 Jan 2020 21.00 GMT"
			/>
		</Container>
	);
};
TwoContributorsStory.story = { name: 'Feature, with two contributors' };
