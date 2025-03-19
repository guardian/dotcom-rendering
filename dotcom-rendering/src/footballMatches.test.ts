import { footballData } from '../fixtures/generated/football-live';
import {
	emptyMatches,
	liveMatch,
	matchDayLive,
	matchDayLiveSecondHalf,
	matchFixture,
	matchResult,
} from '../fixtures/manual/footballMatches';
import { parse } from './footballMatches';
import type {
	FEFootballMatch,
	FEMatchByDateAndCompetition,
	FEResult,
} from './frontend/feFootballMatchListPage';
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
		expect(day?.dateISOString).toBe('2025-03-03T00:00:00.000Z');
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
			const matchDay = okOrThrow(
				parse(withMatches([matchesListWithTeamName(uncleanName)])),
				'Expected football match parsing to succeed',
			);

			const match = matchDay[0]!.competitions[0]!.matches[0];
			if (match?.kind !== 'Result') {
				throw new Error('Expected Result');
			}

			expect(match.homeTeam.name).toBe(cleanName);
		}
	});
	it('should replace known live match status with our status', () => {
		const matchDay = okOrThrow(
			parse(withMatches([matchDayLiveSecondHalf])),
			'Expected football live match parsing to succeed',
		);

		const match = matchDay[0]!.competitions[0]!.matches[0];
		if (match?.kind !== 'Live') {
			throw new Error('Expected live match');
		}

		expect(match.status).toBe('2nd');
	});
	it('should replace unknown live match status with first two characters', () => {
		const matchDayLiveUnknownStatus = {
			...matchDayLiveSecondHalf,
			matchStatus: 'Something odd',
		};

		const matchDay = okOrThrow(
			parse(withMatches([matchDayLiveUnknownStatus])),
			'Expected football live match parsing to succeed',
		);

		const match = matchDay[0]!.competitions[0]!.matches[0];
		if (match?.kind !== 'Live') {
			throw new Error('Expected live match');
		}

		expect(match.status).toBe('So');
	});
});
