import type { Region } from '../../src/sportDataPage';
import type { FootballMatches } from '../../src/footballMatches';

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
						kind: 'FootballLive',
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
						kind: 'FootballLive',
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
						kind: 'FootballFixture',
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
						kind: 'FootballLive',
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
						kind: 'FootballLive',
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
						kind: 'FootballLive',
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
						kind: 'FootballResult',
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
						kind: 'FootballResult',
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
						kind: 'FootballFixture',
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
