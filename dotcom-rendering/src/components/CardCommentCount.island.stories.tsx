import { space } from '@guardian/source/foundations';
import preview from '../../.storybook/preview';
import { CardCommentCount as CardCommentCountComponent } from './CardCommentCount.island';

const meta = preview.meta({
	component: CardCommentCountComponent,
	title: 'Components/Card Comment Count',
});

export const CardCommentCount = meta.story({
	args: {
		discussionApiUrl: 'https://discussion.theguardian.com/discussion-api',
		discussionId: '/p/zemg8',
	},
	decorators: [
		(Story) => (
			<div css={{ padding: space[6] }}>
				<Story />
			</div>
		),
	],
});
