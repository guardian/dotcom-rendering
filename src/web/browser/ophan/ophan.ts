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

export const record = (event: { [key: string]: any }): void => {
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
): void => {
	record({ componentEvent });
};

export const sendOphanComponentEvent = (
	action: OphanAction,
	testMeta: TestMeta,
): void => {
	const {
		abTestName,
		abTestVariant,
		componentType,
		products = [],
		campaignCode,
	} = testMeta;

	const componentEvent: OphanComponentEvent = {
		component: {
			componentType,
			products,
			campaignCode,
			id: testMeta.campaignId || testMeta.campaignCode,
		},
		abTest: {
			name: abTestName,
			variant: abTestVariant,
		},
		action,
	};

	submitComponentEvent(componentEvent);
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
