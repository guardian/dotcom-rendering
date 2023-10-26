import { takeFirst } from '../lib/tuple';
import type {
	GroupedTrails,
	GroupedTrailsFastMpu,
	GroupedTrailsSlowMpu,
} from '../types/tagFront';

/**
 * Injects an MPU container into a list of grouped trails
 *
 * For both slow & fast tag fronts, containers of certain lengths can receive an MPU slot.
 * The code looks for the first container of the right length and injects the ad slot
 * object (GroupedTrailsSlowMpu / GroupedTrailsFastMpu).
 */
export const injectMpuIntoGroupedTrails = (
	groupedTrails: GroupedTrails[],
	speed: 'slow' | 'fast',
): Array<GroupedTrails | GroupedTrailsFastMpu | GroupedTrailsSlowMpu> => {
	let injected = false;

	return groupedTrails.map((grouped) => {
		if (injected) {
			return grouped;
		}

		if (speed === 'fast') {
			// When we have a container with > 9 trails for fast,
			// we 'cap' the number of trails at 9 in order to fit an MPU in.
			// Containers that don't get an MPU injected will of course still be
			// able to show more than 9 trails.
			const fastTrails = takeFirst(grouped.trails, 9);
			switch (fastTrails.length) {
				case 2:
				case 4:
				case 6:
				case 9:
					injected = true;
					return {
						day: grouped.day,
						month: grouped.month,
						year: grouped.year,
						trails: fastTrails,
						injected: true,
						speed: 'fast',
					};
				default:
					return grouped;
			}
		} else {
			// By taking the first 12, we get the benefit of being able to use
			// a switch statement here, without 'capping' the number of trails in the
			// same way we do when 'fast'
			const slowTrails = takeFirst(grouped.trails, 12);
			switch (slowTrails.length) {
				case 2:
				case 4:
				case 5:
				case 7:
					injected = true;
					return {
						day: grouped.day,
						month: grouped.month,
						year: grouped.year,
						trails: slowTrails,
						injected: true,
						speed: 'slow',
					};
				default:
					return grouped;
			}
		}
	});
};
