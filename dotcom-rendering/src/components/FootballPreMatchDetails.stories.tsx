import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballPreMatchDetails } from './FootballPreMatchDetails';

const meta = {
	title: 'Components/Football Pre-Match Details',
	component: FootballPreMatchDetails,
	parameters: {
		layout: 'padded',
	},
} satisfies Meta<typeof FootballPreMatchDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		homeTeam: 'Man United',
		awayTeam: 'Arsenal',
		league: 'Premier League',
		venue: 'Old Trafford',
		kickOff: new Date('2026-02-15T17:00:00Z'),
		edition: 'UK',
	},
} satisfies Story;
