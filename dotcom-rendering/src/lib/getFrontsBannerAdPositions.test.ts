import {
	brandedTestCollections,
	testCollectionsUk,
	testCollectionsUs,
} from '../../fixtures/manual/frontCollections';
import {
	getFrontsBannerAdPositions,
	getTaggedFrontsBannerAdPositions,
} from './getFrontsBannerAdPositions';

describe('Standard fronts fronts-banner ad slots', () => {
	it('calculates ad positions correctly for an example of the UK network front', () => {
		const adPositions = getFrontsBannerAdPositions(testCollectionsUk, 'uk');

		expect(adPositions).toEqual([3, 6, 8, 11, 14, 17]);
	});

	it('calculates ad positions correctly for an example of the US network front', () => {
		const adPositions = getFrontsBannerAdPositions(testCollectionsUs, 'us');

		expect(adPositions).toEqual([3, 6, 8, 11, 13, 18]);
	});

	it('does NOT insert ads above or below branded content', () => {
		const adPositions = getFrontsBannerAdPositions(
			brandedTestCollections,
			'uk',
		);

		expect(adPositions).toEqual([]);
	});
});

describe('Tagged fronts fronts-banner ad slots', () => {
	it('should insert 0 ads if there are less than 5 containers', () => {
		expect(getTaggedFrontsBannerAdPositions(1)).toEqual([]);
		expect(getTaggedFrontsBannerAdPositions(3)).toEqual([]);
	});

	it('should insert 1 ad if there are 5-7 containers', () => {
		expect(getTaggedFrontsBannerAdPositions(4)).toEqual([2]);
		expect(getTaggedFrontsBannerAdPositions(6)).toEqual([2]);
	});

	it('should insert 2 ads if there are 8-10 containers', () => {
		expect(getTaggedFrontsBannerAdPositions(7)).toEqual([2, 5]);
		expect(getTaggedFrontsBannerAdPositions(9)).toEqual([2, 5]);
	});

	it('should insert no more than 6 ads if there are more than 18 containers', () => {
		expect(getTaggedFrontsBannerAdPositions(19)).toEqual([
			2, 5, 8, 11, 14, 17,
		]);
		expect(getTaggedFrontsBannerAdPositions(25)).toEqual([
			2, 5, 8, 11, 14, 17,
		]);
	});
});
