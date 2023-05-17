import type { DCRFrontCard } from '../types/front';

const MinimumPerDayPopOutFrequency = 2;

interface TrailAndDate {
	trail: DCRFrontCard;
	date: Date;
}

export interface GroupedTrails {
	year: number;
	month: number;
	day: number | undefined;
	trails: DCRFrontCard[];
}

const getMeanDayFrequency = (
	days: Array<{ day: number; trails: TrailAndDate[] }>,
) => {
	const totalTrails = days
		.flatMap(({ trails }) => trails.length)
		.reduce((acc, curr) => acc + curr, 0);
	return totalTrails / days.length;
};

export const groupTrailsByDate = (
	trails: DCRFrontCard[],
	forceDay = false,
): GroupedTrails[] => {
	const trailsAndDates = trails.map((trail) => ({
		trail,
		date: trail.webPublicationDate
			? new Date(trail.webPublicationDate)
			: new Date(),
	}));

	const trailsByYear: Array<{ year: number; trails: TrailAndDate[] }> = [];

	trailsAndDates.forEach(({ trail, date }) => {
		const existingYear = trailsByYear.find(
			({ year }) => year === date.getFullYear(),
		);
		if (existingYear) {
			existingYear.trails.push({ trail, date });
		} else {
			trailsByYear.push({
				year: date.getFullYear(),
				trails: [{ trail, date }],
			});
		}
	});

	const groupings: GroupedTrails[] = [];

	trailsByYear.forEach(({ year, trails: trailsForYear }) => {
		const trailsByMonth: Array<{
			year: number;
			month: number;
			trails: TrailAndDate[];
		}> = [];

		trailsForYear.forEach(({ trail, date }) => {
			const existingMonth = trailsByMonth.find(
				({ month }) => month === date.getMonth(),
			);
			if (existingMonth) {
				existingMonth.trails.push({ trail, date });
			} else {
				trailsByMonth.push({
					year,
					month: date.getMonth(),
					trails: [{ trail, date }],
				});
			}
		});

		trailsByMonth.forEach(({ month, trails: trailsForMonth }) => {
			const trailsByDay: Array<{
				year: number;
				month: number;
				day: number;
				trails: TrailAndDate[];
			}> = [];
			trailsForMonth.forEach(({ trail, date }) => {
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
			});
			const meanDayFrequency = getMeanDayFrequency(
				trailsByDay.map(({ day, trails: dayTrails }) => ({
					day,
					trails: dayTrails,
				})),
			);

			if (forceDay || meanDayFrequency > MinimumPerDayPopOutFrequency) {
				groupings.push(
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
				groupings.push({
					day: undefined,
					month,
					year,
					trails: trailsForMonth.map(
						(trailAndDate) => trailAndDate.trail,
					),
				});
			}
		});
	});

	return groupings;
};
