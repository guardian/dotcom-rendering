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

	if (!('mark' in perf)) {
		return { start: () => 0, end: () => 0, clear: () => {} };
	}

	/** @returns time elapsed since [time origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin) in milliseconds */
	const start = () => {
		const { startTime } = perf.mark(startKey);
		return Math.ceil(startTime);
	};

	/** @returns length of task in milliseconds */
	const end = (): number => {
		perf.mark(endKey);
		const { duration } = perf.measure(name, startKey, endKey);
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
