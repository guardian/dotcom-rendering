import { Pillar } from '@guardian/libs';
import { FirstCommentWelcome } from './FirstCommentWelcome.tsx';

export default { title: 'Discussion/FirstCommentWelcome' };

export const defaultStory = () => (
	<FirstCommentWelcome
		body="My first message ever!!"
		pillar={Pillar.Lifestyle}
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
	/>
);
defaultStory.storyName = 'Welcome message';

export const CommentWithError = () => (
	<FirstCommentWelcome
		body="My first message ever!!"
		pillar={Pillar.News}
		error="This is a custom user name error message"
		submitForm={() => Promise.resolve()}
		cancelSubmit={() => undefined}
	/>
);
CommentWithError.storyName = 'Welcome message with error';
