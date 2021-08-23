// ----- Imports ----- //

import type { Metric } from '@guardian/bridget/Metric';
import { MetricType } from '@guardian/bridget/Metric';

// ----- Functions ----- //

const isFont = (entry: PerformanceEntry): boolean =>
	entry.name.endsWith('.ttf') || entry.name.endsWith('.otf');

const firstPaint = (entry: PerformanceEntry): Metric => ({
	__type: MetricType.MetricWithFirstPaint,
	firstPaint: { time: entry.startTime },
});

const firstContentfulPaint = (entry: PerformanceEntry): Metric => ({
	__type: MetricType.MetricWithFirstContentfulPaint,
	firstContentfulPaint: { time: entry.startTime },
});

const font = (entry: PerformanceResourceTiming): Metric => ({
	__type: MetricType.MetricWithFont,
	font: {
		duration: entry.duration,
		size: entry.decodedBodySize,
		name: entry.name.split('/').pop(),
	},
});

const metrics = (entries: PerformanceEntryList): Metric[] =>
	entries.reduce<Metric[]>((list, entry) => {
		if (entry.name === 'first-paint') {
			return [...list, firstPaint(entry)];
		} else if (entry.name === 'first-contentful-paint') {
			return [...list, firstContentfulPaint(entry)];
		} else if (
			entry instanceof PerformanceResourceTiming &&
			isFont(entry)
		) {
			return [...list, font(entry)];
		}

		return list;
	}, []);

// ----- Exports ----- //

export { metrics };
