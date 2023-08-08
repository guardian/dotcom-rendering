import type {
	OphanABEvent,
	OphanABPayload,
	OphanABTestMeta,
	OphanAction,
	OphanComponentEvent,
} from '@guardian/libs';
import type { ServerSideTests } from '../../types/config';

export const getOphan = async (): Promise<
	NonNullable<typeof window.guardian.ophan>
> => {
	// @ts-expect-error -- no definitions, side effect only
	await import(/* webpackMode: "eager" */ 'ophan-tracker-js');

	if (!window.guardian.ophan) {
		throw new Error('window.guardian.ophan is not available');
	}

	return window.guardian.ophan;
};

export type OphanRecordFunction = (
	event: { [key: string]: unknown },
	callback?: () => void,
) => void;

// export const record: OphanRecordFunction = (event) => {
// 	if (window.guardian.ophan?.record) {
// 		window.guardian.ophan.record(event, () =>
// 			log('dotcom', '🧿 Ophan event recorded:', event),
// 		);
// 	} else {
// 		throw new Error("window.guardian.ophan.record doesn't exist");
// 	}
// };

export const submitComponentEvent = async (
	componentEvent: OphanComponentEvent,
): Promise<void> => {
	const { record } = await getOphan();
	record({ componentEvent });
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

	return submitComponentEvent(componentEvent);
};

export const abTestPayload = (tests: ServerSideTests): OphanABPayload => {
	const records: { [key: string]: OphanABEvent } = {};
	Object.entries(tests).forEach(([testName, variantName]) => {
		records[`ab${testName}`] = {
			variantName,
			complete: false,
		};
	});

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

	const { record } = await getOphan();
	record({
		performance,
	});
};
