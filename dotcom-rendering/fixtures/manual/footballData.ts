import type { FootballMatches, Region } from '../../src/footballMatches';

export const regions: Region[] = [
	{
		name: 'England',
		competitions: [
			{ url: '/football/premierleague/live', name: 'Premier League' },
			{ url: 'football/championship/live', name: 'Championship' },
		],
	},
	{
		name: 'Scotland',
		competitions: [
			{
				url: 'football/scottish-premiership/live',
				name: 'Scottish Premiership',
			},
		],
	},
];

export const initialDays: FootballMatches = [
	{
		dateISOString: new Date('2022-01-01T00:00:00Z').toISOString(),
		competitions: [
			{
				id: '635',
				tag: 'football/serieafootball',
				name: 'Serie A',
				nation: 'European',
				matches: [
					{
						kind: 'Live',
						dateTimeISOString: new Date(
							'2022-01-01T11:11:00Z',
						).toISOString(),
						paId: '4482093',
						homeTeam: {
							name: 'Torino',
							score: 10,
						},
						awayTeam: {
							name: 'Cagliari',
							score: 0,
						},
						status: '1st',
					},
					{
						kind: 'Live',
						dateTimeISOString: new Date(
							'2022-01-01T11:11:00Z',
						).toISOString(),
						paId: '12345',
						homeTeam: {
							name: 'Fiorentina',
						},
						awayTeam: {
							name: 'Bologna',
						},
						status: 'S',
						comment: 'Awaiting officials decision',
					},
					{
						kind: 'Fixture',
						dateTimeISOString: new Date(
							'2022-01-01T19:45:00Z',
						).toISOString(),
						paId: '4482890',
						homeTeam: 'Auxerre',
						awayTeam: 'St Etienne',
					},
				],
			},
			{
				id: '650',
				tag: 'football/laligafootball',
				name: 'La Liga',
				nation: 'European',
				matches: [
					{
						kind: 'Result',
						dateTimeISOString: new Date(
							'2022-01-01T20:00:00Z',
						).toISOString(),
						paId: '4482835',
						homeTeam: {
							name: 'Las Palmas',
							score: 2,
						},
						awayTeam: {
							name: 'Osasuna',
							score: 3,
						},
						comment: 'AET',
					},
				],
			},
			{
				id: '651',
				tag: 'football/fa-cup',
				name: 'FA Cup',
				nation: 'European',
				matches: [
					{
						kind: 'Result',
						dateTimeISOString: new Date(
							'2022-01-01T20:00:00Z',
						).toISOString(),
						paId: '4482836',
						homeTeam: {
							name: 'Brighton & Hove Albion Women',
							score: 1,
						},
						awayTeam: {
							name: 'Crystal Palace Women',
							score: 1,
						},
						comment:
							'Brighton & Hove Albion Women won 4 - 3 on penalties...',
					},
				],
			},
		],
	},
];

export const moreDays: FootballMatches = [
	{
		dateISOString: new Date('2022-01-05T00:00:00Z').toISOString(),
		competitions: [
			{
				id: '635',
				tag: 'football/serieafootball',
				name: 'Serie A',
				nation: 'European',
				matches: [
					{
						kind: 'Fixture',
						dateTimeISOString: new Date(
							'2022-01-05T19:45:00Z',
						).toISOString(),
						paId: '4482890',
						homeTeam: 'Juventus',
						awayTeam: 'Roma',
					},
				],
			},
		],
	},
];
