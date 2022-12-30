const prefix = 'dotcom.performance';

/**
 * Helper to measure the duration of any task.
 *
 * Values are rounded up to the nearest millisecond,
 * in order to not under-report any duration.
 */
export const initPerf = (
	name: string,
): { start: () => number; end: () => number; clear: () => void } => {
	const perf = window.performance;
	const startKey = `${prefix}.${name}-start`;
	const endKey = `${prefix}.${name}-end`;

	if (!('getEntriesByName' in perf)) {
		// Handle browsers with partial implementations
		return { start: () => -1, end: () => -1, clear: () => {} };
	}

	/** @returns time elapsed since [time origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin) in milliseconds */
	const start = () => {
		const { startTime = -1 } =
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Issue in Firefox https://caniuse.com/mdn-api_performance_measure_returns_undefined
			perf.mark(startKey) ?? perf.getEntriesByName(startKey, 'mark')[0] ?? {};

		return Math.ceil(startTime);
	};

	/** @returns length of task in milliseconds */
	const end = (): number => {
		perf.mark(endKey);
		const { duration = -1 } =
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Issue in Firefox https://caniuse.com/mdn-api_performance_measure_returns_undefined
			perf.measure(name, startKey, endKey) ??
			perf.getEntriesByName(name, 'measure')[0] ??
			{};

		return Math.ceil(duration);
	};

	const clear = () => {
		perf.clearMarks(startKey);
		perf.clearMarks(endKey);
		perf.clearMeasures(name);
	};

	return {
		start,
		end,
		clear,
	};
};
