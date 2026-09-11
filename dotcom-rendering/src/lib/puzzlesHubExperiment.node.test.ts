import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import {
	isPuzzlesHubEnabled,
	isPuzzlesHubVariant,
} from './puzzlesHubExperiment';

void nodeDescribe('isPuzzlesHubVariant', () => {
	const testCases = [
		['control', { 'puzzles-new-hub': 'control' }],
		['missing', {}],
		['unknown group', { 'puzzles-new-hub': 'other' }],
		['unrelated participation', { another: 'variant' }],
	] as const;

	for (const [name, participations] of testCases) {
		void nodeIt(`rejects ${name}`, () => {
			assert.equal(isPuzzlesHubVariant(participations), false);
		});
	}

	void nodeIt('accepts only puzzles-new-hub:variant', () => {
		assert.equal(
			isPuzzlesHubVariant({ 'puzzles-new-hub': 'variant' }),
			true,
		);
	});
});

void nodeDescribe('isPuzzlesHubEnabled', () => {
	void nodeIt(
		'allow local development without an experiment participation',
		() => {
			assert.equal(isPuzzlesHubEnabled({}, true), true);
		},
	);

	void nodeIt('requires the variant outside local development', () => {
		assert.equal(isPuzzlesHubEnabled({}, false), false);
		assert.equal(
			isPuzzlesHubEnabled({ 'puzzles-new-hub': 'variant' }, false),
			true,
		);
	});
});
