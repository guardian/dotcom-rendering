import { isTuple, isTupleOrGreater } from '../lib/tuple';
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
	const result: Array<
		GroupedTrails | GroupedTrailsFastMpu | GroupedTrailsSlowMpu
	> = [];

	groupedTrails.forEach((grouped) => {
		if (injected) {
			result.push(grouped);
			return;
		}

		if (speed === 'fast') {
			if (
				isTuple(grouped.trails, 2) ||
				isTuple(grouped.trails, 4) ||
				isTuple(grouped.trails, 6) ||
				isTupleOrGreater(grouped.trails, 9)
			) {
				injected = true;
				result.push({
					day: grouped.day,
					month: grouped.month,
					year: grouped.year,
					trails: grouped.trails,
					injected: true,
					speed: 'fast',
				});
			}
		} else {
			if (
				isTuple(grouped.trails, 2) ||
				isTuple(grouped.trails, 4) ||
				isTuple(grouped.trails, 5) ||
				isTuple(grouped.trails, 7)
			) {
				injected = true;
				result.push({
					day: grouped.day,
					month: grouped.month,
					year: grouped.year,
					trails: grouped.trails,
					injected: true,
					speed: 'slow',
				});
			}
		}
	});

	return result;
};
