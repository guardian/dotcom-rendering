import { log } from '@guardian/libs';
import { getOphan } from './ophan/ophan';

const logPerformanceInfo = (name: string, data?: unknown) =>
	log('openJournalism', '⏱', name, data);

/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint
 *
 * @note Assumes it is above the threshold if the browser does not support the API.
 */
const isFirstContentfulPaintAboveThreshold = async (threshold = 2400) => {
	try {
		const fcp = await new Promise<number>((resolve) => {
			// resolve this promise early if we know we’ve passed the threshold
			setTimeout(() => resolve(Infinity), threshold - performance.now());

			new PerformanceObserver((entries, observer) => {
				for (const entry of entries.getEntries()) {
					if (entry.name !== 'first-contentful-paint') return;

					logPerformanceInfo('paint', entry);
					observer.disconnect();
					resolve(entry.startTime);
				}
			}).observe({
				type: 'paint',
				buffered: true,
			});
		});

		return fcp > threshold;
	} catch (error) {
		return true;
	}
};

/**
 * @see https://developer.mozilla.org/en-US/docs/Glossary/Time_to_first_byte
 *
 * @note Assumes it is above the threshold if the browser does not support the API.
 */
const isTimeToFirstByteAboveThreshold = (threshold = 1200) => {
	try {
		const [nav] = window.performance.getEntriesByType('navigation');
		if (!nav) return true;

		logPerformanceInfo('navigation', {
			domContentLoadedEventEnd: nav.domContentLoadedEventEnd,
			type: nav.type,
			responseEnd: nav.responseEnd,
		});
		return nav.responseStart - nav.startTime > threshold;
	} catch (error) {
		return true;
	}
};

let memoizedPerformingPoorly: boolean | undefined;
/**
 * Whether or not the current page is running more slowly than acceptable.
 *
 * First contentful paint and time to first byte are good indicators of
 * whether a page will get at least one “poor” core web vital.
 *
 * @see https://web.dev/vitals/#core-web-vitals
 */
export const isPerformingPoorly = async (): Promise<boolean> =>
	(memoizedPerformingPoorly ??=
		isTimeToFirstByteAboveThreshold() &&
		(await isFirstContentfulPaintAboveThreshold()));

/** If the current page is performing poorly, record it in Ophan */
export const recordPoorPerformance = async (): Promise<void> => {
	try {
		if (await isPerformingPoorly()) {
			/** Not sure here if we should duplicate “dotcom-rendering” */
			const experiences = [
				'dotcom-rendering',
				'poor-page-performance',
			].join(',');
			log('openJournalism', `🐌 Poor page performance`);
			const { record } = await getOphan();
			record({ experiences });
		}
	} catch (error) {
		// do nothing if the performance API is not available
	}
};
