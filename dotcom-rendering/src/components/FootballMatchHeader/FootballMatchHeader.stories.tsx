import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballMatchHeader as FootballMatchHeaderComponent } from './FootballMatchHeader';

const meta = {
	component: FootballMatchHeaderComponent,
} satisfies Meta<typeof FootballMatchHeaderComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fixture = {
	args: {
		leagueName: 'Premier League',
		match: {
			kind: 'Fixture',
			kickOff: new Date('2025-11-05T20:30:00Z'),
			venue: 'Old Trafford',
			homeTeam: {
				name: 'Wolverhampton Wanderers',
				paID: '44',
			},
			awayTeam: {
				name: 'Belgium',
				paID: '997',
			},
			paId: 'matchId',
		},
		tabs: {
			selected: 'info',
		},
		edition: 'UK',
	},
} satisfies Story;

export const Result = {
	args: {
		leagueName: 'Premier League',
		match: {
			...Fixture.args.match,
			kind: 'Result',
			homeTeam: {
				...Fixture.args.match.homeTeam,
				score: 0,
				scorers: [],
			},
			awayTeam: {
				...Fixture.args.match.awayTeam,
				score: 13,
				scorers: [
					'Carlos Casemiro 12 Pen',
					'Carlos Casemiro 4',
					'Mason Mount 82 O.g.',
				],
			},
			comment: undefined,
		},
		tabs: {
			selected: 'info',
			liveURL: new URL(
				'https://www.theguardian.com/football/live/2025/nov/26/arsenal-v-bayern-munich-champions-league-live',
			),
			reportURL: new URL(
				'https://www.theguardian.com/football/2025/nov/26/arsenal-bayern-munich-champions-league-match-report',
			),
		},
		edition: 'AU',
	},
} satisfies Story;
