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

		const result = groupTrailsByDates(datesToTrails(dates), 'UK');

		expect(result[0]?.day).toEqual('26');
		expect(result[1]?.day).toEqual('25');
		expect(result[2]?.day).toEqual('23');

		expect(result[3]?.day).toEqual(undefined);
		expect(result[3]?.month).toEqual('May');
	});

	it('Will handle all editions', () => {
		const dates = [
			// The whole of the last day of June (months are 0-indexed)
			'2024-06-30T00:00:00Z',
			'2024-06-30T01:00:00Z',
			'2024-06-30T02:00:00Z',
			'2024-06-30T03:00:00Z',
			'2024-06-30T04:00:00Z',
			'2024-06-30T05:00:00Z',
			'2024-06-30T06:00:00Z',
			'2024-06-30T07:00:00Z',
			'2024-06-30T08:00:00Z',
			'2024-06-30T09:00:00Z',
			'2024-06-30T10:00:00Z',
			'2024-06-30T11:00:00Z',
			'2024-06-30T12:00:00Z',
			'2024-06-30T13:00:00Z',
			'2024-06-30T14:00:00Z',
			'2024-06-30T15:00:00Z',
			'2024-06-30T16:00:00Z',
			'2024-06-30T17:00:00Z',
			'2024-06-30T18:00:00Z',
			'2024-06-30T19:00:00Z',
			'2024-06-30T20:00:00Z',
			'2024-06-30T21:00:00Z',
			'2024-06-30T22:00:00Z',
			'2024-06-30T23:00:00Z',
		].map((date) => new Date(date));

		const uk = groupTrailsByDates(datesToTrails(dates), 'UK');

		expect(uk[1]?.day).toEqual('30');
		expect(uk[1]?.month).toEqual('June');
		expect(uk[1]?.trails).toHaveLength(23);
		expect(uk[0]?.day).toBeUndefined();
		expect(uk[0]?.month).toEqual('July');
		expect(uk[0]?.trails).toHaveLength(1);

		const au = groupTrailsByDates(datesToTrails(dates), 'AU');

		expect(au[1]?.day).toEqual('30');
		expect(au[1]?.month).toEqual('June');
		expect(au[1]?.trails).toHaveLength(14);
		expect(au[0]?.day).toEqual('1');
		expect(au[0]?.month).toEqual('July');
		expect(au[0]?.trails).toHaveLength(10);

		const us = groupTrailsByDates(datesToTrails(dates), 'US');

		expect(us[1]?.day).toEqual('29');
		expect(us[1]?.month).toEqual('June');
		expect(us[1]?.trails).toHaveLength(4);
		expect(us[0]?.day).toEqual('30');
		expect(us[0]?.month).toEqual('June');
		expect(us[0]?.trails).toHaveLength(20);
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

		const result = groupTrailsByDates(datesToTrails(dates), 'UK', true);

		expect(result[0]?.day).toEqual('5');
		expect(result[1]?.day).toEqual('4');
		expect(result[2]?.day).toEqual('3');
		expect(result[3]?.day).toEqual('2');
	});
});
