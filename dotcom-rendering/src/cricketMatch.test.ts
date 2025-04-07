import { cricketMatchData } from '../fixtures/generated/cricket-match';
import { parse } from './cricketMatch';
import type { FECricketMatch } from './frontend/feCricketMatch';
import { okOrThrow } from './lib/result';

describe('parse', () => {
	it('parses cricket match correctly', () => {
		const parsedResult = okOrThrow(
			parse(cricketMatchData.cricketMatch),
			'Expected parsing cricket match to succeed',
		);
		expect(parsedResult.awayTeam.lineup.length).toBe(11);
		expect(parsedResult.innings.length).toBe(2);
	});

	it('reverses the innings for display', () => {
		const parsedResult = okOrThrow(
			parse(cricketMatchData.cricketMatch),
			'Expected parsing cricket match to succeed',
		);

		expect(parsedResult.innings[1]?.description).toBe(
			cricketMatchData.cricketMatch.innings[0]?.description,
		);

		expect(parsedResult.innings[0]?.fallOfWickets.length).toBe(8);
		expect(parsedResult.innings[0]?.inningsTotals.wickets).toBe(8);
	});

	it('calculates the number of wickets fallen', () => {
		const parsedResult = okOrThrow(
			parse(cricketMatchData.cricketMatch),
			'Expected parsing cricket match to succeed',
		);

		expect(parsedResult.innings[0]?.fallOfWickets.length).toBe(8);
		expect(parsedResult.innings[0]?.inningsTotals.wickets).toBe(8);
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
		expect(parsedResult.kind).toBe('error');
	});
});
