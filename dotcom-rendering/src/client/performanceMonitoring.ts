import { log } from '@guardian/libs';
import { getOphan } from './ophan/ophan';

const logPerformanceInfo = (name: string, data?: unknown) =>
	log('openJournalism', '⏱', name, data);

const reasons = new Set<string>();
const recordPoorDeviceConnectivity = async (reason: string) => {
	reasons.add(reason);
	log('openJournalism', '🐌', reasons);
	if (reasons.size >= 2) {
		/** Not sure here if we should duplicate “dotcom-rendering” */
		const experiences = ['dotcom-rendering', 'poor-page-performance'].join(
			',',
		);
		const { record } = await getOphan();
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
							void recordPoorDeviceConnectivity(
								'FCP over 2.4s',
							).then(() => {
								observer.disconnect();
							});
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
			if (ttfb > 1200) {
				void recordPoorDeviceConnectivity('TTFB over 1.2s');
			}
		}
	} catch (error) {
		// do nothing if the performance API is not available
	}

	return Promise.resolve();
};
