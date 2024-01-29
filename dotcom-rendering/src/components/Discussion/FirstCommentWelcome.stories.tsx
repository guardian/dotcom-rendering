import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import { FirstCommentWelcome } from './FirstCommentWelcome';

export default { title: 'Discussion/FirstCommentWelcome' };

export const defaultStory = () => (
	<FirstCommentWelcome
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
		previewBody="My first comment!!"
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
