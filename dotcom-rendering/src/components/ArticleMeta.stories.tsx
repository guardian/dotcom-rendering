import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints, from } from '@guardian/source-foundations';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { browserThemeDecorator } from '../../.storybook/decorators/themeDecorator';
import { getAllThemes } from '../lib/format';
import { palette } from '../palette';
import type { Branding as BrandingType } from '../types/branding';
import { ArticleMeta } from './ArticleMeta';

type StoryArgs = { format: ArticleFormat };

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 220px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

const tagsWithLargeBylineImage = [
	{
		id: 'profile/lanre-bakare',
		type: 'Contributor',
		title: 'Lanre Bakare',
		twitterHandle: 'lanre_bakare',
		bylineImageUrl:
			'https://uploads.guim.co.uk/2017/10/06/Lanre-Bakare,-L.png',
		bylineLargeImageUrl:
			'https://uploads.guim.co.uk/2017/10/06/Lanre-Bakare,-L.png',
	},
];

const tagsWithSmallBylineImage = [
	{
		id: 'profile/nicola-slawson',
		type: 'Contributor',
		title: 'Nicola Slawson',
		bylineImageUrl:
			'https://uploads.guim.co.uk/2016/11/01/Nicola_Slawson.jpg',
	},
];

const tagsWithByTwoContributors = [
	{
		id: 'profile/lanre-bakare',
		type: 'Contributor',
		title: 'Lanre Bakare',
		twitterHandle: 'lanre_bakare',
		bylineImageUrl:
			'https://uploads.guim.co.uk/2017/10/06/Lanre-Bakare,-L.png',
		bylineLargeImageUrl:
			'https://uploads.guim.co.uk/2017/10/06/Lanre-Bakare,-L.png',
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

const defaultFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const Web: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
Web.parameters = { config: { renderingTarget: 'Web' } };
Web.decorators = [splitTheme()];

export const Apps: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
Apps.parameters = { config: { renderingTarget: 'Apps' } };
Apps.decorators = [splitTheme()];

const branding: BrandingType = {
	brandingType: { name: 'sponsored' },
	sponsorName: 'theguardian.org',
	logo: {
		src: 'https://static.theguardian.com/commercial/sponsor/19/Dec/2022/57ba1d00-b2bd-4f6d-ba35-15a82b8d9507-0094b90a-bdb8-4e97-b866-dcf49179b29d-theguardian.org.png',
		dimensions: {
			width: 280,
			height: 180,
		},
		link: 'https://theguardian.org/',
		label: 'Supported by',
	},
	logoForDarkBackground: {
		src: 'https://static.theguardian.com/commercial/sponsor/19/Dec/2022/58a1e08d-cd4a-47a5-966a-4846b0461642-46629471-cb0b-4c59-9a06-1ef23778b41f-theguardian.org2.png',
		dimensions: {
			width: 280,
			height: 180,
		},
		link: 'https://theguardian.org/',
		label: 'Supported by',
	},
	aboutThisLink:
		'https://www.theguardian.com/environment/2023/jan/06/about-animals-farmed-investigating-modern-farming-around-the-world',
};

export const Branding: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				branding={branding}
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
Branding.args = { format: defaultFormat };
Branding.parameters = { config: { darkModeAvailable: true } };
Branding.decorators = [browserThemeDecorator(defaultFormat)];

export const BrandingLiveBlog: StoryObj = ({ format }: StoryArgs) => {
	return (
		<div
			// Demonstrates niche requirement of liveblog article meta
			// on screens below desktop size
			css={css`
				background-color: ${palette('--standfirst-background')};

				${from.desktop} {
					background-color: inherit;
				}
			`}
		>
			<Wrapper>
				<ArticleMeta
					branding={branding}
					format={format}
					pageId=""
					webTitle=""
					byline="Lanre Bakare"
					tags={tagsWithLargeBylineImage}
					primaryDateline="Sun 12 Jan 2020 18.00 GMT"
					secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
					isCommentable={false}
					discussionApiUrl=""
					shortUrlId=""
					ajaxUrl=""
				/>
			</Wrapper>
		</div>
	);
};
BrandingLiveBlog.storyName = 'Branding - LiveBlog';
BrandingLiveBlog.parameters = {
	viewport: {
		defaultViewport: 'tablet',
	},
	chromatic: { viewports: [breakpoints.tablet] },
	config: { darkModeAvailable: true },
};
BrandingLiveBlog.decorators = [
	splitTheme(
		getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
		}),
	),
];

export const FeatureWithMismatchedContributor: StoryObj = ({
	format,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Gabriel Smith"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
FeatureWithMismatchedContributor.storyName =
	'Feature with a byline mismatching the contributor tag';
FeatureWithMismatchedContributor.decorators = [
	splitTheme(
		getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	),
];

export const FeatureWithSmallBylineImage: StoryObj = ({
	format,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Nicola Slawson"
				tags={tagsWithSmallBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
FeatureWithSmallBylineImage.storyName = 'Feature with Small Byline Image';
FeatureWithSmallBylineImage.decorators = [
	splitTheme(
		getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	),
];

export const Comment: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
Comment.decorators = [
	splitTheme(
		getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
		}),
	),
];

export const Interview: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
Interview.decorators = [
	splitTheme(
		getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Interview,
		}),
	),
];

export const Immersive: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
Immersive.decorators = [
	splitTheme(
		getAllThemes({
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.Standard,
		}),
	),
];

export const FeatureTwoContributors: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithByTwoContributors}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
FeatureTwoContributors.storyName = 'Feature, with two contributors';
FeatureTwoContributors.decorators = [
	splitTheme(
		getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
		}),
	),
];

export const DeadBlog: StoryObj = ({ format }: StoryArgs) => (
	<Wrapper>
		<ArticleMeta
			format={format}
			pageId=""
			webTitle=""
			byline="Lanre Bakare"
			tags={tagsWithByTwoContributors}
			primaryDateline="Sun 12 Jan 2020 18.00 GMT"
			secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
			isCommentable={false}
			discussionApiUrl=""
			shortUrlId=""
			ajaxUrl=""
		/>
	</Wrapper>
);
DeadBlog.decorators = [
	splitTheme(
		getAllThemes({
			display: ArticleDisplay.Standard,
			design: ArticleDesign.DeadBlog,
		}),
	),
];

export const Dateline: StoryObj = ({ format }: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMeta
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline=""
				isCommentable={false}
				discussionApiUrl=""
				shortUrlId=""
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
Dateline.storyName = 'With no secondary dateline';
Dateline.decorators = [splitTheme()];
