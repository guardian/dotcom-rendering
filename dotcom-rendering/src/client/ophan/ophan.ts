import type { OphanABTestMeta, OphanAction } from '@guardian/libs';
import { log } from '@guardian/libs';
import ophan from '@guardian/ophan-tracker-js';
import type {ComponentEvent} from '@guardian/ophan-tracker-js';
import type { RenderingTarget } from '../../types/renderingTarget';

type Ophan = typeof ophan;

/**
 * Store a reference to Ophan so that we don't need to load/enhance it more than once.
 */
let cachedOphan: Ophan | undefined;

/**
 * Loads Ophan (if it hasn't already been loaded) and returns a promise of Ophan's methods.
 */
export const getOphan = async (
	renderingTarget: RenderingTarget,
): Promise<Ophan> => {
	if (cachedOphan) {
		return cachedOphan;
	}

	if (renderingTarget === 'Apps') {
		cachedOphan = {
			setEventEmitter: () => undefined, // We don't currently have a custom eventEmitter on DCR - like 'mediator' in Frontend.
			trackComponentAttention: () => undefined,
			record: (e) => {
				if (e instanceof Error) {
					window.guardian.modules.sentry.reportError(
						e,
						"We are in DCAR but Ophan record method got called. This shouldn't have happened. Please investigate why",
					);
				}
			},
			viewId: 'Apps',
			pageViewId: 'Apps',
		};

		return cachedOphan;
	}

	// We've taken '@guardian/ophan-tracker-js' out of the apps client bundle (made it external in webpack) because we don't ever expect this method to be called. Tracking in apps is done natively.
	const { default: ophan } = await import(
		/* webpackMode: "eager" */ '@guardian/ophan-tracker-js'
	);

	const record: (typeof ophan)['record'] = (event, callback) => {
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
	componentEvent: ComponentEvent,
	renderingTarget: RenderingTarget,
): Promise<void> => {
	const ophan = await getOphan(renderingTarget);
	ophan.record({ componentEvent });
};

interface SdcTestMeta extends OphanABTestMeta {
	labels?: string[];
}

export const sendOphanComponentEvent = async (
	action: OphanAction,
	testMeta: SdcTestMeta,
	renderingTarget: RenderingTarget,
): Promise<void> => {
	const {
		abTestName,
		abTestVariant,
		componentType,
		products = [],
		campaignCode,
		labels = [],
	} = testMeta;

	const componentEvent: ComponentEvent = {
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

	await submitComponentEvent(componentEvent, renderingTarget);
};

export const recordPerformance = async (
	renderingTarget: RenderingTarget,
): Promise<void> => {
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

	const ophan = await getOphan(renderingTarget);
	ophan.record({
		performance,
	});
};

const experiencesSet = new Set(['dotcom-rendering']);
export const recordExperiences = async (
	renderingTarget: RenderingTarget,
	experiences: string[],
): Promise<void> => {
	for (const experience of experiences) {
		experiencesSet.add(experience);
	}

	const { record } = await getOphan(renderingTarget);

	// this is the only allowed usage of sending experiences!
	// otherwise, race conditions might lead to different results
	record({
		['experiences' as string]: [...experiencesSet].sort().join(','),
	});
};
