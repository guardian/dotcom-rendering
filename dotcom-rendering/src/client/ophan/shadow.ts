import { log } from '@guardian/libs';
import type ophan from '@guardian/ophan-tracker-js';
import packageJson from '../../../package.json';

const config = {
	configUrl: 'https://assets.theguardian.com/ophan/shadow/config.json',
	assetBase: 'https://assets.theguardian.com/ophan/shadow/candidates/',
	reportingUrl: 'https://ophan.theguardian.com/diagnostics/tracker-shadow',
	baselineBuild: packageJson.dependencies['@guardian/ophan-tracker-js'],
};

// Optional until the API from guardian/ophan#8523 is released and installed.
// Keep the current package buildable without copying its shadow implementation.
type TrackerModule = {
	default: typeof ophan;
	startShadowFromConfig?: (options: typeof config) => unknown;
};

let started = false;

export const startOphanShadowTesting = (tracker: TrackerModule): void => {
	if (
		started ||
		typeof window === 'undefined' ||
		window.guardian.config.switches.ophanShadowTesting !== true ||
		typeof tracker.startShadowFromConfig !== 'function'
	) {
		return;
	}

	// Several callers may initialise Ophan concurrently before it is cached.
	started = true;
	try {
		tracker.startShadowFromConfig(config);
	} catch (error) {
		log('dotcom', 'Ophan shadow testing could not start', error);
	}
};
