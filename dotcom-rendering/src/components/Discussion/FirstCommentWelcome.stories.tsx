import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { FirstCommentWelcome } from './FirstCommentWelcome';

export default { title: 'Discussion/FirstCommentWelcome' };

export const defaultStory = () => (
	<FirstCommentWelcome
		body="My first message ever!!"
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Lifestyle,
		}}
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
	/>
);
defaultStory.storyName = 'Welcome message';

export const CommentWithError = () => (
	<FirstCommentWelcome
		body="My first message ever!!"
		format={{
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.News,
		}}
		error="This is a custom user name error message"
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
	/>
);
CommentWithError.storyName = 'Welcome message with error';
