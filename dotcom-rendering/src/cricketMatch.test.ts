import { cricketMatchData } from '../fixtures/generated/cricket-match';
import { parse } from './cricketMatch';
import type { FECricketMatch } from './frontend/feCricketMatchPage';

describe('parse', () => {
	it('parses cricket match correctly', () => {
		const parsedResult = parse(cricketMatchData.cricketMatch).getOrThrow(
			'Expected parsing cricket match to succeed',
		);
		expect(parsedResult.awayTeam.lineup.length).toBe(11);
		expect(parsedResult.innings.length).toBe(
			cricketMatchData.cricketMatch.innings.length,
		);
	});

	it('reverses the innings for display', () => {
		const parsedResult = parse(cricketMatchData.cricketMatch).getOrThrow(
			'Expected parsing cricket match to succeed',
		);

		const secondToLastInning =
			cricketMatchData.cricketMatch.innings[
				cricketMatchData.cricketMatch.innings.length - 2
			];
		const parsedSecondInning = parsedResult.innings[1];

		expect(parsedSecondInning?.description).toBe(
			secondToLastInning?.description,
		);

		const lastInning =
			cricketMatchData.cricketMatch.innings[
				cricketMatchData.cricketMatch.innings.length - 1
			];
		const parsedFirstInning = parsedResult.innings[0];

		expect(parsedFirstInning?.fallOfWickets.length).toBe(
			lastInning?.fallOfWicket.length,
		);
		expect(parsedFirstInning?.inningsTotals.wickets).toBe(
			lastInning?.fallOfWicket.length,
		);
	});

	it('calculates the number of wickets fallen', () => {
		const parsedResult = parse(cricketMatchData.cricketMatch).getOrThrow(
			'Expected parsing cricket match to succeed',
		);

		const inning =
			cricketMatchData.cricketMatch.innings[
				cricketMatchData.cricketMatch.innings.length - 1
			];
		const parsedInning = parsedResult.innings[0];

		expect(parsedInning?.fallOfWickets.length).toBe(
			inning?.fallOfWicket.length,
		);
		expect(parsedInning?.inningsTotals.wickets).toBe(
			inning?.fallOfWicket.length,
		);
	});

	it('returns an error if home and away team cannot be determined', () => {
		const cricketMatch: FECricketMatch = {
			...cricketMatchData.cricketMatch,
			teams: [
				{
					name: '',
					lineup: [],
					home: true,
					id: '',
				},
				{
					name: '',
					lineup: [],
					home: true,
					id: '2',
				},
			],
		};

		const parsedResult = parse(cricketMatch);
		expect(parsedResult.ok).toBe(false);
	});
});
