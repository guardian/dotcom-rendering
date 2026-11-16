import {
	isPuzzlesHubV1Enabled,
	isPuzzlesHubV2Enabled,
	isPuzzlesHubV3Enabled,
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
	puzzlesHubV2Experiment,
	puzzlesHubV2Participation,
	puzzlesHubV3Experiment,
	puzzlesHubV3Participation,
} from './puzzlesHubVersionExperiment';

const v1On = puzzlesHubV1Participation(puzzlesHubV1Experiment.variant);
const v1Off = puzzlesHubV1Participation(puzzlesHubV1Experiment.control);
const v2On = puzzlesHubV2Participation(puzzlesHubV2Experiment.variant);
const v2Off = puzzlesHubV2Participation(puzzlesHubV2Experiment.control);
const v3On = puzzlesHubV3Participation(puzzlesHubV3Experiment.variant);
const v3Off = puzzlesHubV3Participation(puzzlesHubV3Experiment.control);

describe('isPuzzlesHubV1Enabled', () => {
	it('is true when v1 is in variant', () => {
		expect(isPuzzlesHubV1Enabled({ serverSideABTests: { ...v1On } })).toBe(
			true,
		);
	});

	it('is false when v1 is in control', () => {
		expect(isPuzzlesHubV1Enabled({ serverSideABTests: { ...v1Off } })).toBe(
			false,
		);
	});

	it('is false when v1 has no participation', () => {
		expect(isPuzzlesHubV1Enabled({ serverSideABTests: {} })).toBe(false);
	});
});

describe('isPuzzlesHubV2Enabled', () => {
	it('is true when v1 and v2 are both in variant', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v1On, ...v2On },
			}),
		).toBe(true);
	});

	it('is false when v2 is in variant but v1 is off', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v1Off, ...v2On },
			}),
		).toBe(false);
	});

	it('is false when v1 is on but v2 is off', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v1On, ...v2Off },
			}),
		).toBe(false);
	});

	it('is false when both are off', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v1Off, ...v2Off },
			}),
		).toBe(false);
	});

	it('is false when no test has any participation', () => {
		expect(isPuzzlesHubV2Enabled({ serverSideABTests: {} })).toBe(false);
	});
});

describe('isPuzzlesHubV3Enabled', () => {
	it('is true when v1, v2 and v3 are all in variant', () => {
		expect(
			isPuzzlesHubV3Enabled({
				serverSideABTests: { ...v1On, ...v2On, ...v3On },
			}),
		).toBe(true);
	});

	it('is false when v3 is in variant but v2 is off or missing', () => {
		expect(
			isPuzzlesHubV3Enabled({
				serverSideABTests: { ...v1On, ...v2Off, ...v3On },
			}),
		).toBe(false);
		expect(
			isPuzzlesHubV3Enabled({ serverSideABTests: { ...v1On, ...v3On } }),
		).toBe(false);
	});

	it('is false when v3 is in variant but v1 is off', () => {
		expect(
			isPuzzlesHubV3Enabled({
				serverSideABTests: { ...v1Off, ...v2On, ...v3On },
			}),
		).toBe(false);
		expect(
			isPuzzlesHubV3Enabled({ serverSideABTests: { ...v2On, ...v3On } }),
		).toBe(false);
	});

	it('is false when v1 and v2 are on but v3 is off or has no participation', () => {
		expect(
			isPuzzlesHubV3Enabled({
				serverSideABTests: { ...v1On, ...v2On, ...v3Off },
			}),
		).toBe(false);
		expect(
			isPuzzlesHubV3Enabled({
				serverSideABTests: { ...v1On, ...v2On },
			}),
		).toBe(false);
	});

	it('is false when nothing participates', () => {
		expect(isPuzzlesHubV3Enabled({ serverSideABTests: {} })).toBe(false);
	});
});
