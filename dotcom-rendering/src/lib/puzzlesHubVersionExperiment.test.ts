import type { EditionId } from './edition';
import {
	isPuzzlesHubV3Enabled,
	puzzlesHubV3Experiment,
	puzzlesHubV3Participation,
} from './puzzlesHubVersionExperiment';

const v3On = puzzlesHubV3Participation(puzzlesHubV3Experiment.variant);
const v3Off = puzzlesHubV3Participation(puzzlesHubV3Experiment.control);

describe('isPuzzlesHubV3Enabled', () => {
	it.each(['INT', 'UK'] as const)(
		'requires only the premium variant in %s',
		(edition) => {
			expect(
				isPuzzlesHubV3Enabled({ edition, serverSideABTests: v3On }),
			).toBe(true);
		},
	);

	it.each([{}, v3Off])(
		'is false outside the premium variant (%j)',
		(participations) => {
			expect(
				isPuzzlesHubV3Enabled({
					edition: 'INT',
					serverSideABTests: participations,
				}),
			).toBe(false);
		},
	);

	it('is false where the hub is unavailable even in the premium variant', () => {
		expect(
			isPuzzlesHubV3Enabled({
				edition: 'unknown' as EditionId,
				serverSideABTests: v3On,
			}),
		).toBe(false);
	});
});
