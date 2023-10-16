import type {
	OphanABEvent,
	OphanABPayload,
	OphanABTestMeta,
	OphanAction,
	OphanComponentEvent,
} from '@guardian/libs';
import { log } from '@guardian/libs';
import type { ServerSideTests } from '../../types/config';

export type OphanRecordFunction = (
	event: { [key: string]: unknown } & {
		/**
		 * the experiences key will override previously set values.
		 * Use `recordExperiences` instead.
		 */
		experiences?: never;
	},
	callback?: () => void,
) => void;

/**
 * Store a reference to Ophan so that we don't need to load/enhance it more than once.
 */
let cachedOphan: typeof window.guardian.ophan;

/**
 * Loads Ophan (if it hasn't already been loaded) and returns a promise of Ophan's methods.
 */
export const getOphan = async (): Promise<
	NonNullable<typeof window.guardian.ophan>
> => {
	if (cachedOphan) {
		return cachedOphan;
	}

	// @ts-expect-error -- side effect only
	await import(/* webpackMode: "eager" */ 'ophan-tracker-js');

	const { ophan } = window.guardian;

	if (!ophan) {
		throw new Error('window.guardian.ophan is not available');
	}

	const record: OphanRecordFunction = (event, callback) => {
		ophan.record(event, callback);
		log('dotcom', '🧿 Ophan event recorded:', event);
	};

	const trackComponentAttention: typeof ophan.trackComponentAttention = (
		name,
		el,
		visibilityThreshold,
	) => {
		ophan.trackComponentAttention(name, el, visibilityThreshold);
		log('dotcom', '🧿 Ophan tracking component attention:', name, {
			el,
			visibilityThreshold,
		});
	};

	cachedOphan = { ...ophan, record, trackComponentAttention };
	return cachedOphan;
};

export const submitComponentEvent = async (
	componentEvent: OphanComponentEvent,
): Promise<void> => {
	const ophan = await getOphan();
	ophan.record({ componentEvent });
};

interface SdcTestMeta extends OphanABTestMeta {
	labels?: string[];
}

export const sendOphanComponentEvent = async (
	action: OphanAction,
	testMeta: SdcTestMeta,
): Promise<void> => {
	const {
		abTestName,
		abTestVariant,
		componentType,
		products = [],
		campaignCode,
		labels,
	} = testMeta;

	const componentEvent: OphanComponentEvent = {
		component: {
			componentType,
			products,
			campaignCode,
			id: testMeta.campaignId ?? testMeta.campaignCode,
			labels,
		},
		abTest: {
			name: abTestName,
			variant: abTestVariant,
		},
		action,
	};

	await submitComponentEvent(componentEvent);
};

export const abTestPayload = (tests: ServerSideTests): OphanABPayload => {
	const records: { [key: string]: OphanABEvent } = {};
	for (const [testName, variantName] of Object.entries(tests)) {
		records[`ab${testName}`] = {
			variantName,
			complete: false,
		};
	}

	return { abTestRegister: records };
};

export const recordPerformance = async (): Promise<void> => {
	const { performance: performanceAPI } = window;
	const supportsPerformanceProperties =
		// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition -- Safety on browsers
		performanceAPI &&
		'navigation' in performanceAPI &&
		'timing' in performanceAPI;

	if (!supportsPerformanceProperties) {
		return;
	}

	const { timing } = performanceAPI;

	const performance = {
		dns: timing.domainLookupEnd - timing.domainLookupStart,
		connection: timing.connectEnd - timing.connectStart,
		firstByte: timing.responseStart - timing.connectEnd,
		lastByte: timing.responseEnd - timing.responseStart,
		domContentLoadedEvent:
			timing.domContentLoadedEventStart - timing.responseEnd,
		loadEvent: timing.loadEventStart - timing.domContentLoadedEventStart,
		navType: performanceAPI.navigation.type,
		redirectCount: performanceAPI.navigation.redirectCount,
	};

	const ophan = await getOphan();
	ophan.record({
		performance,
	});
};

const experiencesSet = new Set(['dotcom-rendering']);
export const recordExperiences = async (
	...experiences: string[]
): Promise<void> => {
	for (const experience of experiences) {
		experiencesSet.add(experience);
	}

	const { record } = await getOphan();

	// this is the only allowed usage of sending experiences!
	// otherwise, race conditions might lead to different results
	record({
		['experiences' as string]: [...experiencesSet].sort().join(','),
	});
};
