import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import {
	StoryProps,
	splitTheme,
} from '../../.storybook/decorators/splitThemeDecorator';
import { getThemeNameAsString } from '../lib/format';
import { ArticleTitle } from './ArticleTitle';
interface StoryArgs extends StoryProps {
	theme: string;
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 200px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);
const FEArticle = {
	tags: [],
	guardianBaseURL: 'https://theguardian.com',
	inLeftCol: true,
	fallbackToSection: true,
	sectionLabel: 'Section label',
	sectionUrl: '/section_url',
};
const FEBrexit = {
	...FEArticle,
	...{
		sectionLabel: 'Brexit',
		sectionUrl: '/brexit',
		badge: {
			href: '/politics/series/brexit-how-it-came-to-this',
			imageSrc:
				'https://assets.guim.co.uk/images/badges/05c6ace4e60dd0209a3f80eb03e16524/EUReferendumBadge.svg',
		},
	},
};

const FEBeyondTheBlade = {
	...FEArticle,
	...{
		sectionLabel: 'Beyond the blade',
		sectionUrl: '/beyond-the-blade',
		badge: {
			href: '/membership/series/beyond-the-blade',
			imageSrc:
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
		<Wrapper>
			<ArticleTitle
				{...FEBrexit}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
				}}
			/>
		</Wrapper>
	);
};
defaultStory.storyName = 'Brexit badge';

export const beyondTheBlade = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEBeyondTheBlade}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
					design: ArticleDesign.Standard,
				}}
			/>
		</Wrapper>
	);
};
beyondTheBlade.storyName = 'Beyond the blade badge';

export const immersiveComment = ({ theme }: StoryArgs) => {
	return (
		<div
			css={css`
				background-color: ${theme === 'light'
					? 'lightgray'
					: 'inherit'};
				padding: 20px;
			`}
		>
			<ArticleTitle
				{...FEBrexit}
				format={{
					display: ArticleDisplay.Immersive,
					theme: Pillar.Sport,
					design: ArticleDesign.Comment,
				}}
			/>
		</div>
	);
};
immersiveComment.storyName = 'Immersive comment piece';
immersiveComment.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			theme: Pillar.Sport,
			design: ArticleDesign.Comment,
		},
	]),
];

export const immersiveCommentTag = ({ theme }: StoryArgs) => {
	return (
		<div
			css={css`
				background-color: ${theme === 'light'
					? 'lightgray'
					: 'inherit'};
				padding: 20px;
			`}
		>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Immersive,
					theme: Pillar.Sport,
					design: ArticleDesign.Comment,
				}}
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
immersiveCommentTag.storyName = 'Immersive comment piece with Blog tag';
immersiveCommentTag.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			theme: Pillar.Sport,
			design: ArticleDesign.Comment,
		},
	]),
];

export const ImmersiveSeriesTag = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Immersive,
					theme: Pillar.Sport,
					design: ArticleDesign.Review,
				}}
				tags={[
					{
						id: '',
						title: 'Series title with the addition of some more text to see how this wraps',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
ImmersiveSeriesTag.storyName = 'Immersive with a Series tag';
ImmersiveSeriesTag.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			theme: Pillar.Sport,
			design: ArticleDesign.Review,
		},
	]),
];

export const ArticleBlogTag = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Blog title',
						type: 'Blog',
					},
				]}
			/>
		</Wrapper>
	);
};
ArticleBlogTag.storyName = 'Article with a Blog tag';
ArticleBlogTag.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
			design: ArticleDesign.Standard,
		},
	]),
];

export const LiveblogTitle = ({ theme }: StoryArgs) => {
	return (
		<Wrapper>
			<div
				css={css`
					/* stylelint-disable-next-line color-no-hex */
					background-color: ${theme === 'light'
						? '#005689'
						: 'inherit'};
				`}
			>
				<ArticleTitle
					{...FEArticle}
					format={{
						display: ArticleDisplay.Standard,
						theme: Pillar.Sport,
						design: ArticleDesign.LiveBlog,
					}}
					tags={[
						{
							id: '',
							title: 'Liveblog title',
							type: 'Blog',
						},
					]}
				/>
			</div>
			<div
				css={css`
					/* stylelint-disable-next-line color-no-hex */
					background-color: ${theme === 'light'
						? '#ffe500'
						: 'inherit'};
				`}
			>
				<ArticleTitle
					{...FEArticle}
					format={{
						display: ArticleDisplay.Standard,
						theme: Pillar.Sport,
						design: ArticleDesign.LiveBlog,
					}}
					tags={[
						{
							id: '',
							title: 'Match liveblog title',
							type: 'Blog',
						},
					]}
					isMatch={true}
				/>
			</div>
		</Wrapper>
	);
};
LiveblogTitle.storyName = 'Liveblog title';
LiveblogTitle.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
			design: ArticleDesign.LiveBlog,
		},
	]),
];

