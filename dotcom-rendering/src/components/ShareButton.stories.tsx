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
	EmailLink,
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
			onShare={() => {}}
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
			onShare={() => {}}
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
				onShare={() => {}}
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
				onShare={() => {}}
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

export const EmailLinkStory = () => {
	return (
		<EmailLink
			href={`mailto:?subject=Everybody%20looks%20after%20each%20other!&body=https://www.theguardian.com/lifeandstyle/2024/feb/20/everybody-looks-after-each-other-fifty-years-of-the-commune-that-began-with-a-guardian-ad
			`}
			isLiveBlogArticleMeta={true}
			size="small"
		/>
	);
};
EmailLinkStory.storyName = 'EmailLinkStory';
EmailLinkStory.decorators = [
	splitTheme(
		[...defaultFormats].filter(
			(format) => format.design !== ArticleDesign.Gallery,
		),
	),
];
