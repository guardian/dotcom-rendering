import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import {
	defaultFormats,
	splitTheme,
} from '../../.storybook/decorators/splitThemeDecorator';
import { palette as themePalette } from '../palette';
import {
	CopyNativeShareButton,
	EmailLink,
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
		<CopyNativeShareButton
			onShare={() => {}}
			isCopied={true}
			isLiveBlogMeta={false}
			size="small"
		/>
	);
};
LinkCopied.storyName = 'LinkCopied';
LinkCopied.decorators = [splitTheme()];

export const LiveBlogMobileMeta = ({ theme }: StoryArgs) => {
	return (
		<div
			css={css`
				background-color: ${theme === 'light'
					? themePalette('--share-button-liveblog-mobile-meta')
					: 'inherit'};
			`}
		>
			<CopyNativeShareButton
				onShare={() => {}}
				isCopied={false}
				isLiveBlogMeta={true}
				size="small"
			/>
		</div>
	);
};
LiveBlogMobileMeta.storyName = 'LiveBlogMobileMeta';
LiveBlogMobileMeta.decorators = [
	splitTheme(
		[...defaultFormats].filter(
			(format) => format.design !== ArticleDesign.Gallery,
		),
	),
];
LiveBlogMobileMeta.story = {
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
