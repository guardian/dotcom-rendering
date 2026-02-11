import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FootballMatchHeader as FootballMatchHeaderComponent } from './FootballMatchHeader';
import {
	matchDayLive,
	matchFixture,
	matchResult,
} from '../../../fixtures/manual/footballMatches';
import type { FEFootballMatchHeader } from '../../frontend/feFootballMatchHeader';

const meta = {
	component: FootballMatchHeaderComponent,
} satisfies Meta<typeof FootballMatchHeaderComponent>;

export default meta;

const feHeaderData: FEFootballMatchHeader = {
	footballMatch: matchFixture,
	competitionName: 'Premier League',
	liveURL:
		'https://www.theguardian.com/football/live/2025/nov/26/arsenal-v-bayern-munich-champions-league-live',
	reportURL:
		'https://www.theguardian.com/football/2025/nov/26/arsenal-bayern-munich-champions-league-match-report',
	infoURL:
		'https://www.theguardian.com/football/match/2025/nov/26/arsenal-v-bayernmunich',
};

type Story = StoryObj<typeof meta>;

export const Fixture = {
	args: {
		leagueName: feHeaderData.competitionName,
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
			matchKind: 'Fixture',
		},
		edition: 'UK',
		getHeaderData: () =>
			Promise.resolve({
				...feHeaderData,
				liveURL: undefined,
				reportURL: undefined,
			}),
		refreshInterval: 3_000,
		matchHeaderURL: new URL(
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/08/26247/48490.json',
		),
	},
} satisfies Story;

export const Live = {
	args: {
		leagueName: feHeaderData.competitionName,
		match: {
			...Fixture.args.match,
			kind: 'Live',
			status: '1st',
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
			selected: 'live',
			matchKind: 'Live',
			infoURL: new URL(
				'https://www.theguardian.com/football/match/2025/nov/26/arsenal-v-bayernmunich',
			),
		},
		edition: 'EUR',
		matchHeaderURL: new URL(
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/11/39/9.json',
		),
		refreshInterval: Fixture.args.refreshInterval,
		getHeaderData: () =>
			Promise.resolve({
				...feHeaderData,
				footballMatch: matchDayLive,
				reportURL: undefined,
			}),
	},
} satisfies Story;

export const Result = {
	args: {
		leagueName: Fixture.args.leagueName,
		match: {
			...Live.args.match,
			kind: 'Result',
		},
		tabs: {
			selected: 'info',
			matchKind: 'Result',
		},
		edition: 'AU',
		matchHeaderURL: new URL(
			'https://api.nextgen.guardianapps.co.uk/football/api/match-header/2026/02/10/45/42.json',
		),
		refreshInterval: Fixture.args.refreshInterval,
		getHeaderData: () =>
			Promise.resolve({
				...feHeaderData,
				footballMatch: matchResult,
			}),
	},
} satisfies Story;
