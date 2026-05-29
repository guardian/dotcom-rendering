import preview from '../../.storybook/preview';
import { FootballPreMatchDetails as FootballPreMatchDetailsComponent } from './FootballPreMatchDetails';

const meta = preview.meta({
	title: 'Components/Football Pre-Match Details',
	component: FootballPreMatchDetailsComponent,
	parameters: {
		layout: 'padded',
	},
});

export const FootballPreMatchDetails = meta.story({
	args: {
		homeTeam: 'Man United',
		awayTeam: 'Arsenal',
		league: 'Premier League',
		venue: 'Old Trafford',
		kickOff: new Date('2026-02-15T17:30:00Z'),
		edition: 'UK',
	},
});
