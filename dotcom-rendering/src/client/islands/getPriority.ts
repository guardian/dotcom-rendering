import type { Priority } from '../../lib/scheduler';
import { isValidSchedulerPriority } from '../../lib/scheduler';

/**
 * getPriority takes the given html element and returns its priority attribute
 *
 * We expect the element to always be a `gu-*` custom element
 *
 * @param marker : The html element that we want to read the priority attribute from;
 * @returns
 */
export const getPriority = (marker: HTMLElement): Priority | undefined => {
	const priority = marker.getAttribute('priority');

	if (isValidSchedulerPriority(priority)) {
		return priority;
	}

	console.error(
		'Unable to find valid priority attribute on gu-island',
		marker,
	);

	return;
};
