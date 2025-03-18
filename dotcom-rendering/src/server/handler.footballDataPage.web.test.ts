import { sortRegionsFunction } from './handler.footballDataPage.web';

describe('sortRegionsFunction', () => {
	it('should return Regions in expected order', () => {
		const regions = [
			{
				name: 'English',
				competitions: [],
			},
			{
				name: 'Internationals',
				competitions: [],
			},
			{
				name: 'Unknown',
				competitions: [],
			},
		];

		const expectedNameOrder = ['Unknown', 'Internationals', 'English'];

		const sortedRegions = regions.sort(sortRegionsFunction);
		expect(sortedRegions.map((region) => region.name)).toEqual(
			expectedNameOrder,
		);
	});
});
