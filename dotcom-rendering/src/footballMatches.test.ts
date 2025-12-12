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
		const result = parse(footballData.matchesList).getOrThrow(
			'Expected football match parsing to succeed',
		);

		expect(result.length).toBe(1);

		const day = result[0];
		expect(day?.dateISOString).toBe('2025-04-28T00:00:00.000Z');
		expect(day?.competitions.length).toBe(2);

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

		const result = parse(invalidDate).getErrorOrThrow(
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

		const resultOne = parse(invalidMatchResult).getErrorOrThrow(
			'Expected football match parsing to fail',
		);
		const resultTwo = parse(invalidMatchFixture).getErrorOrThrow(
			'Expected football match parsing to fail',
		);
		const resultThree = parse(invalidLiveMatch).getErrorOrThrow(
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
		const result = parse(withMatches([liveMatch])).getErrorOrThrow(
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
			const matchDay = parse(
				withMatches([matchesListWithTeamName(uncleanName)]),
			).getOrThrow('Expected football match parsing to succeed');

			const match = matchDay[0]!.competitions[0]!.matches[0];
			if (match?.kind !== 'Result') {
				throw new Error('Expected Result');
			}

			expect(match.homeTeam.name).toBe(cleanName);
		}
	});
	it('should replace known live match status with our status', () => {
		const matchDay = parse(
			withMatches([matchDayLiveSecondHalf]),
		).getOrThrow('Expected football live match parsing to succeed');

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

		const matchDay = parse(
			withMatches([matchDayLiveUnknownStatus]),
		).getOrThrow('Expected football live match parsing to succeed');

		const match = matchDay[0]!.competitions[0]!.matches[0];
		if (match?.kind !== 'Live') {
			throw new Error('Expected live match');
		}

		expect(match.status).toBe('So');
	});
});
