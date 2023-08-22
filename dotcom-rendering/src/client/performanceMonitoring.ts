import { log } from '@guardian/libs';
import { getOphan } from './ophan/ophan';

const TTFB_THRESHOLD = 1200;
const FCP_THRESHOLD = 2400;

const logPerformanceInfo = (name: string, data?: unknown) =>
	log('openJournalism', '⏱', name, data);

let memoizedFCP: number | undefined;
/** First contentful paint is the best single indicator of core web vitals label */
const getFirstContentfulPaint = async () =>
	(memoizedFCP ??= await new Promise<number>((resolve) => {
		new PerformanceObserver((entries, observer) => {
			for (const { name, startTime, duration } of entries.getEntries()) {
				if (name === 'first-contentful-paint') {
					logPerformanceInfo('paint', { name, startTime, duration });
					observer.disconnect();
					resolve(startTime);
				}
			}
		}).observe({
			type: 'paint',
			buffered: true,
		});
	}));

let memoizedTTFB: number | undefined;
const getTimeToFirstByte = async () =>
	(memoizedTTFB ??= await new Promise<number>((resolve, reject) => {
		// Time to first byte is a widely supported performance marker
		// which is the second-best indicator of core web vitals label
		const [nav] = window.performance.getEntriesByType('navigation');
		if (nav) {
			logPerformanceInfo('navigation', {
				domContentLoadedEventEnd: nav.domContentLoadedEventEnd,
				type: nav.type,
				responseEnd: nav.responseEnd,
			});
			resolve(nav.responseStart - nav.startTime);
		} else {
			reject('unable to get navigation information');
		}
	}));

export const performanceMonitoring = async (): Promise<void> => {
	try {
		const [fcp, ttfb] = await Promise.all([
			getFirstContentfulPaint(),
			getTimeToFirstByte(),
		]);

		if (ttfb > TTFB_THRESHOLD && fcp > FCP_THRESHOLD) {
			/** Not sure here if we should duplicate “dotcom-rendering” */
			const experiences = [
				'dotcom-rendering',
				'poor-page-performance',
			].join(',');
			log('openJournalism', '🐌', { ttfb, fcp });
			const { record } = await getOphan();
			record({ experiences });
		}
	} catch (error) {
		// do nothing if the performance API is not available
	}
};
