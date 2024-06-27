import type { Meta, StoryObj } from '@storybook/react';
import { AdBlockAskLeaderboard as AdBlockAskLeaderboardComponent } from './AdBlockAsk.importable';

const meta = {
	title: 'Components/Ad Block Ask Leaderboard',
	component: AdBlockAskLeaderboardComponent,
} satisfies Meta<typeof AdBlockAskLeaderboardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AdBlockAskLeaderboard = {
	args: {
		supportButtonHref: '#',
	},
} satisfies Story;
