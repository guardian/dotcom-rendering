import type {
	OphanABEvent,
	OphanABPayload,
	OphanABTestMeta,
	OphanAction,
	OphanComponent,
	OphanComponentEvent,
	OphanComponentType,
	OphanProduct,
} from '@guardian/libs';
import { log } from '@guardian/libs';

export type OphanRecordFunction = (
	event: { [key: string]: any },
	callback?: () => void,
) => void;

export const getOphanRecordFunction = (): OphanRecordFunction => {
	const record = window.guardian.ophan?.record;

	if (record) return record;

	console.warn('window.guardian.ophan.record is not available');
	return () => {};
};

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

export interface SdcTestMeta extends OphanABTestMeta {
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
			id: testMeta.campaignId || testMeta.campaignCode,
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

export const abTestPayload = (tests: {
	[key: string]: string;
}): OphanABPayload => {
	const records: { [key: string]: OphanABEvent } = {};
	Object.keys(tests).forEach((testName) => {
		records[`ab${testName}`] = {
			variantName: tests[testName],
			complete: false,
		};
	});

	return { abTestRegister: records };
};

export const sendOphanPlatformRecord = (): void => {
	record({ experiences: 'dotcom-rendering' });

	// Record server-side AB test variants (i.e. control or variant)
	if (window.guardian.config.tests) {
		const { tests } = window.guardian.config;

		record(abTestPayload(tests));
	}
};

/**
 * Record performance navigation timing information to Ophan
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
 */
export const recordPerformance = (): void => {
	try {
		const { performance } = window;
		const [timing] = performance.getEntriesByType('navigation') ?? [{}];

		if (!(timing instanceof PerformanceNavigationTiming))
			throw new TypeError('Not a PerformanceNavigationTiming');

		const timings = {
			dns: timing.domainLookupEnd - timing.domainLookupStart,
			connection: timing.connectEnd - timing.connectStart,
			firstByte: timing.responseStart - timing.connectEnd,
			lastByte: timing.responseEnd - timing.responseStart,
			domContentLoadedEvent:
				timing.domContentLoadedEventStart - timing.responseEnd,
			loadEvent:
				timing.loadEventStart - timing.domContentLoadedEventStart,
			navType: timing.type,
			redirectCount: timing.redirectCount,
		};

		record({
			performance: timings,
		});
	} catch (e) {
		log('dotcom', 'Could not record performance', e);
	}
};

export {
	OphanABEvent,
	OphanABPayload,
	OphanAction,
	OphanComponent,
	OphanComponentEvent,
	OphanComponentType,
	OphanProduct,
	OphanABTestMeta,
};
