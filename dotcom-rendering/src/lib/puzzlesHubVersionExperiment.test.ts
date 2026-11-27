import {
	isPuzzlesHubV3Enabled,
	isPuzzlesHubV4Enabled,
	puzzlesHubV3Experiment,
	puzzlesHubV3Participation,
	puzzlesHubV4Experiment,
} from './puzzlesHubVersionExperiment';

const v3On = puzzlesHubV3Participation(puzzlesHubV3Experiment.variant);
const v3Off = puzzlesHubV3Participation(puzzlesHubV3Experiment.control);
const v4On = { [puzzlesHubV4Experiment.name]: puzzlesHubV4Experiment.variant };
const v4Off = { [puzzlesHubV4Experiment.name]: puzzlesHubV4Experiment.control };

describe('isPuzzlesHubV3Enabled', () => {
	it('is true in the v3 variant', () => {
		expect(isPuzzlesHubV3Enabled({ serverSideABTests: v3On })).toBe(true);
	});

	it.each([{}, v3Off, v4On])(
		'is false outside the v3 variant (%j)',
		(serverSideABTests) => {
			expect(isPuzzlesHubV3Enabled({ serverSideABTests })).toBe(false);
		},
	);
});

describe('isPuzzlesHubV4Enabled', () => {
	it('is true in both the v3 and v4 variants', () => {
		expect(
			isPuzzlesHubV4Enabled({
				serverSideABTests: { ...v3On, ...v4On },
			}),
		).toBe(true);
	});

	it.each([{}, v3On, v4On, { ...v3Off, ...v4On }, { ...v3On, ...v4Off }])(
		'is false unless both variants are assigned (%j)',
		(serverSideABTests) => {
			expect(isPuzzlesHubV4Enabled({ serverSideABTests })).toBe(false);
		},
	);
});
