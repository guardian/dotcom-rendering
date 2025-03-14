import { space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { CardCommentCount as CardCommentCountComponent } from './CardCommentCount.importable';

const meta = {
	component: CardCommentCountComponent,
	title: 'Components/Card Comment Count',
} satisfies Meta<typeof CardCommentCountComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardCommentCount = {
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
} satisfies Story;
