// ----- Types ----- //

const enum MetricKind {
    FirstPaint,
    FirstContentfulPaint,
    Font,
}

type Metric = {
    kind: MetricKind.FirstPaint;
    time: number;
} | {
    kind: MetricKind.FirstContentfulPaint;
    time: number;
} | {
    kind: MetricKind.Font;
    duration: number;
    // Safari doesn't support resource sizes
    size: number | null;
    name: string | null;
}


// ----- Functions ----- //

const isFont = (entry: PerformanceEntry): boolean =>
    entry.name.endsWith('.ttf') || entry.name.endsWith('.otf');

const firstPaint = (entry: PerformanceEntry): Metric =>
    ({ kind: MetricKind.FirstPaint, time: entry.startTime });

const firstContentfulPaint = (entry: PerformanceEntry): Metric =>
    ({ kind: MetricKind.FirstContentfulPaint, time: entry.startTime });

const font = (entry: PerformanceResourceTiming): Metric =>
    ({
        kind: MetricKind.Font,
        duration: entry.duration,
        size: entry.decodedBodySize ?? null,
        name: entry.name.split('/').pop() ?? null,
    });

const metrics = (entries: PerformanceEntryList): Metric[] =>
    entries.reduce<Metric[]>((list, entry) => {

        if (entry.name === 'first-paint') {
            return [ ...list, firstPaint(entry) ];
        } else if (entry.name === 'first-contentful-paint') {
            return [ ...list, firstContentfulPaint(entry) ];
        } else if (entry instanceof PerformanceResourceTiming && isFont(entry)) {
            return [ ...list, font(entry) ];
        }

        return list;

    }, []);


// ----- Exports ----- //

export {
    MetricKind,
    Metric,
    metrics,
};
