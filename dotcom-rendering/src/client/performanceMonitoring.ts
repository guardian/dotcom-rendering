import { log } from '@guardian/libs';
import { record } from './ophan/ophan';

const logPerformanceInfo = (name: string, data?: unknown) =>
	log('openJournalism', '⏱', name, data);

const reasons = new Set<string>();
const recordPoorDeviceConnectivity = (reason: string) => {
	reasons.add(reason);
	log('openJournalism', '🐌', reasons);
	if (reasons.size >= 2) {
		/** Not sure here if we should duplicate “dotcom-rendering” */
		const experiences = ['dotcom-rendering', 'poor-page-performance'].join(
			',',
		);
		record({ experiences });
	}
};

export const performanceMonitoring = (): Promise<void> => {
	try {
		// First contentful paint is the best single indicator
		// of core web vitals label
		new PerformanceObserver((entries, observer) => {
			for (const { name, duration, startTime } of entries.getEntries()) {
				switch (name) {
					case 'first-contentful-paint': {
						logPerformanceInfo(name, { startTime, duration });
						if (startTime > 2400) {
							recordPoorDeviceConnectivity('FCP over 2.4s');
							observer.disconnect();
						}
					}
				}
			}
		}).observe({
			type: 'paint',
			buffered: true,
		});

		// Time to first byte is a widely supported performance marker
		// which is the second-best indicator of core web vitals label
		const [nav] = window.performance.getEntriesByType('navigation');
		if (nav) {
			const info = {
				domContentLoadedEventEnd: nav.domContentLoadedEventEnd,
				type: nav.type,
				responseEnd: nav.responseEnd,
			};
			logPerformanceInfo('navigation', info);
			const ttfb = nav.responseStart - nav.startTime;
			if (ttfb > 2400) {
				recordPoorDeviceConnectivity('TTFB over 2.4s');
			}
		}

		// If Ophan takes a long time to load, we take it as an indicator
		// of very slow connection or very little processing power
		new PerformanceObserver((entries, observer) => {
			for (const { name, duration, startTime } of entries.getEntries()) {
				switch (name) {
					case 'ophan': {
						logPerformanceInfo(name, { startTime, duration });
						if (startTime > 5000 || duration > 20) {
							recordPoorDeviceConnectivity(
								'Ophan took over 5s to boot or 20ms to execute',
							);
							observer.disconnect();
						}
					}
				}
			}
		}).observe({
			type: 'measure',
			buffered: true,
		});

		// Long tasks are only supported in Chromium, but can be a good indicator
		// of poor performance
		let longTasks = 0;
		new PerformanceObserver((entries, observer) => {
			for (const { name, duration, startTime } of entries.getEntries()) {
				longTasks += duration;
				logPerformanceInfo('longtask:' + name, { startTime, duration });
				if (longTasks >= 120) {
					recordPoorDeviceConnectivity(
						'Long tasks total duration above 120ms',
					);
					observer.disconnect();
				}
			}
		}).observe({ type: 'longtask', buffered: true });
	} catch (error) {
		// do nothing if the performance API is not available
	}

	return Promise.resolve();
};
