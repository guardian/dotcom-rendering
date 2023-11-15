import type { DCRFrontCard } from '../types/front';
import type { GroupedTrails } from '../types/tagFront';

/**
 * The number of trails per day required (on average) for trails to be
 * grouped by day instead of month.
 */
const MinimumPerDayPopOutFrequency = 2;

/**
 * Helper type to give easy access to a javascript Date
 * class representing the date of publication for a trail
 */
interface TrailAndDate {
	trail: DCRFrontCard;
	date: Date;
}

/**
 * Calculates the average number of trails per day across a set of days
 */
const getMeanDayFrequency = (
	days: Array<{ day: number; trails: TrailAndDate[] }>,
) => {
	const totalTrails = days
		.flatMap(({ trails }) => trails.length)
		.reduce((acc, curr) => acc + curr, 0);
	return totalTrails / days.length;
};

/**
 * Takes a set of trails & returns them grouped by year of publication
 */
const groupByYear = (trails: TrailAndDate[]) => {
	const trailsByYear: Array<{ year: number; trails: TrailAndDate[] }> = [];

	for (const { trail, date } of trails) {
		const existingYear = trailsByYear.find(
			({ year }) => year === date.getUTCFullYear(),
		);
		if (existingYear) {
			existingYear.trails.push({ trail, date });
		} else {
			trailsByYear.push({
				year: date.getUTCFullYear(),
				trails: [{ trail, date }],
			});
		}
	}

	return trailsByYear;
};

/**
 * Takes a set of trails for a given year and returns them grouped by month of publication
 */
const groupTrailsByMonth = (trails: TrailAndDate[], year: number) => {
	const trailsByMonth: Array<{
		year: number;
		month: number;
		trails: TrailAndDate[];
	}> = [];

	for (const { trail, date } of trails) {
		const existingMonth = trailsByMonth.find(
			({ month }) => month === date.getUTCMonth(),
		);
		if (existingMonth) {
			existingMonth.trails.push({ trail, date });
		} else {
			trailsByMonth.push({
				year,
				month: date.getUTCMonth(),
				trails: [{ trail, date }],
			});
		}
	}

	return trailsByMonth;
};

/**
 * Takes a set of trails for a given year & month and returns them grouped by day of publication
 */
const groupTrailsByDay = (
	trails: TrailAndDate[],
	year: number,
	month: number,
) => {
	const trailsByDay: Array<{
		year: number;
		month: number;
		day: number;
		trails: TrailAndDate[];
	}> = [];

	for (const { trail, date } of trails) {
		const existingMonth = trailsByDay.find(
			({ day }) => day === date.getUTCDate(),
		);
		if (existingMonth) {
			existingMonth.trails.push({ trail, date });
		} else {
			trailsByDay.push({
				year,
				month,
				day: date.getUTCDate(),
				trails: [{ trail, date }],
			});
		}
	}

	return trailsByDay;
};

/**
 * This function takes a set of trails (DCRFrontCard[]), and groups them by day, month and sometimes day.
 *
 * All trails will be grouped by year & month, regardless of their frequency, we then decide whether or not to
 * group them by day by looking at the mean rate of occurrence per-day, when this goes above
 * a pre-determined value, the entire month is 'popped out' & trails are grouped by day instead of month.
 *
 * You can force the 'pop out' behavior with the 'forceDay' parameter.
 *
 * > Note: It's important to keep in mind that you won't get only get one of grouping by day, month & year and
 * just month and year. Pop-outs happen on a per-month basis, so it's likely that some groups will be just year & month
 * and others grouped by day, month & year.
 *
 * @param trails Trails to be grouped
 * @param forceDay Optionally force the trails to be grouped by day, regardless of their frequency rate
 * @returns Trails grouped by either month or day
 */
export const groupTrailsByDates = (
	trails: DCRFrontCard[],
	forceDay = false,
): GroupedTrails[] => {
	// Creates a helper type with easy access to the date of publication as a Date class
	const trailsAndDates = trails.map((trail) => ({
		trail,
		date: trail.webPublicationDate
			? new Date(trail.webPublicationDate)
			: new Date(),
	}));

	const trailsByYear = groupByYear(trailsAndDates);

	// We will store all our grouped trails here as we work our way through each
	// year, month & potentially day.
	const groupedTrails: GroupedTrails[] = [];

	for (const { year, trails: trailsForYear } of trailsByYear) {
		const trailsByMonth = groupTrailsByMonth(trailsForYear, year);

		for (const { month, trails: trailsForMonth } of trailsByMonth) {
			const trailsByDay = groupTrailsByDay(trailsForMonth, year, month);

			// Once we have trails grouped by year, month & day, we calculate the day frequency
			// e.g the average number of trails per day for this month.
			const meanDayFrequency = getMeanDayFrequency(
				trailsByDay.map(({ day, trails: dayTrails }) => ({
					day,
					trails: dayTrails,
				})),
			);

			// This is our 'pop-out' option, if forceDay is true of the mean day frequency exceeds
			// the minimum, we will create a 'GroupedTrails' object for each day we have trails
			// and add it to our output 'groupedTrails' array.
			if (forceDay || meanDayFrequency > MinimumPerDayPopOutFrequency) {
				groupedTrails.push(
					...trailsByDay.map((trailByDay) => ({
						day: trailByDay.day,
						month,
						year,
						trails: trailByDay.trails.map(
							(trailAndDate) => trailAndDate.trail,
						),
					})),
				);
			} else {
				// In the case we don't 'pop-out', we create a 'GroupedTrails' object for
				// all the trails of this month, and add it to our output 'groupedTrails' month.
				// This is our minimum specificity, so even if we only have 1 trail for this year,
				// it will be grouped by both month & year.
				groupedTrails.push({
					day: undefined,
					month,
					year,
					trails: trailsForMonth.map(
						(trailAndDate) => trailAndDate.trail,
					),
				});
			}
		}
	}

	// Sort in descending order (e.g most recent date first)
	// In cases where card order is unexpected (e.g not date ordered), it is possible this array will be out of order.
	const sortedGroupedTrails = [...groupedTrails].sort((a, b) => {
		// It is likely more performant to check year, then month, then day, than creating & destroying
		// many date objects in order to sort. Though there are generally not enough cards per page that we'd
		// ever see an impact.
		if (a.year !== b.year) {
			return b.year - a.year;
		}
		if (a.month !== b.month) {
			return b.month - a.month;
		}
		return (b.day ?? 0) - (a.day ?? 0);
	});

	return sortedGroupedTrails;
};
