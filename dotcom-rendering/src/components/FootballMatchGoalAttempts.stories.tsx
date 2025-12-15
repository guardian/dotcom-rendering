import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballMatchGoalAttempts } from './FootballMatchStat';

const meta = {
	title: 'Components/Football Match Goal Attempts',
	component: FootballMatchGoalAttempts,
	parameters: {
		layout: 'padded',
	},
} satisfies Meta<typeof FootballMatchGoalAttempts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		homeTeam: {
			name: 'Manchester United',
			colour: '#da020e',
		},
		awayTeam: {
			name: 'Arsenal',
			colour: '#023474',
		},
	},
} satisfies Story;
