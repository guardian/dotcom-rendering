import { isNonNullable, type TeamName } from '@guardian/libs';

/** For browser which do not fully support the performance API */
const fallback = () => () => {
	return -1;
};

/**
 * Helper to measure the duration between two events.
 *
 * This uses curried function to ensure sequential usage,
 * as times only flows one way.
 *
 * Rounded up to the nearest millisecond.
 *
 * @example
 * const timer = createTimer('dotcom', 'fetch');
 * const timerEnd = timer('start');
 * await fetch('https://www.theguardian.com/uk.json');
 * const duration = timerEnd('end');
 */
export const createTimer = (
	team: TeamName,
	name: string,
	action?: string,
): ((actions: 'start') => (action: 'end') => number) => {
	const measureName = [team, name, action].filter(isNonNullable).join(' | ');

	if (!('getEntriesByName' in window.performance)) {
		return fallback;
	}

	return () => {
		const options: PerformanceMeasureOptions = { start: performance.now() };
		return () => {
			const { duration = -1 } =
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Firefox returned `undefined` before v101 https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark#browser_compatibility
				window.performance.measure(measureName, options) ??
				window.performance
					.getEntriesByName(measureName, 'measure')
					.at(-1) ??
				{};

			return Math.ceil(duration);
		};
	};
};
