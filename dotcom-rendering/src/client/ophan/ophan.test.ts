import packageJson from '../../../package.json';
import type { getOphan as getOphanFunction } from './ophan';

jest.mock('@guardian/libs', () => ({ log: jest.fn() }));

let getOphan: typeof getOphanFunction;
let supportsShadow: boolean;
let tracker: {
	init: jest.Mock;
	record: jest.Mock;
	trackComponentAttention: jest.Mock;
};
let startShadowFromConfig: jest.Mock;

beforeEach(async () => {
	jest.resetModules();
	delete window.guardian.config.switches.ophanShadowTesting;
	supportsShadow = true;
	tracker = {
		init: jest.fn(),
		record: jest.fn(),
		trackComponentAttention: jest.fn(),
	};
	startShadowFromConfig = jest.fn();
	jest.doMock('@guardian/ophan-tracker-js', () => ({
		__esModule: true,
		default: tracker,
		...(supportsShadow ? { startShadowFromConfig } : {}),
	}));
	({ getOphan } = await import('./ophan'));
});

afterEach(() => {
	delete window.guardian.config.switches.ophanShadowTesting;
});

it.each([undefined, false])(
	'keeps shadow testing off when the switch is %s',
	async (enabled) => {
		window.guardian.config.switches.ophanShadowTesting = enabled;
		const ophan = await getOphan('Web');
		ophan.record({ edition: 'UK' });
		expect(startShadowFromConfig).not.toHaveBeenCalled();
		expect(tracker.init).toHaveBeenCalledWith('ng');
		expect(tracker.record).toHaveBeenCalledWith(
			{ edition: 'UK' },
			undefined,
		);
	},
);

it('starts after normal tracking with pinned URLs and the dependency version', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	await getOphan('Web');

	expect(startShadowFromConfig).toHaveBeenCalledTimes(1);
	expect(startShadowFromConfig).toHaveBeenCalledWith({
		configUrl: 'https://assets.theguardian.com/ophan/shadow/config.json',
		assetBase: 'https://assets.theguardian.com/ophan/shadow/candidates/',
		reportingUrl:
			'https://ophan.theguardian.com/diagnostics/tracker-shadow',
		baselineBuild: packageJson.dependencies['@guardian/ophan-tracker-js'],
	});
	expect(startShadowFromConfig.mock.invocationCallOrder[0]).toBeGreaterThan(
		tracker.init.mock.invocationCallOrder[0] ?? 0,
	);
});

it('starts once across concurrent and cached callers', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	await Promise.all([getOphan('Web'), getOphan('Web')]);
	await getOphan('Web');

	expect(startShadowFromConfig).toHaveBeenCalledTimes(1);
});

it('keeps older TrackerJS versions usable when the optional API is absent', async () => {
	supportsShadow = false;
	window.guardian.config.switches.ophanShadowTesting = true;
	const ophan = await getOphan('Web');
	ophan.record({ edition: 'UK' });

	expect(startShadowFromConfig).not.toHaveBeenCalled();
	expect(tracker.record).toHaveBeenCalledWith({ edition: 'UK' }, undefined);
});

it('keeps normal tracking usable if shadow startup throws', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	startShadowFromConfig.mockImplementation(() => {
		throw new Error('shadow startup failed');
	});
	const ophan = await getOphan('Web');
	ophan.record({ edition: 'UK' });
	await getOphan('Web');

	expect(startShadowFromConfig).toHaveBeenCalledTimes(1);
	expect(tracker.record).toHaveBeenCalledWith({ edition: 'UK' }, undefined);
});

it('does not wait for the manifest or candidate to load', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	startShadowFromConfig.mockReturnValue({
		ready: new Promise(() => undefined),
	});
	const ophan = await getOphan('Web');
	ophan.record({ edition: 'UK' });

	expect(tracker.record).toHaveBeenCalledWith({ edition: 'UK' }, undefined);
});

it('never starts shadow testing or imports the web tracker in Apps', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	const ophan = await getOphan('Apps');
	ophan.record({ edition: 'UK' });

	expect(tracker.init).not.toHaveBeenCalled();
	expect(startShadowFromConfig).not.toHaveBeenCalled();
	expect(tracker.record).not.toHaveBeenCalled();
});
