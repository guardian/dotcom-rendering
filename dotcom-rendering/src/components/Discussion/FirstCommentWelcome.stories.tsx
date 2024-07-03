import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { FirstCommentWelcome } from './FirstCommentWelcome';

export default { title: 'Discussion/FirstCommentWelcome' };

export const defaultStory = () => (
	<FirstCommentWelcome
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
		previewBody="My first <b>comment</b>!!"
	/>
);
defaultStory.storyName = 'Welcome message';
defaultStory.decorators = [
	splitTheme(
		[
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.Lifestyle,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const CommentWithError = () => (
	<FirstCommentWelcome
		error="This is a custom user name error message"
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
		previewBody="My first comment!!"
	/>
);
CommentWithError.storyName = 'Welcome message with error';
CommentWithError.decorators = [
	splitTheme(
		[
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
		],
		{ orientation: 'vertical' },
	),
];

export const FirstCommentWelcomeApps = () => (
	<FirstCommentWelcome
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
		previewBody="My first comment!!"
	/>
);
FirstCommentWelcomeApps.storyName = 'First Comment Welcome Apps';
FirstCommentWelcomeApps.parameters = {
	config: { renderingTarget: 'Apps' },
};
FirstCommentWelcomeApps.decorators = [
	splitTheme(
		[
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
		],
		{ orientation: 'vertical' },
	),
];
