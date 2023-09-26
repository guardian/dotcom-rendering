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

/** Whether or not the current page is running more slowly than acceptable */
const isPerformingPoorly = Promise.all([
	getFirstContentfulPaint(),
	getTimeToFirstByte(),
])
	.then(([fcp, ttfb]) => ttfb > TTFB_THRESHOLD && fcp > FCP_THRESHOLD)
	.catch(() => true);

/** Whether we should adapt the current page to address poor performance issues */
export const shouldAdapt = new Promise<boolean>((resolve) => {
	if (window.location.hash === '#adapt') return resolve(true);
	if (window.guardian.config.tests.adaptiveSiteVariant !== 'variant') {
		return resolve(false);
	}

	return void isPerformingPoorly.then(resolve);
});

/** If the current page is performing poorly, record it in Ophan */
export const recordPoorPerformance = async (): Promise<void> => {
	try {
		if (await isPerformingPoorly) {
			/** Not sure here if we should duplicate “dotcom-rendering” */
			const experiences = [
				'dotcom-rendering',
				'poor-page-performance',
			].join(',');
			log(
				'openJournalism',
				`🐌 Poor page performance (TTFB>${TTFB_THRESHOLD} && FCP>${FCP_THRESHOLD})`,
			);
			const { record } = await getOphan();
			record({ experiences });
		}
	} catch (error) {
		// do nothing if the performance API is not available
	}
};
