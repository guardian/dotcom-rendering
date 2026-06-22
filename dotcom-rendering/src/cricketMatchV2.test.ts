import { cricketMatchData } from '../fixtures/generated/cricket-match';
import { parseCricketMatchV2 } from './cricketMatchV2';

describe('parseCricketMatchV2', () => {
	it('parses a winner result cricket match correctly', () => {
		const result = parseCricketMatchV2(
			cricketMatchData.cricketMatch,
		).getOrThrow('Expected parsing cricket match to succeed');

		expect(result.kind).toEqual('Result');
		expect(result.result).toEqual({
			type: 'home-win',
			description: 'England win by 115 runs',
			winner: {
				type: 'runs',
				team: 'England',
				margin: 115,
			},
		});
		expect(result.matchDate).toEqual(new Date('2026-06-04T10:00:00.000Z'));
	});

	it('parses a cricket match in pre-match status', () => {
		const result = parseCricketMatchV2({
			...cricketMatchData.cricketMatch,
			result: 'pre-match',
			fullResult: undefined,
		}).getOrThrow('Expected parsing cricket match to succeed');

		expect(result.kind).toEqual('Fixture');
		expect(result.result).toEqual(undefined);
	});

	it('parses a cricket match in in-play status', () => {
		const result = parseCricketMatchV2({
			...cricketMatchData.cricketMatch,
			result: 'in-play',
			fullResult: undefined,
		}).getOrThrow('Expected parsing cricket match to succeed');

		expect(result.kind).toEqual('Live');
		expect(result.result).toEqual(undefined);
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

		expect(result.result).toEqual({
			type: 'abandoned',
			description: 'Match abandoned due to rain',
			winner: undefined,
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

		expect(result.result).toEqual({
			type: 'no-result',
			description: 'No result',
			winner: undefined,
		});
	});
});
