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
	startShadowFromConfig = jest.fn(
		(_config: unknown, initialise: () => void) => {
			initialise();
			return { ready: Promise.resolve() };
		},
	);
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

it('starts through the shadow API with a local sample cap and total wait budget', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	await getOphan('Web');

	expect(startShadowFromConfig).toHaveBeenCalledTimes(1);
	expect(startShadowFromConfig).toHaveBeenCalledWith(
		{
			configUrl:
				'https://assets.theguardian.com/ophan/shadow/config.json',
			assetBase:
				'https://assets.theguardian.com/ophan/shadow/candidates/',
			reportingUrl:
				'https://ophan.theguardian.com/diagnostics/tracker-shadow',
			baselineBuild:
				packageJson.dependencies['@guardian/ophan-tracker-js'],
			sampleRate: 0.01,
			timeoutMs: 200,
		},
		expect.any(Function),
	);
	expect(startShadowFromConfig.mock.invocationCallOrder[0]).toBeLessThan(
		tracker.init.mock.invocationCallOrder[0] ?? 0,
	);
});

it('starts once across concurrent and cached callers', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	await Promise.all([getOphan('Web'), getOphan('Web')]);
	await getOphan('Web');

	expect(startShadowFromConfig).toHaveBeenCalledTimes(1);
	expect(tracker.init).toHaveBeenCalledTimes(1);
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

it('holds callers until startup settles, then falls back to normal init once', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	let finish!: () => void;
	startShadowFromConfig.mockReturnValue({
		ready: new Promise<void>((resolve) => {
			finish = resolve;
		}),
	});
	const first = getOphan('Web');
	const second = getOphan('Web');
	await Promise.resolve();
	await Promise.resolve();
	expect(tracker.init).not.toHaveBeenCalled();
	finish();
	const [ophan] = await Promise.all([first, second]);
	ophan.record({ edition: 'UK' });
	expect(tracker.init).toHaveBeenCalledTimes(1);
	expect(startShadowFromConfig).toHaveBeenCalledTimes(1);
	expect(tracker.record).toHaveBeenCalledWith({ edition: 'UK' }, undefined);
});

it('falls back once if startup rejects after calling init', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	startShadowFromConfig.mockImplementation(
		(_config: unknown, initialise: () => void) => {
			initialise();
			return { ready: Promise.reject(new Error('failed')) };
		},
	);
	await getOphan('Web');
	expect(tracker.init).toHaveBeenCalledTimes(1);
});

it('never starts shadow testing or imports the web tracker in Apps', async () => {
	window.guardian.config.switches.ophanShadowTesting = true;
	const ophan = await getOphan('Apps');
	ophan.record({ edition: 'UK' });

	expect(tracker.init).not.toHaveBeenCalled();
	expect(startShadowFromConfig).not.toHaveBeenCalled();
	expect(tracker.record).not.toHaveBeenCalled();
});
