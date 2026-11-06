import { log } from '@guardian/libs';
import type ophan from '@guardian/ophan-tracker-js';
import packageJson from '../../../package.json';

const config = {
	configUrl: 'https://assets.theguardian.com/ophan/shadow/config.json',
	assetBase: 'https://assets.theguardian.com/ophan/shadow/candidates/',
	reportingUrl: 'https://ophan.theguardian.com/diagnostics/tracker-shadow',
	baselineBuild: packageJson.dependencies['@guardian/ophan-tracker-js'],
	sampleRate: 0.01,
	timeoutMs: 200,
};

// Optional until guardian/ophan#8523 is released and installed.
type TrackerModule = {
	default: typeof ophan;
	startShadowFromConfig?: (
		options: typeof config,
		initialise: () => void,
	) => { ready: Promise<void> };
};

let startup: Promise<void> | undefined;

export const initialiseOphan = (tracker: TrackerModule): Promise<void> => {
	if (startup) return startup;
	let initialised = false;
	const initialise = () => {
		if (initialised) return;
		initialised = true;
		tracker.default.init('ng');
	};
	try {
		if (
			typeof window !== 'undefined' &&
			window.guardian.config.switches.ophanShadowTesting === true &&
			typeof tracker.startShadowFromConfig === 'function'
		) {
			startup = tracker
				.startShadowFromConfig(config, initialise)
				.ready.catch((error: unknown) => {
					log(
						'dotcom',
						'Ophan shadow testing could not start',
						error,
					);
				})
				.finally(initialise);
		} else {
			initialise();
			startup = Promise.resolve();
		}
	} catch (error) {
		log('dotcom', 'Ophan shadow testing could not start', error);
		initialise();
		startup = Promise.resolve();
	}
	return startup;
};
