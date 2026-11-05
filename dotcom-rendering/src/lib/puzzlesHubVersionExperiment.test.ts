import {
	isPuzzlesHubV2Enabled,
	puzzlesHubV2Experiment,
	puzzlesHubV2Participation,
} from './puzzlesHubVersionExperiment';

const v2On = puzzlesHubV2Participation(puzzlesHubV2Experiment.variant);
const v2Off = puzzlesHubV2Participation(puzzlesHubV2Experiment.control);

describe('isPuzzlesHubV2Enabled', () => {
	it('is true when the hub is available and v2 is in variant', () => {
		expect(
			isPuzzlesHubV2Enabled({
				edition: 'INT',
				serverSideABTests: { ...v2On },
			}),
		).toBe(true);
	});

	it('is false when v2 is in variant but the hub is not available', () => {
		expect(
			isPuzzlesHubV2Enabled({
				edition: 'UK',
				serverSideABTests: { ...v2On },
			}),
		).toBe(false);
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
