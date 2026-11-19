import {
	isPuzzlesHubV2Enabled,
	isPuzzlesHubV3Enabled,
	puzzlesHubV2Experiment,
	puzzlesHubV2Participation,
	puzzlesHubV3Experiment,
	puzzlesHubV3Participation,
} from './puzzlesHubVersionExperiment';

const v2On = puzzlesHubV2Participation(puzzlesHubV2Experiment.variant);
const v2Off = puzzlesHubV2Participation(puzzlesHubV2Experiment.control);
const v3On = puzzlesHubV3Participation(puzzlesHubV3Experiment.variant);
const v3Off = puzzlesHubV3Participation(puzzlesHubV3Experiment.control);

describe('isPuzzlesHubV2Enabled', () => {
	it('is true when the hub is available and v2 is in variant', () => {
		expect(
			isPuzzlesHubV2Enabled({
				edition: 'INT',
				serverSideABTests: { ...v2On },
			}),
		).toBe(true);
	});

	it('is true in the UK edition when v2 is in variant', () => {
		expect(
			isPuzzlesHubV2Enabled({
				edition: 'UK',
				serverSideABTests: { ...v2On },
			}),
		).toBe(true);
	});

	it('is false when the hub is available but v2 is in control', () => {
		expect(
			isPuzzlesHubV2Enabled({
				edition: 'INT',
				serverSideABTests: { ...v2Off },
			}),
		).toBe(false);
	});

	it('is false when the hub is available but v2 has no participation', () => {
		expect(
			isPuzzlesHubV2Enabled({ edition: 'INT', serverSideABTests: {} }),
		).toBe(false);
	});

	it('is false when neither the hub nor v2 is on', () => {
		expect(
			isPuzzlesHubV2Enabled({ edition: 'UK', serverSideABTests: {} }),
		).toBe(false);
	});
});

describe('isPuzzlesHubV3Enabled', () => {
	it('is true when the hub is available and v2 and v3 are in variant', () => {
		expect(
			isPuzzlesHubV3Enabled({
				edition: 'INT',
				serverSideABTests: { ...v2On, ...v3On },
			}),
		).toBe(true);
	});

	it('is false when v3 is in variant but v2 is off or missing', () => {
		expect(
			isPuzzlesHubV3Enabled({
				edition: 'INT',
				serverSideABTests: { ...v2Off, ...v3On },
			}),
		).toBe(false);
		expect(
			isPuzzlesHubV3Enabled({
				edition: 'INT',
				serverSideABTests: { ...v3On },
			}),
		).toBe(false);
	});

	it('is true in the UK edition when v2 and v3 are in variant', () => {
		expect(
			isPuzzlesHubV3Enabled({
				edition: 'UK',
				serverSideABTests: { ...v2On, ...v3On },
			}),
		).toBe(true);
	});

	it('is false when the hub and v2 are on but v3 is off or has no participation', () => {
		expect(
			isPuzzlesHubV3Enabled({
				edition: 'INT',
				serverSideABTests: { ...v2On, ...v3Off },
			}),
		).toBe(false);
		expect(
			isPuzzlesHubV3Enabled({
				edition: 'INT',
				serverSideABTests: { ...v2On },
			}),
		).toBe(false);
	});

	it('is false when nothing participates', () => {
		expect(
			isPuzzlesHubV3Enabled({ edition: 'UK', serverSideABTests: {} }),
		).toBe(false);
	});
});
