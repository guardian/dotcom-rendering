import { getTagPageBannerAdPositions } from './getTagPageAdPositions';

describe('Tag page fronts-banner ad slots', () => {
	it('should insert 0 ads if there are less than 5 containers', () => {
		expect(getTagPageBannerAdPositions(1)).toEqual([]);
		expect(getTagPageBannerAdPositions(3)).toEqual([]);
	});

	it('should insert 1 ad if there are 5-7 containers', () => {
		expect(getTagPageBannerAdPositions(4)).toEqual([2]);
		expect(getTagPageBannerAdPositions(6)).toEqual([2]);
	});

	it('should insert 2 ads if there are 8-10 containers', () => {
		expect(getTagPageBannerAdPositions(7)).toEqual([2, 5]);
		expect(getTagPageBannerAdPositions(9)).toEqual([2, 5]);
	});

	it('should insert no more than 6 ads if there are more than 18 containers', () => {
		expect(getTagPageBannerAdPositions(19)).toEqual([2, 5, 8, 11, 14, 17]);
		expect(getTagPageBannerAdPositions(25)).toEqual([2, 5, 8, 11, 14, 17]);
	});
});
