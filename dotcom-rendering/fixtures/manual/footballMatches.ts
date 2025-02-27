import type {
	FEFixture,
	FELive,
	FEMatchByDateAndCompetition,
	FEMatchDay,
	FEResult,
} from '../../src/feFootballDataPage';

const matchData = {
	id: '1',
	date: '2025-02-18T12:00:00Z[Europe/London]',
	stage: {
		stageNumber: '1',
	},
	round: {
		roundNumber: '1',
	},
	leg: '1',
	homeTeam: {
		id: '1',
		name: 'Home Team',
	},
	awayTeam: {
		id: '2',
		name: 'Away Team',
	},
};

export const matchResult: FEResult = {
	...matchData,
	type: 'Result',
	reportAvailable: false,
	homeTeam: {
		...matchData.homeTeam,
		score: 3,
	},
	awayTeam: {
		...matchData.awayTeam,
		score: 3,
	},
};

export const matchFixture: FEFixture = {
	...matchData,
	type: 'Fixture',
};

export const matchDayFixture: FEMatchDay = {
	...matchData,
	type: 'MatchDay',
	lineupsAvailable: true,
	liveMatch: false,
	matchStatus: 'HT',
	previewAvailable: true,
	reportAvailable: true,
	result: false,
};

export const matchDayLive: FEMatchDay = {
	...matchDayFixture,
	matchStatus: 'HT',
	liveMatch: true,
	homeTeam: {
		...matchData.homeTeam,
		score: 3,
	},
	awayTeam: {
		...matchData.awayTeam,
		score: 3,
	},
};

export const liveMatch: FELive = {
	...matchData,
	type: 'LiveMatch',
	status: 'HT',
};

export const emptyMatches: FEMatchByDateAndCompetition[] = [
	{
		date: '2025-02-14',
		competitionMatches: [
			{
				competitionSummary: {
					id: '100',
					url: '/football/premierleague',
					fullName: 'Premier League',
					nation: 'English',
				},
				matches: [],
			},
		],
	},
];
