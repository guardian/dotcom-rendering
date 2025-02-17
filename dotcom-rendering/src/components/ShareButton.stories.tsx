import { neutral } from '@guardian/source/foundations';
import {
	defaultFormats,
	splitTheme,
} from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
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

export const LiveBlogMobileMeta = () => {
	return (
		<CopyNativeShareButton
			onShare={() => {}}
			isCopied={false}
			isLiveBlogMeta={true}
			size="small"
		/>
	);
};
LiveBlogMobileMeta.storyName = 'LiveBlogMobileMeta';
LiveBlogMobileMeta.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
LiveBlogMobileMeta.parameters = {
	colourSchemeBackground: {
		light: themePalette('--share-button-liveblog-mobile-meta'),
		dark: neutral[0],
	},
	formats: [...defaultFormats].filter(
		(format) => format.design !== ArticleDesign.Gallery,
	),
};

export const EmailLinkStory = () => {
	return (
		<EmailLink
			href={`mailto:?subject=Everybody%20looks%20after%20each%20other!&body=https://www.theguardian.com/lifeandstyle/2024/feb/20/everybody-looks-after-each-other-fifty-years-of-the-commune-that-began-with-a-guardian-ad
			`}
			isLiveBlogMeta={true}
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
