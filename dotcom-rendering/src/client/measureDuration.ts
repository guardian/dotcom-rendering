const prefix = 'dotcom.performance';

/**
 * Helper to measure the duration of any task.
 *
 * Values are rounded up to the nearest millisecond,
 * in order to not under-report any duration.
 */
export const measureDuration = (
	name: string,
): { start: () => number; end: () => number; clear: () => void } => {
	const perf = window.performance;
	const startKey = `${prefix}.${name}-start`;
	const endKey = `${prefix}.${name}-end`;

	// Handle browsers with partial implementations
	if (!('getEntriesByName' in perf)) {
		return { start: () => -1, end: () => -1, clear: () => {} };
	}

	/**
	 * Starts measuring the duration of the current task.
	 * @returns The start time of the task (time elapsed since [time origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin) in milliseconds).
	 * */
	const start = () => {
		const { startTime = -1 } =
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Issue in Firefox https://caniuse.com/mdn-api_performance_measure_returns_undefined
			perf.mark(startKey) ??
			perf.getEntriesByName(startKey, 'mark')[0] ??
			{};

		return Math.ceil(startTime);
	};

	/**
	 * Stops measuring the duration the the current task.
	 * @returns The duration of task in milliseconds.
	 * */
	const end = (): number => {
		perf.mark(endKey);
		const { duration = -1 } =
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Issue in Firefox https://caniuse.com/mdn-api_performance_measure_returns_undefined
			perf.measure(name, startKey, endKey) ??
			perf.getEntriesByName(name, 'measure')[0] ??
			{};

		return Math.ceil(duration);
	};

	/**
	 * Removes all marks and measures for the current task.
	 */
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
