import { footballData } from '../fixtures/generated/football-live';
import {
	emptyMatches,
	liveMatch,
	matchDayLive,
	matchFixture,
	matchResult,
} from '../fixtures/manual/footballMatches';
import type {
	FEFootballMatch,
	FEMatchByDateAndCompetition,
	FEMatchDay,
	FEResult,
} from './feFootballDataPage';
import { parse, parseMatchResult } from './footballMatches';
import { errorOrThrow, okOrThrow } from './lib/result';

const withMatches = (
	matches: FEFootballMatch[],
): FEMatchByDateAndCompetition[] =>
	emptyMatches.map((day) => ({
		...day,
		competitionMatches: day.competitionMatches.map((competition) => ({
			...competition,
			matches,
		})),
	}));

describe('footballMatches', () => {
	it('should parse match fixtures correctly', () => {
		const result = okOrThrow(
			parse(footballData.matchesList),
			'Expected football match parsing to succeed',
		);

		expect(result.length).toBe(1);

		const day = result[0];
		const date = day?.date ?? 0;
		expect(new Date(date).toISOString()).toBe('2025-03-03T00:00:00.000Z');
		expect(day?.competitions.length).toBe(3);

		const competition = day?.competitions[0];
		expect(competition?.name).toBe('Serie A');
		expect(competition?.matches[0]?.kind).toBe('Fixture');
		expect(competition?.tag).toBe('football/serieafootball');
	});

	it('should return an error when football days have invalid dates', () => {
		const invalidDate: FEMatchByDateAndCompetition[] = emptyMatches.map(
			(day) => ({
				...day,
				date: 'foo',
			}),
		);

		const result = errorOrThrow(
			parse(invalidDate),
			'Expected football match parsing to fail',
		);

		expect(result.kind).toBe('FootballDayInvalidDate');
	});

	it('should return an error when football matches have an invalid date', () => {
		const invalidMatchResult: FEMatchByDateAndCompetition[] = withMatches([
			matchFixture,
			{ ...matchResult, date: '' },
			matchDayLive,
		]);
		const invalidMatchFixture: FEMatchByDateAndCompetition[] = withMatches([
			{ ...matchFixture, date: '' },
			matchResult,
			matchDayLive,
		]);
		const invalidLiveMatch: FEMatchByDateAndCompetition[] = withMatches([
			matchResult,
			matchFixture,
			{ ...matchDayLive, date: '' },
		]);

		const resultOne = errorOrThrow(
			parse(invalidMatchResult),
			'Expected football match parsing to fail',
		);
		const resultTwo = errorOrThrow(
			parse(invalidMatchFixture),
			'Expected football match parsing to fail',
		);
		const resultThree = errorOrThrow(
			parse(invalidLiveMatch),
			'Expected football match parsing to fail',
		);

		expect(resultOne.kind).toBe('FootballMatchInvalidDate');
		expect(resultTwo.kind).toBe('FootballMatchInvalidDate');

		if (resultThree.kind !== 'InvalidMatchDay') {
			throw new Error('Expected an invalid match day error');
		}

		expect(resultThree.errors[0]!.kind).toBe('FootballMatchInvalidDate');
	});

	it('should return an error when football matches are missing a score', () => {
		const matchResultMissingHomeScore: FEResult = {
			...matchResult,
			homeTeam: {
				...matchResult.homeTeam,
				score: undefined,
			},
		};
		const matchResultMissingAwayScore: FEResult = {
			...matchResult,
			homeTeam: {
				...matchResult.awayTeam,
				score: undefined,
			},
		};
		const liveMatchMissingHomeScore: FEMatchDay = {
			...matchDayLive,
			homeTeam: {
				...matchDayLive.homeTeam,
				score: undefined,
			},
		};
		const liveMatchMissingAwayScore: FEMatchDay = {
			...matchDayLive,
			homeTeam: {
				...matchDayLive.awayTeam,
				score: undefined,
			},
		};

		const resultHome = errorOrThrow(
			parse(withMatches([matchResultMissingHomeScore])),
			'Expected football match parsing to fail',
		);
		const resultAway = errorOrThrow(
			parse(withMatches([matchResultMissingAwayScore])),
			'Expected football match parsing to fail',
		);
		const liveHome = errorOrThrow(
			parse(withMatches([liveMatchMissingHomeScore])),
			'Expected football match parsing to fail',
		);
		const liveAway = errorOrThrow(
			parse(withMatches([liveMatchMissingAwayScore])),
			'Expected football match parsing to fail',
		);

		expect(resultHome.kind).toBe('FootballMatchMissingScore');
		expect(resultAway.kind).toBe('FootballMatchMissingScore');

		if (
			liveHome.kind !== 'InvalidMatchDay' ||
			liveAway.kind !== 'InvalidMatchDay'
		) {
			throw new Error('Expected an invalid match day error');
		}

		expect(liveHome.errors[0]?.kind).toBe('FootballMatchMissingScore');
		expect(liveAway.errors[0]?.kind).toBe('FootballMatchMissingScore');
	});

	it('should return an error when it receives a live match', () => {
		const result = errorOrThrow(
			parse(withMatches([liveMatch])),
			'Expected football match parsing to fail',
		);

		expect(result.kind).toBe('UnexpectedLiveMatch');
	});
	it('should return a clean team name', () => {
		const matchesListWithTeamName = (teamName: string): FEResult => {
			return {
				...matchResult,
				homeTeam: {
					...matchResult.homeTeam,
					name: teamName,
				},
			};
		};

		const uncleanToCleanNames: Record<string, string> = {
			Ladies: '',
			Holland: 'The Netherlands',
			'Union Saint Gilloise': 'Union Saint-Gilloise',
		};

		for (const [uncleanName, cleanName] of Object.entries(
			uncleanToCleanNames,
		)) {
			const match = okOrThrow(
				parseMatchResult(matchesListWithTeamName(uncleanName)),
				'Expected football match parsing to succeed',
			);
			expect(match.homeTeam.name).toBe(cleanName);
		}
	});
});
