// ----- Imports ----- //

import { MetricType } from '@guardian/bridget/Metric';

import { metrics } from './metrics';

// ----- Setup ----- //

const entries: PerformanceEntryList = [
	{
		duration: 0,
		entryType: 'paint',
		name: 'first-paint',
		startTime: 12,
		toJSON: () => null,
	},
	{
		duration: 0,
		entryType: 'paint',
		name: 'first-contentful-paint',
		startTime: 12,
		toJSON: () => null,
	},
];

// ----- Tests ----- //

test('Captures paint events', () => {
	const results = metrics(entries);

	expect(results).toHaveLength(2);
	expect(results).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				__type: MetricType.MetricWithFirstPaint,
			}),
			expect.objectContaining({
				__type: MetricType.MetricWithFirstContentfulPaint,
			}),
		]),
	);
});
