import type { FootballMatches } from '../../src/footballMatches';
import type { FootballMatch as FootballMatchV2 } from '../../src/footballMatchV2';
import type { Region } from '../../src/sportDataPage';

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

export const footballMatchResultV2: FootballMatchV2 = {
	kind: 'Result',
	kickOff: new Date('2022-01-01T11:11:00Z'),
	paId: '4479251',
	homeTeam: {
		name: 'Germany',
		paID: '7699',
		score: 2,
		scorers: ['Sjoeke Nusken 56 Pen', 'Lea Schuller 66'],
	},
	awayTeam: {
		name: 'Denmark',
		paID: '35854',
		score: 1,
		scorers: ['Amalie Vangsgaard 26'],
	},
	venue: 'St Jakob Park',
	comment: undefined,
};

export const matchDayWorldCup: FootballMatches = [
	{
		dateISOString: new Date('2026-06-11T00:00:00Z').toISOString(),
		competitions: [
			{
				id: '700',
				tag: '/football/world-cup-2026',
				name: 'World Cup 2026',
				nation: 'International',
				matches: [
					{
						kind: 'Result',
						dateTimeISOString: new Date(
							'2026-06-11T19:00:00Z',
						).toISOString(),
						paId: '4532490',
						homeTeam: {
							name: 'Mexico',
							id: '5837',
							score: 2,
						},
						awayTeam: {
							name: 'South Africa',
							id: '7724',
							score: 0,
						},
					},
					{
						kind: 'Result',
						dateTimeISOString: new Date(
							'2026-06-11T19:00:00Z',
						).toISOString(),
						paId: '23120',
						homeTeam: {
							name: 'South Korea',
							id: '23120',
							score: 1,
						},
						awayTeam: {
							name: 'Czech Republic',
							id: '6318',
							score: 1,
						},
						comment: 'Czech Republic won 4-3 on penalties',
					},
					{
						kind: 'Live',
						dateTimeISOString: new Date(
							'2026-06-11T20:00:00Z',
						).toISOString(),
						paId: '4548910',
						homeTeam: {
							name: 'Canada',
							id: '31901',
							score: 0,
						},
						awayTeam: {
							name: 'Bosnia-Herzegovina',
							id: '7531',
							score: 0,
						},
						status: '1st',
					},
					{
						kind: 'Fixture',
						dateTimeISOString: new Date(
							'2026-06-11T21:00:00Z',
						).toISOString(),
						paId: '4532493',
						homeTeam: {
							name: 'USA',
							id: '7356',
						},
						awayTeam: {
							name: 'Paraguay',
							id: '8109',
						},
					},
					{
						kind: 'Fixture',
						dateTimeISOString: new Date(
							'2026-06-12T01:00:00Z',
						).toISOString(),
						paId: '4532494',
						homeTeam: {
							name: 'Qatar',
							id: '37314',
						},
						awayTeam: {
							name: 'Switzerland',
							id: '1660',
						},
					},
				],
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
							id: '27038',
							score: 10,
						},
						awayTeam: {
							name: 'Cagliari',
							id: '26474',
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
							id: '26366',
						},
						awayTeam: {
							name: 'Bologna',
							id: '26371',
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
						homeTeam: {
							name: 'Auxerre',
							id: '26348',
						},
						awayTeam: { name: 'St Etienne', id: '27408' },
					},
				],
			},
			{
				id: '1',
				tag: 'football/bundesligafootball',
				name: 'Bundesliga',
				nation: 'European',
				matches: [
					{
						kind: 'Live',
						dateTimeISOString: new Date(
							'2022-01-01T11:11:00Z',
						).toISOString(),
						paId: '123',
						homeTeam: {
							name: 'Eintracht Frankfurt',
							id: '26460',
							score: 1,
						},
						awayTeam: {
							name: 'Bayern Munich',
							id: '26247',
							score: 0,
						},
						status: '1st',
					},
				],
			},

			{
				id: '2',
				tag: 'football/uefa-europa-league',
				name: 'Europa League',
				nation: 'European',
				matches: [
					{
						kind: 'Live',
						dateTimeISOString: new Date(
							'2022-01-01T11:11:00Z',
						).toISOString(),
						paId: '123',
						homeTeam: {
							name: 'AZ',
							id: '26464',
							score: 1,
						},
						awayTeam: {
							name: 'Sevilla',
							id: '27821',
							score: 2,
						},
						status: 'HT',
					},
					{
						kind: 'Live',
						dateTimeISOString: new Date(
							'2022-01-01T11:11:00Z',
						).toISOString(),
						paId: '1234',
						homeTeam: {
							name: 'Jagiellonia Białystok',
							id: '9999999',
							score: 3,
						},
						awayTeam: {
							name: 'Shakhtar Donetsk',
							id: '38299',
							score: 2,
						},
						status: 'HT',
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
							id: '27804',
							score: 2,
						},
						awayTeam: {
							name: 'Osasuna',
							id: '27152',
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
							id: '8450',
							score: 1,
						},
						awayTeam: {
							name: 'Crystal Palace Women',
							id: '48752',
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
						homeTeam: { name: 'Juventus', id: '26359' },
						awayTeam: { name: 'Roma', id: '26357' },
					},
				],
			},
		],
	},
];

export const nextPageNoJsUrl =
	'https://www.theguardian.com/football/fixtures/2025/May/05';
