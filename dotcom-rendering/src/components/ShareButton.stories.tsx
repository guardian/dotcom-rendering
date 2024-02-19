import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import {
	defaultFormats,
	splitTheme,
} from '../../.storybook/decorators/splitThemeDecorator';
import { palette as themePalette } from '../palette';
import {
	CopyLinkButton,
	NativeShareButton,
	ShareButton,
} from './ShareButton.importable';

export default {
	component: ShareButton,
	title: 'Components/ShareButton',
};

interface StoryArgs extends StoryProps {
	theme: string;
}

export const ShareButtonStory = () => {
	return (
		<ShareButton
			pageId={'123'}
			webTitle={'The the'}
			format={{
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
				design: ArticleDesign.Standard,
			}}
			context="ArticleMeta"
		/>
	);
};
ShareButtonStory.storyName = 'ShareButtonStory';
ShareButtonStory.decorators = [splitTheme()];

export const ShareButtonStoryXSmall = () => {
	return (
		<ShareButton
			pageId={'123'}
			webTitle={'The the'}
			size="xsmall"
			format={{
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
				design: ArticleDesign.Standard,
			}}
			context="LiveBlock"
		/>
	);
};
ShareButtonStoryXSmall.storyName = 'ShareButtonStoryXSmall';
ShareButtonStoryXSmall.decorators = [splitTheme()];

export const LinkCopied = () => {
	return (
		<CopyLinkButton
			onShare={async () => {}}
			isCopied={true}
			isLiveBlogArticleMeta={false}
			size="small"
		/>
	);
};
LinkCopied.storyName = 'LinkCopied';
LinkCopied.decorators = [splitTheme()];

export const NativeShare = () => {
	return (
		<NativeShareButton
			onShare={async () => {}}
			isLiveBlogArticleMeta={true}
			size="small"
		/>
	);
};
NativeShare.storyName = 'NativeShare';
NativeShare.decorators = [splitTheme()];

export const LiveBlogMobileNative = ({ theme }: StoryArgs) => {
	return (
		<div
			css={css`
				background-color: ${theme === 'light'
					? themePalette('--share-button-liveblog-mobile')
					: 'inherit'};
			`}
		>
			<NativeShareButton
				onShare={async () => {}}
				isLiveBlogArticleMeta={true}
				size="small"
			/>
		</div>
	);
};
LiveBlogMobileNative.storyName = 'LiveBlogMobileNative';
LiveBlogMobileNative.decorators = [
	splitTheme(
		[...defaultFormats].filter(
			(format) => format.design !== ArticleDesign.Gallery,
		),
	),
];
LiveBlogMobileNative.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};

export const LiveBlogMobile = ({ theme }: StoryArgs) => {
	return (
		<div
			css={css`
				background-color: ${theme === 'light'
					? themePalette('--share-button-liveblog-mobile')
					: 'inherit'};
			`}
		>
			<CopyLinkButton
				onShare={async () => {}}
				isCopied={false}
				isLiveBlogArticleMeta={true}
				size="small"
			/>
		</div>
	);
};
LiveBlogMobile.storyName = 'LiveBlogMobile';
LiveBlogMobile.decorators = [
	splitTheme(
		[...defaultFormats].filter(
			(format) => format.design !== ArticleDesign.Gallery,
		),
	),
];
LiveBlogMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
