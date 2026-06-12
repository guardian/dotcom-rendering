import { cricketMatchData } from '../fixtures/generated/cricket-match';
import type { CricketMatch } from './cricketMatchV2';
import { parseCricketMatchV2 } from './cricketMatchV2';

describe('parseCricketMatchV2', () => {
	const expected: CricketMatch = {
		kind: 'Result',
		series: 'First Test Match',
		competition: 'First Test Match',
		venue: "Lord's",
		day: 4,
		matchDate: new Date('2026-06-04T10:00:00.000Z'),
		homeTeam: {
			name: 'England',
			paID: 'a359844f-fc07-9cfa-d4cc-9a9ac0d5d075',
		},
		awayTeam: {
			name: 'New Zealand',
			paID: '110c70b5-c05f-3be7-6670-baecd50a8c6b',
		},
		innings: [
			{
				battingTeam: 'England',
				runs: 140,
				overs: '39.4',
				declared: false,
				forfeited: false,
				fallOfWickets: 10,
			},
			{
				battingTeam: 'New Zealand',
				runs: 113,
				overs: '29.5',
				declared: false,
				forfeited: false,
				fallOfWickets: 10,
			},
			{
				battingTeam: 'England',
				runs: 226,
				overs: '56.0',
				declared: false,
				forfeited: false,
				fallOfWickets: 10,
			},
			{
				battingTeam: 'New Zealand',
				runs: 138,
				overs: '40.3',
				declared: false,
				forfeited: false,
				fallOfWickets: 10,
			},
		],
		result: {
			type: 'home-win',
			description: 'England win by 115 runs',
			winner: {
				type: 'runs',
				team: 'England',
				margin: 115,
			},
		},
	};
	it('parses a winner result cricket match correctly', () => {
		const result = parseCricketMatchV2(
			cricketMatchData.cricketMatch,
		).getOrThrow('Expected parsing cricket match to succeed');

		expect(result).toEqual(expected);
	});

	it('parses a cricket match in pre-match status', () => {
		const result = parseCricketMatchV2({
			...cricketMatchData.cricketMatch,
			result: 'pre-match',
			fullResult: undefined,
		}).getOrThrow('Expected parsing cricket match to succeed');

		expect(result).toEqual({
			...expected,
			kind: 'Fixture',
			result: undefined,
		});
	});

	it('parses a cricket match in in-play status', () => {
		const result = parseCricketMatchV2({
			...cricketMatchData.cricketMatch,
			result: 'in-play',
			fullResult: undefined,
		}).getOrThrow('Expected parsing cricket match to succeed');

		expect(result).toEqual({
			...expected,
			kind: 'Live',
			result: undefined,
		});
	});

	it('parses an abandoned cricket match correctly', () => {
		const result = parseCricketMatchV2({
			...cricketMatchData.cricketMatch,
			fullResult: {
				resultType: 'abandoned',
				description: 'Match abandoned due to rain',
				winner: undefined,
			},
		}).getOrThrow('Expected parsing cricket match to succeed');

		expect(result).toEqual({
			...expected,
			result: {
				type: 'abandoned',
				description: 'Match abandoned due to rain',
				winner: undefined,
			},
		});
	});

	it('parses a cricket match with no winner', () => {
		const result = parseCricketMatchV2({
			...cricketMatchData.cricketMatch,
			fullResult: {
				resultType: 'no-result',
				description: 'No result',
				winner: undefined,
			},
		}).getOrThrow('Expected parsing cricket match to succeed');

		expect(result).toEqual({
			...expected,
			result: {
				type: 'no-result',
				description: 'No result',
				winner: undefined,
			},
		});
	});
});
