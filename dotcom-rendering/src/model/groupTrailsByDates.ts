import { isUndefined } from '@guardian/libs';
import { type EditionId, getEditionFromId } from '../lib/edition';
import type { DCRFrontCard } from '../types/front';
import type { GroupedTrails } from '../types/tagPage';

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

const getEditionalisedDate = (date: Date, editionId: EditionId) => {
	const { timeZone } = getEditionFromId(editionId);

	const [day, month, year] = date
		.toLocaleDateString(
			// we use British locale in order to get “5 May 1821”
			'en-GB',
			{
				day: 'numeric',
				month: 'long',
				year: 'numeric',
				timeZone,
			},
		)
		.split(' ');
	if (isUndefined(day) || isUndefined(month) || isUndefined(year)) {
		return undefined;
	}

	return { day, month, year };
};

/**
 * Takes a set of trails & returns them grouped by year of publication
 */
const groupByYear = (trails: TrailAndDate[], editionId: EditionId) => {
	const trailsByYear: Array<{ year: string; trails: TrailAndDate[] }> = [];

	for (const { trail, date } of trails) {
		const existingYear = trailsByYear.find(
			({ year }) => year === getEditionalisedDate(date, editionId)?.year,
		);
		if (existingYear) {
			existingYear.trails.push({ trail, date });
		} else {
			trailsByYear.push({
				year: getEditionalisedDate(date, editionId)?.year ?? '1821',
				trails: [{ trail, date }],
			});
		}
	}

	return trailsByYear;
};

/**
 * Takes a set of trails for a given year and returns them grouped by month of publication
 */
const groupTrailsByMonth = (
	trails: TrailAndDate[],
	year: string,
	editionId: EditionId,
) => {
	const trailsByMonth: Array<{
		year: string;
		month: string;
		trails: TrailAndDate[];
	}> = [];

	for (const { trail, date } of trails) {
		const existingMonth = trailsByMonth.find(
			({ month }) =>
				month === getEditionalisedDate(date, editionId)?.month,
		);
		if (existingMonth) {
			existingMonth.trails.push({ trail, date });
		} else {
			trailsByMonth.push({
				year,
				month: getEditionalisedDate(date, editionId)?.month ?? '…',
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
	year: string,
	month: string,
	editionId: EditionId,
) => {
	const trailsByDay: Array<{
		year: string;
		month: string;
		day: string;
		trails: TrailAndDate[];
	}> = [];

	for (const { trail, date } of trails) {
		const existingMonth = trailsByDay.find(
			({ day }) => day === getEditionalisedDate(date, editionId)?.day,
		);
		if (existingMonth) {
			existingMonth.trails.push({ trail, date });
		} else {
			trailsByDay.push({
				year,
				month,
				day: getEditionalisedDate(date, editionId)?.day ?? '42',
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
	editionId: EditionId,
	forceDay = false,
): GroupedTrails[] => {
	// Creates a helper type with easy access to the date of publication as a Date class
	const trailsAndDates = trails.flatMap((trail) =>
		trail.webPublicationDate
			? [
					{
						trail,
						date: new Date(trail.webPublicationDate),
					},
			  ]
			: [],
	);

	const trailsByYear = groupByYear(trailsAndDates, editionId);

	// We will store all our grouped trails here as we work our way through each
	// year, month & potentially day.
	const groupedTrails: GroupedTrails[] = [];

	for (const { year, trails: trailsForYear } of trailsByYear) {
		const trailsByMonth = groupTrailsByMonth(
			trailsForYear,
			year,
			editionId,
		);

		for (const { month, trails: trailsForMonth } of trailsByMonth) {
			const trailsByDay = groupTrailsByDay(
				trailsForMonth,
				year,
				month,
				editionId,
			);

			/**
			 * Calculates the average number of trails per day across a set of days.
			 * For example, if 3 days have 1, 2, and 5 trails respectively,
			 * the mean frequency would be 4 trails per day.
			 */
			const meanDayFrequency =
				trailsByDay
					.map(({ trails: { length } }) => length)
					.reduce((total, day) => total + day, 0) /
				trailsByDay.length;

			// This is our 'pop-out' option, if forceDay is true of the mean day frequency exceeds
			// the minimum, we will create a 'GroupedTrails' object for each day we have trails
			// and add it to our output 'groupedTrails' array.
			if (forceDay || meanDayFrequency > MinimumPerDayPopOutFrequency) {
				groupedTrails.push(
					...trailsByDay.map((trailByDay) => ({
						...trailByDay,
						trails: trailByDay.trails.map(({ trail }) => trail),
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
					trails: trailsForMonth.map(({ trail }) => trail),
				});
			}
		}
	}

	// Sort in descending order (e.g most recent date first)
	// In cases where card order is unexpected (e.g not date ordered), it is possible this array will be out of order.
	const sortedGroupedTrails = groupedTrails
		.map((groupedTrail) => {
			/** Milliseconds since midnight, 1 January 1970, UTC */
			const epoch = new Date(
				[
					groupedTrail.day ?? 1,
					groupedTrail.month,
					groupedTrail.year,
				].join(' '),
			).getTime();
			return { groupedTrail, epoch };
		})
		.sort((a, b) => b.epoch - a.epoch)
		.map(({ groupedTrail }) => groupedTrail);

	return sortedGroupedTrails;
};
