import {
	isPuzzlesHubEnabled,
	puzzlesHubExperiment,
	puzzlesHubParticipation,
} from './puzzlesHubExperiment';

describe('isPuzzlesHubEnabled', () => {
	it('enables only the configured variant', () => {
		expect(
			isPuzzlesHubEnabled({
				serverSideABTests: puzzlesHubParticipation(
					puzzlesHubExperiment.variant,
				),
			}),
		).toBe(true);
	});

	it.each([
		puzzlesHubParticipation(puzzlesHubExperiment.control),
		puzzlesHubParticipation('unknown'),
		puzzlesHubParticipation('variant:extra'),
		{},
		{ 'another-test': 'variant' },
	])('returns false for non-variant participation %#', (participations) => {
		expect(isPuzzlesHubEnabled({ serverSideABTests: participations })).toBe(
			false,
		);
	});
});
