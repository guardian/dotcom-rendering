import type {
	OphanABEvent,
	OphanABPayload,
	OphanAction,
	OphanComponent,
	OphanComponentEvent,
	OphanComponentType,
	OphanProduct,
	TestMeta,
} from '@guardian/types';

export type OphanRecordFunction = (event: { [key: string]: any }) => void;

export const getOphanRecordFunction = (): OphanRecordFunction => {
	const record =
		window &&
		window.guardian &&
		window.guardian.ophan &&
		window.guardian.ophan.record;

	if (record) {
		return record;
	}
	console.log('window.guardian.ophan.record is not available');
	return () => {};
};

export const record: OphanRecordFunction = (event) => {
	if (
		window.guardian &&
		window.guardian.ophan &&
		window.guardian.ophan.record
	) {
		window.guardian.ophan.record(event);
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

export interface SdcTestMeta extends TestMeta {
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

export const sendOphanPlatformRecord = () => {
	record({ experiences: 'dotcom-rendering' });

	// Record server-side AB test variants (i.e. control or variant)
	if (
		window.guardian &&
		window.guardian.config &&
		window.guardian.config.tests
	) {
		const { tests } = window.guardian.config;

		record(abTestPayload(tests));
	}
};

export const recordPerformance = () => {
	const performanceAPI = window.performance;
	const supportsPerformanceProperties =
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

export {
	OphanABEvent,
	OphanABPayload,
	OphanAction,
	OphanComponent,
	OphanComponentEvent,
	OphanComponentType,
	OphanProduct,
	TestMeta,
};
