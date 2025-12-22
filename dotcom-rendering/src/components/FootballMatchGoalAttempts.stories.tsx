import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballMatchGoalAttempts as FootballMatchGoalAttemptsComponent } from './FootballMatchStat';

const meta = {
	title: 'Components/Football Match Goal Attempts',
	component: FootballMatchGoalAttemptsComponent,
	parameters: {
		layout: 'padded',
	},
} satisfies Meta<typeof FootballMatchGoalAttemptsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballMatchGoalAttempts = {
	args: {
		homeTeam: {
			name: 'Manchester United',
			colour: '#da020e',
		},
		awayTeam: {
			name: 'Arsenal',
			colour: '#023474',
		},
		homeValues: {
			offTarget: 6,
			onTarget: 5,
		},
		awayValues: {
			offTarget: 6,
			onTarget: 2,
		},
	},
} satisfies Story;
