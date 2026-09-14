import {
	puzzlesHubExperiment,
	puzzlesHubParticipation,
} from './puzzlesHubExperiment';
import {
	isPuzzlesHubV1Enabled,
	isPuzzlesHubV2Enabled,
	puzzlesHubV1Experiment,
	puzzlesHubV1Participation,
	puzzlesHubV2Experiment,
	puzzlesHubV2Participation,
} from './puzzlesHubVersionExperiment';

const v0On = puzzlesHubParticipation(puzzlesHubExperiment.variant);
const v0Off = puzzlesHubParticipation(puzzlesHubExperiment.control);
const v1On = puzzlesHubV1Participation(puzzlesHubV1Experiment.variant);
const v1Off = puzzlesHubV1Participation(puzzlesHubV1Experiment.control);
const v2On = puzzlesHubV2Participation(puzzlesHubV2Experiment.variant);
const v2Off = puzzlesHubV2Participation(puzzlesHubV2Experiment.control);

describe('isPuzzlesHubV1Enabled', () => {
	it('is true when both v0 and v1 are in variant', () => {
		expect(
			isPuzzlesHubV1Enabled({
				serverSideABTests: { ...v0On, ...v1On },
			}),
		).toBe(true);
	});

	it('is false when v1 is in variant but v0 is off', () => {
		expect(
			isPuzzlesHubV1Enabled({
				serverSideABTests: { ...v0Off, ...v1On },
			}),
		).toBe(false);
	});

	it('is false when v0 is in variant but v1 is off', () => {
		expect(
			isPuzzlesHubV1Enabled({
				serverSideABTests: { ...v0On, ...v1Off },
			}),
		).toBe(false);
	});

	it('is false when both v0 and v1 are off', () => {
		expect(
			isPuzzlesHubV1Enabled({
				serverSideABTests: { ...v0Off, ...v1Off },
			}),
		).toBe(false);
	});

	it('is false when v1 is in variant but v0 participation is absent entirely', () => {
		expect(
			isPuzzlesHubV1Enabled({
				serverSideABTests: { ...v1On },
			}),
		).toBe(false);
	});

	it('is false when neither test has any participation', () => {
		expect(isPuzzlesHubV1Enabled({ serverSideABTests: {} })).toBe(false);
	});
});

describe('isPuzzlesHubV2Enabled', () => {
	it('is true when v0, v1, and v2 are all in variant', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v0On, ...v1On, ...v2On },
			}),
		).toBe(true);
	});

	it('is false when v2 is in variant but v1 is off (v0 on)', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v0On, ...v1Off, ...v2On },
			}),
		).toBe(false);
	});

	it('is false when v2 is in variant but v0 is off (v1 on)', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v0Off, ...v1On, ...v2On },
			}),
		).toBe(false);
	});

	it('is false when v0 and v1 are on but v2 is off', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v0On, ...v1On, ...v2Off },
			}),
		).toBe(false);
	});

	it('is false when all three tests are off', () => {
		expect(
			isPuzzlesHubV2Enabled({
				serverSideABTests: { ...v0Off, ...v1Off, ...v2Off },
			}),
		).toBe(false);
	});

	it('is false when no test has any participation', () => {
		expect(isPuzzlesHubV2Enabled({ serverSideABTests: {} })).toBe(false);
	});
});
