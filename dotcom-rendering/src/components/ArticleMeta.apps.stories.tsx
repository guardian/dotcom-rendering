import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
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

// const tagsWithSmallBylineImage = [
// 	{
// 		id: 'profile/nicola-slawson',
// 		type: 'Contributor',
// 		title: 'Nicola Slawson',
// 		bylineImageUrl:
// 			'https://uploads.guim.co.uk/2016/11/01/Nicola_Slawson.jpg',
// 	},
// ];

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
		id: 'profile/lanre-bakare',
		type: 'Contributor',
		title: 'Lanre Bakare',
	},
];

export default {
	component: ArticleMetaApps,
	title: 'Components/ArticleMetaApps',
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

// const commentFormat: ArticleFormat = {
// 	display: ArticleDisplay.Standard,
// 	design: ArticleDesign.Standard,
// 	theme: Pillar.Opinion,
// };

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
ArticleAppsWithFollowStory.decorators = [lightDecorator([defaultFormat])];

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
ArticleAppsWithFollowStoryNoTitle.decorators = [
	lightDecorator([defaultFormat]),
];

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
	lightDecorator([avatarFormat]),
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
	lightDecorator([avatarFormat]),
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
ArticleAppsImmersiveAndFollowStory.decorators = [
	lightDecorator([immersiveFormat]),
];

export const ArticleAppsWithMultipleContributos: StoryObj = ({
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
ArticleAppsWithMultipleContributos.args = { format: defaultFormat };
ArticleAppsWithMultipleContributos.parameters = {
	config: { renderingTarget: 'Apps' },
};
ArticleAppsWithMultipleContributos.decorators = [
	lightDecorator([defaultFormat]),
];
