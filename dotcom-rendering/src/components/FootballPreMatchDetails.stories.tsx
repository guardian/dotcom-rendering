import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballPreMatchDetails as FootballPreMatchDetailsComponent } from './FootballPreMatchDetails';

const meta = {
	title: 'Components/Football Pre-Match Details',
	component: FootballPreMatchDetailsComponent,
	parameters: {
		layout: 'padded',
	},
} satisfies Meta<typeof FootballPreMatchDetailsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FootballPreMatchDetails = {
	args: {
		homeTeam: 'Man United',
		awayTeam: 'Arsenal',
		league: 'Premier League',
		venue: 'Old Trafford',
		kickOff: new Date('2026-02-15T17:30:00Z'),
		edition: 'UK',
	},
} satisfies Story;
