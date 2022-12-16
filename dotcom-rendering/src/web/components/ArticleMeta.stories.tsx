import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { Platform } from '../../types/platform';
import {
	getAllThemes,
	getThemeNameAsString,
} from '../../../../common-rendering/src/fixtures/article';
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
			'https://i.guim.co.uk/img/uploads/2017/10/06/Lanre-Bakare,-L.png?width=300&quality=85&auto=format&fit=max&s=afa36cd9b80bea5e98f10280aea4d0e4',
		bylineLargeImageUrl:
			'https://i.guim.co.uk/img/uploads/2017/10/06/Lanre-Bakare,-L.png?width=300&quality=85&auto=format&fit=max&s=afa36cd9b80bea5e98f10280aea4d0e4',
	},
];

const tagsWithSmallBylineImage = [
	{
		id: 'profile/nicola-slawson',
		type: 'Contributor',
		title: 'Nicola Slawson',
		bylineImageUrl:
			'https://i.guim.co.uk/img/uploads/2016/11/01/Nicola_Slawson.jpg?width=140&height=140&quality=85&auto=format&fit=max&s=a1490a494f98d261b6300f865cb60d79',
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
		bylineLargeImageUrl:
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
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};

export const BrandingStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				branding={{
					sponsorName: 'Humanity United',
					logo: {
						src: 'https://static.theguardian.com/commercial/sponsor/14/May/2018/533d381b-ac99-4e10-83be-8b64a1da9710-hu.png',
						dimensions: { width: 140, height: 90 },
						link: 'http://www.humanityunited.org/ ',
						label: 'Supported by',
					},
					logoForDarkBackground: {
						src: 'https://static.theguardian.com/commercial/sponsor/14/May/2018/4192d462-d794-4f07-a43c-6b546f4dcd93-hu-white.png',
						dimensions: { width: 140, height: 39 },
						link: 'http://www.humanityunited.org/ ',
						label: 'Supported by',
					},
					aboutThisLink:
						'https://www.theguardian.com/info/2016/jan/25/content-funding',
				}}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};

ArticleStory.story = { name: 'Article' };

export const FeatureStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Culture,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
FeatureStory.story = { name: 'Feature' };

export const FeatureWithMismatchedContributor = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Culture,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
FeatureWithMismatchedContributor.story = {
	name: 'Feature with a byline mismatching the contributor tag',
};

export const FeatureStoryWithSmallBylineImage = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Culture,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
FeatureStoryWithSmallBylineImage.story = {
	name: 'Feature with Small Byline Image',
};

export const SpecialReportStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticleSpecial.SpecialReport,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
SpecialReportStory.story = { name: 'SpecialReport' };

export const SpecialReportAlt = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticleSpecial.SpecialReportAlt,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
SpecialReportAlt.story = { name: 'SpecialReportAlt' };

export const CommentStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Comment,
					theme: ArticlePillar.Opinion,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
CommentStory.story = { name: 'Comment' };

export const InterviewStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Interview,
					theme: ArticlePillar.Lifestyle,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
InterviewStory.story = { name: 'Interview' };

export const ImmersiveStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Immersive,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
ImmersiveStory.story = { name: 'Immersive' };

export const TwoContributorsStory = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Feature,
					theme: ArticlePillar.Sport,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
TwoContributorsStory.story = { name: 'Feature, with two contributors' };

export const DeadBlogStory = () => {
	return (
		<>
			{getAllThemes({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
			}).map((format) => (
				<Wrapper>
					<p>{getThemeNameAsString(format)}</p>
					<ArticleMeta
						platform={Platform.Web}
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
						showShareCount={true}
					/>
				</Wrapper>
			))}
		</>
	);
};
DeadBlogStory.story = { name: 'Deadblog - All pillars' };

export const Dateline = () => {
	return (
		<Wrapper>
			<ArticleMeta
				platform={Platform.Web}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
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
				showShareCount={true}
			/>
		</Wrapper>
	);
};
Dateline.story = { name: 'With no secondary dateline' };
