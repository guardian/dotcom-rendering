// ----- Imports ----- //

import { MetricKind, metrics } from './metrics';


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
            expect.objectContaining({ kind: MetricKind.FirstPaint }),
            expect.objectContaining({ kind: MetricKind.FirstContentfulPaint }),
        ]),
    );
});
