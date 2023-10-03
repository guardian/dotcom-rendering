import type {
	OphanABEvent,
	OphanABPayload,
	OphanABTestMeta,
	OphanAction,
	OphanComponentEvent,
} from '@guardian/libs';
import { log } from '@guardian/libs';
import { isServer } from '../../lib/isServer';
import type { ServerSideTests } from '../../types/config';

export type OphanRecordFunction = (
	event: { [key: string]: unknown },
	callback?: () => void,
) => void;

/**
 * Loads Ophan (if it hasn't already been loaded) and returns a promise of Ophan's methods.
 */
export const getOphan = async (): Promise<
	NonNullable<typeof window.guardian.ophan>
> => {
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

	// this is the future of `getOphan`'s API, but we need to move to a
	// dynamic import of the Ophan library to get there, so just returning a
	// meaningless promise for now, for future-proofing
	return Promise.resolve({ ...ophan, record, trackComponentAttention });
};

/**
 * @deprecated use `getOphan` instead
 */
export const getOphanRecordFunction = (): OphanRecordFunction => {
	if (isServer || window.guardian.ophan === undefined) {
		// eslint-disable-next-line no-console -- worth informing all users
		console.warn('window.guardian.ophan.record is not available');
		return () => {
			/* do nothing */
		};
	}

	return window.guardian.ophan.record;
};

/**
 * @deprecated use `getOphan` instead
 */
export const record: OphanRecordFunction = (event) => {
	if (window.guardian.ophan?.record) {
		window.guardian.ophan.record(event, () =>
			log('dotcom', '🧿 Ophan event recorded:', event),
		);
	} else {
		throw new Error("window.guardian.ophan.record doesn't exist");
	}
};

export const submitComponentEvent = (
	componentEvent: OphanComponentEvent,
	ophanRecord: OphanRecordFunction = record, // TODO - migrate uses and make this mandatory
): void => {
	ophanRecord({ componentEvent });
};

interface SdcTestMeta extends OphanABTestMeta {
	labels?: string[];
}

export const sendOphanComponentEvent = (
	action: OphanAction,
	testMeta: SdcTestMeta,
	ophanRecord: OphanRecordFunction = record, // TODO - migrate uses and make this mandatory
): void => {
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

	submitComponentEvent(componentEvent, ophanRecord);
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

export const recordPerformance = (): void => {
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

	record({
		performance,
	});
};
