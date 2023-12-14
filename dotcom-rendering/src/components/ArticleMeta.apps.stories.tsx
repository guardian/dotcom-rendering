import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { getAllThemes } from '../lib/format';
import type { Branding as BrandingType } from '../types/branding';
import { ArticleMetaApps } from './ArticleMeta.apps';

type StoryArgs = { format: ArticleFormat; isCommentable: boolean };

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
		id: 'profile/laura-banks',
		type: 'Contributor',
		title: 'Laura Banks',
	},
];

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

export default {
	component: ArticleMetaApps,
	title: 'Components/ArticleMetaApps',
	parameters: {
		viewport: {
			defaultViewport: 'wide',
		},
		chromatic: {
			viewports: [breakpoints.mobile, breakpoints.tablet],
		},
	},
};

const defaultFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

const avatarFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Feature,
	theme: Pillar.News,
};

const immersiveFormat: ArticleFormat = {
	display: ArticleDisplay.Immersive,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

export const ArticleAppsWithFollowStory: StoryObj = ({
	format,
	isCommentable,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMetaApps
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare Chief music writer"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={isCommentable}
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/zemg8"
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
/** @see /dotcom-rendering/docs/development/storybook.md */
ArticleAppsWithFollowStory.args = { format: defaultFormat };
ArticleAppsWithFollowStory.parameters = { config: { renderingTarget: 'Apps' } };
ArticleAppsWithFollowStory.decorators = [splitTheme()];

export const ArticleAppsWithFollowStoryNoTitle: StoryObj = ({
	format,
	isCommentable,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMetaApps
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={isCommentable}
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/zemg8"
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
/** @see /dotcom-rendering/docs/development/storybook.md */
ArticleAppsWithFollowStoryNoTitle.args = { format: defaultFormat };
ArticleAppsWithFollowStoryNoTitle.parameters = {
	config: { renderingTarget: 'Apps' },
};
ArticleAppsWithFollowStoryNoTitle.decorators = [splitTheme()];

export const ArticleAppsWithAvatarAndFollowStory: StoryObj = ({
	format,
	isCommentable = true,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMetaApps
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare Chief music writer"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={isCommentable}
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/zemg8"
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
/** @see /dotcom-rendering/docs/development/storybook.md */
ArticleAppsWithAvatarAndFollowStory.args = { format: defaultFormat };
ArticleAppsWithAvatarAndFollowStory.parameters = {
	config: { renderingTarget: 'Apps' },
};
ArticleAppsWithAvatarAndFollowStory.decorators = [
	splitTheme(getAllThemes(avatarFormat)),
];

export const ArticleAppsWithAvatarNoTitleAndFollowStory: StoryObj = ({
	format,
	isCommentable = true,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMetaApps
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={isCommentable}
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/zemg8"
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
/** @see /dotcom-rendering/docs/development/storybook.md */
ArticleAppsWithAvatarNoTitleAndFollowStory.args = { format: defaultFormat };
ArticleAppsWithAvatarNoTitleAndFollowStory.parameters = {
	config: { renderingTarget: 'Apps' },
};
ArticleAppsWithAvatarNoTitleAndFollowStory.decorators = [
	splitTheme(getAllThemes(avatarFormat)),
];

export const ArticleAppsImmersiveAndFollowStory: StoryObj = ({
	format,
	isCommentable,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMetaApps
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={isCommentable}
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/zemg8"
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
/** @see /dotcom-rendering/docs/development/storybook.md */
ArticleAppsImmersiveAndFollowStory.args = { format: defaultFormat };
ArticleAppsImmersiveAndFollowStory.parameters = {
	config: { renderingTarget: 'Apps' },
};
ArticleAppsImmersiveAndFollowStory.decorators = [splitTheme([immersiveFormat])];

export const ArticleAppsWithMultipleContributors: StoryObj = ({
	format,
	isCommentable,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMetaApps
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare in New York and Laura Banks in London"
				tags={tagsWithByTwoContributors}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={isCommentable}
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/zemg8"
				ajaxUrl=""
			/>
		</Wrapper>
	);
};
/** @see /dotcom-rendering/docs/development/storybook.md */
ArticleAppsWithMultipleContributors.args = { format: defaultFormat };
ArticleAppsWithMultipleContributors.parameters = {
	config: { renderingTarget: 'Apps' },
};
ArticleAppsWithMultipleContributors.decorators = [splitTheme()];

export const ArticleAppsWithBrandingStory: StoryObj = ({
	format,
	isCommentable = true,
}: StoryArgs) => {
	return (
		<Wrapper>
			<ArticleMetaApps
				format={format}
				pageId=""
				webTitle=""
				byline="Lanre Bakare Chief music writer"
				tags={tagsWithLargeBylineImage}
				primaryDateline="Sun 12 Jan 2020 18.00 GMT"
				secondaryDateline="Last modified on Sun 12 Jan 2020 21.00 GMT"
				isCommentable={isCommentable}
				discussionApiUrl="https://discussion.theguardian.com/discussion-api"
				shortUrlId="/p/zemg8"
				ajaxUrl=""
				branding={branding}
			/>
		</Wrapper>
	);
};
/** @see /dotcom-rendering/docs/development/storybook.md */
ArticleAppsWithBrandingStory.args = { format: defaultFormat };
ArticleAppsWithBrandingStory.parameters = {
	config: { renderingTarget: 'Apps' },
};
ArticleAppsWithBrandingStory.decorators = [splitTheme([defaultFormat])];
