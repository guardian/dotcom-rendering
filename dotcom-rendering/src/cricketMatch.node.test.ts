import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { liveMatch, resultMatch } from '../fixtures/manual/cricketMatch';
import { parseCricketMatch } from './cricketMatch';

void nodeDescribe('parseCricketMatchV2', () => {
	void nodeIt('parses a winner result cricket match correctly', () => {
		const result = parseCricketMatch(resultMatch).getOrThrow(
			'Expected parsing cricket match to succeed',
		);

		assert.equal(result.kind, 'Result');
		assert.deepEqual(result.result, {
			type: 'home-win',
			description: 'England win by 115 runs',
			winner: {
				type: 'runs',
				team: 'England',
				margin: 115,
			},
		});
		assert.deepEqual(
			result.matchDate,
			new Date('2026-06-17T10:00:00.000Z'),
		);
	});

	void nodeIt('parses a cricket match in pre-match status', () => {
		const result = parseCricketMatch({
			...liveMatch,
			result: 'pre-match',
			fullResult: undefined,
		}).getOrThrow('Expected parsing cricket match to succeed');

		assert.equal(result.kind, 'Fixture');
		assert.equal(result.result, undefined);
	});

	void nodeIt('parses a cricket match in in-play status', () => {
		const result = parseCricketMatch({
			...liveMatch,
			result: 'in-play',
			fullResult: undefined,
		}).getOrThrow('Expected parsing cricket match to succeed');

		assert.equal(result.kind, 'Live');
		assert.equal(result.result, undefined);
	});

	void nodeIt('parses an abandoned cricket match correctly', () => {
		const result = parseCricketMatch({
			...liveMatch,
			fullResult: {
				resultType: 'abandoned',
				description: 'Match abandoned due to rain',
				winner: undefined,
			},
		}).getOrThrow('Expected parsing cricket match to succeed');

		assert.deepEqual(result.result, {
			type: 'abandoned',
			description: 'Match abandoned due to rain',
			winner: undefined,
		});
	});

	void nodeIt('parses a cricket match with no winner', () => {
		const result = parseCricketMatch({
			...liveMatch,
			fullResult: {
				resultType: 'no-result',
				description: 'No result',
				winner: undefined,
			},
		}).getOrThrow('Expected parsing cricket match to succeed');

		assert.deepEqual(result.result, {
			type: 'no-result',
			description: 'No result',
			winner: undefined,
		});
	});
});
