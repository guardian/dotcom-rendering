import {
	isPuzzlesHubEnabled,
	isPuzzlesHubVariant,
} from './puzzlesHubExperiment';

describe('isPuzzlesHubVariant', () => {
	it.each([
		['control', { 'puzzles-new-hub': 'control' }],
		['missing', {}],
		['unknown group', { 'puzzles-new-hub': 'other' }],
		['unrelated participation', { another: 'variant' }],
	])('rejects %s', (_, participations) => {
		expect(isPuzzlesHubVariant(participations)).toBe(false);
	});

	it('accepts only puzzles-new-hub:variant', () => {
		expect(isPuzzlesHubVariant({ 'puzzles-new-hub': 'variant' })).toBe(
			true,
		);
	});
});

describe('isPuzzlesHubEnabled', () => {
	it('allow local development without an experiment participation', () => {
		expect(isPuzzlesHubEnabled({}, true)).toBe(true);
	});

	it('requires the variant outside local development', () => {
		expect(isPuzzlesHubEnabled({}, false)).toBe(false);
		expect(
			isPuzzlesHubEnabled({ 'puzzles-new-hub': 'variant' }, false),
		).toBe(true);
	});
});
