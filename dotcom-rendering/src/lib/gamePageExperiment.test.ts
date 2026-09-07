import {
	gamePageExperiment,
	gamePageParticipation,
	isGamePageEnabled,
} from './gamePageExperiment';

describe('isGamePageEnabled', () => {
	it('enables only the configured variant', () => {
		expect(
			isGamePageEnabled({
				serverSideABTests: gamePageParticipation(
					gamePageExperiment.variant,
				),
			}),
		).toBe(true);
	});

	it.each([
		gamePageParticipation(gamePageExperiment.control),
		gamePageParticipation('unknown'),
		gamePageParticipation('variant:extra'),
		{},
		{ 'another-test': 'variant' },
	])('returns false for non-variant participation %#', (participations) => {
		expect(isGamePageEnabled({ serverSideABTests: participations })).toBe(
			false,
		);
	});
});
