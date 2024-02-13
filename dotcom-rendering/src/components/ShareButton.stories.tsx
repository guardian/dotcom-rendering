import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
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

export const CopyLink = () => {
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
CopyLink.storyName = 'CopyLink';
CopyLink.decorators = [splitTheme()];

export const CopyLinkXSmall = () => {
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
CopyLinkXSmall.storyName = 'CopyLinkXSmall';
CopyLinkXSmall.decorators = [splitTheme()];

export const LinkCopied = () => {
	return (
		<CopyLinkButton
			onShare={async () => {}}
			isCopied={true}
			isLiveBlogMeta={true}
		/>
	);
};
LinkCopied.storyName = 'LinkCopied';
LinkCopied.decorators = [splitTheme()];

export const NativeShare = () => {
	return <NativeShareButton onShare={async () => {}} isLiveBlogMeta={true} />;
};
NativeShare.storyName = 'NativeShare';
NativeShare.decorators = [splitTheme()];

export const LiveBlogMobile = ({ theme }: StoryArgs) => {
	return (
		<div
			css={css`
				background-color: ${theme === 'light'
					? themePalette('--share-button-liveblog-mobile')
					: 'inherit'};
			`}
		>
			<NativeShareButton onShare={async () => {}} isLiveBlogMeta={true} />
		</div>
	);
};
LiveBlogMobile.storyName = 'LiveBlogMobile';
LiveBlogMobile.decorators = [splitTheme()];
LiveBlogMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
