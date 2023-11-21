import { trails } from '../../fixtures/manual/trails';
import type { DCRFrontCard } from '../types/front';
import { groupTrailsByDates } from './groupTrailsByDates';

const datesToTrails = (dates: Date[]): DCRFrontCard[] => {
	return dates.map((date) => ({
		...trails[0],
		webPublicationDate: date.toISOString(),
	}));
};

describe('groupTrailsByDates', () => {
	it('Will split trails into days & months depending on the frequency', () => {
		const dates = [
			// SHOULD BE GROUPED BY DAY
			// 3 on the 23rd of June
			new Date(2023, 5, 23, 12),
			new Date(2023, 5, 23, 12),
			new Date(2023, 5, 23, 12),
			// 5 on the 25th of June
			new Date(2023, 5, 25, 12),
			new Date(2023, 5, 25, 12),
			new Date(2023, 5, 25, 12),
			new Date(2023, 5, 25, 12),
			new Date(2023, 5, 25, 12),
			// 7 on the 26th of June
			new Date(2023, 5, 26, 12),
			new Date(2023, 5, 26, 12),
			new Date(2023, 5, 26, 12),
			new Date(2023, 5, 26, 12),
			new Date(2023, 5, 26, 12),
			new Date(2023, 5, 26, 12),

			// SHOULD BE GROUPED BY MONTH
			// 1 on the 2nd of May
			new Date(2023, 4, 2, 12),
			// 3 on 3rd of May
			new Date(2023, 4, 3, 12),
			new Date(2023, 4, 3, 12),
			// 1 on 4th of May
			new Date(2023, 4, 4, 12),
			// 1 on 5th of May
			new Date(2023, 4, 5, 12),
		];

		const result = groupTrailsByDates(datesToTrails(dates));

		expect(result[0]?.day).toEqual(26);
		expect(result[1]?.day).toEqual(25);
		expect(result[2]?.day).toEqual(23);

		expect(result[3]?.day).toEqual(undefined);
		expect(result[3]?.month).toEqual(4);
	});

	it('Will respect "forceDay" being set to true', () => {
		const dates = [
			// This would be grouped by month if left to the pop out frequency
			// 1 on the 2nd of May
			new Date(2023, 4, 2, 12),
			// 3 on 3rd of May
			new Date(2023, 4, 3, 12),
			new Date(2023, 4, 3, 12),
			// 1 on 4th of May
			new Date(2023, 4, 4, 12),
			// 1 on 5th of May
			new Date(2023, 4, 5, 12),
		];

		const result = groupTrailsByDates(datesToTrails(dates), true);

		expect(result[0]?.day).toEqual(5);
		expect(result[1]?.day).toEqual(4);
		expect(result[2]?.day).toEqual(3);
		expect(result[3]?.day).toEqual(2);
	});
});