export const ArticleOpinionTag = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Opinion title',
						type: 'Opinion',
					},
				]}
			/>
		</Wrapper>
	);
};
ArticleOpinionTag.storyName = 'Article with a Opinion tag';
ArticleOpinionTag.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
			design: ArticleDesign.Standard,
		},
	]),
];

export const ArticleSeriesTag = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Sport,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Series title',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
ArticleSeriesTag.storyName = 'Article with a Series tag';
ArticleSeriesTag.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
			design: ArticleDesign.Standard,
		},
	]),
];

export const SpecialReportTitle = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.SpecialReport,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Special',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
SpecialReportTitle.storyName = 'Special report';
SpecialReportTitle.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReport,
			design: ArticleDesign.Standard,
		},
	]),
];

export const SpecialReportAlt = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.SpecialReportAlt,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Special Report Alt',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
SpecialReportAlt.storyName = 'Special report Alt';
SpecialReportAlt.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.SpecialReportAlt,
			design: ArticleDesign.Standard,
		},
	]),
];

export const ArticleNoTags = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.Culture,
					design: ArticleDesign.Standard,
				}}
			/>
		</Wrapper>
	);
};
ArticleNoTags.storyName = 'Article with no tags';
ArticleNoTags.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: Pillar.Culture,
			design: ArticleDesign.Standard,
		},
	]),
];

export const LabsStory = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: ArticleSpecial.Labs,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Series title',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
LabsStory.storyName = 'Labs';
LabsStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: ArticleSpecial.Labs,
			design: ArticleDesign.Standard,
		},
	]),
];

export const LongStory = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: "Edward Snowden's choice of Hong Kong as haven is a high-stakes gamble",
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
LongStory.storyName = 'Long title';
LongStory.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Standard,
		},
	]),
];

export const LongWord = () => {
	return (
		<Wrapper>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Antidisestablishmentarianism',
						type: 'Series',
					},
				]}
			/>
		</Wrapper>
	);
};
LongWord.storyName = 'Long word';
LongWord.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
			design: ArticleDesign.Standard,
		},
	]),
];

const themeVariations = [
	Pillar.Sport,
	Pillar.News,
	Pillar.Culture,
	Pillar.Opinion,
	Pillar.Lifestyle,
	ArticleSpecial.SpecialReport,
	ArticleSpecial.SpecialReportAlt,
	ArticleSpecial.Labs,
];

const allThemeDeadBlogVariations = themeVariations.map((theme) => ({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.DeadBlog,
	theme,
}));

export const ArticleDeadBlogTitle = ({ format }: StoryArgs) => {
	return (
		<>
			<div key={JSON.stringify(format)}>
				<p>{getThemeNameAsString(format)}</p>
				<ArticleTitle
					{...FEArticle}
					format={format}
					tags={[
						{
							id: '',
							title: 'Deadblog title',
							type: 'Blog',
						},
					]}
				/>
				<br />
				<br />
			</div>
		</>
	);
};

ArticleDeadBlogTitle.storyName = 'Deadblog - All pillars';
ArticleDeadBlogTitle.decorators = [splitTheme(allThemeDeadBlogVariations)];

export const ArticleTitleAll = () => {
	return (
		<>
			<ArticleTitle
				{...FEArticle}
				format={{
					display: ArticleDisplay.Standard,
					theme: Pillar.News,
					design: ArticleDesign.Standard,
				}}
				tags={[
					{
						id: '',
						title: 'Article title',
						type: 'Blog',
					},
				]}
			/>
		</>
	);
};

ArticleTitleAll.storyName = 'ArticleTitleAll';
ArticleTitleAll.decorators = [splitTheme()];
