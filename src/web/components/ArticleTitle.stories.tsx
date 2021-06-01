import { css } from '@emotion/react';

import { Display, Design, Pillar, Special } from '@guardian/types';

import { decidePalette } from '../lib/decidePalette';

import { ArticleTitle } from './ArticleTitle';

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 200px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);
const CAPI = {
	tags: [],
	guardianBaseURL: 'https://theguardian.com',
	inLeftCol: true,
	fallbackToSection: true,
	sectionLabel: 'Section label',
	sectionUrl: '/section_url',
};
const brexitCAPI = {
	...CAPI,
	...{
		sectionLabel: 'Brexit',
		sectionUrl: '/brexit',
		badge: {
			seriesTag: 'politics/series/brexit-how-it-came-to-this',
			imageUrl:
				'https://assets.guim.co.uk/images/badges/05c6ace4e60dd0209a3f80eb03e16524/EUReferendumBadge.svg',
		},
	},
};

const beyondTheBladeCAPI = {
	...CAPI,
	...{
		sectionLabel: 'Beyond the blade',
		sectionUrl: '/beyond-the-blade',
		badge: {
			seriesTag: 'membership/series/beyond-the-blade',
			imageUrl:
				'https://assets.guim.co.uk/images/badges/bfc00bc58eb966845ccf1200fd8c54e0/beyondthebladebadge.svg',
		},
	},
};

export default {
	component: ArticleTitle,
	title: 'Components/ArticleTitle',
};

export const defaultStory = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...brexitCAPI}
				format={{
					display: Display.Standard,
					theme: Pillar.Sport,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Pillar.Sport,
					design: Design.Article,
				})}
			/>
		</Container>
	);
};
defaultStory.story = { name: 'Brexit badge' };

export const beyondTheBlade = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...beyondTheBladeCAPI}
				format={{
					display: Display.Standard,
					theme: Pillar.News,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Pillar.News,
					design: Design.Article,
				})}
			/>
		</Container>
	);
};
beyondTheBlade.story = { name: 'Beyond the blade badge' };

export const immersiveComment = () => {
	return (
		<div
			css={css`
				background-color: lightgray;
				padding: 20px;
			`}
		>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...brexitCAPI}
				format={{
					display: Display.Immersive,
					theme: Pillar.Sport,
					design: Design.Comment,
				}}
				palette={decidePalette({
					display: Display.Immersive,
					theme: Pillar.Sport,
					design: Design.Comment,
				})}
			/>
		</div>
	);
};
immersiveComment.story = { name: 'Immersive comment piece' };

export const immersiveCommentTag = () => {
	return (
		<div
			css={css`
				background-color: lightgray;
				padding: 20px;
			`}
		>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Immersive,
					theme: Pillar.Sport,
					design: Design.Comment,
				}}
				palette={decidePalette({
					display: Display.Immersive,
					theme: Pillar.Sport,
					design: Design.Comment,
				})}
				tags={[
					{
						id: '',
						title: 'Tag title',
						type: 'Blog',
					},
				]}
			/>
		</div>
	);
};
immersiveCommentTag.story = { name: 'Immersive comment piece with Blog tag' };

export const ImmersiveSeriesTag = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Immersive,
					theme: Pillar.Sport,
					design: Design.Review,
				}}
				palette={decidePalette({
					display: Display.Immersive,
					theme: Pillar.Sport,
					design: Design.Review,
				})}
				tags={[
					{
						id: '',
						title:
							'Series title with the addition of some more text to see how this wraps',
						type: 'Series',
					},
				]}
			/>
		</Container>
	);
};
ImmersiveSeriesTag.story = { name: 'Immersive with a Series tag' };

export const ArticleBlogTag = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Standard,
					theme: Pillar.Sport,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Pillar.Sport,
					design: Design.Article,
				})}
				tags={[
					{
						id: '',
						title: 'Blog title',
						type: 'Blog',
					},
				]}
			/>
		</Container>
	);
};
ArticleBlogTag.story = { name: 'Article with a Blog tag' };

export const ArticleOpinionTag = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Standard,
					theme: Pillar.Sport,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Pillar.Sport,
					design: Design.Article,
				})}
				tags={[
					{
						id: '',
						title: 'Opinion title',
						type: 'Opinion',
					},
				]}
			/>
		</Container>
	);
};
ArticleOpinionTag.story = { name: 'Article with a Opinion tag' };

export const ArticleSeriesTag = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Standard,
					theme: Pillar.Sport,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Pillar.Sport,
					design: Design.Article,
				})}
				tags={[
					{
						id: '',
						title: 'Series title',
						type: 'Series',
					},
				]}
			/>
		</Container>
	);
};
ArticleSeriesTag.story = { name: 'Article with a Series tag' };

export const SpecialReportTitle = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Standard,
					theme: Special.SpecialReport,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Special.SpecialReport,
					design: Design.Article,
				})}
				tags={[
					{
						id: '',
						title: 'Special',
						type: 'Series',
					},
				]}
			/>
		</Container>
	);
};
SpecialReportTitle.story = { name: 'Special report' };

export const ArticleNoTags = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Standard,
					theme: Pillar.Culture,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Pillar.Culture,
					design: Design.Article,
				})}
			/>
		</Container>
	);
};
ArticleNoTags.story = { name: 'Article with no tags' };

export const LabsStory = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Standard,
					theme: Special.Labs,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Special.Labs,
					design: Design.Article,
				})}
				tags={[
					{
						id: '',
						title: 'Series title',
						type: 'Series',
					},
				]}
			/>
		</Container>
	);
};
LabsStory.story = { name: 'Labs' };

export const LongStory = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Standard,
					theme: Pillar.News,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Pillar.News,
					design: Design.Article,
				})}
				tags={[
					{
						id: '',
						title:
							"Edward Snowden's choice of Hong Kong as haven is a high-stakes gamble",
						type: 'Series',
					},
				]}
			/>
		</Container>
	);
};
LongStory.story = { name: 'Long title' };

export const LongWord = () => {
	return (
		<Container>
			<ArticleTitle
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...CAPI}
				format={{
					display: Display.Standard,
					theme: Pillar.News,
					design: Design.Article,
				}}
				palette={decidePalette({
					display: Display.Standard,
					theme: Pillar.News,
					design: Design.Article,
				})}
				tags={[
					{
						id: '',
						title: 'Antidisestablishmentarianism',
						type: 'Series',
					},
				]}
			/>
		</Container>
	);
};
LongWord.story = { name: 'Long word' };
