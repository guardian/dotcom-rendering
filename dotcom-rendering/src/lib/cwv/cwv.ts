import type { Subscription } from '@guardian/libs';
import { log } from '@guardian/libs';
import type {
	CLSMetricWithAttribution,
	FCPMetricWithAttribution,
	FIDMetricWithAttribution,
	INPMetricWithAttribution,
	LCPMetricWithAttribution,
	TTFBMetricWithAttribution,
} from 'web-vitals/attribution';
import { roundWithDecimals } from './roundWithDecimals';

type CoreWebVitalsPayload = {
	page_view_id: string;
	browser_id: string;
	cls: number;
	cls_target: string;
	inp: number;
	inp_target: string;
	lcp: number;
	lcp_target: string;
	fid: number;
	fcp: number;
	ttfb: number;
	stage: 'CODE' | 'PROD';
};

const endpoint = 'https://feast-events.guardianapis.com/web-vitals';

const coreWebVitalsPayload: Partial<CoreWebVitalsPayload> = {};

const teamsForLogging: Set<Subscription> = new Set();
let initialised = false;

let queued = false;
const sendData = (): void => {
	if (queued) {
		return;
	}

	// If we’re missing FCP, the data is unusable in the lake,
	// So we’re not sending anything.
	if (coreWebVitalsPayload.fcp === undefined) {
		return;
	}

	queued = navigator.sendBeacon(
		endpoint,
		JSON.stringify(coreWebVitalsPayload),
	);

	if (teamsForLogging.size > 0) {
		for (const team of teamsForLogging) {
			log(
				team,
				queued
					? 'Core Web Vitals payload successfully queued for transfer'
					: 'Failed to queue Core Web Vitals payload for transfer',
			);
		}
	}
};

type MetricTypeWithAttribution =
	| CLSMetricWithAttribution
	| INPMetricWithAttribution
	| LCPMetricWithAttribution
	| FCPMetricWithAttribution
	| FIDMetricWithAttribution
	| TTFBMetricWithAttribution;

const onReport = (metric: MetricTypeWithAttribution) => {
	switch (metric.name) {
		case 'CLS':
			// Browser support: Chromium,
			coreWebVitalsPayload.cls = roundWithDecimals(metric.value);
			coreWebVitalsPayload.cls_target =
				metric.attribution.largestShiftTarget;
			break;
		case 'INP':
			coreWebVitalsPayload.inp = roundWithDecimals(metric.value);
			coreWebVitalsPayload.inp_target =
				metric.attribution.interactionTarget;
			break;
		case 'LCP':
			// Browser support: Chromium
			coreWebVitalsPayload.lcp = roundWithDecimals(metric.value);
			coreWebVitalsPayload.lcp_target = metric.attribution.element;
			break;
		/** none-core web vital metrics */
		case 'FCP':
			// Browser support: Chromium, Firefox, Safari Technology Preview
			coreWebVitalsPayload.fcp = roundWithDecimals(metric.value);
			break;
		case 'FID':
			// Browser support: Chromium, Firefox, Safari, Internet Explorer (with the polyfill)
			coreWebVitalsPayload.fid = roundWithDecimals(metric.value);
			break;
		case 'TTFB':
			// Browser support: Chromium, Firefox, Safari, Internet Explorer
			coreWebVitalsPayload.ttfb = roundWithDecimals(metric.value);
			break;
	}
};

const listener = (e: Event): void => {
	switch (e.type) {
		case 'visibilitychange':
			if (document.visibilityState === 'hidden') {
				sendData();
			}
			return;
		case 'pagehide':
			sendData();
			return;
	}
};

const getCoreWebVitals = async (): Promise<void> => {
	const webVitals = await import('web-vitals/attribution');
	const { onCLS, onFCP, onFID, onLCP, onTTFB, onINP } = webVitals;

	onCLS(onReport, { reportAllChanges: false });
	onINP(onReport);
	onLCP(onReport);
	onFCP(onReport);
	onFID(onReport);
	onTTFB(onReport);

	// Report all available metrics when the page is unloaded or in background.
	addEventListener('visibilitychange', listener);

	// Safari does not reliably fire the `visibilitychange` on page unload.
	addEventListener('pagehide', listener);
};

type InitCoreWebVitalsOptions = {
	isDev: boolean;

	browserId?: string;
	pageViewId?: string;

	sampling?: number;
	team?: Subscription;
};

/**
 * Initialise sending Core Web Vitals metrics to a logging endpoint.
 *
 * @param {InitCoreWebVitalsOptions} init - the initialisation options
 * @param init.isDev - used to determine whether to use CODE or PROD endpoints.
 * @param init.browserId - identifies the browser. Usually available via `getCookie({ name: 'bwid' })`.
 * @param init.pageViewId - identifies the page view. Usually available on `guardian.config.ophan.pageViewId`.
 *
 * @param init.sampling - sampling rate for sending data. Defaults to `0.01`.
 *
 * @param init.team - Optional team to trigger a log event once metrics are queued.
 */
export const initCoreWebVitals = async ({
	browserId,
	pageViewId,
	sampling = 1 / 100, // 1% of page view by default
	isDev,
	team,
}: InitCoreWebVitalsOptions): Promise<void> => {
	if (initialised) {
		console.warn(
			'initCoreWebVitals already initialised',
			'use the bypassCoreWebVitalsSampling method instead',
		);
		return;
	}

	initialised = true;

	if (team) {
		teamsForLogging.add(team);
	}

	coreWebVitalsPayload.stage = isDev ? 'CODE' : 'PROD';
	coreWebVitalsPayload.browser_id = browserId;
	coreWebVitalsPayload.page_view_id = pageViewId;

	if (!browserId || !pageViewId) {
		console.warn(
			'browserId or pageViewId missing from Core Web Vitals.',
			'Resulting data cannot be joined to page view tables',
			{ browserId, pageViewId },
		);
	}

	if (sampling < 0 || sampling > 1) {
		console.warn(
			'Core Web Vitals sampling is outside the 0 to 1 range: ',
			sampling,
		);
	}
	if (sampling === 0) {
		console.warn('Core Web Vitals are sampled at 0%');
	}
	if (sampling === 1) {
		console.warn('Core Web Vitals are sampled at 100%');
	}

	const pageViewInSample = Math.random() < sampling;
	const bypassWithHash =
		window.location.hash === '#bypassCoreWebVitalsSampling';

	if (pageViewInSample || bypassWithHash) {
		return getCoreWebVitals();
	}
};

/**
 * A method to asynchronously send web vitals after initialization.
 * @param team - Optional team to trigger a log event once metrics are queued.
 */
export const bypassCoreWebVitalsSampling = async (
	team?: Subscription,
): Promise<void> => {
	if (!initialised) {
		console.warn('initCoreWebVitals not yet initialised');
		return;
	}
	if (team) {
		teamsForLogging.add(team);
	}
	return getCoreWebVitals();
};

export const _ = {
	coreWebVitalsPayload,
	sendData,
	reset: (): void => {
		initialised = false;
		teamsForLogging.clear();
		queued = false;
		for (const key in coreWebVitalsPayload) {
			delete coreWebVitalsPayload[key as keyof CoreWebVitalsPayload];
		}
		removeEventListener('visibilitychange', listener);
		removeEventListener('pagehide', listener);
	},
	endpoint,
};
