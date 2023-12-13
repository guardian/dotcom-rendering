import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../../.storybook/decorators/splitThemeDecorator';
import type { StoryProps } from '../../../.storybook/decorators/splitThemeDecorator';
import { FirstCommentWelcome } from './FirstCommentWelcome';

export default { title: 'Discussion/FirstCommentWelcome' };

export const defaultStory: StoryObj = ({ format }: StoryProps) => (
	<FirstCommentWelcome
		body="My first message ever!!"
		format={format}
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
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

export const CommentWithError: StoryObj = ({ format }: StoryProps) => (
	<FirstCommentWelcome
		body="My first message ever!!"
		format={format}
		error="This is a custom user name error message"
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
	/>
);
CommentWithError.storyName = 'Welcome message with error';
defaultStory.decorators = [
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
