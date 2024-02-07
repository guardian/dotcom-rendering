import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { Preview } from './Preview';

export default {
	component: Preview,
	title: 'Discussion/Preview',
	decorators: [
		splitTheme([
			{
				theme: Pillar.Opinion,
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Comment,
			},
		]),
	],
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			padding: 20px;
			width: 700px;
		`}
	>
		{children}
	</div>
);

export const PreviewStory = () => (
	<Wrapper>
		<Preview
			showSpout={true}
			previewHtml="<p>This is some preview text</p>"
		/>
	</Wrapper>
);
PreviewStory.storyName = 'default';

export const PreviewStoryLinebreaks = () => (
	<Wrapper>
		<Preview
			showSpout={true}
			previewHtml="<p>Hello world!<br>this is a line break </p> <p>this is two</p> <p><br>this is three</p>"
		/>
	</Wrapper>
);
PreviewStoryLinebreaks.storyName = 'Preview comment with linebreaks';
