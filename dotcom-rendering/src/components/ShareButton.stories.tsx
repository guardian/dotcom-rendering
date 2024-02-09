import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryProps } from '../../.storybook/decorators/splitThemeDecorator';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { palette as themePalette } from '../palette';
import { NativeShareButton, ShareButton } from './ShareButton.importable';

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
		/>
	);
};
CopyLink.storyName = 'CopyLink';
CopyLink.decorators = [splitTheme()];

export const NativeShare = () => {
	return (
		<NativeShareButton
			onShare={async () => {}}
			isLiveBlog={true}
			blockId={'123'}
		/>
	);
};
NativeShare.storyName = 'NativeShare';
NativeShare.decorators = [splitTheme()];

export const NativeShareLiveBlogMobile = ({ theme }: StoryArgs) => {
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
				isLiveBlog={true}
				blockId={'123'}
			/>
		</div>
	);
};
NativeShareLiveBlogMobile.storyName = 'NativeShareLiveBlogMobile';
NativeShareLiveBlogMobile.decorators = [splitTheme()];
NativeShareLiveBlogMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};
