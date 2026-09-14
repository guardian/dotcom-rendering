import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
	isPuzzlesHubEnabled,
	isPuzzlesHubVariant,
} from './puzzlesHubExperiment';

void describe('isPuzzlesHubVariant', () => {
	const testCases = [
		['control', { 'puzzles-new-hub': 'control' }],
		['missing', {}],
		['unknown group', { 'puzzles-new-hub': 'other' }],
		['unrelated participation', { another: 'variant' }],
	] as const;

	for (const [name, participations] of testCases) {
		void it(`rejects ${name}`, () => {
			assert.equal(isPuzzlesHubVariant(participations), false);
		});
	}

	void it('accepts only puzzles-new-hub:variant', () => {
		assert.equal(
			isPuzzlesHubVariant({ 'puzzles-new-hub': 'variant' }),
			true,
		);
	});
});

void describe('isPuzzlesHubEnabled', () => {
	void it('allow local development without an experiment participation', () => {
		assert.equal(isPuzzlesHubEnabled({}, true), true);
	});

	void it('requires the variant outside local development', () => {
		assert.equal(isPuzzlesHubEnabled({}, false), false);
		assert.equal(
			isPuzzlesHubEnabled({ 'puzzles-new-hub': 'variant' }, false),
			true,
		);
	});
});
