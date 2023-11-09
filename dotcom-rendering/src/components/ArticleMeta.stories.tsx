import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import {
	breakpoints,
	palette as sourcePalette,
} from '@guardian/source-foundations';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import { getAllThemes, getThemeNameAsString } from '../lib/format';
import type { Branding as BrandingType } from '../types/branding';
import { ArticleMeta } from './ArticleMeta';

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

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const ArticleStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={defaultFormat}
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
ArticleStory.storyName = 'Article';

export const ArticleAppsStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={defaultFormat}
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
/** @see /dotcom-rendering/docs/development/storybook.md */
ArticleAppsStory.args = { config: { renderingTarget: 'Apps' } };
ArticleAppsStory.decorators = [lightDecorator(defaultFormat)];

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

export const BrandingStory = ({ format }: { format: ArticleFormat }) => {
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
// BrandingStory.storyName = 'Branding';
BrandingStory.decorators = [
	splitTheme([
		{ ...defaultFormat },
		{
			...defaultFormat,
			theme: Pillar.Culture,
			design: ArticleDesign.Gallery,
		},
	]),
];

export const BrandingLiveBlog = ({ format }: { format: ArticleFormat }) => {
	return (
		<div
			css={css`
				background-color: ${sourcePalette.sport[100]};
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
};
BrandingLiveBlog.decorators = [
	splitTheme([
		{
			...defaultFormat,
			theme: Pillar.Sport,
			design: ArticleDesign.LiveBlog,
		},
	]),
];

const featureFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Feature,
	theme: Pillar.Culture,
};
export const FeatureStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={featureFormat}
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
FeatureStory.storyName = 'Feature';
FeatureStory.decorators = [lightDecorator(featureFormat)];

export const FeatureWithMismatchedContributor = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={featureFormat}
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

export const FeatureStoryWithSmallBylineImage = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={featureFormat}
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
FeatureStoryWithSmallBylineImage.storyName = 'Feature with Small Byline Image';

const specialReportFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Feature,
	theme: ArticleSpecial.SpecialReport,
};
export const SpecialReportStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={specialReportFormat}
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
SpecialReportStory.storyName = 'SpecialReport';
SpecialReportStory.decorators = [lightDecorator(specialReportFormat)];

const specialReportAltFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Feature,
	theme: ArticleSpecial.SpecialReportAlt,
};
export const SpecialReportAlt = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={specialReportAltFormat}
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
SpecialReportAlt.storyName = 'SpecialReportAlt';
SpecialReportAlt.decorators = [lightDecorator(specialReportAltFormat)];

const commentFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
};
export const CommentStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={commentFormat}
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
CommentStory.storyName = 'Comment';

const interviewFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Interview,
	theme: Pillar.Lifestyle,
};
export const InterviewStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={interviewFormat}
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
InterviewStory.storyName = 'Interview';
InterviewStory.decorators = [lightDecorator(interviewFormat)];

const immersiveFormat = {
	display: ArticleDisplay.Immersive,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};
export const ImmersiveStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={immersiveFormat}
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
ImmersiveStory.storyName = 'Immersive';

const sportFeatureFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Feature,
	theme: Pillar.Sport,
};
export const TwoContributorsStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={sportFeatureFormat}
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
TwoContributorsStory.storyName = 'Feature, with two contributors';
TwoContributorsStory.decorators = [lightDecorator(sportFeatureFormat)];

export const DeadBlogStory = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<Wrapper key={JSON.stringify(format)}>
					<p>{getThemeNameAsString(format)}</p>
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
			))}
		</>
	);
};
DeadBlogStory.storyName = 'Deadblog - All pillars';

export const Dateline = () => {
	return (
		<Wrapper>
			<ArticleMeta
				format={defaultFormat}
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
